import { SlideContent } from '../parser';
import { Theme, MARGIN, CONTENT_WIDTH } from '../constants';

/**
 * Add table element with enhanced styling
 */
export function addTable(
  slide: GoogleAppsScript.Slides.Slide,
  element: SlideContent,
  yPosition: number,
  theme: Theme
): number {
  if (!element.rows || element.rows.length === 0) {
    return yPosition;
  }
  
  const numRows = element.rows.length;
  const numCols = element.rows[0].cells.length;
  const cellHeight = 30;
  const tableHeight = numRows * cellHeight;
  const tableWidth = CONTENT_WIDTH;
  
  // Create table
  const table = slide.insertTable(numRows, numCols, MARGIN, yPosition, tableWidth, tableHeight);
  
  // Populate table with styling
  element.rows.forEach((row: any, rowIdx: number) => {
    row.cells.forEach((cellText: string, colIdx: number) => {
      const cell = table.getCell(rowIdx, colIdx);
      const textRange = cell.getText();
      textRange.setText(cellText || '');
      textRange.getTextStyle().setFontSize(12);
      textRange.getTextStyle().setForegroundColor(theme.textColor);
      
      // Apply alignment
      if (element.alignments && element.alignments[colIdx]) {
        const alignment = element.alignments[colIdx];
        switch (alignment) {
          case 'center':
            textRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.CENTER);
            break;
          case 'right':
            textRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.END);
            break;
          default:
            textRange.getParagraphStyle().setParagraphAlignment(SlidesApp.ParagraphAlignment.START);
        }
      }
      
      // Style header row
      if (row.isHeader) {
        cell.getFill().setSolidFill(theme.tableHeaderBg);
        textRange.getTextStyle().setBold(true);
      } else if (rowIdx % 2 === 0) {
        // Alternating row colors
        cell.getFill().setSolidFill(theme.tableAltRowBg);
      }
    });
  });
  
  return yPosition + tableHeight;
}