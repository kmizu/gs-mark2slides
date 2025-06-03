/**
 * Entry point for web app
 */
export function doGet(): GoogleAppsScript.HTML.HtmlOutput {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('gs-mark2slides - Convert Marp to Google Slides')
    .setWidth(1200)
    .setHeight(800);
}