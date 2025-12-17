/**
 * Calculator Engine Tests
 */

import { describe, it, expect } from 'vitest';
import { calculate } from './calculator.js';

describe('Calculator Engine', () => {
  describe('Addition', () => {
    it('should add two numbers', () => {
      const result = calculate('add', [5, 10]);
      expect(result).toEqual({ result: 15 });
    });

    it('should add multiple numbers', () => {
      const result = calculate('add', [1, 2, 3, 4, 5]);
      expect(result).toEqual({ result: 15 });
    });

    it('should require at least two numbers', () => {
      const result = calculate('add', [5]);
      expect(result.error).toBeDefined();
    });
  });

  describe('Subtraction', () => {
    it('should subtract second from first', () => {
      const result = calculate('subtract', [10, 3]);
      expect(result).toEqual({ result: 7 });
    });

    it('should handle negative results', () => {
      const result = calculate('subtract', [3, 10]);
      expect(result).toEqual({ result: -7 });
    });

    it('should require exactly two numbers', () => {
      const result = calculate('subtract', [5]);
      expect(result.error).toBeDefined();
    });
  });

  describe('Multiplication', () => {
    it('should multiply two numbers', () => {
      const result = calculate('multiply', [5, 4]);
      expect(result).toEqual({ result: 20 });
    });

    it('should multiply multiple numbers', () => {
      const result = calculate('multiply', [2, 3, 4]);
      expect(result).toEqual({ result: 24 });
    });

    it('should require at least two numbers', () => {
      const result = calculate('multiply', [5]);
      expect(result.error).toBeDefined();
    });
  });

  describe('Division', () => {
    it('should divide first by second', () => {
      const result = calculate('divide', [20, 4]);
      expect(result).toEqual({ result: 5 });
    });

    it('should handle decimal results', () => {
      const result = calculate('divide', [10, 3]);
      expect(result.result).toBeCloseTo(3.333333, 5);
    });

    it('should return error for division by zero', () => {
      const result = calculate('divide', [10, 0]);
      expect(result).toEqual({ error: "Division by zero is not allowed" });
    });

    it('should require exactly two numbers', () => {
      const result = calculate('divide', [5]);
      expect(result.error).toBeDefined();
    });
  });

  describe('Percentage', () => {
    it('should calculate percentage correctly', () => {
      const result = calculate('percentage', [20, 100]);
      expect(result).toEqual({ result: 20 });
    });

    it('should handle decimal percentages', () => {
      const result = calculate('percentage', [15.5, 200]);
      expect(result).toEqual({ result: 31 });
    });

    it('should require exactly two numbers', () => {
      const result = calculate('percentage', [5]);
      expect(result.error).toBeDefined();
    });
  });

  describe('Average', () => {
    it('should calculate average of two numbers', () => {
      const result = calculate('average', [10, 20]);
      expect(result).toEqual({ result: 15 });
    });

    it('should calculate average of multiple numbers', () => {
      const result = calculate('average', [10, 20, 30, 40]);
      expect(result).toEqual({ result: 25 });
    });

    it('should require at least two numbers', () => {
      const result = calculate('average', [5]);
      expect(result.error).toContain("at least two numbers");
    });
  });

  describe('Square Root', () => {
    it('should calculate square root', () => {
      const result = calculate('sqrt', [16]);
      expect(result).toEqual({ result: 4 });
    });

    it('should handle decimal results', () => {
      const result = calculate('sqrt', [2]);
      expect(result.result).toBeCloseTo(1.414213, 5);
    });

    it('should return error for negative numbers', () => {
      const result = calculate('sqrt', [-4]);
      expect(result).toEqual({ error: "Cannot calculate square root of a negative number" });
    });

    it('should require exactly one number', () => {
      const result = calculate('sqrt', [5, 10]);
      expect(result.error).toBeDefined();
    });
  });

  describe('Exponentiation', () => {
    it('should calculate power correctly', () => {
      const result = calculate('power', [2, 3]);
      expect(result).toEqual({ result: 8 });
    });

    it('should handle squared', () => {
      const result = calculate('power', [5, 2]);
      expect(result).toEqual({ result: 25 });
    });

    it('should handle negative exponents', () => {
      const result = calculate('power', [2, -2]);
      expect(result).toEqual({ result: 0.25 });
    });

    it('should require exactly two numbers', () => {
      const result = calculate('power', [5]);
      expect(result.error).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid operands array', () => {
      const result = calculate('add', null);
      expect(result.error).toBeDefined();
    });

    it('should handle empty operands array', () => {
      const result = calculate('add', []);
      expect(result.error).toBeDefined();
    });

    it('should handle non-numeric operands', () => {
      const result = calculate('add', [5, 'abc']);
      expect(result.error).toContain("valid numbers");
    });

    it('should handle unknown operation', () => {
      const result = calculate('unknown', [5, 10]);
      expect(result.error).toContain("Unknown operation");
    });
  });
});
