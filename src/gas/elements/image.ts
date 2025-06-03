import { SlideContent } from '../parser';
import { SLIDE_WIDTH, SLIDE_HEIGHT, MARGIN } from '../constants';

/**
 * Add image element
 */
export function addImage(
  slide: GoogleAppsScript.Slides.Slide,
  element: SlideContent,
  yPosition: number
): number {
  if (!element.src) {
    return yPosition;
  }
  
  try {
    // Default dimensions
    let width = element.width || 400;
    let height = element.height || 300;
    
    // Ensure image fits within slide boundaries
    const maxWidth = SLIDE_WIDTH - (MARGIN * 2);
    const maxHeight = SLIDE_HEIGHT - yPosition - MARGIN;
    
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
    const xPosition = (SLIDE_WIDTH - width) / 2;
    
    // Insert image
    const image = slide.insertImage(element.src, xPosition, yPosition, width, height);
    
    // Add alt text as title if available
    if (element.alt) {
      image.setTitle(element.alt);
    }
    
    return yPosition + height;
  } catch (error) {
    console.error('Failed to insert image:', error);
    // Return original position if image insertion fails
    return yPosition;
  }
}