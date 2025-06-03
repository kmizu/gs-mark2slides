import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as fs from 'fs/promises';
import * as http from 'http';
import * as url from 'url';
import open from 'open';
import { Logger } from '../utils/logger';

const SCOPES = ['https://www.googleapis.com/auth/presentations'];
const REDIRECT_PORT = 3000;
const REDIRECT_PATH = '/oauth2callback';

export interface BrowserAuthConfig {
  clientId: string;
  clientSecret: string;
  tokenPath?: string;
}

export class BrowserAuth {
  private logger: Logger;
  private config: BrowserAuthConfig;
  private oAuth2Client: OAuth2Client;

  constructor(config: BrowserAuthConfig, logger: Logger) {
    this.config = config;
    this.logger = logger;
    
    const redirectUri = `http://localhost:${REDIRECT_PORT}${REDIRECT_PATH}`;
    this.oAuth2Client = new google.auth.OAuth2(
      config.clientId,
      config.clientSecret,
      redirectUri
    );
  }

  async authenticate(): Promise<OAuth2Client> {
    // Try to load existing token
    const tokenPath = this.config.tokenPath || 'token.json';
    
    try {
      const token = await fs.readFile(tokenPath, 'utf8');
      const parsedToken = JSON.parse(token);
      this.oAuth2Client.setCredentials(parsedToken);
      this.logger.info('Using existing authentication token');
      
      // Verify token is still valid
      try {
        await this.oAuth2Client.getAccessToken();
        return this.oAuth2Client;
      } catch (error) {
        this.logger.info('Token expired, re-authenticating...');
        // If we have a refresh token, try to refresh
        if (parsedToken.refresh_token) {
          try {
            const { credentials } = await this.oAuth2Client.refreshAccessToken();
            this.oAuth2Client.setCredentials(credentials);
            await fs.writeFile(tokenPath, JSON.stringify(credentials, null, 2));
            this.logger.info('Token refreshed successfully');
            return this.oAuth2Client;
          } catch (refreshError) {
            this.logger.info('Token refresh failed, re-authenticating...');
          }
        }
      }
    } catch (error) {
      this.logger.info('No existing token found');
    }

    // Get new token
    return this.getNewTokenBrowser(tokenPath);
  }

  private async getNewTokenBrowser(tokenPath: string): Promise<OAuth2Client> {
    return new Promise((resolve, reject) => {
      // Create temporary server
      const server = http.createServer(async (req, res) => {
        if (!req.url?.startsWith(REDIRECT_PATH)) {
          res.writeHead(404);
          res.end();
          return;
        }

        // Parse authorization code
        const queryUrl = url.parse(req.url, true);
        const code = queryUrl.query.code as string;
        const error = queryUrl.query.error as string;

        if (error) {
          res.writeHead(400);
          res.end(`
            <html>
              <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                <h1>❌ Authentication Failed</h1>
                <p>Error: ${error}</p>
                <p>You can close this window.</p>
              </body>
            </html>
          `);
          server.close();
          reject(new Error(`Authentication failed: ${error}`));
          return;
        }

        if (!code) {
          res.writeHead(400);
          res.end(`
            <html>
              <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                <h1>❌ No Authorization Code</h1>
                <p>You can close this window.</p>
              </body>
            </html>
          `);
          server.close();
          reject(new Error('No authorization code received'));
          return;
        }

        try {
          // Exchange code for tokens
          const { tokens } = await this.oAuth2Client.getToken(code);
          this.oAuth2Client.setCredentials(tokens);
          
          // Save token
          await fs.writeFile(tokenPath, JSON.stringify(tokens, null, 2));
          this.logger.info(`Token saved to ${tokenPath}`);

          // Send success response
          res.writeHead(200);
          res.end(`
            <html>
              <head>
                <style>
                  body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    text-align: center;
                    padding: 50px;
                    background: #f0f0f0;
                  }
                  .container {
                    background: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    max-width: 500px;
                    margin: 0 auto;
                  }
                  h1 { color: #4CAF50; }
                  .emoji { font-size: 48px; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="emoji">✅</div>
                  <h1>Authentication Successful!</h1>
                  <p>You can now close this window and return to the terminal.</p>
                  <p style="color: #666; margin-top: 20px;">gs-mark2slides is ready to convert your presentations!</p>
                </div>
              </body>
            </html>
          `);

          server.close();
          resolve(this.oAuth2Client);
        } catch (error) {
          res.writeHead(500);
          res.end(`
            <html>
              <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                <h1>❌ Token Exchange Failed</h1>
                <p>${error}</p>
                <p>You can close this window.</p>
              </body>
            </html>
          `);
          server.close();
          reject(error);
        }
      });

      // Start server
      server.listen(REDIRECT_PORT, async () => {
        this.logger.info(`Listening for authentication callback on port ${REDIRECT_PORT}`);

        // Generate auth URL
        const authUrl = this.oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: SCOPES,
          prompt: 'consent', // Force consent screen to ensure refresh token
        });

        // Open browser
        console.log('\n🌐 Opening browser for authentication...');
        console.log('If the browser doesn\'t open automatically, visit:');
        console.log(authUrl);
        
        try {
          await open(authUrl);
        } catch (error) {
          this.logger.warn('Failed to open browser automatically');
        }
      });

      // Timeout after 5 minutes
      setTimeout(() => {
        server.close();
        reject(new Error('Authentication timeout'));
      }, 5 * 60 * 1000);
    });
  }

  getAuthClient(): OAuth2Client {
    return this.oAuth2Client;
  }
}