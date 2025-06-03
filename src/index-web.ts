#!/usr/bin/env node

import { program } from 'commander';
import { version } from '../package.json';
import { startWebServer } from './web-server';

program
  .name('gs-mark2slides')
  .description('Convert Marp Markdown presentations to Google Slides')
  .version(version)
  .option('-w, --web', 'Start web interface (no authentication required)')
  .argument('[input]', 'Input Marp markdown file (optional for web mode)')
  .action(async (input: string | undefined, options: any) => {
    if (options.web || !input) {
      // Start web server
      await startWebServer(input);
    } else {
      console.error('\n📌 The CLI mode requires authentication setup.');
      console.error('\nTo use the web interface (recommended), run:');
      console.error('  gs-mark2slides --web');
      console.error('\nOr with a file:');
      console.error('  gs-mark2slides --web presentation.md');
      console.error('\nThe web interface handles all authentication in the browser.');
      process.exit(1);
    }
  });

program.parse();