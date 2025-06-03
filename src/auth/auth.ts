import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Logger } from '../utils/logger';
import { BrowserAuth } from './browser-auth';

export interface AuthConfig {
  credentialsPath?: string;
  clientId?: string;
  clientSecret?: string;
  tokenPath?: string;
  useServiceAccount?: boolean;
}

export class GoogleAuth {
  private logger: Logger;
  private config: AuthConfig;
  private auth: OAuth2Client | null = null;

  constructor(config: AuthConfig, logger: Logger) {
    this.config = config;
    this.logger = logger;
  }

  async authenticate(): Promise<OAuth2Client> {
    if (this.config.useServiceAccount) {
      if (!this.config.credentialsPath) {
        throw new Error('Service account requires credentialsPath');
      }
      return this.authenticateServiceAccount();
    } else if (this.config.clientId && this.config.clientSecret) {
      // Use browser-based authentication
      const browserAuth = new BrowserAuth({
        clientId: this.config.clientId,
        clientSecret: this.config.clientSecret,
        tokenPath: this.config.tokenPath,
      }, this.logger);
      return browserAuth.authenticate();
    } else if (this.config.credentialsPath) {
      // Legacy OAuth2 with credentials file
      return this.authenticateOAuth2();
    } else {
      throw new Error('No authentication method configured. Provide either clientId/clientSecret or credentialsPath');
    }
  }

  private async authenticateServiceAccount(): Promise<OAuth2Client> {
    try {
      this.logger.debug('Authenticating with service account');
      const keyFile = await fs.readFile(this.config.credentialsPath!, 'utf8');
      const key = JSON.parse(keyFile);

      const auth = new google.auth.GoogleAuth({
        credentials: key,
        scopes: ['https://www.googleapis.com/auth/presentations'],
      });

      const client = await auth.getClient() as OAuth2Client;
      this.auth = client;
      this.logger.info('Service account authentication successful');
      return client;
    } catch (error) {
      this.logger.error('Service account authentication failed:', error);
      throw new Error(`Failed to authenticate with service account: ${error}`);
    }
  }

  private async authenticateOAuth2(): Promise<OAuth2Client> {
    try {
      this.logger.debug('Authenticating with OAuth2');
      const credentialsContent = await fs.readFile(this.config.credentialsPath!, 'utf8');
      const credentials = JSON.parse(credentialsContent);
      
      const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web;
      const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

      // Check if token exists
      const tokenPath = this.config.tokenPath || 'token.json';
      try {
        const token = await fs.readFile(tokenPath, 'utf8');
        oAuth2Client.setCredentials(JSON.parse(token));
        this.auth = oAuth2Client;
        this.logger.info('OAuth2 authentication successful using existing token');
        return oAuth2Client;
      } catch (error) {
        // Token doesn't exist or is invalid
        this.logger.info('No valid token found. User authorization required.');
        return this.getNewToken(oAuth2Client, tokenPath);
      }
    } catch (error) {
      this.logger.error('OAuth2 authentication failed:', error);
      throw new Error(`Failed to authenticate with OAuth2: ${error}`);
    }
  }

  private async getNewToken(oAuth2Client: OAuth2Client, tokenPath: string): Promise<OAuth2Client> {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/presentations'],
    });

    console.log('\nAuthorize this app by visiting this url:');
    console.log(authUrl);
    console.log('\nEnter the code from that page here: ');

    // Using readline-sync for synchronous input
    const readlineSync = require('readline-sync');
    const code = readlineSync.question('Code: ');

    try {
      const { tokens } = await oAuth2Client.getToken(code);
      oAuth2Client.setCredentials(tokens);
      
      // Store the token for future use
      await fs.writeFile(tokenPath, JSON.stringify(tokens, null, 2));
      this.logger.info(`Token stored to ${tokenPath}`);
      
      this.auth = oAuth2Client;
      return oAuth2Client;
    } catch (error) {
      this.logger.error('Error retrieving access token:', error);
      throw new Error(`Failed to retrieve access token: ${error}`);
    }
  }

  getAuthClient(): OAuth2Client {
    if (!this.auth) {
      throw new Error('Not authenticated. Call authenticate() first.');
    }
    return this.auth;
  }
}