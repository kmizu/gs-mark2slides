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
  console.log('convertMarpToSlides called with markdown length:', markdown.length, 'customTitle:', customTitle);
  
  try {
    // Parse the Marp markdown
    console.log('Parsing markdown...');
    const parsedData = parseMarpMarkdown(markdown);
    console.log('Parsed data:', JSON.stringify({
      metadata: parsedData.metadata,
      slideCount: parsedData.slides.length
    }));
    
    // Use custom title if provided, otherwise use metadata title or default
    const presentationTitle = customTitle || parsedData.metadata.title || 'Converted from Marp';
    console.log('Presentation title:', presentationTitle);
    
    // Create a new presentation
    console.log('Creating presentation...');
    const presentation = SlidesApp.create(presentationTitle);
    const presentationId = presentation.getId();
    console.log('Created presentation with ID:', presentationId);
    
    // Remove the default slide
    const slides = presentation.getSlides();
    console.log('Initial slide count:', slides.length);
    if (slides.length > 0) {
      slides[0].remove();
      console.log('Removed default slide');
    }
    
    // Apply theme
    const themeName = parsedData.metadata.theme || 'default';
    const theme = THEMES[themeName] || THEMES.default;
    console.log('Using theme:', themeName);
    
    // Add slides from parsed data
    console.log('Adding slides...');
    parsedData.slides.forEach((slideData, index) => {
      console.log(`Creating slide ${index + 1}/${parsedData.slides.length}`);
      createSlide(presentation as any, slideData, index, parsedData.metadata, theme);
    });
    
    const finalSlideCount = presentation.getSlides().length;
    console.log('Final slide count:', finalSlideCount);
    
    const result = {
      success: true,
      presentationId: presentationId,
      url: presentation.getUrl(),
      slideCount: finalSlideCount,
      title: presentationTitle
    };
    
    console.log('Conversion successful:', JSON.stringify(result));
    return result;
    
  } catch (error) {
    console.error('Conversion error:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error)
    };
  }
}