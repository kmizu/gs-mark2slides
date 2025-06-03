import { ParsedContent, ParsedSlide, SlideMetadata } from '../parser/advanced-marp-parser';
import { slides_v1 } from 'googleapis';

export interface ElementMapping {
  marpElement: ParsedContent;
  googleElements: slides_v1.Schema$PageElement[];
}

export class MarpToGoogleSlidesMapper {
  private slideWidth = 10 * 914400; // 10 inches in EMU
  private slideHeight = 5.625 * 914400; // 5.625 inches in EMU (16:9)
  private margin = 0.5 * 914400; // 0.5 inch margin
  private currentY = this.margin;

  mapSlide(parsedSlide: ParsedSlide, slideId: string): slides_v1.Schema$Page {
    this.currentY = this.margin; // Reset Y position for new slide
    
    const pageElements: slides_v1.Schema$PageElement[] = [];
    
    // Map content elements
    for (const content of parsedSlide.content) {
      const elements = this.mapContent(content, slideId);
      pageElements.push(...elements);
    }

    // Speaker notes will be handled separately in the API module

    // Apply slide properties from metadata
    const slideProperties = this.mapSlideProperties(parsedSlide.metadata);

    return {
      objectId: slideId,
      pageType: 'SLIDE',
      pageElements,
      pageProperties: {
        pageBackgroundFill: slideProperties.backgroundFill,
      },
      slideProperties: {
        masterObjectId: slideProperties.masterObjectId,
        layoutObjectId: slideProperties.layoutObjectId,
      },
    };
  }

  private mapContent(content: ParsedContent, slideId: string): slides_v1.Schema$PageElement[] {
    const elements: slides_v1.Schema$PageElement[] = [];
    const objectId = `${slideId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    switch (content.type) {
      case 'heading':
        elements.push(this.createTextBox(
          objectId,
          content.text || '',
          this.getHeadingStyle(content.level || 1),
          this.currentY
        ));
        this.currentY += this.getHeadingHeight(content.level || 1);
        break;

      case 'paragraph':
        elements.push(this.createTextBox(
          objectId,
          content.text || '',
          this.getParagraphStyle(),
          this.currentY
        ));
        this.currentY += 0.5 * 914400; // 0.5 inch spacing
        break;

      case 'list':
        if (content.items) {
          const listElements = this.createList(content.items, slideId, this.currentY);
          elements.push(...listElements);
          this.currentY += content.items.length * 0.4 * 914400; // 0.4 inch per item
        }
        break;

      case 'code':
        elements.push(this.createCodeBlock(
          objectId,
          content.text || '',
          content.lang,
          this.currentY
        ));
        this.currentY += 1 * 914400; // 1 inch for code block
        break;

      case 'image':
        if (content.src) {
          elements.push(this.createImage(objectId, content.src, content.alt, this.currentY));
          this.currentY += 3 * 914400; // 3 inches for image
        }
        break;

      case 'table':
        if (content.rows) {
          elements.push(this.createTable(objectId, content.rows, this.currentY));
          this.currentY += content.rows.length * 0.4 * 914400; // 0.4 inch per row
        }
        break;

      case 'blockquote':
        if (content.children) {
          const blockquoteElements = content.children.flatMap(child => 
            this.mapContent(child, slideId)
          );
          // Apply blockquote styling to all child elements
          blockquoteElements.forEach(elem => {
            if (elem.shape?.text) {
              elem.transform!.translateX = this.margin + 0.5 * 914400; // Indent
              if (elem.shape.text.textElements?.[0]?.textRun?.style) {
                elem.shape.text.textElements[0].textRun.style.italic = true;
              }
            }
          });
          elements.push(...blockquoteElements);
        }
        break;

      case 'hr':
        elements.push(this.createHorizontalRule(objectId, this.currentY));
        this.currentY += 0.2 * 914400; // Small spacing
        break;
    }

    return elements;
  }

  private createTextBox(
    objectId: string,
    text: string,
    style: slides_v1.Schema$TextStyle,
    yPosition: number
  ): slides_v1.Schema$PageElement {
    return {
      objectId,
      size: {
        width: { magnitude: this.slideWidth - 2 * this.margin, unit: 'EMU' },
        height: { magnitude: 1 * 914400, unit: 'EMU' }, // Auto-resize
      },
      transform: {
        scaleX: 1,
        scaleY: 1,
        translateX: this.margin,
        translateY: yPosition,
        unit: 'EMU',
      },
      shape: {
        shapeType: 'TEXT_BOX',
        text: {
          textElements: [{
            textRun: {
              content: text + '\n',
              style,
            },
          }],
        },
      },
    };
  }

  private createList(
    items: import('../parser/advanced-marp-parser').ParsedListItem[],
    slideId: string,
    yPosition: number
  ): slides_v1.Schema$PageElement[] {
    const elements: slides_v1.Schema$PageElement[] = [];
    let currentY = yPosition;

    items.forEach((item, index) => {
      const objectId = `${slideId}_list_${Date.now()}_${index}`;
      const bullet = item.checked !== undefined 
        ? (item.checked ? '☑' : '☐')
        : '•';
      
      elements.push(this.createTextBox(
        objectId,
        `${bullet} ${item.text}`,
        this.getParagraphStyle(),
        currentY
      ));
      
      currentY += 0.4 * 914400; // 0.4 inch per item

      // Handle sub-items
      if (item.subItems) {
        const subElements = this.createList(item.subItems, slideId, currentY);
        subElements.forEach(elem => {
          elem.transform!.translateX = this.margin + 0.5 * 914400; // Indent
        });
        elements.push(...subElements);
        currentY += item.subItems.length * 0.4 * 914400;
      }
    });

    return elements;
  }

  private createCodeBlock(
    objectId: string,
    code: string,
    language: string | undefined,
    yPosition: number
  ): slides_v1.Schema$PageElement {
    return {
      objectId,
      size: {
        width: { magnitude: this.slideWidth - 2 * this.margin, unit: 'EMU' },
        height: { magnitude: 2 * 914400, unit: 'EMU' }, // 2 inches
      },
      transform: {
        scaleX: 1,
        scaleY: 1,
        translateX: this.margin,
        translateY: yPosition,
        unit: 'EMU',
      },
      shape: {
        shapeType: 'TEXT_BOX',
        shapeProperties: {
          shapeBackgroundFill: {
            solidFill: {
              color: {
                rgbColor: {
                  red: 0.95,
                  green: 0.95,
                  blue: 0.95,
                },
              },
            },
          },
        },
        text: {
          textElements: [{
            textRun: {
              content: code,
              style: {
                fontFamily: 'Courier New',
                fontSize: { magnitude: 10, unit: 'PT' },
              },
            },
          }],
        },
      },
    };
  }

  private createImage(
    objectId: string,
    src: string,
    alt: string | undefined,
    yPosition: number
  ): slides_v1.Schema$PageElement {
    // Note: Actual image insertion requires uploading to Google Drive first
    // This is a placeholder that will be replaced in the API module
    return {
      objectId,
      size: {
        width: { magnitude: 4 * 914400, unit: 'EMU' }, // 4 inches
        height: { magnitude: 3 * 914400, unit: 'EMU' }, // 3 inches
      },
      transform: {
        scaleX: 1,
        scaleY: 1,
        translateX: (this.slideWidth - 4 * 914400) / 2, // Center
        translateY: yPosition,
        unit: 'EMU',
      },
      image: {
        sourceUrl: src,
        imageProperties: {
          transparency: 0,
        },
      },
      description: alt,
    };
  }

  private createTable(
    objectId: string,
    rows: string[][],
    yPosition: number
  ): slides_v1.Schema$PageElement {
    const numRows = rows.length;
    const numCols = rows[0]?.length || 1;

    return {
      objectId,
      size: {
        width: { magnitude: this.slideWidth - 2 * this.margin, unit: 'EMU' },
        height: { magnitude: numRows * 0.5 * 914400, unit: 'EMU' },
      },
      transform: {
        scaleX: 1,
        scaleY: 1,
        translateX: this.margin,
        translateY: yPosition,
        unit: 'EMU',
      },
      table: {
        rows: numRows,
        columns: numCols,
        tableRows: rows.map((row, rowIndex) => ({
          rowHeight: { magnitude: 0.5 * 914400, unit: 'EMU' },
          tableCells: row.map((cell, colIndex) => ({
            tableCellProperties: {
              tableCellBackgroundFill: rowIndex === 0 ? {
                solidFill: {
                  color: {
                    rgbColor: { red: 0.9, green: 0.9, blue: 0.9 },
                  },
                },
              } : undefined,
            },
            text: {
              textElements: [{
                textRun: {
                  content: cell,
                  style: {
                    fontSize: { magnitude: 10, unit: 'PT' },
                    bold: rowIndex === 0,
                  },
                },
              }],
            },
          })),
        })),
      },
    };
  }

  private createHorizontalRule(objectId: string, yPosition: number): slides_v1.Schema$PageElement {
    return {
      objectId,
      size: {
        width: { magnitude: this.slideWidth - 2 * this.margin, unit: 'EMU' },
        height: { magnitude: 0.01 * 914400, unit: 'EMU' }, // Very thin
      },
      transform: {
        scaleX: 1,
        scaleY: 1,
        translateX: this.margin,
        translateY: yPosition,
        unit: 'EMU',
      },
      line: {
        lineProperties: {
          lineFill: {
            solidFill: {
              color: {
                rgbColor: { red: 0.5, green: 0.5, blue: 0.5 },
              },
            },
          },
          weight: { magnitude: 1, unit: 'PT' },
        },
      },
    };
  }

  private mapSlideProperties(metadata: SlideMetadata): {
    backgroundFill?: slides_v1.Schema$PageBackgroundFill;
    masterObjectId?: string;
    layoutObjectId?: string;
  } {
    const properties: any = {};

    if (metadata.backgroundColor) {
      properties.backgroundFill = {
        solidFill: {
          color: {
            rgbColor: this.hexToRgb(metadata.backgroundColor),
          },
        },
      };
    }

    if (metadata.backgroundImage) {
      properties.backgroundFill = {
        stretchedPictureFill: {
          contentUrl: metadata.backgroundImage,
          size: metadata.backgroundSize === 'contain' ? 'FIT' : 'COVER',
        },
      };
    }

    // Map theme to master/layout (placeholder - needs actual master IDs)
    if (metadata.theme) {
      properties.masterObjectId = 'default-master';
      properties.layoutObjectId = 'default-layout';
    }

    return properties;
  }

  private getHeadingStyle(level: number): slides_v1.Schema$TextStyle {
    const sizes = [32, 28, 24, 20, 18, 16]; // H1-H6
    return {
      fontSize: { magnitude: sizes[level - 1] || 16, unit: 'PT' },
      bold: true,
    };
  }

  private getHeadingHeight(level: number): number {
    const heights = [1.2, 1.1, 1, 0.9, 0.8, 0.7]; // in inches
    return (heights[level - 1] || 0.7) * 914400;
  }

  private getParagraphStyle(): slides_v1.Schema$TextStyle {
    return {
      fontSize: { magnitude: 14, unit: 'PT' },
    };
  }

  private hexToRgb(hex: string): { red: number; green: number; blue: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      red: parseInt(result[1], 16) / 255,
      green: parseInt(result[2], 16) / 255,
      blue: parseInt(result[3], 16) / 255,
    } : { red: 0, green: 0, blue: 0 };
  }
}