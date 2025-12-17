import { parseQuery } from './parser.js';

describe('Query Parser', () => {
  describe('Addition', () => {
    test('parses "add X and Y"', () => {
      const result = parseQuery('add 5 and 10');
      expect(result).toEqual({ operation: 'add', operands: [5, 10] });
    });

    test('parses "sum of X, Y, Z"', () => {
      const result = parseQuery('sum of 1, 2, 3');
      expect(result).toEqual({ operation: 'add', operands: [1, 2, 3] });
    });

    test('parses "X plus Y"', () => {
      const result = parseQuery('5 plus 10');
      expect(result).toEqual({ operation: 'add', operands: [5, 10] });
    });
  });

  describe('Subtraction', () => {
    test('parses "subtract X from Y"', () => {
      const result = parseQuery('subtract 5 from 10');
      expect(result).toEqual({ operation: 'subtract', operands: [10, 5] });
    });

    test('parses "Y minus X"', () => {
      const result = parseQuery('10 minus 5');
      expect(result).toEqual({ operation: 'subtract', operands: [10, 5] });
    });
  });

  describe('Multiplication', () => {
    test('parses "multiply X by Y"', () => {
      const result = parseQuery('multiply 5 by 10');
      expect(result).toEqual({ operation: 'multiply', operands: [5, 10] });
    });

    test('parses "X times Y"', () => {
      const result = parseQuery('5 times 10');
      expect(result).toEqual({ operation: 'multiply', operands: [5, 10] });
    });
  });

  describe('Division', () => {
    test('parses "divide X by Y"', () => {
      const result = parseQuery('divide 10 by 5');
      expect(result).toEqual({ operation: 'divide', operands: [10, 5] });
    });

    test('parses "X divided by Y"', () => {
      const result = parseQuery('10 divided by 5');
      expect(result).toEqual({ operation: 'divide', operands: [10, 5] });
    });
  });

  describe('Percentage', () => {
    test('parses "X percent of Y"', () => {
      const result = parseQuery('20 percent of 100');
      expect(result).toEqual({ operation: 'percentage', operands: [20, 100] });
    });

    test('parses "X% of Y"', () => {
      const result = parseQuery('20% of 100');
      expect(result).toEqual({ operation: 'percentage', operands: [20, 100] });
    });
  });

  describe('Average', () => {
    test('parses "average of X, Y, Z"', () => {
      const result = parseQuery('average of 1, 2, 3');
      expect(result).toEqual({ operation: 'average', operands: [1, 2, 3] });
    });

    test('parses "find the average of X, Y"', () => {
      const result = parseQuery('find the average of 10, 20');
      expect(result).toEqual({ operation: 'average', operands: [10, 20] });
    });
  });

  describe('Square Root', () => {
    test('parses "square root of X"', () => {
      const result = parseQuery('square root of 16');
      expect(result).toEqual({ operation: 'sqrt', operands: [16] });
    });

    test('parses "sqrt of X"', () => {
      const result = parseQuery('sqrt of 25');
      expect(result).toEqual({ operation: 'sqrt', operands: [25] });
    });
  });

  describe('Exponentiation', () => {
    test('parses "X squared"', () => {
      const result = parseQuery('5 squared');
      expect(result).toEqual({ operation: 'power', operands: [5, 2] });
    });

    test('parses "X to the power of Y"', () => {
      const result = parseQuery('2 to the power of 3');
      expect(result).toEqual({ operation: 'power', operands: [2, 3] });
    });
  });

  describe('Error Handling', () => {
    test('returns error for empty query', () => {
      const result = parseQuery('');
      expect(result).toHaveProperty('error');
    });

    test('returns error for unrecognized query', () => {
      const result = parseQuery('hello world');
      expect(result).toHaveProperty('error');
    });

    test('returns error for null input', () => {
      const result = parseQuery(null);
      expect(result).toHaveProperty('error');
    });
  });

  describe('Decimal Numbers', () => {
    test('handles decimal operands', () => {
      const result = parseQuery('add 5.5 and 10.2');
      expect(result).toEqual({ operation: 'add', operands: [5.5, 10.2] });
    });

    test('handles negative numbers', () => {
      const result = parseQuery('add -5 and 10');
      expect(result).toEqual({ operation: 'add', operands: [-5, 10] });
    });
  });
});
