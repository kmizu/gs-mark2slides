import { MarpParser } from '../src/marp-parser';
import * as fs from 'fs';
import * as path from 'path';

// Example: Parse a Marp markdown file
async function parseExample() {
  const parser = new MarpParser();
  
  // Read the example Marp file
  const markdownPath = path.join(__dirname, 'example.md');
  const markdown = fs.readFileSync(markdownPath, 'utf-8');
  
  // Parse the document
  const parsed = parser.parse(markdown);
  
  console.log('=== Parsed Marp Document ===\n');
  
  // Display frontmatter
  console.log('Frontmatter:');
  console.log(JSON.stringify(parsed.frontmatter, null, 2));
  
  // Display global directives
  console.log('\nGlobal Directives:');
  console.log(JSON.stringify(parsed.globalDirectives, null, 2));
  
  // Display slides
  console.log(`\nTotal Slides: ${parsed.slides.length}`);
  
  parsed.slides.forEach((slide) => {
    console.log(`\n--- Slide ${slide.index + 1} ---`);
    console.log(`Lines: ${slide.startLine}-${slide.endLine}`);
    
    if (slide.comments && slide.comments.length > 0) {
      console.log('Speaker Notes:');
      slide.comments.forEach(comment => {
        console.log(`  ${comment}`);
      });
    }
    
    console.log('\nContent:');
    console.log(slide.content);
  });
  
  // Save individual slide HTML if needed
  console.log('\n=== Generating Individual Slide HTML ===');
  parsed.slides.forEach((slide) => {
    const slideHtml = parser.getSlideHtml(markdown, slide.index);
    if (slideHtml) {
      console.log(`Slide ${slide.index + 1} HTML size: ${slideHtml.length} bytes`);
    }
  });
  
  // Show available themes
  console.log('\n=== Available Themes ===');
  console.log(parser.getAvailableThemes().join(', '));
}

// Run the example
parseExample().catch(console.error);