import { google, slides_v1 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { Logger } from '../utils/logger';
import { ParsedMarpPresentation, ParsedSlide } from '../parser/advanced-marp-parser';
import { MarpToGoogleSlidesMapper } from '../converter/mapping';

export interface CreatePresentationOptions {
  title?: string;
  locale?: string;
}

export interface ConversionResult {
  presentationId: string;
  presentationUrl: string;
  slideCount: number;
}

export class GoogleSlidesAPI {
  private slides: slides_v1.Slides;
  private logger: Logger;
  private mapper: MarpToGoogleSlidesMapper;
  private batchRequests: slides_v1.Schema$Request[] = [];
  private presentationId?: string;

  constructor(auth: OAuth2Client, logger: Logger) {
    this.slides = google.slides({ version: 'v1', auth });
    this.logger = logger;
    this.mapper = new MarpToGoogleSlidesMapper();
  }

  async createPresentation(
    parsedPresentation: ParsedMarpPresentation,
    options: CreatePresentationOptions = {}
  ): Promise<ConversionResult> {
    try {
      // Step 1: Create a new presentation
      const presentation = await this.createEmptyPresentation(
        options.title || parsedPresentation.globalMetadata.title || 'Untitled Presentation'
      );
      this.presentationId = presentation.presentationId!;
      this.logger.info(`Created presentation: ${this.presentationId}`);

      // Step 2: Get the first slide ID (title slide)
      const firstSlideId = presentation.slides![0].objectId!;

      // Step 3: Prepare batch requests for all slides
      this.prepareBatchRequests(parsedPresentation, firstSlideId);

      // Step 4: Execute batch update
      await this.executeBatchUpdate();

      // Step 5: Add speaker notes in a separate batch (if needed)
      await this.addSpeakerNotes(parsedPresentation.slides);

      const presentationUrl = `https://docs.google.com/presentation/d/${this.presentationId}`;
      this.logger.info(`Presentation created successfully: ${presentationUrl}`);

      return {
        presentationId: this.presentationId,
        presentationUrl,
        slideCount: parsedPresentation.slides.length,
      };
    } catch (error) {
      this.logger.error('Failed to create presentation:', error);
      throw new Error(`Failed to create presentation: ${error}`);
    }
  }

  private async createEmptyPresentation(title: string): Promise<slides_v1.Schema$Presentation> {
    const response = await this.slides.presentations.create({
      requestBody: {
        title,
      },
    });
    return response.data;
  }

  private prepareBatchRequests(
    parsedPresentation: ParsedMarpPresentation,
    firstSlideId: string
  ): void {
    this.batchRequests = [];
    const slideIds: string[] = [firstSlideId];

    // Update the title slide (first slide)
    if (parsedPresentation.slides.length > 0) {
      this.updateTitleSlide(firstSlideId, parsedPresentation.slides[0], parsedPresentation.globalMetadata);
    }

    // Create additional slides
    for (let i = 1; i < parsedPresentation.slides.length; i++) {
      const slideId = `slide_${i}_${Date.now()}`;
      slideIds.push(slideId);
      
      // Create slide request
      this.batchRequests.push({
        createSlide: {
          objectId: slideId,
          insertionIndex: i,
          slideLayoutReference: {
            predefinedLayout: 'BLANK',
          },
        },
      });
    }

    // Add content to all slides (including the first one)
    parsedPresentation.slides.forEach((slide, index) => {
      if (index === 0) return; // Title slide already updated
      
      const slideId = slideIds[index];
      const mappedSlide = this.mapper.mapSlide(slide, slideId);
      
      // Add page elements
      mappedSlide.pageElements?.forEach(element => {
        this.addPageElement(slideId, element);
      });

      // Apply slide properties
      if (mappedSlide.pageProperties?.pageBackgroundFill) {
        this.updateSlideBackground(slideId, mappedSlide.pageProperties.pageBackgroundFill);
      }
    });

    // Apply global properties
    if (parsedPresentation.globalMetadata.size) {
      this.updatePresentationSize(parsedPresentation.globalMetadata.size);
    }
  }

  private updateTitleSlide(
    slideId: string,
    firstSlide: ParsedSlide,
    globalMetadata: any
  ): void {
    // Clear existing elements on the title slide
    this.batchRequests.push({
      deleteObject: {
        objectId: `${slideId}.title`,
      },
    });
    this.batchRequests.push({
      deleteObject: {
        objectId: `${slideId}.subtitle`,
      },
    });

    // Map the first slide content
    const mappedSlide = this.mapper.mapSlide(firstSlide, slideId);
    
    // Add page elements
    mappedSlide.pageElements?.forEach(element => {
      this.addPageElement(slideId, element);
    });

    // Apply slide properties
    if (mappedSlide.pageProperties?.pageBackgroundFill) {
      this.updateSlideBackground(slideId, mappedSlide.pageProperties.pageBackgroundFill);
    }
  }

  private addPageElement(slideId: string, element: slides_v1.Schema$PageElement): void {
    const request: slides_v1.Schema$Request = {
      createShape: undefined,
      createTable: undefined,
      createLine: undefined,
      createImage: undefined,
    };

    if (element.shape) {
      request.createShape = {
        objectId: element.objectId,
        shapeType: element.shape.shapeType,
        elementProperties: {
          pageObjectId: slideId,
          size: element.size,
          transform: element.transform,
        },
      };
      this.batchRequests.push(request);

      // Add text if present
      if (element.shape.text) {
        this.addTextToShape(element.objectId!, element.shape.text);
      }

      // Apply shape properties
      if (element.shape.shapeProperties) {
        this.updateShapeProperties(element.objectId!, element.shape.shapeProperties);
      }
    } else if (element.table) {
      request.createTable = {
        objectId: element.objectId,
        elementProperties: {
          pageObjectId: slideId,
          size: element.size,
          transform: element.transform,
        },
        rows: element.table.rows!,
        columns: element.table.columns!,
      };
      this.batchRequests.push(request);

      // Add table content
      this.addTableContent(element.objectId!, element.table);
    } else if (element.line) {
      request.createLine = {
        objectId: element.objectId,
        lineCategory: 'STRAIGHT',
        elementProperties: {
          pageObjectId: slideId,
          size: element.size,
          transform: element.transform,
        },
      };
      this.batchRequests.push(request);

      // Apply line properties
      if (element.line.lineProperties) {
        this.updateLineProperties(element.objectId!, element.line.lineProperties);
      }
    } else if (element.image) {
      // Note: Image insertion requires URL or Drive file ID
      // For now, we'll create a placeholder
      request.createImage = {
        objectId: element.objectId,
        url: element.image.sourceUrl!,
        elementProperties: {
          pageObjectId: slideId,
          size: element.size,
          transform: element.transform,
        },
      };
      this.batchRequests.push(request);
    }
  }

  private addTextToShape(shapeId: string, text: slides_v1.Schema$TextContent): void {
    if (!text.textElements) return;

    text.textElements.forEach((element, index) => {
      if (element.textRun) {
        this.batchRequests.push({
          insertText: {
            objectId: shapeId,
            text: element.textRun.content!,
            insertionIndex: index,
          },
        });

        // Apply text style
        if (element.textRun.style) {
          this.updateTextStyle(shapeId, index, element.textRun.content!.length, element.textRun.style);
        }
      }
    });
  }

  private updateTextStyle(
    objectId: string,
    startIndex: number,
    length: number,
    style: slides_v1.Schema$TextStyle
  ): void {
    this.batchRequests.push({
      updateTextStyle: {
        objectId,
        textRange: {
          type: 'FIXED_RANGE',
          startIndex,
          endIndex: startIndex + length,
        },
        style,
        fields: Object.keys(style).join(','),
      },
    });
  }

  private updateShapeProperties(
    objectId: string,
    properties: slides_v1.Schema$ShapeProperties
  ): void {
    this.batchRequests.push({
      updateShapeProperties: {
        objectId,
        shapeProperties: properties,
        fields: Object.keys(properties).join(','),
      },
    });
  }

  private addTableContent(tableId: string, table: slides_v1.Schema$Table): void {
    if (!table.tableRows) return;

    table.tableRows.forEach((row, rowIndex) => {
      row.tableCells?.forEach((cell, colIndex) => {
        const cellObjectId = `${tableId}_cell_${rowIndex}_${colIndex}`;
        
        // Update cell properties
        if (cell.tableCellProperties) {
          this.batchRequests.push({
            updateTableCellProperties: {
              objectId: tableId,
              tableRange: {
                location: {
                  rowIndex,
                  columnIndex: colIndex,
                },
                rowSpan: 1,
                columnSpan: 1,
              },
              tableCellProperties: cell.tableCellProperties,
              fields: Object.keys(cell.tableCellProperties).join(','),
            },
          });
        }

        // Add text to cell
        if (cell.text?.textElements) {
          cell.text.textElements.forEach((element, index) => {
            if (element.textRun) {
              this.batchRequests.push({
                insertText: {
                  objectId: tableId,
                  cellLocation: {
                    rowIndex,
                    columnIndex: colIndex,
                  },
                  text: element.textRun.content!,
                  insertionIndex: index,
                },
              });

              // Apply text style
              if (element.textRun.style) {
                this.updateTableTextStyle(
                  tableId,
                  rowIndex,
                  colIndex,
                  index,
                  element.textRun.content!.length,
                  element.textRun.style
                );
              }
            }
          });
        }
      });
    });
  }

  private updateTableTextStyle(
    tableId: string,
    rowIndex: number,
    colIndex: number,
    startIndex: number,
    length: number,
    style: slides_v1.Schema$TextStyle
  ): void {
    this.batchRequests.push({
      updateTextStyle: {
        objectId: tableId,
        cellLocation: {
          rowIndex,
          columnIndex: colIndex,
        },
        textRange: {
          type: 'FIXED_RANGE',
          startIndex,
          endIndex: startIndex + length,
        },
        style,
        fields: Object.keys(style).join(','),
      },
    });
  }

  private updateLineProperties(
    objectId: string,
    properties: slides_v1.Schema$LineProperties
  ): void {
    this.batchRequests.push({
      updateLineProperties: {
        objectId,
        lineProperties: properties,
        fields: Object.keys(properties).join(','),
      },
    });
  }

  private updateSlideBackground(
    slideId: string,
    backgroundFill: slides_v1.Schema$PageBackgroundFill
  ): void {
    this.batchRequests.push({
      updatePageProperties: {
        objectId: slideId,
        pageProperties: {
          pageBackgroundFill: backgroundFill,
        },
        fields: 'pageBackgroundFill',
      },
    });
  }

  private updatePresentationSize(size: string): void {
    // Map Marp size to Google Slides size
    let width = 10 * 914400; // Default 10 inches
    let height = 5.625 * 914400; // Default 16:9

    switch (size) {
      case '4:3':
        width = 10 * 914400;
        height = 7.5 * 914400;
        break;
      case '16:9':
        width = 10 * 914400;
        height = 5.625 * 914400;
        break;
      case 'A4':
        width = 8.27 * 914400;
        height = 11.69 * 914400;
        break;
    }

    // Note: Presentation size updates require a different approach
    // This would typically be set when creating the presentation
    // For now, we'll skip this as it's not critical
  }

  private async executeBatchUpdate(): Promise<void> {
    if (this.batchRequests.length === 0) return;

    try {
      const response = await this.slides.presentations.batchUpdate({
        presentationId: this.presentationId!,
        requestBody: {
          requests: this.batchRequests,
        },
      });

      this.logger.info(`Executed ${this.batchRequests.length} batch requests`);
      this.batchRequests = []; // Clear the queue
    } catch (error) {
      this.logger.error('Batch update failed:', error);
      throw new Error(`Batch update failed: ${error}`);
    }
  }

  private async addSpeakerNotes(slides: ParsedSlide[]): Promise<void> {
    const notesRequests: slides_v1.Schema$Request[] = [];

    slides.forEach((slide, index) => {
      if (slide.notes) {
        const slideId = index === 0 ? 'p' : `slide_${index}_${Date.now()}`;
        
        notesRequests.push({
          createParagraphBullets: {
            objectId: `${slideId}.notes`,
            textRange: {
              type: 'ALL',
            },
            bulletPreset: 'BULLET_DISC_CIRCLE_SQUARE',
          },
        });

        notesRequests.push({
          insertText: {
            objectId: `${slideId}.notes`,
            text: slide.notes,
            insertionIndex: 0,
          },
        });
      }
    });

    if (notesRequests.length > 0) {
      this.batchRequests = notesRequests;
      await this.executeBatchUpdate();
    }
  }
}