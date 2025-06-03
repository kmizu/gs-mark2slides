import { SlideContent } from '../parser';
import { Theme, MARGIN, CONTENT_WIDTH, DEFAULT_FONT_SIZE, INLINE_CODE_BACKGROUND } from '../constants';

/**
 * Add paragraph with inline formatting
 */
export function addParagraph(
  slide: GoogleAppsScript.Slides.Slide,
  element: SlideContent,
  yPosition: number,
  theme: Theme
): number {
  const text = element.text || '';
  const lines = text.split('\n');
  const estimatedHeight = lines.length * 20 + 10;
  
  const textBox = slide.insertTextBox('', MARGIN, yPosition, CONTENT_WIDTH, estimatedHeight);
  const textRange = textBox.getText();
  
  // Parse and apply inline formatting
  applyInlineFormatting(textRange, text, theme);
  
  // Set default style
  textRange.getTextStyle().setFontSize(DEFAULT_FONT_SIZE);
  textRange.getTextStyle().setForegroundColor(theme.textColor);
  
  return yPosition + estimatedHeight;
}

/**
 * Apply inline formatting (bold, italic, code, links)
 */
function applyInlineFormatting(
  textRange: GoogleAppsScript.Slides.TextRange,
  text: string,
  theme: Theme
): void {
  // First, set the plain text
  let plainText = text;
  
  // Replace formatting markers with plain text
  plainText = plainText.replace(/\*\*([^*]+)\*\*/g, '$1'); // Bold
  plainText = plainText.replace(/\*([^*]+)\*/g, '$1'); // Italic
  plainText = plainText.replace(/_([^_]+)_/g, '$1'); // Italic alt
  plainText = plainText.replace(/`([^`]+)`/g, '$1'); // Inline code
  plainText = plainText.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // Links
  plainText = plainText.replace(/~~([^~]+)~~/g, '$1'); // Strikethrough
  
  textRange.setText(plainText);
  
  // Track position adjustments due to removed formatting characters
  let offset = 0;
  
  // Apply bold formatting
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let match;
  while ((match = boldRegex.exec(text)) !== null) {
    const start = match.index - offset;
    const length = match[1].length;
    try {
      const range = textRange.getRange(start, start + length);
      range.getTextStyle().setBold(true);
    } catch (e) {
      console.error('Bold formatting error:', e);
    }
    offset += 4; // Remove ** **
  }
  
  // Apply italic formatting
  const italicRegex = /\*([^*]+)\*/g;
  offset = 0;
  while ((match = italicRegex.exec(text)) !== null) {
    if (text.substring(match.index - 1, match.index) !== '*' && 
        text.substring(match.index + match[0].length, match.index + match[0].length + 1) !== '*') {
      const start = match.index - offset;
      const length = match[1].length;
      try {
        const range = textRange.getRange(start, start + length);
        range.getTextStyle().setItalic(true);
      } catch (e) {
        console.error('Italic formatting error:', e);
      }
      offset += 2; // Remove * *
    }
  }
  
  // Apply inline code formatting
  const codeRegex = /`([^`]+)`/g;
  offset = 0;
  while ((match = codeRegex.exec(text)) !== null) {
    const start = match.index - offset;
    const length = match[1].length;
    try {
      const range = textRange.getRange(start, start + length);
      range.getTextStyle().setFontFamily('Courier New');
      range.getTextStyle().setBackgroundColor(INLINE_CODE_BACKGROUND);
    } catch (e) {
      console.error('Code formatting error:', e);
    }
    offset += 2; // Remove ` `
  }
  
  // Apply link formatting
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  offset = 0;
  while ((match = linkRegex.exec(text)) !== null) {
    const start = match.index - offset;
    const linkText = match[1];
    // const linkUrl = match[2]; // Not used in GAS version
    const length = linkText.length;
    try {
      const range = textRange.getRange(start, start + length);
      range.getTextStyle().setForegroundColor(theme.linkColor);
      range.getTextStyle().setUnderline(true);
      // Note: setLinkUrl may not be available in all GAS versions
    } catch (e) {
      console.error('Link formatting error:', e);
    }
    offset += match[0].length - linkText.length; // Adjust for removed markdown
  }
  
  // Apply strikethrough formatting
  const strikeRegex = /~~([^~]+)~~/g;
  offset = 0;
  while ((match = strikeRegex.exec(text)) !== null) {
    const start = match.index - offset;
    const length = match[1].length;
    try {
      const range = textRange.getRange(start, start + length);
      range.getTextStyle().setStrikethrough(true);
    } catch (e) {
      console.error('Strikethrough formatting error:', e);
    }
    offset += 4; // Remove ~~ ~~
  }
}