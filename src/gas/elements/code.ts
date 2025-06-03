import { SlideContent } from '../parser';
import { Theme, MARGIN, CONTENT_WIDTH, CODE_FONT } from '../constants';
import { SYNTAX_COLORS, LANGUAGE_KEYWORDS } from '../syntax-highlighting';

/**
 * Add code block with syntax highlighting
 */
export function addCodeBlock(
  slide: GoogleAppsScript.Slides.Slide,
  element: SlideContent,
  yPosition: number,
  theme: Theme
): number {
  const code = element.text || '';
  const language = element.language || '';
  const lines = code.split('\n');
  const lineHeight = 16;
  const padding = 15;
  const height = lines.length * lineHeight + padding * 2;
  
  // Create background shape
  const codeBackground = slide.insertShape(
    SlidesApp.ShapeType.RECTANGLE,
    MARGIN,
    yPosition,
    CONTENT_WIDTH,
    height
  );
  codeBackground.getFill().setSolidFill(theme.codeBackground);
  codeBackground.getBorder().setTransparent();
  
  // Add code text with syntax highlighting
  const textBox = slide.insertTextBox('', MARGIN + padding, yPosition + padding, CONTENT_WIDTH - padding * 2, height - padding * 2);
  const textRange = textBox.getText();
  
  // Apply syntax highlighting
  if (language && SYNTAX_COLORS[language]) {
    const highlightedText = applySyntaxHighlighting(code, language);
    textRange.setText(highlightedText.text);
    
    // Apply color styles
    highlightedText.styles.forEach(style => {
      const range = textRange.getRange(style.start, style.end);
      range.getTextStyle().setForegroundColor(style.color);
    });
  } else {
    textRange.setText(code);
  }
  
  // Set font style
  textRange.getTextStyle().setFontFamily(CODE_FONT);
  textRange.getTextStyle().setFontSize(12);
  if (!language || !SYNTAX_COLORS[language]) {
    textRange.getTextStyle().setForegroundColor(theme.codeTextColor);
  }
  
  return yPosition + height;
}

interface HighlightStyle {
  start: number;
  end: number;
  color: string;
}

interface HighlightedText {
  text: string;
  styles: HighlightStyle[];
}

/**
 * Apply syntax highlighting to code
 */
function applySyntaxHighlighting(code: string, language: string): HighlightedText {
  const colors = SYNTAX_COLORS[language];
  const keywords = LANGUAGE_KEYWORDS[language] || [];
  const styles: HighlightStyle[] = [];
  
  // Simple syntax highlighting logic
  // This is a basic implementation - you might want to use a proper parser
  let position = 0;
  const lines = code.split('\n');
  
  lines.forEach((line) => {
    // Comments
    if (language === 'javascript' || language === 'java') {
      const commentIndex = line.indexOf('//');
      if (commentIndex !== -1) {
        styles.push({
          start: position + commentIndex,
          end: position + line.length,
          color: colors.comment || '#808080'
        });
      }
    } else if (language === 'python') {
      const commentIndex = line.indexOf('#');
      if (commentIndex !== -1) {
        styles.push({
          start: position + commentIndex,
          end: position + line.length,
          color: colors.comment || '#808080'
        });
      }
    }
    
    // Keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      let match;
      while ((match = regex.exec(line)) !== null) {
        styles.push({
          start: position + match.index,
          end: position + match.index + keyword.length,
          color: colors.keyword || '#0000ff'
        });
      }
    });
    
    // Strings (simple detection)
    const stringRegex = /(['"])(?:(?=(\\?))\2.)*?\1/g;
    let match;
    while ((match = stringRegex.exec(line)) !== null) {
      styles.push({
        start: position + match.index,
        end: position + match.index + match[0].length,
        color: colors.string || '#008000'
      });
    }
    
    // Numbers
    const numberRegex = /\b\d+\.?\d*\b/g;
    while ((match = numberRegex.exec(line)) !== null) {
      styles.push({
        start: position + match.index,
        end: position + match.index + match[0].length,
        color: colors.number || '#ff0000'
      });
    }
    
    position += line.length + 1; // +1 for newline
  });
  
  return { text: code, styles };
}