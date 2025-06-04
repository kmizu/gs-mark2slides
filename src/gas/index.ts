// Entry point for Google Apps Script
// This file will be compiled to Code.gs

import { doGet } from './webapp';
import { convertMarpToSlides } from './converter';
import { openSidebar } from './ui';

// Export functions for GAS
export { doGet, convertMarpToSlides, openSidebar };

// Test function
export function testFunction() {
  console.log("Test function called");
  return { success: true, message: "Test successful" };
}

// Assign to global scope for GAS
declare const global: any;
if (typeof global !== 'undefined') {
  global.doGet = doGet;
  global.convertMarpToSlides = convertMarpToSlides;
  global.openSidebar = openSidebar;
  global.testFunction = testFunction;
}