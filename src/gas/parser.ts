// Parser module - no need to import Theme here

export interface SlideMetadata {
  title?: string;
  theme?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  paginate?: boolean | string | number;
  header?: string;
  footer?: string;
  [key: string]: any;
}

export interface SlideContent {
  type: string;
  text?: string;
  level?: number;
  language?: string;
  items?: any[];
  rows?: any[];
  alignments?: string[];
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  display?: boolean;
  symbol?: string;
  indent?: number;
}

export interface Slide {
  metadata: SlideMetadata;
  content: SlideContent[];
  notes: string;
}

export interface ParsedPresentation {
  metadata: SlideMetadata;
  slides: Slide[];
}

/**
 * Parse Marp markdown into structured data
 */
export function parseMarpMarkdown(markdown: string): ParsedPresentation {
  const result: ParsedPresentation = {
    metadata: {},
    slides: []
  };
  
  // Handle empty input
  if (!markdown || markdown.trim().length === 0) {
    result.slides.push({ metadata: {}, content: [], notes: '' });
    return result;
  }
  
  // Normalize line endings
  markdown = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  const lines = markdown.split('\n');
  let i = 0;
  
  // Check for frontmatter
  if (lines[0] === '---') {
    const frontmatterLines: string[] = [];
    i = 1;
    while (i < lines.length && lines[i] !== '---') {
      frontmatterLines.push(lines[i]);
      i++;
    }
    if (i < lines.length) {
      try {
        result.metadata = parseFrontmatter(frontmatterLines.join('\n'));
      } catch (error) {
        console.error('Error parsing frontmatter:', error);
        // Continue with empty metadata
      }
      i++; // Skip closing ---
    }
  }
  
  // Parse slides
  let currentSlide: Slide | null = null;
  let currentContent: string[] = [];
  let speakerNotes: string[] = [];
  let inSpeakerNotes = false;
  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockContent: string[] = [];
  
  for (; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Slide separator
    if (trimmedLine === '---') {
      // Save current slide if exists
      if (currentSlide || currentContent.length > 0) {
        if (!currentSlide) {
          currentSlide = { metadata: {}, content: [], notes: '' };
        }
        if (currentContent.length > 0) {
          currentSlide.content = parseSlideContent(currentContent.join('\n'));
        }
        if (speakerNotes.length > 0) {
          currentSlide.notes = speakerNotes.join('\n').trim();
        }
        result.slides.push(currentSlide);
      }
      
      // Reset for new slide
      currentSlide = { metadata: {}, content: [], notes: '' };
      currentContent = [];
      speakerNotes = [];
      inSpeakerNotes = false;
      continue;
    }
    
    // Check for slide directives
    if (trimmedLine.startsWith('<!-- ') && trimmedLine.endsWith(' -->')) {
      const directive = trimmedLine.slice(5, -4).trim();
      if (directive.startsWith('_')) {
        // Local directive for current slide
        const [key, ...valueParts] = directive.slice(1).split(':');
        const value = valueParts.join(':').trim();
        if (!currentSlide) {
          currentSlide = { metadata: {}, content: [], notes: '' };
        }
        currentSlide.metadata[key] = value;
        continue;
      }
    }
    
    // Check for speaker notes
    if (trimmedLine.startsWith('<!--') && !trimmedLine.endsWith('-->')) {
      inSpeakerNotes = true;
      speakerNotes.push(trimmedLine.slice(4).trim());
      continue;
    }
    
    if (inSpeakerNotes) {
      if (trimmedLine.endsWith('-->')) {
        speakerNotes.push(trimmedLine.slice(0, -3).trim());
        inSpeakerNotes = false;
      } else {
        speakerNotes.push(line);
      }
      continue;
    }
    
    // Check for code blocks
    if (trimmedLine.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLang = trimmedLine.slice(3).trim();
        codeBlockContent = [];
      } else {
        inCodeBlock = false;
        currentContent.push('```' + codeBlockLang);
        currentContent.push(...codeBlockContent);
        currentContent.push('```');
        codeBlockLang = '';
        codeBlockContent = [];
      }
      continue;
    }
    
    if (inCodeBlock) {
      codeBlockContent.push(line);
    } else {
      currentContent.push(line);
    }
  }
  
  // Don't forget the last slide
  if (currentSlide || currentContent.length > 0) {
    if (!currentSlide) {
      currentSlide = { metadata: {}, content: [], notes: '' };
    }
    if (currentContent.length > 0) {
      currentSlide.content = parseSlideContent(currentContent.join('\n'));
    }
    if (speakerNotes.length > 0) {
      currentSlide.notes = speakerNotes.join('\n').trim();
    }
    result.slides.push(currentSlide);
  }
  
  return result;
}

/**
 * Parse frontmatter YAML (improved)
 */
function parseFrontmatter(yaml: string): SlideMetadata {
  const metadata: SlideMetadata = {};
  const lines = yaml.split('\n');
  
  let currentKey: string | null = null;
  let currentValue: string[] = [];
  
  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) continue;
    
    // Check if it's a new key-value pair
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0 && !line.slice(0, colonIndex).includes('"') && !line.slice(0, colonIndex).includes("'")) {
      // Save previous key-value if exists
      if (currentKey) {
        const value = currentValue.join('\n').trim();
        metadata[currentKey] = parseYamlValue(value);
      }
      
      // Start new key-value
      currentKey = line.slice(0, colonIndex).trim();
      const initialValue = line.slice(colonIndex + 1).trim();
      currentValue = initialValue ? [initialValue] : [];
    } else if (currentKey && (line.startsWith('  ') || line.startsWith('\t'))) {
      // Multi-line value
      currentValue.push(line.trim());
    }
  }
  
  // Don't forget the last key-value
  if (currentKey) {
    const value = currentValue.join('\n').trim();
    metadata[currentKey] = parseYamlValue(value);
  }
  
  return metadata;
}

/**
 * Parse YAML value (handle booleans, numbers, strings)
 */
function parseYamlValue(value: string): any {
  // Remove quotes if present
  if ((value.startsWith('"') && value.endsWith('"')) || 
      (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  
  // Boolean values
  if (value.toLowerCase() === 'true' || value.toLowerCase() === 'yes') return true;
  if (value.toLowerCase() === 'false' || value.toLowerCase() === 'no') return false;
  
  // Numeric values
  if (/^-?\d+$/.test(value)) return parseInt(value, 10);
  if (/^-?\d+\.\d+$/.test(value)) return parseFloat(value);
  
  // Return as string
  return value;
}

/**
 * Parse slide content into structured elements
 */
function parseSlideContent(markdown: string): SlideContent[] {
  const elements: SlideContent[] = [];
  const lines = markdown.split('\n');
  
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // Skip empty lines
    if (!trimmedLine) {
      i++;
      continue;
    }
    
    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      elements.push({
        type: 'heading',
        level: headingMatch[1].length,
        text: headingMatch[2]
      });
      i++;
      continue;
    }
    
    // Horizontal rule
    if (/^[-*_]{3,}$/.test(trimmedLine)) {
      elements.push({ type: 'hr' });
      i++;
      continue;
    }
    
    // Code block
    if (trimmedLine.startsWith('```')) {
      const lang = trimmedLine.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push({
        type: 'code',
        language: lang,
        text: codeLines.join('\n')
      });
      i++;
      continue;
    }
    
    // Blockquote
    if (trimmedLine.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      elements.push({
        type: 'blockquote',
        text: quoteLines.join('\n')
      });
      continue;
    }
    
    // List (unordered or ordered)
    if (/^(\s*)[-*+]\s/.test(line) || /^(\s*)\d+\.\s/.test(line)) {
      const listItems: any[] = [];
      const initialIndent = line.search(/\S/);
      const isOrdered = /^\d+\./.test(trimmedLine);
      let blankLineCount = 0;
      
      while (i < lines.length && blankLineCount <= 1) {
        const currentLine = lines[i];
        const currentTrimmed = currentLine.trim();
        
        // Count consecutive blank lines
        if (!currentTrimmed) {
          blankLineCount++;
          i++;
          continue;
        }
        
        // Reset blank line count when we find content
        blankLineCount = 0;
        
        // Check if it's a list item (ordered or unordered)
        const unorderedMatch = currentLine.match(/^(\s*)[-*+]\s+(.*)$/);
        const orderedMatch = currentLine.match(/^(\s*)(\d+)\.\s+(.*)$/);
        
        if (unorderedMatch || orderedMatch) {
          const indent = unorderedMatch ? unorderedMatch[1].length : orderedMatch![1].length;
          const text = unorderedMatch ? unorderedMatch[2] : orderedMatch![3];
          
          // Calculate relative indent level
          const indentLevel = Math.floor((indent - initialIndent) / 2);
          
          listItems.push({
            text: text.trim(),
            indent: Math.max(0, indentLevel)
          });
          i++;
        } else if (currentLine.startsWith(' ') || currentLine.startsWith('\t')) {
          // Continuation of previous list item
          if (listItems.length > 0) {
            const lastItem = listItems[listItems.length - 1];
            lastItem.text += '\n' + currentTrimmed;
          }
          i++;
        } else {
          // Not a list item, stop processing
          break;
        }
      }
      
      if (listItems.length > 0) {
        elements.push({
          type: isOrdered ? 'orderedList' : 'list',
          items: listItems
        });
      }
      continue;
    }
    
    // Table
    if (line.includes('|') && i + 1 < lines.length && lines[i + 1].includes('|')) {
      const tableData = parseTable(lines, i);
      if (tableData.table) {
        elements.push(tableData.table);
        i = tableData.endIndex;
        continue;
      }
    }
    
    // Image (with support for various formats and attributes)
    const imageMatch = trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+)\)(?:\s*(?:=(\d+)x(\d+)|{([^}]+)}))?/);
    if (imageMatch) {
      const element: SlideContent = {
        type: 'image',
        alt: imageMatch[1] || '',
        src: imageMatch[2].trim()
      };
      
      // Handle size specification (=WIDTHxHEIGHT)
      if (imageMatch[3] && imageMatch[4]) {
        element.width = parseInt(imageMatch[3]);
        element.height = parseInt(imageMatch[4]);
      }
      
      // Handle attribute specification ({key=value ...})
      if (imageMatch[5]) {
        const attrs = imageMatch[5].split(/\s+/);
        attrs.forEach(attr => {
          const [key, value] = attr.split('=');
          if (key === 'width' && value) element.width = parseInt(value);
          if (key === 'height' && value) element.height = parseInt(value);
        });
      }
      
      elements.push(element);
      i++;
      continue;
    }
    
    // Math block
    if (trimmedLine.startsWith('$$')) {
      const mathLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('$$')) {
        mathLines.push(lines[i]);
        i++;
      }
      elements.push({
        type: 'math',
        text: mathLines.join('\n'),
        display: true
      });
      i++;
      continue;
    }
    
    // Paragraph (default)
    const paragraphLines: string[] = [];
    while (i < lines.length && lines[i].trim() && 
           !lines[i].trim().match(/^#{1,6}\s/) &&
           !lines[i].trim().match(/^[-*+]\s/) &&
           !lines[i].trim().match(/^\d+\.\s/) &&
           !lines[i].trim().startsWith('>') &&
           !lines[i].trim().startsWith('```') &&
           !lines[i].includes('|') &&
           !/^[-*_]{3,}$/.test(lines[i].trim())) {
      paragraphLines.push(lines[i]);
      i++;
    }
    
    if (paragraphLines.length > 0) {
      elements.push({
        type: 'paragraph',
        text: paragraphLines.join('\n')
      });
    }
  }
  
  return elements;
}

/**
 * Parse table from markdown lines
 */
function parseTable(lines: string[], startIndex: number): { table: SlideContent | null; endIndex: number } {
  let i = startIndex;
  const rows: any[] = [];
  let alignments: string[] = [];
  
  // Check if this is really a table (must have separator row)
  if (i + 1 >= lines.length || !lines[i + 1].includes('|')) {
    return { table: null, endIndex: startIndex + 1 };
  }
  
  // Validate separator row format
  const separatorRow = lines[i + 1];
  if (!/^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)*\|?\s*$/.test(separatorRow)) {
    return { table: null, endIndex: startIndex + 1 };
  }
  
  // Parse header row
  if (i < lines.length && lines[i].includes('|')) {
    const headerLine = lines[i];
    // Remove leading and trailing pipes if present
    const cleanedHeader = headerLine.replace(/^\s*\|/, '').replace(/\|\s*$/, '');
    const headerCells = cleanedHeader.split('|').map(cell => cell.trim());
    rows.push({ cells: headerCells, isHeader: true });
    i++;
  }
  
  // Parse separator row (defines alignments)
  if (i < lines.length && lines[i].includes('|')) {
    const cleanedSeparator = lines[i].replace(/^\s*\|/, '').replace(/\|\s*$/, '');
    const separatorCells = cleanedSeparator.split('|');
    alignments = separatorCells.map(cell => {
      const trimmed = cell.trim();
      if (trimmed.startsWith(':') && trimmed.endsWith(':')) return 'center';
      if (trimmed.endsWith(':')) return 'right';
      return 'left';
    });
    i++;
  }
  
  // Parse data rows
  while (i < lines.length && lines[i].includes('|')) {
    const dataLine = lines[i];
    // Skip if line is empty or just contains pipes
    if (!/[^|\s]/.test(dataLine)) {
      i++;
      continue;
    }
    
    const cleanedData = dataLine.replace(/^\s*\|/, '').replace(/\|\s*$/, '');
    const cells = cleanedData.split('|').map(cell => cell.trim());
    
    // Ensure all rows have the same number of columns
    if (rows.length > 0 && cells.length !== rows[0].cells.length) {
      // Pad or truncate to match header row
      const targetLength = rows[0].cells.length;
      while (cells.length < targetLength) cells.push('');
      if (cells.length > targetLength) cells.length = targetLength;
    }
    
    rows.push({ cells: cells, isHeader: false });
    i++;
  }
  
  if (rows.length > 0) {
    return {
      table: {
        type: 'table',
        rows: rows,
        alignments: alignments
      },
      endIndex: i
    };
  }
  
  return { table: null, endIndex: startIndex + 1 };
}