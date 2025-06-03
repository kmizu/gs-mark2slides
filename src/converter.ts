import { GoogleAuth, AuthConfig } from './auth';
import { AdvancedMarpParser } from './parser/advanced-marp-parser';
import { GoogleSlidesAPI, ConversionResult, CreatePresentationOptions } from './api';
import { Logger } from './utils/logger';
import * as path from 'path';

export interface ConverterOptions {
  credentialsPath?: string;
  clientId?: string;
  clientSecret?: string;
  tokenPath?: string;
  useServiceAccount?: boolean;
  presentationName?: string;
  verbose?: boolean;
}

export class MarpToGoogleSlidesConverter {
  private logger: Logger;
  private auth: GoogleAuth;
  private parser: AdvancedMarpParser;
  private api?: GoogleSlidesAPI;
  private options: ConverterOptions;

  constructor(options: ConverterOptions) {
    this.options = options;
    this.logger = new Logger(options.verbose);
    
    const authConfig: AuthConfig = {
      credentialsPath: options.credentialsPath,
      clientId: options.clientId,
      clientSecret: options.clientSecret,
      tokenPath: options.tokenPath,
      useServiceAccount: options.useServiceAccount,
    };
    
    this.auth = new GoogleAuth(authConfig, this.logger);
    this.parser = new AdvancedMarpParser(this.logger);
  }

  async convert(marpFilePath: string): Promise<ConversionResult> {
    try {
      this.logger.info(`Starting conversion of ${marpFilePath}`);

      // Step 1: Authenticate
      this.logger.debug('Authenticating with Google...');
      const authClient = await this.auth.authenticate();
      this.api = new GoogleSlidesAPI(authClient, this.logger);

      // Step 2: Parse Marp file
      this.logger.debug('Parsing Marp file...');
      const parsedPresentation = await this.parser.parseFile(marpFilePath);
      this.logger.info(`Parsed ${parsedPresentation.slides.length} slides`);

      // Step 3: Create Google Slides presentation
      this.logger.debug('Creating Google Slides presentation...');
      const presentationOptions: CreatePresentationOptions = {
        title: this.options.presentationName || this.getPresentationTitle(marpFilePath, parsedPresentation.globalMetadata.title),
      };
      
      const result = await this.api.createPresentation(parsedPresentation, presentationOptions);
      
      this.logger.info('Conversion completed successfully!');
      this.logger.info(`Presentation URL: ${result.presentationUrl}`);
      
      return result;
    } catch (error) {
      this.logger.error('Conversion failed:', error);
      throw error;
    }
  }

  private getPresentationTitle(filePath: string, metadataTitle?: string): string {
    // Use metadata title if available
    if (metadataTitle) {
      return metadataTitle;
    }
    // Use filename without extension as fallback
    return path.basename(filePath, path.extname(filePath));
  }
}