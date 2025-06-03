/**
 * Test script to verify functions are available in Google Apps Script
 * Copy this to the GAS editor and run testAllFunctions()
 */

function testAllFunctions() {
  console.log('Testing GAS functions...');
  
  // Test if functions exist
  console.log('doGet exists:', typeof doGet === 'function');
  console.log('convertMarpToSlides exists:', typeof convertMarpToSlides === 'function');
  console.log('openSidebar exists:', typeof openSidebar === 'function');
  console.log('testFunction exists:', typeof testFunction === 'function');
  
  // Test testFunction
  try {
    const result = testFunction();
    console.log('testFunction result:', result);
  } catch (e) {
    console.error('testFunction error:', e);
  }
  
  // Test convertMarpToSlides with minimal markdown
  try {
    const testMarkdown = `---
marp: true
---

# Test Slide

This is a test`;
    
    const result = convertMarpToSlides(testMarkdown);
    console.log('convertMarpToSlides result:', result);
  } catch (e) {
    console.error('convertMarpToSlides error:', e);
  }
}

// You can also test in the browser console with:
// google.script.run.withSuccessHandler(console.log).withFailureHandler(console.error).testFunction();