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
  
  // Build the complete list text
  const listTexts: string[] = [];
  element.items.forEach((item: any, index: number) => {
    const indent = '  '.repeat(item.indent || 0);
    const bullet = isOrdered ? `${index + 1}.` : getBulletSymbol(item.indent || 0);
    listTexts.push(`${indent}${bullet} ${item.text}`);
  });
  
  // Create a single text box for the entire list
  const fullListText = listTexts.join('\n');
  const totalHeight = element.items.length * lineHeight;
  
  const textBox = slide.insertTextBox(
    fullListText,
    MARGIN,
    yPosition,
    CONTENT_WIDTH,
    totalHeight
  );
  
  const textRange = textBox.getText();
  textRange.getTextStyle().setFontSize(DEFAULT_FONT_SIZE);
  textRange.getTextStyle().setForegroundColor(theme.textColor);
  
  // Style each line's bullet/number
  let charOffset = 0;
  element.items.forEach((item: any, index: number) => {
    const indent = '  '.repeat(item.indent || 0);
    const bullet = isOrdered ? `${index + 1}.` : getBulletSymbol(item.indent || 0);
    const bulletLength = indent.length + bullet.length;
    
    // Style the bullet/number
    if (bulletLength > 0 && charOffset + bulletLength <= textRange.asString().length) {
      const bulletRange = textRange.getRange(charOffset, charOffset + bulletLength);
      bulletRange.getTextStyle().setBold(true);
    }
    
    // Move to the next line (add 1 for newline character)
    charOffset += indent.length + bullet.length + 1 + item.text.length + 1;
  });
  
  return yPosition + totalHeight;
}

/**
 * Get appropriate bullet symbol based on indent level
 */
function getBulletSymbol(indent: number): string {
  const bullets = ['•', '◦', '▪', '▫'];
  return bullets[indent % bullets.length];
}