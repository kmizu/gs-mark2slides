/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 42:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.doGet = doGet;
/**
 * Entry point for web app
 */
function doGet() {
    return HtmlService.createHtmlOutputFromFile('index')
        .setTitle('gs-mark2slides - Convert Marp to Google Slides')
        .setWidth(1200)
        .setHeight(800);
}


/***/ }),

/***/ 149:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LANGUAGE_KEYWORDS = exports.SYNTAX_COLORS = void 0;
exports.SYNTAX_COLORS = {
    javascript: {
        keyword: '#c678dd',
        string: '#98c379',
        number: '#d19a66',
        comment: '#5c6370',
        function: '#61afef',
        operator: '#56b6c2'
    },
    python: {
        keyword: '#ff79c6',
        string: '#f1fa8c',
        number: '#bd93f9',
        comment: '#6272a4',
        function: '#50fa7b',
        operator: '#ff79c6'
    },
    java: {
        keyword: '#cc7832',
        string: '#6a8759',
        number: '#6897bb',
        comment: '#808080',
        function: '#ffc66d',
        operator: '#cc7832'
    },
    html: {
        tag: '#e06c75',
        attribute: '#d19a66',
        string: '#98c379',
        comment: '#5c6370'
    },
    css: {
        selector: '#d19a66',
        property: '#56b6c2',
        value: '#98c379',
        comment: '#5c6370'
    },
    sql: {
        keyword: '#c678dd',
        string: '#98c379',
        number: '#d19a66',
        comment: '#5c6370',
        function: '#61afef'
    }
};
// Language keywords for syntax highlighting
exports.LANGUAGE_KEYWORDS = {
    javascript: [
        'var', 'let', 'const', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
        'switch', 'case', 'break', 'continue', 'class', 'extends', 'new', 'this', 'super',
        'import', 'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'finally',
        'throw', 'typeof', 'instanceof', 'in', 'of', 'null', 'undefined', 'true', 'false'
    ],
    python: [
        'def', 'class', 'if', 'elif', 'else', 'for', 'while', 'return', 'import', 'from',
        'as', 'pass', 'break', 'continue', 'and', 'or', 'not', 'in', 'is', 'None', 'True',
        'False', 'try', 'except', 'finally', 'raise', 'with', 'yield', 'lambda', 'global',
        'nonlocal', 'assert', 'del'
    ],
    java: [
        'public', 'private', 'protected', 'static', 'final', 'class', 'interface', 'extends',
        'implements', 'void', 'int', 'long', 'double', 'float', 'boolean', 'char', 'byte',
        'short', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'default', 'break',
        'continue', 'return', 'new', 'this', 'super', 'try', 'catch', 'finally', 'throw',
        'throws', 'import', 'package', 'null', 'true', 'false'
    ],
    sql: [
        'SELECT', 'FROM', 'WHERE', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'AS',
        'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER',
        'DROP', 'INDEX', 'VIEW', 'PROCEDURE', 'FUNCTION', 'TRIGGER', 'AND', 'OR', 'NOT',
        'IN', 'EXISTS', 'BETWEEN', 'LIKE', 'IS', 'NULL', 'ORDER', 'BY', 'GROUP', 'HAVING',
        'UNION', 'ALL', 'DISTINCT', 'LIMIT', 'OFFSET'
    ]
};


/***/ }),

/***/ 169:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addList = addList;
const constants_1 = __webpack_require__(950);
/**
 * Add list element (ordered or unordered)
 */
function addList(slide, element, yPosition, theme) {
    if (!element.items || element.items.length === 0) {
        return yPosition;
    }
    const isOrdered = element.type === 'orderedList';
    const lineHeight = 20;
    const indentSize = 20;
    let currentY = yPosition;
    element.items.forEach((item, index) => {
        const indent = (item.indent || 0) * indentSize;
        const bullet = isOrdered ? `${index + 1}.` : getBulletSymbol(item.indent || 0);
        const text = `${bullet} ${item.text}`;
        const textBox = slide.insertTextBox(text, constants_1.MARGIN + indent, currentY, constants_1.CONTENT_WIDTH - indent, lineHeight);
        const textRange = textBox.getText();
        textRange.getTextStyle().setFontSize(constants_1.DEFAULT_FONT_SIZE);
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
function getBulletSymbol(indent) {
    const bullets = ['•', '◦', '▪', '▫'];
    return bullets[indent % bullets.length];
}


/***/ }),

/***/ 181:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addTable = addTable;
const constants_1 = __webpack_require__(950);
/**
 * Add table element with enhanced styling
 */
function addTable(slide, element, yPosition, theme) {
    if (!element.rows || element.rows.length === 0) {
        return yPosition;
    }
    const numRows = element.rows.length;
    const numCols = element.rows[0].cells.length;
    const cellHeight = 30;
    const tableHeight = numRows * cellHeight;
    const tableWidth = constants_1.CONTENT_WIDTH;
    // Create table
    const table = slide.insertTable(numRows, numCols, constants_1.MARGIN, yPosition, tableWidth, tableHeight);
    // Populate table with styling
    element.rows.forEach((row, rowIdx) => {
        row.cells.forEach((cellText, colIdx) => {
            const cell = table.getCell(rowIdx, colIdx);
            const textRange = cell.getText();
            textRange.setText(cellText || '');
            textRange.getTextStyle().setFontSize(12);
            textRange.getTextStyle().setForegroundColor(theme.textColor);
            // Apply alignment
            if (element.alignments && element.alignments[colIdx]) {
                const alignment = element.alignments[colIdx];
                switch (alignment) {
                    case 'center':
                        textRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
                        break;
                    case 'right':
                        textRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.END);
                        break;
                    default:
                        textRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.START);
                }
            }
            // Style header row
            if (row.isHeader) {
                cell.getFill().setSolidFill(theme.tableHeaderBg);
                textRange.getTextStyle().setBold(true);
            }
            else if (rowIdx % 2 === 0) {
                // Alternating row colors
                cell.getFill().setSolidFill(theme.tableAltRowBg);
            }
        });
    });
    return yPosition + tableHeight;
}


/***/ }),

/***/ 212:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addImage = addImage;
const constants_1 = __webpack_require__(950);
/**
 * Add image element
 */
function addImage(slide, element, yPosition) {
    if (!element.src) {
        return yPosition;
    }
    try {
        // Default dimensions
        let width = element.width || 400;
        let height = element.height || 300;
        // Ensure image fits within slide boundaries
        const maxWidth = constants_1.SLIDE_WIDTH - (constants_1.MARGIN * 2);
        const maxHeight = constants_1.SLIDE_HEIGHT - yPosition - constants_1.MARGIN;
        if (width > maxWidth) {
            const scale = maxWidth / width;
            width = maxWidth;
            height = height * scale;
        }
        if (height > maxHeight) {
            const scale = maxHeight / height;
            height = maxHeight;
            width = width * scale;
        }
        // Center the image horizontally
        const xPosition = (constants_1.SLIDE_WIDTH - width) / 2;
        // Insert image
        const image = slide.insertImage(element.src, xPosition, yPosition, width, height);
        // Add alt text as title if available
        if (element.alt) {
            image.setTitle(element.alt);
        }
        return yPosition + height;
    }
    catch (error) {
        console.error('Failed to insert image:', error);
        // Return original position if image insertion fails
        return yPosition;
    }
}


/***/ }),

/***/ 336:
/***/ ((__unused_webpack_module, exports) => {


// Parser module - no need to import Theme here
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseMarpMarkdown = parseMarpMarkdown;
/**
 * Parse Marp markdown into structured data
 */
function parseMarpMarkdown(markdown) {
    const result = {
        metadata: {},
        slides: []
    };
    const lines = markdown.split('\n');
    let i = 0;
    // Check for frontmatter
    if (lines[0] === '---') {
        const frontmatterLines = [];
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
    let currentSlide = null;
    let currentContent = [];
    let speakerNotes = [];
    let inSpeakerNotes = false;
    let inCodeBlock = false;
    let codeBlockLang = '';
    let codeBlockContent = [];
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
            }
            else {
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
            }
            else {
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
        }
        else {
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
function parseFrontmatter(yaml) {
    const metadata = {};
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
function parseSlideContent(markdown) {
    const elements = [];
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
            const codeLines = [];
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
            const quoteLines = [];
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
            const listItems = [];
            const isOrdered = /^\d+\./.test(trimmedLine);
            while (i < lines.length && (/^[-*+]\s/.test(lines[i].trim()) ||
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
            const mathLines = [];
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
        const paragraphLines = [];
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
function parseTable(lines, startIndex) {
    let i = startIndex;
    const rows = [];
    let alignments = [];
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
            if (trimmed.startsWith(':') && trimmed.endsWith(':'))
                return 'center';
            if (trimmed.endsWith(':'))
                return 'right';
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


/***/ }),

/***/ 359:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addParagraph = addParagraph;
const constants_1 = __webpack_require__(950);
/**
 * Add paragraph with inline formatting
 */
function addParagraph(slide, element, yPosition, theme) {
    const text = element.text || '';
    const lines = text.split('\n');
    const estimatedHeight = lines.length * 20 + 10;
    const textBox = slide.insertTextBox('', constants_1.MARGIN, yPosition, constants_1.CONTENT_WIDTH, estimatedHeight);
    const textRange = textBox.getText();
    // Parse and apply inline formatting
    applyInlineFormatting(textRange, text, theme);
    // Set default style
    textRange.getTextStyle().setFontSize(constants_1.DEFAULT_FONT_SIZE);
    textRange.getTextStyle().setForegroundColor(theme.textColor);
    return yPosition + estimatedHeight;
}
/**
 * Apply inline formatting (bold, italic, code, links)
 */
function applyInlineFormatting(textRange, text, theme) {
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
        }
        catch (e) {
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
            }
            catch (e) {
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
            range.getTextStyle().setBackgroundColor(constants_1.INLINE_CODE_BACKGROUND);
        }
        catch (e) {
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
        }
        catch (e) {
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
        }
        catch (e) {
            console.error('Strikethrough formatting error:', e);
        }
        offset += 4; // Remove ~~ ~~
    }
}


/***/ }),

/***/ 388:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createSlide = createSlide;
const constants_1 = __webpack_require__(950);
const code_1 = __webpack_require__(836);
const table_1 = __webpack_require__(181);
const list_1 = __webpack_require__(169);
const blockquote_1 = __webpack_require__(746);
const image_1 = __webpack_require__(212);
const math_1 = __webpack_require__(471);
const paragraph_1 = __webpack_require__(359);
/**
 * Create a slide from parsed data
 */
function createSlide(presentation, slideData, index, globalMetadata, theme) {
    const slide = presentation.appendSlide();
    // Apply slide-specific background
    if (slideData.metadata.backgroundColor) {
        slide.getBackground().setSolidFill(slideData.metadata.backgroundColor);
    }
    else {
        slide.getBackground().setSolidFill(theme.backgroundColor);
    }
    // Apply background image if specified
    if (slideData.metadata.backgroundImage) {
        try {
            const imageUrl = slideData.metadata.backgroundImage.replace('url(', '').replace(')', '').trim();
            slide.getBackground().setPictureFill(imageUrl);
        }
        catch (e) {
            console.error('Failed to set background image:', e);
        }
    }
    // Add speaker notes
    if (slideData.notes) {
        slide.getNotesPage().getSpeakerNotesShape().getText().setText(slideData.notes);
    }
    // Layout content elements
    let yPosition = constants_1.MARGIN;
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
function addElement(slide, element, yPosition, theme) {
    switch (element.type) {
        case 'heading':
            return addHeading(slide, element, yPosition, theme);
        case 'paragraph':
            return (0, paragraph_1.addParagraph)(slide, element, yPosition, theme);
        case 'list':
        case 'orderedList':
            return (0, list_1.addList)(slide, element, yPosition, theme);
        case 'code':
            return (0, code_1.addCodeBlock)(slide, element, yPosition, theme);
        case 'table':
            return (0, table_1.addTable)(slide, element, yPosition, theme);
        case 'blockquote':
            return (0, blockquote_1.addBlockquote)(slide, element, yPosition, theme);
        case 'image':
            return (0, image_1.addImage)(slide, element, yPosition);
        case 'math':
            return (0, math_1.addMathExpression)(slide, element, yPosition, theme);
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
function addHeading(slide, element, yPosition, theme) {
    const level = element.level || 1;
    const fontSize = constants_1.HEADING_SIZES[level - 1] || constants_1.DEFAULT_FONT_SIZE;
    const height = fontSize + 10;
    const textBox = slide.insertTextBox(element.text || '', constants_1.MARGIN, yPosition, constants_1.CONTENT_WIDTH, height);
    const textRange = textBox.getText();
    textRange.getTextStyle().setFontSize(fontSize);
    textRange.getTextStyle().setBold(true);
    textRange.getTextStyle().setForegroundColor(theme.headingColor);
    return yPosition + height;
}
/**
 * Add horizontal rule
 */
function addHorizontalRule(slide, yPosition, _theme) {
    const line = slide.insertLine(SlidesApp.LineCategory.STRAIGHT, constants_1.MARGIN, yPosition + 10, constants_1.SLIDE_WIDTH - constants_1.MARGIN, yPosition + 10);
    line.setWeight(1);
    // Note: Line color setting may vary based on API version
    return yPosition + 20;
}
/**
 * Add page number
 */
function addPageNumber(slide, pageNumber, theme) {
    const textBox = slide.insertTextBox(pageNumber.toString(), constants_1.SLIDE_WIDTH - 80, constants_1.SLIDE_HEIGHT - 40, 60, 30);
    textBox.getText().getTextStyle().setFontSize(12);
    textBox.getText().getTextStyle().setForegroundColor(theme.textColor);
    textBox.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.END);
}
/**
 * Add header
 */
function addHeader(slide, headerText, theme) {
    const textBox = slide.insertTextBox(headerText, constants_1.MARGIN, 10, constants_1.CONTENT_WIDTH, 30);
    textBox.getText().getTextStyle().setFontSize(10);
    textBox.getText().getTextStyle().setForegroundColor(theme.textColor);
    textBox.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
}
/**
 * Add footer
 */
function addFooter(slide, footerText, theme) {
    const textBox = slide.insertTextBox(footerText, constants_1.MARGIN, constants_1.SLIDE_HEIGHT - 35, constants_1.CONTENT_WIDTH, 25);
    textBox.getText().getTextStyle().setFontSize(10);
    textBox.getText().getTextStyle().setForegroundColor(theme.textColor);
    textBox.getText().getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
}


/***/ }),

/***/ 471:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addMathExpression = addMathExpression;
const constants_1 = __webpack_require__(950);
/**
 * Add math expression (basic rendering)
 * Note: Google Slides doesn't have native LaTeX support,
 * so this is a simplified representation
 */
function addMathExpression(slide, element, yPosition, theme) {
    const height = element.display ? 60 : 30;
    const mathText = element.text || '';
    // Create a text box for the math expression
    const textBox = slide.insertTextBox(mathText, constants_1.MARGIN, yPosition, constants_1.CONTENT_WIDTH, height);
    const textRange = textBox.getText();
    textRange.getTextStyle().setFontSize(element.display ? 18 : constants_1.DEFAULT_FONT_SIZE);
    textRange.getTextStyle().setFontFamily('Cambria Math'); // Use math-friendly font
    textRange.getTextStyle().setItalic(true);
    textRange.getTextStyle().setForegroundColor(theme.textColor);
    if (element.display) {
        // Center display math
        textRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
    }
    return yPosition + height;
}


/***/ }),

/***/ 483:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


// Entry point for Google Apps Script
// This file will be compiled to Code.gs
Object.defineProperty(exports, "__esModule", ({ value: true }));
const webapp_1 = __webpack_require__(42);
const converter_1 = __webpack_require__(991);
const ui_1 = __webpack_require__(761);
// Export functions to global scope for GAS
(function (global) {
    global.doGet = webapp_1.doGet;
    global.convertMarpToSlides = converter_1.convertMarpToSlides;
    global.openSidebar = ui_1.openSidebar;
    // Test function
    global.testFunction = function () {
        console.log("Test function called");
        return { success: true, message: "Test successful" };
    };
})(this);


/***/ }),

/***/ 746:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addBlockquote = addBlockquote;
const constants_1 = __webpack_require__(950);
/**
 * Add blockquote element with enhanced styling
 */
function addBlockquote(slide, element, yPosition, theme) {
    const text = element.text || '';
    const lines = text.split('\n');
    const height = lines.length * 20 + 20;
    // Create background shape for quote
    const quoteBackground = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, constants_1.MARGIN + 10, yPosition, constants_1.CONTENT_WIDTH - 20, height);
    quoteBackground.getFill().setSolidFill('#f9f9f9');
    quoteBackground.getBorder().setTransparent();
    // Add quote text
    const textBox = slide.insertTextBox('', constants_1.MARGIN + 25, yPosition + 10, constants_1.CONTENT_WIDTH - 35, height - 20);
    const textRange = textBox.getText();
    // Support multi-line blockquotes
    textRange.setText(text);
    textRange.getTextStyle().setFontSize(constants_1.DEFAULT_FONT_SIZE);
    textRange.getTextStyle().setItalic(true);
    textRange.getTextStyle().setForegroundColor(theme.blockquoteColor);
    // Add quote bar
    const quoteLine = slide.insertLine(SlidesApp.LineCategory.STRAIGHT, constants_1.MARGIN + 15, yPosition + 5, constants_1.MARGIN + 15, yPosition + height - 5);
    quoteLine.setWeight(3);
    // Note: Line color setting may vary based on API version
    return yPosition + height;
}


/***/ }),

/***/ 761:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.openSidebar = openSidebar;
/**
 * Open the conversion sidebar in Google Slides
 */
function openSidebar() {
    const html = HtmlService.createHtmlOutputFromFile('index')
        .setTitle('gs-mark2slides')
        .setWidth(300);
    SlidesApp.getUi().showSidebar(html);
}


/***/ }),

/***/ 836:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.addCodeBlock = addCodeBlock;
const constants_1 = __webpack_require__(950);
const syntax_highlighting_1 = __webpack_require__(149);
/**
 * Add code block with syntax highlighting
 */
function addCodeBlock(slide, element, yPosition, theme) {
    const code = element.text || '';
    const language = element.language || '';
    const lines = code.split('\n');
    const lineHeight = 16;
    const padding = 15;
    const height = lines.length * lineHeight + padding * 2;
    // Create background shape
    const codeBackground = slide.insertShape(SlidesApp.ShapeType.RECTANGLE, constants_1.MARGIN, yPosition, constants_1.CONTENT_WIDTH, height);
    codeBackground.getFill().setSolidFill(theme.codeBackground);
    codeBackground.getBorder().setTransparent();
    // Add code text with syntax highlighting
    const textBox = slide.insertTextBox('', constants_1.MARGIN + padding, yPosition + padding, constants_1.CONTENT_WIDTH - padding * 2, height - padding * 2);
    const textRange = textBox.getText();
    // Apply syntax highlighting
    if (language && syntax_highlighting_1.SYNTAX_COLORS[language]) {
        const highlightedText = applySyntaxHighlighting(code, language);
        textRange.setText(highlightedText.text);
        // Apply color styles
        highlightedText.styles.forEach(style => {
            const range = textRange.getRange(style.start, style.end);
            range.getTextStyle().setForegroundColor(style.color);
        });
    }
    else {
        textRange.setText(code);
    }
    // Set font style
    textRange.getTextStyle().setFontFamily(constants_1.CODE_FONT);
    textRange.getTextStyle().setFontSize(12);
    if (!language || !syntax_highlighting_1.SYNTAX_COLORS[language]) {
        textRange.getTextStyle().setForegroundColor(theme.codeTextColor);
    }
    return yPosition + height;
}
/**
 * Apply syntax highlighting to code
 */
function applySyntaxHighlighting(code, language) {
    const colors = syntax_highlighting_1.SYNTAX_COLORS[language];
    const keywords = syntax_highlighting_1.LANGUAGE_KEYWORDS[language] || [];
    const styles = [];
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
        }
        else if (language === 'python') {
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


/***/ }),

/***/ 950:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.THEMES = exports.INLINE_CODE_BACKGROUND = exports.CODE_BACKGROUND = exports.CODE_FONT = exports.HEADING_SIZES = exports.DEFAULT_FONT_SIZE = exports.CONTENT_WIDTH = exports.MARGIN = exports.SLIDE_HEIGHT = exports.SLIDE_WIDTH = void 0;
// Constants for layout and styling
exports.SLIDE_WIDTH = 720;
exports.SLIDE_HEIGHT = 540;
exports.MARGIN = 50;
exports.CONTENT_WIDTH = exports.SLIDE_WIDTH - (exports.MARGIN * 2);
exports.DEFAULT_FONT_SIZE = 14;
exports.HEADING_SIZES = [32, 28, 24, 20, 18, 16];
exports.CODE_FONT = 'Courier New';
exports.CODE_BACKGROUND = '#f5f5f5';
exports.INLINE_CODE_BACKGROUND = '#e8e8e8';
exports.THEMES = {
    default: {
        backgroundColor: '#ffffff',
        textColor: '#333333',
        headingColor: '#000000',
        codeBackground: '#f5f5f5',
        codeTextColor: '#333333',
        linkColor: '#0066cc',
        blockquoteColor: '#666666',
        tableHeaderBg: '#f0f0f0',
        tableAltRowBg: '#f9f9f9'
    },
    dark: {
        backgroundColor: '#1e1e1e',
        textColor: '#e0e0e0',
        headingColor: '#ffffff',
        codeBackground: '#2d2d2d',
        codeTextColor: '#f8f8f2',
        linkColor: '#66d9ef',
        blockquoteColor: '#999999',
        tableHeaderBg: '#333333',
        tableAltRowBg: '#2a2a2a'
    },
    light: {
        backgroundColor: '#fafafa',
        textColor: '#444444',
        headingColor: '#222222',
        codeBackground: '#f0f0f0',
        codeTextColor: '#444444',
        linkColor: '#0080ff',
        blockquoteColor: '#777777',
        tableHeaderBg: '#e0e0e0',
        tableAltRowBg: '#f5f5f5'
    }
};


/***/ }),

/***/ 991:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.convertMarpToSlides = convertMarpToSlides;
const parser_1 = __webpack_require__(336);
const constants_1 = __webpack_require__(950);
const slide_builder_1 = __webpack_require__(388);
/**
 * Main conversion function called from the web interface
 */
function convertMarpToSlides(markdown, customTitle) {
    try {
        // Parse the Marp markdown
        const parsedData = (0, parser_1.parseMarpMarkdown)(markdown);
        // Use custom title if provided, otherwise use metadata title or default
        const presentationTitle = customTitle || parsedData.metadata.title || 'Converted from Marp';
        // Create a new presentation
        const presentation = SlidesApp.create(presentationTitle);
        const presentationId = presentation.getId();
        // Remove the default slide
        const slides = presentation.getSlides();
        if (slides.length > 0) {
            slides[0].remove();
        }
        // Apply theme
        const themeName = parsedData.metadata.theme || 'default';
        const theme = constants_1.THEMES[themeName] || constants_1.THEMES.default;
        // Add slides from parsed data
        parsedData.slides.forEach((slideData, index) => {
            (0, slide_builder_1.createSlide)(presentation, slideData, index, parsedData.metadata, theme);
        });
        return {
            success: true,
            presentationId: presentationId,
            url: presentation.getUrl(),
            slideCount: presentation.getSlides().length,
            title: presentationTitle
        };
    }
    catch (error) {
        console.error('Conversion error:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : String(error)
        };
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(483);
/******/ 	var __webpack_export_target__ = this;
/******/ 	for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;

// Global function declarations for Google Apps Script
function doGet() {
  return this.doGet.apply(this, arguments);
}

function convertMarpToSlides(markdown, customTitle) {
  return this.convertMarpToSlides.apply(this, arguments);
}

function openSidebar() {
  return this.openSidebar.apply(this, arguments);
}

function testFunction() {
  return this.testFunction.apply(this, arguments);
}
