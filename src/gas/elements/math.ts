import { SlideContent } from '../parser';
import { Theme, MARGIN, CONTENT_WIDTH, DEFAULT_FONT_SIZE } from '../constants';

/**
 * Add math expression (basic rendering)
 * Note: Google Slides doesn't have native LaTeX support,
 * so this is a simplified representation
 */
export function addMathExpression(
  slide: GoogleAppsScript.Slides.Slide,
  element: SlideContent,
  yPosition: number,
  theme: Theme
): number {
  const height = element.display ? 60 : 30;
  const mathText = element.text || '';
  
  // Create a text box for the math expression
  const textBox = slide.insertTextBox(
    mathText,
    MARGIN,
    yPosition,
    CONTENT_WIDTH,
    height
  );
  
  const textRange = textBox.getText();
  textRange.getTextStyle().setFontSize(element.display ? 18 : DEFAULT_FONT_SIZE);
  textRange.getTextStyle().setFontFamily('Cambria Math'); // Use math-friendly font
  textRange.getTextStyle().setItalic(true);
  textRange.getTextStyle().setForegroundColor(theme.textColor);
  
  if (element.display) {
    // Center display math
    textRange.getParagraphStyle().setParagraphAlignment(
      SlidesApp.ParagraphAlignment.CENTER
    );
  }
  
  return yPosition + height;
}