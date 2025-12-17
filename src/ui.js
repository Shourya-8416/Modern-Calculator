/**
 * UI Controller Module
 * Handles user input, displays results, and manages DOM interactions
 */

import { parseQuery } from './parser.js';
import { calculate } from './calculator.js';

// DOM elements (initialized in init function)
let queryInput;
let calculateBtn;
let resultDiv;
let exampleQueries;

/**
 * Initialize event listeners
 */
function init() {
  // Get DOM elements
  queryInput = document.getElementById('queryInput');
  calculateBtn = document.getElementById('calculateBtn');
  resultDiv = document.getElementById('result');
  exampleQueries = document.querySelectorAll('.example-query');
  
  // Calculate button click handler
  calculateBtn.addEventListener('click', handleCalculate);
  
  // Calculate button touch handler
  calculateBtn.addEventListener('touchstart', handleCalculate);
  
  // Enter key press handler
  queryInput.addEventListener('keypress', handleKeyPress);
  
  // Example query click handlers
  exampleQueries.forEach(example => {
    example.addEventListener('click', () => setInput(example));
    // Example query touch handler
    example.addEventListener('touchstart', () => setInput(example));
  });
  
  // Focus input on page load
  queryInput.focus();
}

/**
 * Handles the calculate button click
 */
function handleCalculate() {
  const query = queryInput.value.trim();
  
  // Validate empty input
  if (!query) {
    displayError("Please enter a query");
    return;
  }
  
  // Parse the query
  const parseResult = parseQuery(query);
  
  // Check for parsing errors
  if (parseResult.error) {
    displayError(parseResult.error);
    return;
  }
  
  // Calculate the result
  const calcResult = calculate(parseResult.operation, parseResult.operands);
  
  // Display result or error
  if (calcResult.error) {
    displayError(calcResult.error);
  } else {
    displayResult(calcResult.result);
  }
}

/**
 * Handles Enter key press in the input field
 * @param {KeyboardEvent} event - The keyboard event
 */
function handleKeyPress(event) {
  if (event.key === 'Enter') {
    handleCalculate();
  }
}

/**
 * Sets the input field value from an example query element
 * @param {HTMLElement} element - The example query element
 */
function setInput(element) {
  const query = element.getAttribute('data-query');
  queryInput.value = query;
  queryInput.focus();
}

/**
 * Displays a successful calculation result
 * @param {number} value - The calculated result
 */
function displayResult(value) {
  // Format the number with appropriate precision (max 10 decimal places)
  const formatted = Number(value.toFixed(10)).toString();
  
  resultDiv.textContent = formatted;
  resultDiv.className = 'success';
}

/**
 * Displays an error message
 * @param {string} message - The error message to display
 */
function displayError(message) {
  resultDiv.textContent = message;
  resultDiv.className = 'error';
}

// Initialize the UI when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Export functions for testing
export { handleCalculate, handleKeyPress, setInput, displayResult, displayError };
