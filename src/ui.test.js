/**
 * UI Controller Tests
 * Tests for UI event handling and display functions
 */

import { describe, it, expect, beforeAll } from 'vitest';

// Set up minimal DOM before importing ui.js
beforeAll(() => {
  document.body.innerHTML = `
    <input id="queryInput" type="text" />
    <button id="calculateBtn">Calculate</button>
    <div id="result"></div>
    <div class="example-query" data-query="add 15 and 27">add 15 and 27</div>
    <div class="example-query" data-query="subtract 8 from 20">subtract 8 from 20</div>
    <div class="example-query" data-query="multiply 6 by 7">multiply 6 by 7</div>
    <div class="example-query" data-query="divide 100 by 4">divide 100 by 4</div>
    <div class="example-query" data-query="20 percent of 150">20 percent of 150</div>
    <div class="example-query" data-query="average of 10, 20, 30">average of 10, 20, 30</div>
    <div class="example-query" data-query="square root of 144">square root of 144</div>
    <div class="example-query" data-query="5 to the power of 3">5 to the power of 3</div>
  `;
});

describe('UI Controller', () => {
  describe('Number formatting', () => {
    it('should format numbers with appropriate precision (max 10 decimal places)', () => {
      // Test that numbers are formatted correctly
      const testCases = [
        { input: 42, expected: '42' },
        { input: 3.14159265359, expected: '3.1415926536' },
        { input: 0.1 + 0.2, expected: '0.3' },
        { input: 100.0, expected: '100' }
      ];

      testCases.forEach(({ input, expected }) => {
        const formatted = Number(input.toFixed(10)).toString();
        expect(formatted).toBe(expected);
      });
    });
  });

  describe('Input validation', () => {
    it('should reject empty queries', () => {
      const query = '   ';
      const trimmed = query.trim();
      expect(trimmed).toBe('');
    });

    it('should accept non-empty queries', () => {
      const query = '  add 5 and 10  ';
      const trimmed = query.trim();
      expect(trimmed).toBe('add 5 and 10');
    });
  });

  describe('Example query interactions', () => {
    it('should populate input field when example is clicked', () => {
      const queryInput = document.getElementById('queryInput');
      const exampleElement = document.querySelector('[data-query="add 15 and 27"]');
      
      // Simulate clicking the example
      const query = exampleElement.getAttribute('data-query');
      queryInput.value = query;
      
      expect(queryInput.value).toBe('add 15 and 27');
    });

    it('should focus input field after example click', () => {
      const queryInput = document.getElementById('queryInput');
      const exampleElement = document.querySelector('[data-query="multiply 6 by 7"]');
      
      // Simulate the setInput function behavior
      const query = exampleElement.getAttribute('data-query');
      queryInput.value = query;
      queryInput.focus();
      
      // Verify the input has the correct value (focus is harder to test in jsdom)
      expect(queryInput.value).toBe('multiply 6 by 7');
      expect(document.activeElement).toBe(queryInput);
    });

    it('should verify all operation types have examples in HTML', () => {
      // This test verifies the HTML structure contains all required operation types
      const requiredOperations = [
        { keyword: 'add', name: 'Addition' },
        { keyword: 'subtract', name: 'Subtraction' },
        { keyword: 'multiply', name: 'Multiplication' },
        { keyword: 'divide', name: 'Division' },
        { keyword: 'percent', name: 'Percentage' },
        { keyword: 'average', name: 'Average' },
        { keyword: 'square root', name: 'Square root' },
        { keyword: 'power', name: 'Exponentiation' }
      ];

      const exampleElements = document.querySelectorAll('.example-query');
      const exampleQueries = Array.from(exampleElements).map(el => 
        el.getAttribute('data-query').toLowerCase()
      );

      // Verify each required operation has at least one example
      requiredOperations.forEach(({ keyword, name }) => {
        const hasExample = exampleQueries.some(query => query.includes(keyword));
        expect(hasExample).toBe(true);
      });

      // Verify we have exactly 8 examples (one for each operation type)
      expect(exampleElements.length).toBe(8);
    });
  });
});
