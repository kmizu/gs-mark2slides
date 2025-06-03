import { parseMarpMarkdown } from './parser';
import { THEMES } from './constants';
import { createSlide } from './slide-builder';

export interface ConversionResult {
  success: boolean;
  presentationId?: string;
  url?: string;
  slideCount?: number;
  title?: string;
  error?: string;
}

/**
 * Main conversion function called from the web interface
 */
export function convertMarpToSlides(markdown: string, customTitle?: string): ConversionResult {
  try {
    // Parse the Marp markdown
    const parsedData = parseMarpMarkdown(markdown);
    
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
    const theme = THEMES[themeName] || THEMES.default;
    
    // Add slides from parsed data
    parsedData.slides.forEach((slideData, index) => {
      createSlide(presentation as any, slideData, index, parsedData.metadata, theme);
    });
    
    return {
      success: true,
      presentationId: presentationId,
      url: presentation.getUrl(),
      slideCount: presentation.getSlides().length,
      title: presentationTitle
    };
    
  } catch (error) {
    console.error('Conversion error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}