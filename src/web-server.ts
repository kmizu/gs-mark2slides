import express from 'express';
import * as path from 'path';
import * as fs from 'fs/promises';
import { AdvancedMarpParser } from './parser/advanced-marp-parser';
import { Logger } from './utils/logger';
import open from 'open';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../public')));

// Store parsed presentations temporarily
const sessions = new Map<string, any>();

// API endpoint to parse Marp
app.post('/api/parse', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'No content provided' });
    }

    const logger = new Logger(false);
    const parser = new AdvancedMarpParser(logger);
    const parsed = parser.parseContent(content);
    
    // Generate session ID
    const sessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
    sessions.set(sessionId, parsed);
    
    // Clean up old sessions after 1 hour
    setTimeout(() => sessions.delete(sessionId), 60 * 60 * 1000);

    res.json({ sessionId, preview: parsed });
  } catch (error: any) {
    console.error('Parse error:', error);
    res.status(500).json({ error: error.message });
  }
});

// API endpoint to convert (called from browser after Google auth)
app.post('/api/convert', async (req, res) => {
  try {
    const { sessionId, accessToken } = req.body;
    
    if (!sessionId || !sessions.has(sessionId)) {
      return res.status(400).json({ error: 'Invalid session' });
    }
    
    if (!accessToken) {
      return res.status(400).json({ error: 'No access token provided' });
    }

    // Get parsed presentation
    const parsed = sessions.get(sessionId);
    sessions.delete(sessionId);

    // Note: In a real implementation, you would use the accessToken
    // to call Google Slides API from here
    // For now, we'll return instructions
    
    res.json({
      success: true,
      message: 'Conversion would happen here with the provided access token',
      slideCount: parsed.slides.length,
      note: 'Server-side Google API calls need to be implemented'
    });
  } catch (error: any) {
    console.error('Convert error:', error);
    res.status(500).json({ error: error.message });
  }
});

export async function startWebServer(filePath?: string) {
  // Create public directory if it doesn't exist
  const publicDir = path.join(__dirname, '../public');
  await fs.mkdir(publicDir, { recursive: true });

  // Create the web interface HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>gs-mark2slides - Convert Marp to Google Slides</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 0;
      background: #f5f5f5;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #333;
      margin-bottom: 10px;
    }
    .subtitle {
      color: #666;
      margin-bottom: 30px;
    }
    .editor-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      height: 60vh;
      margin-bottom: 20px;
    }
    .editor-panel {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 20px;
      display: flex;
      flex-direction: column;
    }
    .editor-header {
      font-weight: bold;
      margin-bottom: 10px;
      color: #555;
    }
    #editor {
      flex: 1;
      width: 100%;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 10px;
      resize: none;
    }
    #preview {
      flex: 1;
      overflow-y: auto;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 10px;
      background: #fafafa;
    }
    .preview-slide {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      padding: 15px;
      margin-bottom: 10px;
    }
    .preview-slide h1, .preview-slide h2, .preview-slide h3 {
      margin-top: 0;
    }
    .controls {
      text-align: center;
      margin-bottom: 20px;
    }
    button {
      background: #4CAF50;
      color: white;
      border: none;
      padding: 12px 30px;
      font-size: 16px;
      border-radius: 4px;
      cursor: pointer;
      margin: 0 10px;
    }
    button:hover {
      background: #45a049;
    }
    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    #authButton {
      background: #4285f4;
    }
    #authButton:hover {
      background: #357ae8;
    }
    .error {
      background: #ffebee;
      color: #c62828;
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0;
    }
    .success {
      background: #e8f5e9;
      color: #2e7d32;
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0;
    }
    #status {
      text-align: center;
      margin: 20px 0;
    }
    .loading {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-left: 10px;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🎯 gs-mark2slides</h1>
    <p class="subtitle">Convert Marp Markdown presentations to Google Slides</p>
    
    <div class="editor-container">
      <div class="editor-panel">
        <div class="editor-header">📝 Marp Markdown</div>
        <textarea id="editor" placeholder="Paste your Marp markdown here...">---
marp: true
theme: default
paginate: true
---

# Welcome to gs-mark2slides

Convert your Marp presentations to Google Slides!

---

## How it works

1. Write your presentation in Marp Markdown
2. Sign in with Google
3. Click Convert
4. Your presentation is created in Google Slides!

---

## Features

- 📝 Full Marp syntax support
- 🎨 Preserve formatting
- 🔐 Secure authentication
- ⚡ Fast conversion

---

# Try it now!

Edit this markdown and see the preview update in real-time.</textarea>
      </div>
      
      <div class="editor-panel">
        <div class="editor-header">👁️ Preview</div>
        <div id="preview"></div>
      </div>
    </div>
    
    <div class="controls">
      <button id="authButton" onclick="authenticate()">
        Sign in with Google
      </button>
      <button id="convertButton" onclick="convert()" disabled>
        Convert to Google Slides
      </button>
    </div>
    
    <div id="status"></div>
  </div>

  <!-- Google API -->
  <script src="https://apis.google.com/js/api.js"></script>
  
  <script>
    // Google API configuration
    const CLIENT_ID = 'YOUR_CLIENT_ID.apps.googleusercontent.com';
    const API_KEY = 'YOUR_API_KEY';
    const DISCOVERY_DOCS = ['https://slides.googleapis.com/$discovery/rest?version=v1'];
    const SCOPES = 'https://www.googleapis.com/auth/presentations';
    
    let tokenClient;
    let accessToken = null;
    let currentSessionId = null;
    
    // Initialize Google API
    function gapiLoaded() {
      gapi.load('client', initializeGapiClient);
    }
    
    async function initializeGapiClient() {
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
      });
    }
    
    function gisLoaded() {
      tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
      });
    }
    
    // Load Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.onload = gisLoaded;
    document.head.appendChild(script);
    
    // Load Google API
    gapiLoaded();
    
    // Authentication
    function authenticate() {
      tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
          showError('Authentication failed: ' + resp.error);
          return;
        }
        accessToken = resp.access_token;
        document.getElementById('authButton').textContent = '✅ Signed In';
        document.getElementById('convertButton').disabled = false;
        showSuccess('Successfully signed in with Google!');
      };
      
      if (accessToken === null) {
        tokenClient.requestAccessToken({prompt: 'consent'});
      } else {
        tokenClient.requestAccessToken({prompt: ''});
      }
    }
    
    // Parse and preview
    let parseTimeout;
    const editor = document.getElementById('editor');
    const preview = document.getElementById('preview');
    
    async function parseAndPreview() {
      const content = editor.value;
      if (!content.trim()) {
        preview.innerHTML = '<p style="color: #666;">Start typing to see preview...</p>';
        return;
      }
      
      try {
        const response = await fetch('/api/parse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content })
        });
        
        if (!response.ok) {
          throw new Error('Failed to parse');
        }
        
        const { sessionId, preview: parsed } = await response.json();
        currentSessionId = sessionId;
        
        // Render preview
        preview.innerHTML = parsed.slides.map((slide, index) => \`
          <div class="preview-slide">
            <small style="color: #999;">Slide \${index + 1}</small>
            \${renderSlideContent(slide.content)}
            \${slide.notes ? \`<p style="color: #666; font-size: 12px; margin-top: 10px;"><em>Notes: \${slide.notes}</em></p>\` : ''}
          </div>
        \`).join('');
      } catch (error) {
        preview.innerHTML = '<p class="error">Failed to parse markdown</p>';
      }
    }
    
    function renderSlideContent(content) {
      return content.map(elem => {
        switch (elem.type) {
          case 'heading':
            return \`<h\${elem.level}>\${elem.text || ''}</h\${elem.level}>\`;
          case 'paragraph':
            return \`<p>\${elem.text || ''}</p>\`;
          case 'list':
            return \`<ul>\${elem.items?.map(item => \`<li>\${item.text}</li>\`).join('') || ''}</ul>\`;
          case 'code':
            return \`<pre style="background: #f5f5f5; padding: 10px; border-radius: 4px;"><code>\${elem.text || ''}</code></pre>\`;
          case 'image':
            return \`<p>[Image: \${elem.alt || elem.src || 'No description'}]</p>\`;
          case 'table':
            return \`<p>[Table with \${elem.rows?.length || 0} rows]</p>\`;
          case 'hr':
            return '<hr>';
          default:
            return '';
        }
      }).join('');
    }
    
    editor.addEventListener('input', () => {
      clearTimeout(parseTimeout);
      parseTimeout = setTimeout(parseAndPreview, 500);
    });
    
    // Initial parse
    parseAndPreview();
    
    // Convert to Google Slides
    async function convert() {
      if (!accessToken || !currentSessionId) {
        showError('Please sign in with Google first');
        return;
      }
      
      const convertButton = document.getElementById('convertButton');
      convertButton.disabled = true;
      convertButton.innerHTML = 'Converting... <span class="loading"></span>';
      
      try {
        // Note: This is where you would implement the actual Google Slides API calls
        // For now, we'll just show a message
        showStatus('info', \`
          <h3>⚠️ Client-side API Integration Needed</h3>
          <p>To complete the conversion, the Google Slides API needs to be called from this page.</p>
          <p>This requires:</p>
          <ol>
            <li>Setting up a Google Cloud Project</li>
            <li>Enabling Google Slides API</li>
            <li>Creating API credentials (API Key + OAuth Client ID)</li>
            <li>Implementing the client-side conversion logic</li>
          </ol>
          <p>The parsed presentation data is ready, and you have a valid access token!</p>
        \`);
        
        // Example of what the API calls would look like:
        /*
        // Create presentation
        const presentation = await gapi.client.slides.presentations.create({
          title: 'Converted from Marp'
        });
        const presentationId = presentation.result.presentationId;
        
        // Add slides and content...
        // ... (implementation details)
        
        window.open(\`https://docs.google.com/presentation/d/\${presentationId}\`, '_blank');
        */
        
      } catch (error) {
        showError('Conversion failed: ' + error.message);
      } finally {
        convertButton.disabled = false;
        convertButton.textContent = 'Convert to Google Slides';
      }
    }
    
    // Status messages
    function showStatus(type, message) {
      const status = document.getElementById('status');
      status.className = type;
      status.innerHTML = message;
    }
    
    function showError(message) {
      showStatus('error', message);
    }
    
    function showSuccess(message) {
      showStatus('success', message);
    }
    
    // File upload
    if (window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const file = params.get('file');
      if (file) {
        fetch(file)
          .then(r => r.text())
          .then(content => {
            editor.value = content;
            parseAndPreview();
          })
          .catch(() => showError('Failed to load file'));
      }
    }
  </script>
</body>
</html>`;

  // Write HTML file
  await fs.writeFile(path.join(publicDir, 'index.html'), html);

  // If a file was provided, read it
  if (filePath) {
    try {
      const content = await fs.readFile(filePath, 'utf8');
      // Store it temporarily
      const fileId = Date.now().toString(36);
      await fs.writeFile(path.join(publicDir, `${fileId}.md`), content);
      
      app.listen(PORT, () => {
        console.log(`\n🌐 gs-mark2slides web interface started!`);
        console.log(`📝 Opening http://localhost:${PORT}?file=${fileId}.md`);
        open(`http://localhost:${PORT}?file=${fileId}.md`);
      });
      
      return;
    } catch (error) {
      console.error('Failed to read file:', error);
    }
  }

  // Start server
  app.listen(PORT, () => {
    console.log(`\n🌐 gs-mark2slides web interface started!`);
    console.log(`📝 Open http://localhost:${PORT} in your browser`);
    open(`http://localhost:${PORT}`);
  });
}