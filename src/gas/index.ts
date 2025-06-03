// Entry point for Google Apps Script
// This file will be compiled to Code.gs

import { doGet } from './webapp';
import { convertMarpToSlides } from './converter';
import { openSidebar } from './ui';

// Export functions to global scope for GAS
(function(global: any) {
  global.doGet = doGet;
  global.convertMarpToSlides = convertMarpToSlides;
  global.openSidebar = openSidebar;
  
  // Test function
  global.testFunction = function() {
    console.log("Test function called");
    return { success: true, message: "Test successful" };
  };
})(this);