import { SlideContent } from '../parser';
import { Theme, MARGIN, CONTENT_WIDTH, DEFAULT_FONT_SIZE } from '../constants';

/**
 * Add blockquote element with enhanced styling
 */
export function addBlockquote(
  slide: GoogleAppsScript.Slides.Slide,
  element: SlideContent,
  yPosition: number,
  theme: Theme
): number {
  const text = element.text || '';
  const lines = text.split('\n');
  const height = lines.length * 20 + 20;
  
  // Create background shape for quote
  const quoteBackground = slide.insertShape(
    SlidesApp.ShapeType.RECTANGLE,
    MARGIN + 10,
    yPosition,
    CONTENT_WIDTH - 20,
    height
  );
  quoteBackground.getFill().setSolidFill('#f9f9f9');
  quoteBackground.getBorder().setTransparent();
  
  // Add quote text
  const textBox = slide.insertTextBox('', MARGIN + 25, yPosition + 10, CONTENT_WIDTH - 35, height - 20);
  const textRange = textBox.getText();
  
  // Support multi-line blockquotes
  textRange.setText(text);
  textRange.getTextStyle().setFontSize(DEFAULT_FONT_SIZE);
  textRange.getTextStyle().setItalic(true);
  textRange.getTextStyle().setForegroundColor(theme.blockquoteColor);
  
  // Add quote bar
  const quoteLine = slide.insertLine(
    SlidesApp.LineCategory.STRAIGHT,
    MARGIN + 15,
    yPosition + 5,
    MARGIN + 15,
    yPosition + height - 5
  );
  quoteLine.setWeight(3);
  // Note: Line color setting may vary based on API version
  
  return yPosition + height;
}