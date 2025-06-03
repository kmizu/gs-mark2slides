# gs-mark2slides GAS Version - Enhanced Features

The Google Apps Script version of gs-mark2slides now supports a comprehensive set of advanced features for converting Marp presentations to Google Slides.

## 🎨 Syntax Highlighting

The GAS version includes full syntax highlighting support for multiple programming languages:

### Supported Languages:
- **JavaScript** - Keywords, strings, numbers, comments, functions, operators
- **Python** - Keywords, strings, numbers, comments, functions, operators  
- **Java** - Keywords, strings, numbers, comments, class/method definitions
- **HTML** - Tags, attributes, strings, comments
- **CSS** - Selectors, properties, values, comments
- **SQL** - Keywords, strings, numbers, comments, functions

Each language has its own color scheme that adapts to the selected theme.

## 📝 Enhanced Markdown Support

### Inline Formatting:
- **Bold text** using `**text**` or `__text__`
- *Italic text* using `*text*` or `_text_`
- ~~Strikethrough~~ using `~~text~~`
- `Inline code` with background color
- [Clickable links](url) that open in Google Slides
- Combination of formats: ***bold italic***

### Lists:
- Nested lists with proper indentation
- Different bullet symbols for each level (•, ◦, ▪, ▫)
- Ordered lists with automatic numbering
- Mixed ordered and unordered lists

### Blockquotes:
- Styled with border and background
- Multi-line support
- Theme-aware coloring

## 📊 Enhanced Tables

Tables now support:
- Column alignment (left, center, right) using `:---`, `:---:`, `---:`
- Alternating row colors for better readability
- Header row styling
- Theme-aware colors
- Proper borders and spacing

## 🖼️ Advanced Image Support

### Features:
- Custom sizing using markdown syntax: `![alt](url =widthxheight)`
- Automatic centering
- Data URL support for embedded images
- Google Drive integration (using `drive:FILE_ID`)
- Fallback placeholders for missing images

## 🎭 Theme Support

Three built-in themes with comprehensive styling:

### Default Theme:
- Clean white background
- Professional appearance
- High contrast text

### Dark Theme:
- Dark background (#1e1e1e)
- Light text for readability
- Syntax highlighting optimized for dark mode

### Light Theme:
- Light gray background (#fafafa)
- Softer colors
- Modern appearance

## 🔢 Math Expression Support

- Inline math using `$expression$`
- Display math using `$$expression$$`
- Basic LaTeX notation support
- Styled with borders and background

## 🎨 Slide Customization

### Background Options:
- Solid colors: `<!-- _backgroundColor: #hexcolor -->`
- Background images: `<!-- _backgroundImage: url -->`
- Data URL images supported
- Per-slide customization

### Layout Features:
- Page numbers (when `paginate: true`)
- Headers and footers
- Speaker notes preservation
- Horizontal rules

## 🚀 Additional Features

### Code Features:
- Line wrapping for long code
- Syntax-aware highlighting
- Multiple code blocks per slide
- Language detection from fence syntax

### Text Processing:
- Smart quote handling
- Paragraph spacing
- Heading hierarchy (H1-H6)
- Automatic text sizing

### Performance:
- Efficient batch processing
- Error handling with detailed messages
- Preview updates in real-time
- No authentication required

## 📋 Usage Examples

### Syntax Highlighting:
```javascript
// This will be highlighted in Google Slides
function example() {
  const message = "Hello, World!";
  return message;
}
```

### Advanced Table:
```markdown
| Feature | Status | Notes |
|:--------|:------:|------:|
| Highlighting | ✅ | All languages |
| Themes | ✅ | 3 built-in |
| Math | ✅ | Basic support |
```

### Custom Slide:
```markdown
<!-- _backgroundColor: #f0f8ff -->
<!-- _theme: dark -->

## Custom styled slide
With background and theme!
```

## 🛠️ Technical Implementation

The enhanced features are implemented through:
- `SYNTAX_COLORS` object for language-specific highlighting
- `THEMES` object for comprehensive theme support
- `applyInlineFormatting()` for rich text processing
- `applySyntaxHighlighting()` for code highlighting
- Enhanced parsing in `parseSlideContent()`
- Smart element positioning and sizing

All features work seamlessly within Google Apps Script limitations while providing a rich conversion experience.