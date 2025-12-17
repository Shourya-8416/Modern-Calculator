/**
 * Calculator Engine Module
 * Executes mathematical operations and returns results or errors
 */

/**
 * Calculates the result of a mathematical operation
 * @param {string} operation - The operation type (add, subtract, multiply, divide, percentage, average, sqrt, power)
 * @param {number[]} operands - Array of numerical operands
 * @returns {Object} - { result: number } or { error: string }
 */
export function calculate(operation, operands) {
  // Validate operands array
  if (!Array.isArray(operands) || operands.length === 0) {
    return { error: "Invalid operands provided" };
  }

  // Validate all operands are numbers
  if (!operands.every(n => typeof n === 'number' && !isNaN(n))) {
    return { error: "All operands must be valid numbers" };
  }

  switch (operation) {
    case 'add':
      return add(operands);
    case 'subtract':
      return subtract(operands);
    case 'multiply':
      return multiply(operands);
    case 'divide':
      return divide(operands);
    case 'percentage':
      return percentage(operands);
    case 'average':
      return average(operands);
    case 'sqrt':
      return sqrt(operands);
    case 'power':
      return power(operands);
    default:
      return { error: "Unknown operation" };
  }
}

/**
 * Adds all operands together
 * @param {number[]} operands - Numbers to add
 * @returns {Object} - { result: number }
 */
function add(operands) {
  if (operands.length < 2) {
    return { error: "Addition requires at least two numbers" };
  }
  
  const result = operands.reduce((sum, num) => sum + num, 0);
  return { result };
}

/**
 * Subtracts the second operand from the first
 * @param {number[]} operands - [minuend, subtrahend]
 * @returns {Object} - { result: number } or { error: string }
 */
function subtract(operands) {
  if (operands.length !== 2) {
    return { error: "Subtraction requires exactly two numbers" };
  }
  
  const result = operands[0] - operands[1];
  return { result };
}

/**
 * Multiplies all operands together
 * @param {number[]} operands - Numbers to multiply
 * @returns {Object} - { result: number } or { error: string }
 */
function multiply(operands) {
  if (operands.length < 2) {
    return { error: "Multiplication requires at least two numbers" };
  }
  
  const result = operands.reduce((product, num) => product * num, 1);
  return { result };
}

/**
 * Divides the first operand by the second
 * @param {number[]} operands - [dividend, divisor]
 * @returns {Object} - { result: number } or { error: string }
 */
function divide(operands) {
  if (operands.length !== 2) {
    return { error: "Division requires exactly two numbers" };
  }
  
  const [dividend, divisor] = operands;
  
  if (divisor === 0) {
    return { error: "Division by zero is not allowed" };
  }
  
  const result = dividend / divisor;
  return { result };
}

/**
 * Calculates percentage: (X / 100) * Y
 * @param {number[]} operands - [percentage, base]
 * @returns {Object} - { result: number } or { error: string }
 */
function percentage(operands) {
  if (operands.length !== 2) {
    return { error: "Percentage calculation requires exactly two numbers" };
  }
  
  const [percent, base] = operands;
  const result = (percent / 100) * base;
  return { result };
}

/**
 * Calculates the average of all operands
 * @param {number[]} operands - Numbers to average
 * @returns {Object} - { result: number } or { error: string }
 */
function average(operands) {
  if (operands.length < 2) {
    return { error: "I need at least two numbers to calculate an average" };
  }
  
  const sum = operands.reduce((total, num) => total + num, 0);
  const result = sum / operands.length;
  return { result };
}

/**
 * Calculates the square root of the operand
 * @param {number[]} operands - [number]
 * @returns {Object} - { result: number } or { error: string }
 */
function sqrt(operands) {
  if (operands.length !== 1) {
    return { error: "Square root requires exactly one number" };
  }
  
  const [num] = operands;
  
  if (num < 0) {
    return { error: "Cannot calculate square root of a negative number" };
  }
  
  const result = Math.sqrt(num);
  return { result };
}

/**
 * Raises the first operand to the power of the second
 * @param {number[]} operands - [base, exponent]
 * @returns {Object} - { result: number } or { error: string }
 */
function power(operands) {
  if (operands.length !== 2) {
    return { error: "Exponentiation requires exactly two numbers" };
  }
  
  const [base, exponent] = operands;
  const result = Math.pow(base, exponent);
  return { result };
}
