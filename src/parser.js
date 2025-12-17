/**
 * Query Parser Module
 * Extracts mathematical operations and operands from natural language queries
 */

/**
 * Parses a natural language query and extracts the operation and operands
 * @param {string} queryString - The natural language query
 * @returns {Object} - { operation: string, operands: number[] } or { error: string }
 */
export function parseQuery(queryString) {
  if (!queryString || typeof queryString !== 'string') {
    return { error: "Please enter a query" };
  }

  const query = queryString.trim().toLowerCase();
  
  if (query.length === 0) {
    return { error: "Please enter a query" };
  }

  // Try each operation pattern in order
  const patterns = [
    parseAddition,
    parseSubtraction,
    parseMultiplication,
    parseDivision,
    parsePercentage,
    parseAverage,
    parseSquareRoot,
    parseExponentiation
  ];

  for (const parseFunc of patterns) {
    const result = parseFunc(query);
    if (result) {
      return result;
    }
  }

  return { error: "I couldn't understand that query. Try something like 'add 5 and 10'" };
}

/**
 * Extracts numbers from a string
 * @param {string} text - Text containing numbers
 * @returns {number[]} - Array of extracted numbers
 */
function extractNumbers(text) {
  // Match integers and decimals (including negative numbers)
  const numberPattern = /-?\d+\.?\d*/g;
  const matches = text.match(numberPattern);
  
  if (!matches) {
    return [];
  }
  
  return matches.map(n => parseFloat(n)).filter(n => !isNaN(n));
}

/**
 * Parse addition queries
 * Patterns: "add X and Y", "sum of X, Y, Z", "X plus Y"
 */
function parseAddition(query) {
  const patterns = [
    /add\s+(.+)/,
    /sum\s+of\s+(.+)/,
    /(.+)\s+plus\s+(.+)/
  ];

  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match) {
      const numbers = extractNumbers(query);
      if (numbers.length >= 2) {
        return { operation: 'add', operands: numbers };
      }
    }
  }

  return null;
}

/**
 * Parse subtraction queries
 * Patterns: "subtract X from Y", "Y minus X"
 */
function parseSubtraction(query) {
  // Pattern: "subtract X from Y" -> Y - X
  const subtractFromPattern = /subtract\s+(.+?)\s+from\s+(.+)/;
  let match = query.match(subtractFromPattern);
  
  if (match) {
    const xPart = match[1];
    const yPart = match[2];
    const xNumbers = extractNumbers(xPart);
    const yNumbers = extractNumbers(yPart);
    
    if (xNumbers.length >= 1 && yNumbers.length >= 1) {
      // Return Y - X (order matters!)
      return { operation: 'subtract', operands: [yNumbers[0], xNumbers[0]] };
    }
  }

  // Pattern: "Y minus X" -> Y - X
  const minusPattern = /(.+?)\s+minus\s+(.+)/;
  match = query.match(minusPattern);
  
  if (match) {
    const yPart = match[1];
    const xPart = match[2];
    const yNumbers = extractNumbers(yPart);
    const xNumbers = extractNumbers(xPart);
    
    if (yNumbers.length >= 1 && xNumbers.length >= 1) {
      return { operation: 'subtract', operands: [yNumbers[0], xNumbers[0]] };
    }
  }

  return null;
}

/**
 * Parse multiplication queries
 * Patterns: "multiply X by Y", "X times Y"
 */
function parseMultiplication(query) {
  // Pattern: "multiply X by Y"
  const multiplyPattern = /multiply\s+(.+?)\s+by\s+(.+)/;
  let match = query.match(multiplyPattern);
  
  if (match) {
    const numbers = extractNumbers(query);
    if (numbers.length >= 2) {
      return { operation: 'multiply', operands: [numbers[0], numbers[1]] };
    }
  }

  // Pattern: "X times Y"
  const timesPattern = /(.+?)\s+times\s+(.+)/;
  match = query.match(timesPattern);
  
  if (match) {
    const numbers = extractNumbers(query);
    if (numbers.length >= 2) {
      return { operation: 'multiply', operands: [numbers[0], numbers[1]] };
    }
  }

  return null;
}

/**
 * Parse division queries
 * Patterns: "divide X by Y", "X divided by Y"
 */
function parseDivision(query) {
  // Pattern: "divide X by Y"
  const dividePattern = /divide\s+(.+?)\s+by\s+(.+)/;
  let match = query.match(dividePattern);
  
  if (match) {
    const numbers = extractNumbers(query);
    if (numbers.length >= 2) {
      return { operation: 'divide', operands: [numbers[0], numbers[1]] };
    }
  }

  // Pattern: "X divided by Y"
  const dividedPattern = /(.+?)\s+divided\s+by\s+(.+)/;
  match = query.match(dividedPattern);
  
  if (match) {
    const numbers = extractNumbers(query);
    if (numbers.length >= 2) {
      return { operation: 'divide', operands: [numbers[0], numbers[1]] };
    }
  }

  return null;
}

/**
 * Parse percentage queries
 * Patterns: "X percent of Y", "X% of Y"
 */
function parsePercentage(query) {
  // Pattern: "X percent of Y" or "X% of Y"
  const percentPattern = /(.+?)\s*%?\s*percent\s+of\s+(.+)/;
  let match = query.match(percentPattern);
  
  if (match) {
    const numbers = extractNumbers(query);
    if (numbers.length >= 2) {
      return { operation: 'percentage', operands: [numbers[0], numbers[1]] };
    }
  }

  // Pattern: "X% of Y" (with % symbol)
  const percentSymbolPattern = /(.+?)%\s+of\s+(.+)/;
  match = query.match(percentSymbolPattern);
  
  if (match) {
    const numbers = extractNumbers(query);
    if (numbers.length >= 2) {
      return { operation: 'percentage', operands: [numbers[0], numbers[1]] };
    }
  }

  return null;
}

/**
 * Parse average queries
 * Patterns: "average of X, Y, Z", "find the average of X, Y"
 */
function parseAverage(query) {
  const patterns = [
    /average\s+of\s+(.+)/,
    /find\s+the\s+average\s+of\s+(.+)/
  ];

  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match) {
      const numbers = extractNumbers(query);
      if (numbers.length >= 2) {
        return { operation: 'average', operands: numbers };
      }
    }
  }

  return null;
}

/**
 * Parse square root queries
 * Patterns: "square root of X", "sqrt of X"
 */
function parseSquareRoot(query) {
  const patterns = [
    /square\s+root\s+of\s+(.+)/,
    /sqrt\s+of\s+(.+)/
  ];

  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (match) {
      const numbers = extractNumbers(query);
      if (numbers.length >= 1) {
        return { operation: 'sqrt', operands: [numbers[0]] };
      }
    }
  }

  return null;
}

/**
 * Parse exponentiation queries
 * Patterns: "X squared", "X to the power of Y"
 */
function parseExponentiation(query) {
  // Pattern: "X squared"
  const squaredPattern = /(.+?)\s+squared/;
  let match = query.match(squaredPattern);
  
  if (match) {
    const numbers = extractNumbers(match[1]);
    if (numbers.length >= 1) {
      return { operation: 'power', operands: [numbers[0], 2] };
    }
  }

  // Pattern: "X to the power of Y"
  const powerPattern = /(.+?)\s+to\s+the\s+power\s+of\s+(.+)/;
  match = query.match(powerPattern);
  
  if (match) {
    const numbers = extractNumbers(query);
    if (numbers.length >= 2) {
      return { operation: 'power', operands: [numbers[0], numbers[1]] };
    }
  }

  return null;
}
