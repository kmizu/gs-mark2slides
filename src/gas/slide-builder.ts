import { Slide, SlideContent, SlideMetadata } from './parser';
import { Theme, SLIDE_WIDTH, SLIDE_HEIGHT, MARGIN, CONTENT_WIDTH, DEFAULT_FONT_SIZE, HEADING_SIZES } from './constants';
import { addCodeBlock } from './elements/code';
import { addTable } from './elements/table';
import { addList } from './elements/list';
import { addBlockquote } from './elements/blockquote';
import { addImage } from './elements/image';
import { addMathExpression } from './elements/math';
import { addParagraph } from './elements/paragraph';

/**
 * Create a slide from parsed data
 */
export function createSlide(
  presentation: GoogleAppsScript.Slides.Presentation,
  slideData: Slide,
  index: number,
  globalMetadata: SlideMetadata,
  theme: Theme
): void {
  const slide = presentation.appendSlide();
  
  // Apply slide-specific background
  if (slideData.metadata.backgroundColor) {
    slide.getBackground().setSolidFill(slideData.metadata.backgroundColor);
  } else {
    slide.getBackground().setSolidFill(theme.backgroundColor);
  }
  
  // Apply background image if specified
  if (slideData.metadata.backgroundImage) {
    try {
      const imageUrl = slideData.metadata.backgroundImage.replace('url(', '').replace(')', '').trim();
      slide.getBackground().setPictureFill(imageUrl);
    } catch (e) {
      console.error('Failed to set background image:', e);
    }
  }
  
  // Add speaker notes
  if (slideData.notes) {
    slide.getNotesPage().getSpeakerNotesShape().getText().setText(slideData.notes);
  }
  
  // Layout content elements
  let yPosition = MARGIN;
  
  slideData.content.forEach((element) => {
    yPosition = addElement(slide, element, yPosition, theme) + 15; // Add spacing
  });
  
  // Add page number if paginate is enabled
  const paginateValue = globalMetadata.paginate;
  if (paginateValue === 'true' || paginateValue === true || paginateValue === 'yes' || paginateValue === 1) {
    addPageNumber(slide, index + 1, theme);
  }
  
  // Add header/footer if specified
  if (globalMetadata.header) {
    addHeader(slide, globalMetadata.header, theme);
  }
  if (globalMetadata.footer) {
    addFooter(slide, globalMetadata.footer, theme);
  }
}

/**
 * Add element to slide based on type
 */
function addElement(
  slide: GoogleAppsScript.Slides.Slide,
  element: SlideContent,
  yPosition: number,
  theme: Theme
): number {
  switch (element.type) {
    case 'heading':
      return addHeading(slide, element, yPosition, theme);
    case 'paragraph':
      return addParagraph(slide, element, yPosition, theme);
    case 'list':
    case 'orderedList':
      return addList(slide, element, yPosition, theme);
    case 'code':
      return addCodeBlock(slide, element, yPosition, theme);
    case 'table':
      return addTable(slide, element, yPosition, theme);
    case 'blockquote':
      return addBlockquote(slide, element, yPosition, theme);
    case 'image':
      return addImage(slide, element, yPosition);
    case 'math':
      return addMathExpression(slide, element, yPosition, theme);
    case 'hr':
      return addHorizontalRule(slide, yPosition, theme);
    default:
      console.warn('Unknown element type:', element.type);
      return yPosition;
  }
}

/**
 * Add heading element
 */
function addHeading(
  slide: GoogleAppsScript.Slides.Slide,
  element: SlideContent,
  yPosition: number,
  theme: Theme
): number {
  const level = element.level || 1;
  const fontSize = HEADING_SIZES[level - 1] || DEFAULT_FONT_SIZE;
  const height = fontSize + 10;
  
  const textBox = slide.insertTextBox(element.text || '', MARGIN, yPosition, CONTENT_WIDTH, height);
  const textRange = textBox.getText();
  textRange.getTextStyle().setFontSize(fontSize);
  textRange.getTextStyle().setBold(true);
  textRange.getTextStyle().setForegroundColor(theme.headingColor);
  
  return yPosition + height;
}

/**
 * Add horizontal rule
 */
function addHorizontalRule(
  slide: GoogleAppsScript.Slides.Slide,
  yPosition: number,
  _theme: Theme
): number {
  const line = slide.insertLine(
    SlidesApp.LineCategory.STRAIGHT,
    MARGIN, 
    yPosition + 10, 
    SLIDE_WIDTH - MARGIN, 
    yPosition + 10
  );
  line.setWeight(1);
  // Note: Line color setting may vary based on API version
  
  return yPosition + 20;
}

/**
 * Add page number
 */
function addPageNumber(
  slide: GoogleAppsScript.Slides.Slide,
  pageNumber: number,
  theme: Theme
): void {
  const textBox = slide.insertTextBox(
    pageNumber.toString(),
    SLIDE_WIDTH - 80,
    SLIDE_HEIGHT - 40,
    60,
    30
  );
  textBox.getText().getTextStyle().setFontSize(12);
  textBox.getText().getTextStyle().setForegroundColor(theme.textColor);
  textBox.getText().getParagraphStyle().setParagraphAlignment(
    SlidesApp.ParagraphAlignment.END
  );
}

/**
 * Add header
 */
function addHeader(
  slide: GoogleAppsScript.Slides.Slide,
  headerText: string,
  theme: Theme
): void {
  const textBox = slide.insertTextBox(headerText, MARGIN, 10, CONTENT_WIDTH, 30);
  textBox.getText().getTextStyle().setFontSize(10);
  textBox.getText().getTextStyle().setForegroundColor(theme.textColor);
  textBox.getText().getParagraphStyle().setParagraphAlignment(
    SlidesApp.ParagraphAlignment.CENTER
  );
}

/**
 * Add footer
 */
function addFooter(
  slide: GoogleAppsScript.Slides.Slide,
  footerText: string,
  theme: Theme
): void {
  const textBox = slide.insertTextBox(
    footerText,
    MARGIN,
    SLIDE_HEIGHT - 35,
    CONTENT_WIDTH,
    25
  );
  textBox.getText().getTextStyle().setFontSize(10);
  textBox.getText().getTextStyle().setForegroundColor(theme.textColor);
  textBox.getText().getParagraphStyle().setParagraphAlignment(
    SlidesApp.ParagraphAlignment.CENTER
  );
}