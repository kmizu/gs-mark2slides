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
      result.metadata = parseFrontmatter(frontmatterLines.join('\n'));
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
 * Parse frontmatter YAML (simplified)
 */
function parseFrontmatter(yaml: string): SlideMetadata {
  const metadata: SlideMetadata = {};
  const lines = yaml.split('\n');
  
  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      metadata[key] = value.replace(/^["']|["']$/g, '');
    }
  });
  
  return metadata;
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
    if (/^[-*+]\s/.test(trimmedLine) || /^\d+\.\s/.test(trimmedLine)) {
      const listItems: any[] = [];
      const isOrdered = /^\d+\./.test(trimmedLine);
      
      while (i < lines.length && (
        /^[-*+]\s/.test(lines[i].trim()) || 
        /^\d+\.\s/.test(lines[i].trim()) ||
        /^\s{2,}/.test(lines[i]) // Nested items
      )) {
        const itemLine = lines[i];
        const indent = itemLine.search(/\S/);
        const text = itemLine.replace(/^(\s*)[-*+]\s/, '').replace(/^(\s*)\d+\.\s/, '');
        
        listItems.push({
          text: text,
          indent: Math.floor(indent / 2)
        });
        i++;
      }
      
      elements.push({
        type: isOrdered ? 'orderedList' : 'list',
        items: listItems
      });
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
    
    // Image
    const imageMatch = trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+)\)(?:\s*=(\d+)x(\d+))?/);
    if (imageMatch) {
      elements.push({
        type: 'image',
        alt: imageMatch[1],
        src: imageMatch[2],
        width: imageMatch[3] ? parseInt(imageMatch[3]) : undefined,
        height: imageMatch[4] ? parseInt(imageMatch[4]) : undefined
      });
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
  
  // Parse header row
  if (i < lines.length && lines[i].includes('|')) {
    const headerCells = lines[i].split('|').filter(cell => cell.trim());
    rows.push({ cells: headerCells.map(cell => cell.trim()), isHeader: true });
    i++;
  }
  
  // Parse separator row (defines alignments)
  if (i < lines.length && lines[i].includes('|')) {
    const separatorCells = lines[i].split('|').filter(cell => cell.trim());
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
    const cells = lines[i].split('|').filter(cell => cell.trim());
    rows.push({ cells: cells.map(cell => cell.trim()), isHeader: false });
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