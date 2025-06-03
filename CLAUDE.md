# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**gs-mark2slides** - A tool for converting Marp (Markdown Presentation) files to Google Slides format.

This project has two deployment modes:
1. **Google Apps Script (GAS)** - TypeScript-based development that compiles to GAS
2. **Local CLI/Web Server** - For local development and testing

## Development Commands

### Google Apps Script Development

```bash
# Install dependencies
npm install

# Build GAS files from TypeScript
npm run build:gas

# Deploy to Google Apps Script
npm run gas:deploy

# Create new GAS project
npm run gas:create

# Open deployed GAS project
npm run gas:open
```

### Local Development

```bash
# Build TypeScript
npm run build

# Development mode (run without building)
npm run dev -- <marp-file>

# Run built version
npm start -- <marp-file>

# Link for global CLI usage
npm link

# Run the CLI
gs-mark2slides test.md -c credentials.json
```

## Project Structure

```
src/
├── gas/             # Google Apps Script TypeScript source
│   ├── index.ts     # GAS entry point
│   ├── converter.ts # Main conversion logic
│   ├── parser.ts    # Marp parsing
│   ├── elements/    # Slide element renderers
│   └── index.html   # Web UI template
├── index.ts         # CLI entry point
├── auth/            # Google authentication modules
├── parser/          # Marp parsing logic
├── converter/       # Marp to Google Slides conversion
├── api/            # Google Slides API wrapper
├── utils/          # Utilities (logger, etc.)
└── types/          # TypeScript type definitions

dist-gas/            # Compiled GAS output (after build:gas)
├── Code.gs          # Compiled TypeScript → GAS
├── index.html       # Processed HTML
└── appsscript.json  # GAS manifest
```

## Key Dependencies

- **@marp-team/marp-core**: Marp parser and renderer
- **googleapis**: Official Google APIs client
- **commander**: CLI framework
- **TypeScript**: Type safety and modern JavaScript features

## Implemented Architecture

1. **Auth Module** (`src/auth/`): Google authentication (OAuth2 & Service Account)
2. **Parser Module** (`src/parser/`): 
   - `marp-parser.ts`: Basic Marp parsing using marp-core
   - `advanced-marp-parser.ts`: Detailed markdown structure extraction
3. **Converter Module** (`src/converter/`): Maps Marp elements to Google Slides
4. **API Module** (`src/api/`): Google Slides API operations with batching
5. **CLI Interface** (`src/index.ts`): Commander-based CLI
6. **Main Converter** (`src/converter.ts`): Orchestrates the conversion process

## Google Slides API Notes

- Authentication will be needed (OAuth2 or Service Account)
- Rate limits should be considered
- Batch operations are more efficient than individual slide updates

## Marp Specific Features

Consider support for:
- Theme directives
- Page directives (paginate, header, footer)
- Background images and colors
- Custom CSS styling (may need mapping to Google Slides styles)

## Development Workflow

1. **Authentication Setup**
   - Store credentials.json in project root (gitignored)
   - Support both OAuth2 (for user accounts) and Service Account auth
   - Token storage in token.json (gitignored)

2. **Type Safety**
   - All modules should have proper TypeScript types
   - Use interfaces from src/types/index.ts
   - Enable strict mode in tsconfig.json

3. **Error Handling**
   - Use Logger class from src/utils/logger.ts
   - Provide clear error messages for common issues
   - Handle API rate limits gracefully