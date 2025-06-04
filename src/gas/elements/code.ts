import { SlideContent } from '../parser';
import { Theme, MARGIN, CONTENT_WIDTH, CODE_FONT } from '../constants';
import { SYNTAX_COLORS, LANGUAGE_KEYWORDS, getNormalizedLanguage } from '../syntax-highlighting';

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
  const rawLanguage = element.language || '';
  const language = getNormalizedLanguage(rawLanguage);
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
    
    // Apply color styles (sort by start position to avoid conflicts)
    const sortedStyles = highlightedText.styles.sort((a, b) => a.start - b.start);
    sortedStyles.forEach(style => {
      try {
        const range = textRange.getRange(style.start, style.end);
        range.getTextStyle().setForegroundColor(style.color);
      } catch (e) {
        console.error('Error applying syntax highlighting:', e);
      }
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
  if (!colors) {
    return { text: code, styles: [] };
  }
  
  const keywords = LANGUAGE_KEYWORDS[language] || [];
  const styles: HighlightStyle[] = [];
  const processedRanges: Set<string> = new Set();
  
  // Helper to check if a range overlaps with already processed ranges
  const isRangeProcessed = (start: number, end: number): boolean => {
    for (let i = start; i < end; i++) {
      if (processedRanges.has(i.toString())) {
        return true;
      }
    }
    return false;
  };
  
  // Helper to mark a range as processed
  const markRangeProcessed = (start: number, end: number): void => {
    for (let i = start; i < end; i++) {
      processedRanges.add(i.toString());
    }
  };
  
  let position = 0;
  const lines = code.split('\n');
  
  lines.forEach((line) => {
    // Skip empty lines
    if (!line.trim()) {
      position += line.length + 1;
      return;
    }
    
    // Comments (different patterns for different languages)
    let commentIndex = -1;
    
    if (['javascript', 'typescript', 'java', 'cpp', 'c', 'csharp', 'go', 'rust', 'kotlin', 'swift', 'dart', 'scala'].includes(language)) {
      commentIndex = line.indexOf('//');
      // Also check for /* */ style comments
      const blockCommentStart = line.indexOf('/*');
      if (blockCommentStart !== -1 && (commentIndex === -1 || blockCommentStart < commentIndex)) {
        const blockCommentEnd = line.indexOf('*/', blockCommentStart + 2);
        if (blockCommentEnd !== -1) {
          styles.push({
            start: position + blockCommentStart,
            end: position + blockCommentEnd + 2,
            color: colors.comment || '#808080'
          });
          markRangeProcessed(position + blockCommentStart, position + blockCommentEnd + 2);
        }
      }
    } else if (['python', 'ruby', 'perl', 'bash', 'powershell', 'r', 'elixir'].includes(language)) {
      commentIndex = line.indexOf('#');
    } else if (language === 'sql') {
      commentIndex = line.indexOf('--');
    } else if (['haskell', 'lua'].includes(language)) {
      commentIndex = line.indexOf('--');
    } else if (language === 'clojure') {
      commentIndex = line.indexOf(';');
    } else if (language === 'matlab') {
      commentIndex = line.indexOf('%');
    }
    
    if (commentIndex !== -1 && !isRangeProcessed(position + commentIndex, position + line.length)) {
      styles.push({
        start: position + commentIndex,
        end: position + line.length,
        color: colors.comment || '#808080'
      });
      markRangeProcessed(position + commentIndex, position + line.length);
    }
    
    // Strings (with different quote styles for different languages)
    const stringPatterns: RegExp[] = [];
    
    if (['javascript', 'typescript', 'python', 'ruby', 'php', 'go', 'rust', 'kotlin', 'swift', 'dart'].includes(language)) {
      // Single and double quotes, with template literals for JS/TS
      stringPatterns.push(/(['"])(?:(?=(\\?))\2.)*?\1/g);
      if (['javascript', 'typescript'].includes(language)) {
        stringPatterns.push(/`(?:[^`\\]|\\.)*`/g); // Template literals
      }
      if (['python', 'ruby'].includes(language)) {
        stringPatterns.push(/'''[\s\S]*?'''/g); // Triple quotes
        stringPatterns.push(/"""[\s\S]*?"""/g);
      }
    } else if (['java', 'csharp', 'cpp', 'c'].includes(language)) {
      stringPatterns.push(/"(?:[^"\\]|\\.)*"/g); // Double quotes only
      stringPatterns.push(/'(?:[^'\\]|\\.)*'/g); // Character literals
    }
    
    stringPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(line)) !== null) {
        if (!isRangeProcessed(position + match.index, position + match.index + match[0].length)) {
          styles.push({
            start: position + match.index,
            end: position + match.index + match[0].length,
            color: colors.string || '#008000'
          });
          markRangeProcessed(position + match.index, position + match.index + match[0].length);
        }
      }
    });
    
    // Numbers (including hex, binary, scientific notation)
    const numberPatterns = [
      /\b0x[0-9a-fA-F]+\b/g,          // Hex
      /\b0b[01]+\b/g,                  // Binary
      /\b\d+\.?\d*([eE][+-]?\d+)?\b/g // Decimal and scientific
    ];
    
    numberPatterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(line)) !== null) {
        if (!isRangeProcessed(position + match.index, position + match.index + match[0].length)) {
          styles.push({
            start: position + match.index,
            end: position + match.index + match[0].length,
            color: colors.number || '#ff0000'
          });
          markRangeProcessed(position + match.index, position + match.index + match[0].length);
        }
      }
    });
    
    // Keywords
    keywords.forEach(keyword => {
      // Escape special regex characters in keywords
      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'g');
      let match;
      while ((match = regex.exec(line)) !== null) {
        if (!isRangeProcessed(position + match.index, position + match.index + keyword.length)) {
          styles.push({
            start: position + match.index,
            end: position + match.index + keyword.length,
            color: colors.keyword || '#0000ff'
          });
          markRangeProcessed(position + match.index, position + match.index + keyword.length);
        }
      }
    });
    
    // Language-specific patterns
    if (language === 'css' || language === 'scss') {
      // CSS selectors
      const selectorMatch = line.match(/^([^{]+)\s*{/);
      if (selectorMatch && !isRangeProcessed(position, position + selectorMatch[1].length)) {
        styles.push({
          start: position,
          end: position + selectorMatch[1].length,
          color: colors.selector || '#d19a66'
        });
      }
      
      // CSS properties
      const propertyMatch = line.match(/^\s*([a-zA-Z-]+)\s*:/);
      if (propertyMatch && !isRangeProcessed(position + line.indexOf(propertyMatch[1]), position + line.indexOf(propertyMatch[1]) + propertyMatch[1].length)) {
        const propStart = position + line.indexOf(propertyMatch[1]);
        styles.push({
          start: propStart,
          end: propStart + propertyMatch[1].length,
          color: colors.property || '#56b6c2'
        });
      }
    }
    
    if (language === 'html' || language === 'xml') {
      // HTML/XML tags
      const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9-]*)/g;
      let match;
      while ((match = tagRegex.exec(line)) !== null) {
        if (!isRangeProcessed(position + match.index, position + match.index + match[0].length)) {
          styles.push({
            start: position + match.index,
            end: position + match.index + match[0].length,
            color: colors.tag || '#e06c75'
          });
        }
      }
      
      // Attributes
      const attrRegex = /\s([a-zA-Z-]+)=/g;
      while ((match = attrRegex.exec(line)) !== null) {
        const attrStart = position + match.index + 1; // +1 for the space
        if (!isRangeProcessed(attrStart, attrStart + match[1].length)) {
          styles.push({
            start: attrStart,
            end: attrStart + match[1].length,
            color: colors.attribute || '#d19a66'
          });
        }
      }
    }
    
    position += line.length + 1; // +1 for newline
  });
  
  // Remove overlapping styles (keep the first one)
  const finalStyles: HighlightStyle[] = [];
  const sortedStyles = styles.sort((a, b) => a.start - b.start);
  
  sortedStyles.forEach(style => {
    const overlaps = finalStyles.some(existing => 
      (style.start >= existing.start && style.start < existing.end) ||
      (style.end > existing.start && style.end <= existing.end)
    );
    if (!overlaps) {
      finalStyles.push(style);
    }
  });
  
  return { text: code, styles: finalStyles };
}