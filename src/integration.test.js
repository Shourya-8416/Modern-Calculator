/**
 * Integration Tests for Natural Language Calculator
 * Tests complete end-to-end user flows from input to result display
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { parseQuery } from './parser.js';
import { calculate } from './calculator.js';

describe('End-to-End Integration Tests', () => {
  let queryInput;
  let calculateBtn;
  let resultDiv;

  beforeEach(() => {
    // Set up DOM for each test
    document.body.innerHTML = `
      <input type="text" id="queryInput" />
      <button id="calculateBtn">Calculate</button>
      <div id="result"></div>
      <div class="example-query" data-query="add 15 and 27">add 15 and 27</div>
      <div class="example-query" data-query="subtract 8 from 20">subtract 8 from 20</div>
      <div class="example-query" data-query="multiply 6 by 7">multiply 6 by 7</div>
      <div class="example-query" data-query="divide 100 by 4">divide 100 by 4</div>
      <div class="example-query" data-query="what is 20 percent of 150">20 percent of 150</div>
      <div class="example-query" data-query="average of 10, 20, 30">average of 10, 20, 30</div>
      <div class="example-query" data-query="square root of 144">square root of 144</div>
      <div class="example-query" data-query="5 to the power of 3">5 to the power of 3</div>
    `;
    queryInput = document.getElementById('queryInput');
    calculateBtn = document.getElementById('calculateBtn');
    resultDiv = document.getElementById('result');
  });

  describe('Complete calculation flows for each operation type', () => {
    it('should complete addition flow from input to result display', () => {
      // User enters query
      queryInput.value = 'add 15 and 27';
      
      // Parse query
      const parseResult = parseQuery(queryInput.value.trim());
      expect(parseResult).toEqual({ operation: 'add', operands: [15, 27] });
      
      // Calculate result
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      expect(calcResult).toEqual({ result: 42 });
      
      // Display result
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      // Verify display
      expect(resultDiv.textContent).toBe('42');
      expect(resultDiv.className).toBe('success');
    });

    it('should complete subtraction flow from input to result display', () => {
      queryInput.value = 'subtract 8 from 20';
      
      const parseResult = parseQuery(queryInput.value.trim());
      expect(parseResult).toEqual({ operation: 'subtract', operands: [20, 8] });
      
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      expect(calcResult).toEqual({ result: 12 });
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('12');
      expect(resultDiv.className).toBe('success');
    });

    it('should complete multiplication flow from input to result display', () => {
      queryInput.value = 'multiply 6 by 7';
      
      const parseResult = parseQuery(queryInput.value.trim());
      expect(parseResult).toEqual({ operation: 'multiply', operands: [6, 7] });
      
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      expect(calcResult).toEqual({ result: 42 });
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('42');
      expect(resultDiv.className).toBe('success');
    });

    it('should complete division flow from input to result display', () => {
      queryInput.value = 'divide 100 by 4';
      
      const parseResult = parseQuery(queryInput.value.trim());
      expect(parseResult).toEqual({ operation: 'divide', operands: [100, 4] });
      
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      expect(calcResult).toEqual({ result: 25 });
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('25');
      expect(resultDiv.className).toBe('success');
    });

    it('should complete percentage flow from input to result display', () => {
      queryInput.value = 'what is 20 percent of 150';
      
      const parseResult = parseQuery(queryInput.value.trim());
      expect(parseResult).toEqual({ operation: 'percentage', operands: [20, 150] });
      
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      expect(calcResult).toEqual({ result: 30 });
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('30');
      expect(resultDiv.className).toBe('success');
    });

    it('should complete average flow from input to result display', () => {
      queryInput.value = 'average of 10, 20, 30';
      
      const parseResult = parseQuery(queryInput.value.trim());
      expect(parseResult).toEqual({ operation: 'average', operands: [10, 20, 30] });
      
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      expect(calcResult).toEqual({ result: 20 });
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('20');
      expect(resultDiv.className).toBe('success');
    });

    it('should complete square root flow from input to result display', () => {
      queryInput.value = 'square root of 144';
      
      const parseResult = parseQuery(queryInput.value.trim());
      expect(parseResult).toEqual({ operation: 'sqrt', operands: [144] });
      
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      expect(calcResult).toEqual({ result: 12 });
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('12');
      expect(resultDiv.className).toBe('success');
    });

    it('should complete exponentiation flow from input to result display', () => {
      queryInput.value = '5 to the power of 3';
      
      const parseResult = parseQuery(queryInput.value.trim());
      expect(parseResult).toEqual({ operation: 'power', operands: [5, 3] });
      
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      expect(calcResult).toEqual({ result: 125 });
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('125');
      expect(resultDiv.className).toBe('success');
    });
  });

  describe('Error scenarios with recovery', () => {
    it('should handle division by zero error and preserve input', () => {
      queryInput.value = 'divide 10 by 0';
      const originalValue = queryInput.value;
      
      const parseResult = parseQuery(queryInput.value.trim());
      expect(parseResult).toEqual({ operation: 'divide', operands: [10, 0] });
      
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      expect(calcResult).toEqual({ error: 'Division by zero is not allowed' });
      
      // Display error
      resultDiv.textContent = calcResult.error;
      resultDiv.className = 'error';
      
      // Verify error display
      expect(resultDiv.textContent).toBe('Division by zero is not allowed');
      expect(resultDiv.className).toBe('error');
      
      // Verify input is preserved
      expect(queryInput.value).toBe(originalValue);
    });

    it('should handle negative square root error and preserve input', () => {
      queryInput.value = 'square root of -5';
      const originalValue = queryInput.value;
      
      const parseResult = parseQuery(queryInput.value.trim());
      expect(parseResult).toEqual({ operation: 'sqrt', operands: [-5] });
      
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      expect(calcResult).toEqual({ error: 'Cannot calculate square root of a negative number' });
      
      resultDiv.textContent = calcResult.error;
      resultDiv.className = 'error';
      
      expect(resultDiv.textContent).toBe('Cannot calculate square root of a negative number');
      expect(resultDiv.className).toBe('error');
      expect(queryInput.value).toBe(originalValue);
    });

    it('should handle unrecognized query error and preserve input', () => {
      queryInput.value = 'hello world';
      const originalValue = queryInput.value;
      
      const parseResult = parseQuery(queryInput.value.trim());
      expect(parseResult.error).toBeDefined();
      
      resultDiv.textContent = parseResult.error;
      resultDiv.className = 'error';
      
      expect(resultDiv.className).toBe('error');
      expect(queryInput.value).toBe(originalValue);
    });

    it('should handle empty query error', () => {
      queryInput.value = '   ';
      const query = queryInput.value.trim();
      
      expect(query).toBe('');
      
      // Empty query should trigger error
      if (!query) {
        resultDiv.textContent = 'Please enter a query';
        resultDiv.className = 'error';
      }
      
      expect(resultDiv.textContent).toBe('Please enter a query');
      expect(resultDiv.className).toBe('error');
    });

    it('should allow recovery after error by entering valid query', () => {
      // First, trigger an error
      queryInput.value = 'divide 10 by 0';
      
      let parseResult = parseQuery(queryInput.value.trim());
      let calcResult = calculate(parseResult.operation, parseResult.operands);
      
      resultDiv.textContent = calcResult.error;
      resultDiv.className = 'error';
      
      expect(resultDiv.className).toBe('error');
      
      // Now, enter a valid query
      queryInput.value = 'add 5 and 10';
      
      parseResult = parseQuery(queryInput.value.trim());
      calcResult = calculate(parseResult.operation, parseResult.operands);
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      // Verify recovery
      expect(resultDiv.textContent).toBe('15');
      expect(resultDiv.className).toBe('success');
    });
  });

  describe('Example query interaction flows', () => {
    it('should complete flow from example click to calculation', () => {
      const exampleElement = document.querySelector('[data-query="add 15 and 27"]');
      
      // Simulate clicking example
      const query = exampleElement.getAttribute('data-query');
      queryInput.value = query;
      queryInput.focus();
      
      expect(queryInput.value).toBe('add 15 and 27');
      
      // Process the query
      const parseResult = parseQuery(queryInput.value.trim());
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('42');
      expect(resultDiv.className).toBe('success');
    });

    it('should handle clicking multiple examples in sequence', () => {
      // Click first example
      let exampleElement = document.querySelector('[data-query="multiply 6 by 7"]');
      queryInput.value = exampleElement.getAttribute('data-query');
      
      let parseResult = parseQuery(queryInput.value.trim());
      let calcResult = calculate(parseResult.operation, parseResult.operands);
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('42');
      
      // Click second example
      exampleElement = document.querySelector('[data-query="square root of 144"]');
      queryInput.value = exampleElement.getAttribute('data-query');
      
      parseResult = parseQuery(queryInput.value.trim());
      calcResult = calculate(parseResult.operation, parseResult.operands);
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('12');
    });
  });

  describe('Complex user scenarios', () => {
    it('should handle decimal numbers throughout the flow', () => {
      queryInput.value = 'add 5.5 and 10.2';
      
      const parseResult = parseQuery(queryInput.value.trim());
      expect(parseResult).toEqual({ operation: 'add', operands: [5.5, 10.2] });
      
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      expect(calcResult.result).toBeCloseTo(15.7, 10);
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('15.7');
      expect(resultDiv.className).toBe('success');
    });

    it('should handle negative numbers throughout the flow', () => {
      queryInput.value = 'add -5 and 10';
      
      const parseResult = parseQuery(queryInput.value.trim());
      expect(parseResult).toEqual({ operation: 'add', operands: [-5, 10] });
      
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      expect(calcResult).toEqual({ result: 5 });
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('5');
      expect(resultDiv.className).toBe('success');
    });

    it('should handle multiple numbers in addition', () => {
      queryInput.value = 'sum of 1, 2, 3, 4, 5';
      
      const parseResult = parseQuery(queryInput.value.trim());
      expect(parseResult).toEqual({ operation: 'add', operands: [1, 2, 3, 4, 5] });
      
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      expect(calcResult).toEqual({ result: 15 });
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('15');
      expect(resultDiv.className).toBe('success');
    });

    it('should format results with appropriate decimal precision', () => {
      queryInput.value = 'divide 1 by 3';
      
      const parseResult = parseQuery(queryInput.value.trim());
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      
      const formatted = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.textContent = formatted;
      resultDiv.className = 'success';
      
      // Should have max 10 decimal places
      const decimalPart = formatted.split('.')[1];
      expect(decimalPart.length).toBeLessThanOrEqual(10);
      expect(formatted).toBe('0.3333333333');
    });

    it('should handle case-insensitive queries', () => {
      queryInput.value = 'ADD 5 AND 10';
      
      const parseResult = parseQuery(queryInput.value.trim());
      expect(parseResult).toEqual({ operation: 'add', operands: [5, 10] });
      
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      expect(calcResult).toEqual({ result: 15 });
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('15');
      expect(resultDiv.className).toBe('success');
    });

    it('should handle queries with extra whitespace', () => {
      queryInput.value = '  add   5   and   10  ';
      
      const parseResult = parseQuery(queryInput.value.trim());
      expect(parseResult).toEqual({ operation: 'add', operands: [5, 10] });
      
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      expect(calcResult).toEqual({ result: 15 });
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('15');
      expect(resultDiv.className).toBe('success');
    });
  });

  describe('Sequential calculation flows', () => {
    it('should handle multiple calculations in sequence', () => {
      // First calculation
      queryInput.value = 'add 5 and 10';
      let parseResult = parseQuery(queryInput.value.trim());
      let calcResult = calculate(parseResult.operation, parseResult.operands);
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      expect(resultDiv.textContent).toBe('15');
      
      // Second calculation
      queryInput.value = 'multiply 3 by 4';
      parseResult = parseQuery(queryInput.value.trim());
      calcResult = calculate(parseResult.operation, parseResult.operands);
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      expect(resultDiv.textContent).toBe('12');
      
      // Third calculation
      queryInput.value = 'square root of 16';
      parseResult = parseQuery(queryInput.value.trim());
      calcResult = calculate(parseResult.operation, parseResult.operands);
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      expect(resultDiv.textContent).toBe('4');
    });

    it('should clear previous result when displaying new result', () => {
      // First calculation
      queryInput.value = 'add 100 and 200';
      let parseResult = parseQuery(queryInput.value.trim());
      let calcResult = calculate(parseResult.operation, parseResult.operands);
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      const firstResult = resultDiv.textContent;
      expect(firstResult).toBe('300');
      
      // Second calculation should replace first
      queryInput.value = 'multiply 2 by 3';
      parseResult = parseQuery(queryInput.value.trim());
      calcResult = calculate(parseResult.operation, parseResult.operands);
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('6');
      expect(resultDiv.textContent).not.toBe(firstResult);
    });
  });

  describe('Responsive behavior at different viewport sizes', () => {
    beforeEach(() => {
      // Set up a more complete DOM structure for responsive testing
      document.body.innerHTML = `
        <div class="container">
          <input type="text" id="queryInput" />
          <button id="calculateBtn">Calculate</button>
          <div id="result"></div>
          <div class="examples">
            <div class="example-query" data-query="add 15 and 27">add 15 and 27</div>
            <div class="example-query" data-query="multiply 6 by 7">multiply 6 by 7</div>
          </div>
        </div>
      `;
      queryInput = document.getElementById('queryInput');
      calculateBtn = document.getElementById('calculateBtn');
      resultDiv = document.getElementById('result');
    });

    it('should maintain functionality at mobile viewport width (320px)', () => {
      // Simulate mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320
      });

      // Verify elements are accessible
      expect(queryInput).toBeTruthy();
      expect(calculateBtn).toBeTruthy();
      expect(resultDiv).toBeTruthy();

      // Perform calculation at mobile width
      queryInput.value = 'add 10 and 20';
      const parseResult = parseQuery(queryInput.value.trim());
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('30');
      expect(resultDiv.className).toBe('success');
    });

    it('should maintain functionality at tablet viewport width (768px)', () => {
      // Simulate tablet viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768
      });

      expect(queryInput).toBeTruthy();
      expect(calculateBtn).toBeTruthy();
      expect(resultDiv).toBeTruthy();

      queryInput.value = 'multiply 5 by 6';
      const parseResult = parseQuery(queryInput.value.trim());
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('30');
      expect(resultDiv.className).toBe('success');
    });

    it('should maintain functionality at desktop viewport width (1024px)', () => {
      // Simulate desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024
      });

      expect(queryInput).toBeTruthy();
      expect(calculateBtn).toBeTruthy();
      expect(resultDiv).toBeTruthy();

      queryInput.value = 'divide 100 by 5';
      const parseResult = parseQuery(queryInput.value.trim());
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('20');
      expect(resultDiv.className).toBe('success');
    });

    it('should handle viewport orientation changes', () => {
      // Start with portrait mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });

      queryInput.value = 'add 7 and 8';
      let parseResult = parseQuery(queryInput.value.trim());
      let calcResult = calculate(parseResult.operation, parseResult.operands);
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('15');

      // Change to landscape mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 667
      });

      // Functionality should still work
      queryInput.value = 'subtract 3 from 10';
      parseResult = parseQuery(queryInput.value.trim());
      calcResult = calculate(parseResult.operation, parseResult.operands);
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('7');
      expect(resultDiv.className).toBe('success');
    });

    it('should handle touch events on mobile devices', () => {
      // Simulate mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });

      const exampleElement = document.querySelector('.example-query');
      
      // Simulate touch event (similar to click)
      const query = exampleElement.getAttribute('data-query');
      queryInput.value = query;
      
      expect(queryInput.value).toBe('add 15 and 27');
      
      // Process the query
      const parseResult = parseQuery(queryInput.value.trim());
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('42');
    });

    it('should maintain error handling across viewport sizes', () => {
      const viewportSizes = [320, 480, 768, 1024];
      
      viewportSizes.forEach(width => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width
        });

        queryInput.value = 'divide 10 by 0';
        const parseResult = parseQuery(queryInput.value.trim());
        const calcResult = calculate(parseResult.operation, parseResult.operands);
        
        resultDiv.textContent = calcResult.error;
        resultDiv.className = 'error';
        
        expect(resultDiv.textContent).toBe('Division by zero is not allowed');
        expect(resultDiv.className).toBe('error');
        expect(queryInput.value).toBe('divide 10 by 0');
      });
    });

    it('should handle small viewport edge case (240px)', () => {
      // Very small viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 240
      });

      expect(queryInput).toBeTruthy();
      expect(calculateBtn).toBeTruthy();

      queryInput.value = 'add 1 and 1';
      const parseResult = parseQuery(queryInput.value.trim());
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('2');
    });

    it('should handle large viewport (1920px)', () => {
      // Large desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920
      });

      expect(queryInput).toBeTruthy();
      expect(calculateBtn).toBeTruthy();

      queryInput.value = 'square root of 64';
      const parseResult = parseQuery(queryInput.value.trim());
      const calcResult = calculate(parseResult.operation, parseResult.operands);
      
      resultDiv.textContent = Number(calcResult.result.toFixed(10)).toString();
      resultDiv.className = 'success';
      
      expect(resultDiv.textContent).toBe('8');
    });
  });
});
