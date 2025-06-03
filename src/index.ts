#!/usr/bin/env node

import { program } from 'commander';
import { version } from '../package.json';
import { MarpToGoogleSlidesConverter, ConverterOptions } from './converter';
import * as path from 'path';
import * as fs from 'fs';

program
  .name('gs-mark2slides')
  .description('Convert Marp Markdown presentations to Google Slides')
  .version(version)
  .argument('<input>', 'Input Marp markdown file')
  .option('-o, --output <name>', 'Google Slides presentation name')
  .option('-c, --credentials <path>', 'Path to Google credentials file (for service account)')
  .option('--client-id <id>', 'Google OAuth2 Client ID')
  .option('--client-secret <secret>', 'Google OAuth2 Client Secret')
  .option('-t, --token <path>', 'Path to token file for OAuth2', 'token.json')
  .option('--service-account', 'Use service account authentication')
  .option('-v, --verbose', 'Enable verbose logging')
  .action(async (input: string, options: any) => {
    try {
      // Validate input file
      const inputPath = path.resolve(input);
      if (!fs.existsSync(inputPath)) {
        console.error(`Error: Input file not found: ${inputPath}`);
        process.exit(1);
      }

      // Validate authentication method
      let credentialsPath: string | undefined;
      
      if (options.serviceAccount) {
        // Service account requires credentials file
        if (!options.credentials) {
          console.error('Error: Service account authentication requires --credentials flag');
          process.exit(1);
        }
        credentialsPath = path.resolve(options.credentials);
        if (!fs.existsSync(credentialsPath)) {
          console.error(`Error: Credentials file not found: ${credentialsPath}`);
          process.exit(1);
        }
      } else if (options.clientId && options.clientSecret) {
        // Browser-based OAuth2
        console.log('🔐 Using browser-based authentication');
      } else if (options.credentials) {
        // Legacy credentials file
        credentialsPath = path.resolve(options.credentials);
        if (!fs.existsSync(credentialsPath)) {
          console.error(`Error: Credentials file not found: ${credentialsPath}`);
          process.exit(1);
        }
      } else {
        // Default to browser auth with environment variables
        if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
          console.error('\nError: No authentication method specified.');
          console.error('\nOption 1: Use browser authentication with client ID and secret:');
          console.error('  gs-mark2slides example.md --client-id YOUR_CLIENT_ID --client-secret YOUR_CLIENT_SECRET');
          console.error('\nOption 2: Set environment variables:');
          console.error('  export GOOGLE_CLIENT_ID="your-client-id"');
          console.error('  export GOOGLE_CLIENT_SECRET="your-client-secret"');
          console.error('\nOption 3: Use service account:');
          console.error('  gs-mark2slides example.md -c service-account.json --service-account');
          console.error('\nGet credentials from: https://console.cloud.google.com/apis/credentials');
          process.exit(1);
        }
        options.clientId = process.env.GOOGLE_CLIENT_ID;
        options.clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      }

      // Create converter options
      const converterOptions: ConverterOptions = {
        credentialsPath,
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        tokenPath: options.token,
        useServiceAccount: options.serviceAccount,
        presentationName: options.output,
        verbose: options.verbose,
      };

      // Create converter and run conversion
      const converter = new MarpToGoogleSlidesConverter(converterOptions);
      const result = await converter.convert(inputPath);

      console.log('\n✅ Conversion successful!');
      console.log(`📊 Created ${result.slideCount} slides`);
      console.log(`🔗 View presentation: ${result.presentationUrl}`);
    } catch (error) {
      console.error('\n❌ Conversion failed:', error);
      process.exit(1);
    }
  });

program.parse();