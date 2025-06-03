// Constants for layout and styling
export const SLIDE_WIDTH = 720;
export const SLIDE_HEIGHT = 540;
export const MARGIN = 50;
export const CONTENT_WIDTH = SLIDE_WIDTH - (MARGIN * 2);
export const DEFAULT_FONT_SIZE = 14;
export const HEADING_SIZES = [32, 28, 24, 20, 18, 16];
export const CODE_FONT = 'Courier New';
export const CODE_BACKGROUND = '#f5f5f5';
export const INLINE_CODE_BACKGROUND = '#e8e8e8';

// Theme definitions
export interface Theme {
  backgroundColor: string;
  textColor: string;
  headingColor: string;
  codeBackground: string;
  codeTextColor: string;
  linkColor: string;
  blockquoteColor: string;
  tableHeaderBg: string;
  tableAltRowBg: string;
}

export const THEMES: Record<string, Theme> = {
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