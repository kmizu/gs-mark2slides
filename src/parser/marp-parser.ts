import { Marp } from '@marp-team/marp-core';
import * as fs from 'fs/promises';
import { Logger } from '../utils/logger';
import { ParsedPresentation, Slide, PresentationMetadata } from '../types';

export interface MarpParseResult {
  html: string | string[];
  css: string;
  comments: Array<[string, string]>;
}

export class MarpParser {
  private marp: Marp;
  private logger: Logger;

  constructor(logger: Logger) {
    this.marp = new Marp({
      html: true,
      emoji: {
        shortcode: true,
        unicode: true,
      },
    });
    this.logger = logger;
  }

  async parseFile(filePath: string): Promise<ParsedPresentation> {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      return this.parseContent(content);
    } catch (error) {
      this.logger.error(`Failed to read file: ${filePath}`, error);
      throw new Error(`Failed to read Marp file: ${error}`);
    }
  }

  parseContent(content: string): ParsedPresentation {
    this.logger.debug('Parsing Marp content');
    
    // Parse with htmlAsArray to get individual slides
    const result = this.marp.render(content, {
      htmlAsArray: true,
    }) as MarpParseResult;

    // Extract metadata from the Marp instance
    const marpInstance = this.marp as any;
    const frontMatter = marpInstance.themeSet?.getThemeProp(marpInstance.lastGlobalDirectives?.theme || 'default', 'meta') || {};
    
    // Extract global metadata
    const globalMetadata: PresentationMetadata = {
      marp: true,
      theme: marpInstance.lastGlobalDirectives?.theme,
      paginate: marpInstance.lastGlobalDirectives?.paginate,
      header: marpInstance.lastGlobalDirectives?.header,
      footer: marpInstance.lastGlobalDirectives?.footer,
      size: marpInstance.lastGlobalDirectives?.size,
      ...this.extractFrontMatter(content),
    };

    // Parse individual slides
    const slides: Slide[] = [];
    if (Array.isArray(result.html)) {
      result.html.forEach((slideHtml, index) => {
        const slideContent = this.extractContentFromHtml(slideHtml);
        const notes = this.extractNotesFromHtml(slideHtml);
        const metadata = this.extractSlideMetadata(slideHtml, result.comments[index]);
        
        slides.push({
          content: slideContent,
          notes: notes || undefined,
          metadata,
        });
      });
    } else {
      // Single slide case
      slides.push({
        content: this.extractContentFromHtml(result.html),
        notes: this.extractNotesFromHtml(result.html) || undefined,
        metadata: this.extractSlideMetadata(result.html, result.comments[0]),
      });
    }

    this.logger.info(`Parsed ${slides.length} slides`);
    return {
      slides,
      globalMetadata,
    };
  }

  private extractFrontMatter(content: string): Partial<PresentationMetadata> {
    const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontMatterMatch) return {};

    const frontMatter: any = {};
    const lines = frontMatterMatch[1].split('\n');
    
    lines.forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim();
        frontMatter[key.trim()] = value.replace(/^["']|["']$/g, '');
      }
    });

    return frontMatter;
  }

  private extractContentFromHtml(html: string): string {
    // Remove HTML tags but preserve text content
    // This is a simplified version - you might want to use a proper HTML parser
    return html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  private extractNotesFromHtml(html: string): string | null {
    // Extract speaker notes from HTML comments
    const notesMatch = html.match(/<!--\s*(.+?)\s*-->/s);
    return notesMatch ? notesMatch[1].trim() : null;
  }

  private extractSlideMetadata(html: string, comment?: [string, string]): any {
    const metadata: any = {};
    
    // Extract class from div
    const classMatch = html.match(/class="([^"]+)"/);
    if (classMatch) {
      metadata.class = classMatch[1];
    }

    // Extract background styles
    const styleMatch = html.match(/style="([^"]+)"/);
    if (styleMatch) {
      const style = styleMatch[1];
      const bgColorMatch = style.match(/background-color:\s*([^;]+)/);
      const bgImageMatch = style.match(/background-image:\s*url\(([^)]+)\)/);
      
      if (bgColorMatch) metadata.backgroundColor = bgColorMatch[1].trim();
      if (bgImageMatch) metadata.backgroundImage = bgImageMatch[1].trim();
    }

    // Add comment data if available
    if (comment) {
      metadata.comment = comment;
    }

    return Object.keys(metadata).length > 0 ? metadata : undefined;
  }
}