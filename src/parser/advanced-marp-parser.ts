import { Marp } from '@marp-team/marp-core';
import { marked } from 'marked';
import * as yaml from 'yaml';
import * as fs from 'fs/promises';
import { Logger } from '../utils/logger';

export interface ParsedSlide {
  content: ParsedContent[];
  rawMarkdown: string;
  metadata: SlideMetadata;
  notes?: string;
}

export interface ParsedContent {
  type: 'heading' | 'paragraph' | 'list' | 'code' | 'image' | 'table' | 'blockquote' | 'hr';
  level?: number; // For headings
  text?: string;
  items?: ParsedListItem[]; // For lists
  src?: string; // For images
  alt?: string; // For images
  lang?: string; // For code blocks
  rows?: string[][]; // For tables
  children?: ParsedContent[]; // For nested content
}

export interface ParsedListItem {
  text: string;
  checked?: boolean; // For task lists
  subItems?: ParsedListItem[];
}

export interface SlideMetadata {
  class?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  color?: string;
  paginate?: boolean;
  header?: string;
  footer?: string;
  theme?: string;
  transition?: string;
}

export interface ParsedMarpPresentation {
  slides: ParsedSlide[];
  globalMetadata: GlobalMetadata;
  theme?: string;
  css?: string;
}

export interface GlobalMetadata {
  title?: string;
  description?: string;
  author?: string;
  keywords?: string[];
  marp: boolean;
  theme?: string;
  paginate?: boolean;
  size?: string;
  header?: string;
  footer?: string;
  [key: string]: any;
}

export class AdvancedMarpParser {
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

  async parseFile(filePath: string): Promise<ParsedMarpPresentation> {
    const content = await fs.readFile(filePath, 'utf8');
    return this.parseContent(content);
  }

  parseContent(content: string): ParsedMarpPresentation {
    // Extract frontmatter
    const { frontmatter, content: mainContent } = this.extractFrontmatter(content);
    
    // Split into slides
    const slideContents = this.splitIntoSlides(mainContent);
    
    // Render with Marp to get HTML and CSS
    const marpResult = this.marp.render(content, { htmlAsArray: true });
    const htmlSlides = Array.isArray(marpResult.html) ? marpResult.html : [marpResult.html];
    
    // Parse each slide
    const slides: ParsedSlide[] = slideContents.map((slideContent, index) => {
      const metadata = this.extractSlideMetadata(slideContent);
      const cleanContent = this.removeDirectives(slideContent);
      const notes = this.extractNotes(cleanContent);
      const contentWithoutNotes = this.removeNotes(cleanContent);
      const parsedContent = this.parseMarkdownContent(contentWithoutNotes);
      
      return {
        content: parsedContent,
        rawMarkdown: slideContent,
        metadata,
        notes: notes || undefined,
      };
    });

    // Build global metadata
    const globalMetadata: GlobalMetadata = {
      marp: true,
      ...frontmatter,
      theme: (this.marp as any).lastGlobalDirectives?.theme || frontmatter.theme,
      paginate: (this.marp as any).lastGlobalDirectives?.paginate || frontmatter.paginate,
      header: (this.marp as any).lastGlobalDirectives?.header || frontmatter.header,
      footer: (this.marp as any).lastGlobalDirectives?.footer || frontmatter.footer,
      size: (this.marp as any).lastGlobalDirectives?.size || frontmatter.size,
    };

    return {
      slides,
      globalMetadata,
      theme: globalMetadata.theme,
      css: marpResult.css,
    };
  }

  private extractFrontmatter(content: string): { frontmatter: any; content: string } {
    const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)/);
    if (match) {
      try {
        const frontmatter = yaml.parse(match[1]);
        return { frontmatter, content: match[2] };
      } catch (e) {
        this.logger.warn('Failed to parse frontmatter as YAML');
      }
    }
    return { frontmatter: {}, content };
  }

  private splitIntoSlides(content: string): string[] {
    return content.split(/\n---\n/).map(slide => slide.trim());
  }

  private extractSlideMetadata(slideContent: string): SlideMetadata {
    const metadata: SlideMetadata = {};
    
    // Extract HTML comment directives
    const directivePattern = /<!--\s*(_\w+):\s*([^-]+?)\s*-->/g;
    let match;
    
    while ((match = directivePattern.exec(slideContent)) !== null) {
      const directive = match[1].substring(1); // Remove underscore
      const value = match[2].trim();
      
      switch (directive) {
        case 'backgroundColor':
          metadata.backgroundColor = value;
          break;
        case 'backgroundImage':
          metadata.backgroundImage = value.replace(/url\(['"]?(.+?)['"]?\)/, '$1');
          break;
        case 'backgroundSize':
          metadata.backgroundSize = value;
          break;
        case 'backgroundPosition':
          metadata.backgroundPosition = value;
          break;
        case 'color':
          metadata.color = value;
          break;
        case 'class':
          metadata.class = value;
          break;
        case 'paginate':
          metadata.paginate = value === 'true';
          break;
        case 'header':
          metadata.header = value;
          break;
        case 'footer':
          metadata.footer = value;
          break;
      }
    }

    // Extract image background syntax
    const bgImageMatch = slideContent.match(/!\[bg([^\]]*)\]\(([^)]+)\)/);
    if (bgImageMatch) {
      metadata.backgroundImage = bgImageMatch[2];
      const options = bgImageMatch[1];
      if (options.includes('fit')) metadata.backgroundSize = 'contain';
      if (options.includes('cover')) metadata.backgroundSize = 'cover';
      if (options.includes('left')) metadata.backgroundPosition = 'left center';
      if (options.includes('right')) metadata.backgroundPosition = 'right center';
    }

    return metadata;
  }

  private removeDirectives(content: string): string {
    // Remove HTML comment directives
    content = content.replace(/<!--\s*_\w+:.*?-->/g, '');
    // Remove background image syntax
    content = content.replace(/!\[bg[^\]]*\]\([^)]+\)/g, '');
    return content.trim();
  }

  private extractNotes(content: string): string | null {
    const notesMatch = content.match(/<!--\s*(?!_)([\s\S]*?)\s*-->/);
    return notesMatch ? notesMatch[1].trim() : null;
  }

  private removeNotes(content: string): string {
    return content.replace(/<!--\s*(?!_)([\s\S]*?)\s*-->/g, '').trim();
  }

  private parseMarkdownContent(markdown: string): ParsedContent[] {
    const tokens = marked.lexer(markdown);
    return this.parseTokens(tokens);
  }

  private parseTokens(tokens: any[]): ParsedContent[] {
    const content: ParsedContent[] = [];

    for (const token of tokens) {
      switch (token.type) {
        case 'heading':
          content.push({
            type: 'heading',
            level: token.depth,
            text: token.text,
          });
          break;

        case 'paragraph':
          content.push({
            type: 'paragraph',
            text: token.text,
          });
          break;

        case 'list':
          content.push({
            type: 'list',
            items: this.parseListItems(token.items),
          });
          break;

        case 'code':
          content.push({
            type: 'code',
            text: token.text,
            lang: token.lang || undefined,
          });
          break;

        case 'image':
          content.push({
            type: 'image',
            src: token.href,
            alt: token.text || undefined,
          });
          break;

        case 'table':
          content.push({
            type: 'table',
            rows: [
              token.header.map((cell: any) => cell.text),
              ...token.rows.map((row: any) => row.map((cell: any) => cell.text)),
            ],
          });
          break;

        case 'blockquote':
          content.push({
            type: 'blockquote',
            children: this.parseTokens(token.tokens),
          });
          break;

        case 'hr':
          content.push({
            type: 'hr',
          });
          break;
      }
    }

    return content;
  }

  private parseListItems(items: any[]): ParsedListItem[] {
    return items.map(item => ({
      text: item.text,
      checked: item.checked,
      subItems: item.tokens && this.extractSubListItems(item.tokens),
    }));
  }

  private extractSubListItems(tokens: any[]): ParsedListItem[] | undefined {
    const listToken = tokens.find(t => t.type === 'list');
    return listToken ? this.parseListItems(listToken.items) : undefined;
  }
}