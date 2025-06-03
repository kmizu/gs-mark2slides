# Marp Parser Documentation

The `MarpParser` class provides functionality to parse Marp markdown files and extract structured data including slides, frontmatter, and metadata.

## Installation

The parser uses the `@marp-team/marp-core` package which is already installed in the project:

```bash
npm install @marp-team/marp-core
```

## Usage

```typescript
import { MarpParser } from './src/marp-parser';

const parser = new MarpParser();
const parsed = parser.parse(markdownString);
```

## API Reference

### `MarpParser`

#### Methods

##### `parse(markdown: string): ParsedMarpDocument`

Parses a Marp markdown document and returns structured data.

**Returns:**
```typescript
interface ParsedMarpDocument {
  frontmatter: MarpFrontmatter;
  slides: MarpSlide[];
  css: string;
  globalDirectives: Record<string, any>;
}
```

##### `getSlideHtml(markdown: string, slideIndex: number): string | null`

Gets the rendered HTML for a specific slide.

##### `getAvailableThemes(): string[]`

Returns an array of available theme names.

### Data Structures

#### `MarpSlide`
```typescript
interface MarpSlide {
  index: number;          // 0-based slide index
  content: string;        // Raw markdown content of the slide
  startLine: number;      // Starting line number in the original document
  endLine: number;        // Ending line number in the original document
  comments?: string[];    // HTML comments (speaker notes) in the slide
}
```

#### `MarpFrontmatter`
```typescript
interface MarpFrontmatter {
  theme?: string;
  paginate?: boolean;
  backgroundColor?: string;
  [key: string]: any;     // Additional frontmatter properties
}
```

## Features

### 1. Frontmatter Parsing
- Extracts YAML frontmatter from the beginning of the document
- Supports common Marp directives like `theme`, `paginate`, `backgroundColor`
- Handles boolean values correctly

### 2. Slide Extraction
- Splits the document into individual slides based on `---` separators
- Preserves the original line numbers for each slide
- Maintains the raw markdown content of each slide

### 3. Speaker Notes
- Extracts HTML comments as speaker notes
- Associates comments with their respective slides
- Supports multi-line comments

### 4. Rendering
- Generates CSS for the entire presentation
- Can render individual slides as HTML/SVG
- Provides access to global directives

### 5. Theme Support
- Lists all available themes (default, gaia, uncover)
- Applies theme-specific styling

## Example

```typescript
const markdown = `---
theme: gaia
paginate: true
---

# First Slide

Content here

---

## Second Slide

More content

<!-- Speaker notes here -->
`;

const parser = new MarpParser();
const result = parser.parse(markdown);

console.log(result.frontmatter); // { theme: 'gaia', paginate: true }
console.log(result.slides.length); // 2
console.log(result.slides[1].comments); // ['Speaker notes here']
```

## Integration with Google Slides

The parsed data can be used to:
1. Create one Google Slide per Marp slide
2. Apply theming based on frontmatter
3. Add speaker notes from HTML comments
4. Convert markdown content to Google Slides format

## Limitations

1. The simple YAML parser doesn't support complex YAML features (arrays, nested objects)
2. Advanced Marp features like custom CSS may need additional handling
3. Background images and special directives need separate processing