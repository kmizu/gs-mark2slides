import { SlideContent } from '../parser';
import { Theme, MARGIN, CONTENT_WIDTH, DEFAULT_FONT_SIZE } from '../constants';

/**
 * Add list element (ordered or unordered)
 */
export function addList(
  slide: GoogleAppsScript.Slides.Slide,
  element: SlideContent,
  yPosition: number,
  theme: Theme
): number {
  if (!element.items || element.items.length === 0) {
    return yPosition;
  }
  
  const isOrdered = element.type === 'orderedList';
  const lineHeight = 20;
  const indentSize = 20;
  
  let currentY = yPosition;
  
  element.items.forEach((item: any, index: number) => {
    const indent = (item.indent || 0) * indentSize;
    const bullet = isOrdered ? `${index + 1}.` : getBulletSymbol(item.indent || 0);
    const text = `${bullet} ${item.text}`;
    
    const textBox = slide.insertTextBox(
      text,
      MARGIN + indent,
      currentY,
      CONTENT_WIDTH - indent,
      lineHeight
    );
    
    const textRange = textBox.getText();
    textRange.getTextStyle().setFontSize(DEFAULT_FONT_SIZE);
    textRange.getTextStyle().setForegroundColor(theme.textColor);
    
    // Style the bullet/number differently
    const bulletRange = textRange.getRange(0, bullet.length);
    bulletRange.getTextStyle().setBold(true);
    
    currentY += lineHeight;
  });
  
  return currentY;
}

/**
 * Get appropriate bullet symbol based on indent level
 */
function getBulletSymbol(indent: number): string {
  const bullets = ['•', '◦', '▪', '▫'];
  return bullets[indent % bullets.length];
}