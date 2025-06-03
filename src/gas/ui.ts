/**
 * Open the conversion sidebar in Google Slides
 */
export function openSidebar(): void {
  const html = HtmlService.createHtmlOutputFromFile('index')
    .setTitle('gs-mark2slides')
    .setWidth(300);
  SlidesApp.getUi().showSidebar(html);
}