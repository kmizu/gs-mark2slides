import { Marp } from '@marp-team/marp-core';

export interface MarpSlide {
  index: number;
  content: string;
  startLine: number;
  endLine: number;
  comments?: string[];
}

export interface MarpFrontmatter {
  theme?: string;
  paginate?: boolean;
  backgroundColor?: string;
  [key: string]: any;
}

export interface ParsedMarpDocument {
  frontmatter: MarpFrontmatter;
  slides: MarpSlide[];
  css: string;
  globalDirectives: Record<string, any>;
}

export class MarpParser {
  private marp: Marp;

  constructor() {
    this.marp = new Marp();
  }

  /**
   * Parse a Marp markdown document and extract slides with metadata
   */
  parse(markdown: string): ParsedMarpDocument {
    // Render to get CSS and comments
    const renderResult = this.marp.render(markdown, { htmlAsArray: true });
    
    // Extract frontmatter and slides
    const { frontmatter, slides } = this.extractSlides(markdown);
    
    // Add comments to slides
    if (Array.isArray(renderResult.comments)) {
      renderResult.comments.forEach((comments, index) => {
        if (slides[index] && comments.length > 0) {
          slides[index].comments = comments;
        }
      });
    }
    
    // Get global directives (using bracket notation to access protected property)
    const globalDirectives = (this.marp as any)['lastGlobalDirectives'] || {};
    
    return {
      frontmatter,
      slides,
      css: renderResult.css,
      globalDirectives
    };
  }

  /**
   * Extract frontmatter and slides from markdown
   */
  private extractSlides(markdown: string): {
    frontmatter: MarpFrontmatter;
    slides: MarpSlide[];
  } {
    const lines = markdown.split('\n');
    let frontmatter: MarpFrontmatter = {};
    let contentStartLine = 0;
    
    // Extract frontmatter
    if (lines[0] === '---') {
      const endIndex = lines.indexOf('---', 1);
      if (endIndex > 0) {
        contentStartLine = endIndex + 1;
        
        // Parse frontmatter
        const frontmatterContent = lines.slice(1, endIndex).join('\n');
        frontmatter = this.parseFrontmatter(frontmatterContent);
      }
    }
    
    // Find slide separators
    const slides: MarpSlide[] = [];
    const contentLines = lines.slice(contentStartLine);
    const separatorIndices: number[] = [];
    
    // Find all separator lines
    contentLines.forEach((line, index) => {
      if (line.trim() === '---') {
        separatorIndices.push(index);
      }
    });
    
    // Extract slides based on separators
    let lastIndex = 0;
    
    separatorIndices.forEach((sepIndex) => {
      const slideContent = contentLines.slice(lastIndex, sepIndex).join('\n').trim();
      if (slideContent) {
        slides.push({
          index: slides.length,
          content: slideContent,
          startLine: contentStartLine + lastIndex,
          endLine: contentStartLine + sepIndex - 1
        });
      }
      lastIndex = sepIndex + 1;
    });
    
    // Add the last slide
    const lastSlideContent = contentLines.slice(lastIndex).join('\n').trim();
    if (lastSlideContent) {
      slides.push({
        index: slides.length,
        content: lastSlideContent,
        startLine: contentStartLine + lastIndex,
        endLine: lines.length - 1
      });
    }
    
    return { frontmatter, slides };
  }

  /**
   * Simple YAML frontmatter parser
   */
  private parseFrontmatter(content: string): MarpFrontmatter {
    const frontmatter: MarpFrontmatter = {};
    const lines = content.split('\n');
    
    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed && trimmed.includes(':')) {
        const colonIndex = trimmed.indexOf(':');
        const key = trimmed.substring(0, colonIndex).trim();
        const value = trimmed.substring(colonIndex + 1).trim();
        
        // Parse boolean values
        if (value === 'true') {
          frontmatter[key] = true;
        } else if (value === 'false') {
          frontmatter[key] = false;
        } else {
          // Remove quotes if present
          frontmatter[key] = value.replace(/^["']|["']$/g, '');
        }
      }
    });
    
    return frontmatter;
  }

  /**
   * Get the raw HTML for a specific slide
   */
  getSlideHtml(markdown: string, slideIndex: number): string | null {
    const result = this.marp.render(markdown, { htmlAsArray: true });
    if (Array.isArray(result.html) && result.html[slideIndex]) {
      return result.html[slideIndex];
    }
    return null;
  }

  /**
   * Get all themes available
   */
  getAvailableThemes(): string[] {
    return Array.from(this.marp.themeSet.themes()).map(theme => theme.name);
  }
}