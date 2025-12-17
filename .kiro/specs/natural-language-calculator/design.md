# Design Document: Natural Language Calculator

## Overview

The Natural Language Calculator is a responsive, client-side web application that interprets mathematical queries expressed in plain English and returns calculated results. The system uses pattern matching and regular expressions to parse natural language input, extract mathematical operations and operands, perform calculations using JavaScript's built-in Math operations, and display results through a simple DOM-based UI.

The application is designed to work seamlessly across desktop, tablet, and mobile devices with responsive layouts and touch-friendly interactions. The architecture follows a separation of concerns with distinct parsing, calculation, and presentation layers. All processing occurs client-side with no server dependencies, ensuring fast response times and offline capability.

## Architecture

The system consists of three primary layers:

1. **Presentation Layer (UI)**: Handles user input, displays results, and manages DOM interactions
2. **Parsing Layer**: Analyzes natural language queries and extracts structured mathematical operations
3. **Calculation Layer**: Executes mathematical operations and returns results

```
User Input → Parser → Calculator → Result Display
     ↑                                    ↓
     └────────── Error Messages ──────────┘
```

The flow is unidirectional: user input flows through parsing to calculation, with results or errors flowing back to the UI. The parser acts as the critical component that bridges natural language and mathematical operations.

## Components and Interfaces

### 1. UI Controller

**Responsibilities:**
- Capture user input from text field
- Trigger calculation on button click or Enter key
- Display results or error messages
- Handle example query clicks

**Interface:**
```javascript
// Event handlers
function handleCalculate()
function handleKeyPress(event)
function setInput(element)

// Display functions
function displayResult(value)
function displayError(message)
```

### 2. Query Parser

**Responsibilities:**
- Analyze natural language query text
- Identify mathematical operation type
- Extract numerical operands
- Validate query structure

**Interface:**
```javascript
function parseQuery(queryString)
// Returns: { operation: string, operands: number[] } | { error: string }
```

**Supported Patterns:**
- Addition: "add X and Y", "sum of X, Y, Z", "X plus Y"
- Subtraction: "subtract X from Y", "Y minus X"
- Multiplication: "multiply X by Y", "X times Y"
- Division: "divide X by Y", "X divided by Y"
- Percentage: "X percent of Y", "X% of Y"
- Average: "average of X, Y, Z", "find the average of X, Y"
- Square root: "square root of X", "sqrt of X"
- Exponentiation: "X squared", "X to the power of Y"

### 3. Calculator Engine

**Responsibilities:**
- Execute mathematical operations
- Handle edge cases (division by zero, negative square roots)
- Return formatted results

**Interface:**
```javascript
function calculate(operation, operands)
// Returns: { result: number } | { error: string }
```

**Operations:**
- `add`: Sum all operands
- `subtract`: Subtract second operand from first
- `multiply`: Multiply all operands
- `divide`: Divide first operand by second
- `percentage`: Calculate (operand1 / 100) * operand2
- `average`: Sum operands and divide by count
- `sqrt`: Calculate square root
- `power`: Raise first operand to power of second

## Data Models

### Query Object
```javascript
{
  operation: string,    // Operation type identifier
  operands: number[]    // Array of numerical values
}
```

### Result Object
```javascript
{
  result: number       // Calculated value
}
```

### Error Object
```javascript
{
  error: string        // Human-readable error message
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After reviewing all testable properties from the prework, several can be consolidated:
- Properties 3.1 and 3.2 both test percentage calculation and can be combined
- Properties 4.1 and 4.2 both test average calculation and can be combined
- Properties 2.1 and 2.5 both test addition and can be combined into one comprehensive property

### Core Calculation Properties

**Property 1: Addition correctness**
*For any* list of numbers, when queried using addition phrases ("add", "sum of", "plus"), the result should equal the mathematical sum of all numbers.
**Validates: Requirements 2.1, 2.5**

**Property 2: Subtraction correctness and operand order**
*For any* two numbers X and Y, when queried using subtraction phrases ("subtract X from Y", "Y minus X"), the result should equal Y - X (not X - Y).
**Validates: Requirements 2.2**

**Property 3: Multiplication correctness**
*For any* two numbers X and Y, when queried using multiplication phrases ("multiply X by Y", "X times Y"), the result should equal X * Y.
**Validates: Requirements 2.3**

**Property 4: Division correctness**
*For any* two numbers X and Y where Y ≠ 0, when queried using division phrases ("divide X by Y", "X divided by Y"), the result should equal X / Y.
**Validates: Requirements 2.4**

**Property 5: Percentage calculation correctness**
*For any* two numbers X and Y, when queried using percentage phrases ("X percent of Y", "X% of Y"), the result should equal (X / 100) * Y.
**Validates: Requirements 3.1, 3.2**

**Property 6: Average calculation correctness**
*For any* list of at least two numbers, when queried using average phrases ("average of", "find the average"), the result should equal the sum of all numbers divided by the count.
**Validates: Requirements 4.1, 4.2**

**Property 7: Square root correctness**
*For any* non-negative number X, when queried using square root phrases ("square root of X", "sqrt of X"), the result should equal √X.
**Validates: Requirements 5.1**

**Property 8: Exponentiation correctness**
*For any* two numbers X and Y, when queried using power phrases ("X squared", "X to the power of Y"), the result should equal X^Y.
**Validates: Requirements 5.2, 5.3**

### Error Handling Properties

**Property 9: Invalid query error handling**
*For any* text input that does not contain a recognizable mathematical operation, the system should return an error message indicating the query was not understood.
**Validates: Requirements 6.1**

**Property 10: Invalid operand error handling**
*For any* query with non-numeric values where numbers are expected, the system should return an error message.
**Validates: Requirements 6.2**

**Property 11: Input preservation on error**
*For any* query that results in an error, the input field should still contain the original query text.
**Validates: Requirements 6.4**

### UI Behavior Properties

**Property 12: Result clearing on new query**
*For any* sequence of two queries, submitting the second query should clear the result from the first query before displaying the new result.
**Validates: Requirements 1.3**

**Property 13: Successful calculation display**
*For any* valid query that calculates successfully, the result should be displayed in the result area.
**Validates: Requirements 1.1, 8.1**

**Property 14: Number formatting consistency**
*For any* calculated result, the displayed number should have appropriate decimal precision (no more than 10 decimal places).
**Validates: Requirements 8.2**

**Property 15: Visual distinction between success and error**
*For any* result display, successful calculations and error messages should have visually distinct styling (different CSS classes or attributes).
**Validates: Requirements 8.4**

### Responsive Design Properties

**Property 16: Mobile layout adaptation**
*For any* viewport width less than 768 pixels, the layout should adapt with appropriate sizing and spacing for mobile devices.
**Validates: Requirements 9.1, 9.3**

**Property 17: Touch interaction support**
*For any* interactive element (buttons, example queries), touch events should trigger the same behavior as click events.
**Validates: Requirements 9.4**

## Error Handling

The system implements defensive error handling at multiple layers:

### Parser Layer Errors
- **Unrecognized operation**: When no mathematical operation pattern matches the query
- **Missing operands**: When an operation is identified but required numbers cannot be extracted
- **Invalid number format**: When extracted values cannot be parsed as valid numbers

### Calculator Layer Errors
- **Division by zero**: When the divisor in a division operation is zero
- **Negative square root**: When attempting to calculate the square root of a negative number
- **Invalid operand count**: When an operation receives too few or too many operands

### Error Message Format
All errors return a consistent structure:
```javascript
{
  error: "Human-readable error message"
}
```

Error messages should be:
- Clear and specific about what went wrong
- Actionable (suggest what the user should do)
- Non-technical (avoid jargon)

Examples:
- "I couldn't understand that query. Try something like 'add 5 and 10'"
- "Division by zero is not allowed"
- "I need at least two numbers to calculate an average"

## Testing Strategy

The Natural Language Calculator will use a dual testing approach combining unit tests for specific cases and property-based tests for general correctness.

### Property-Based Testing

We will use **fast-check** (for JavaScript) as the property-based testing library. Each correctness property defined above will be implemented as a property-based test.

**Configuration:**
- Each property test should run a minimum of 100 iterations
- Each test must include a comment tag referencing the design property: `// Feature: natural-language-calculator, Property X: [property text]`
- Each correctness property maps to exactly ONE property-based test

**Test Generators:**
- Number generator: Arbitrary floating-point numbers within reasonable ranges (-10000 to 10000)
- Number list generator: Arrays of 2-10 numbers
- Phrase variation generator: Different natural language phrasings for each operation
- Invalid input generator: Non-mathematical text, malformed queries, non-numeric values

**Example Property Test Structure:**
```javascript
// Feature: natural-language-calculator, Property 1: Addition correctness
fc.assert(
  fc.property(
    fc.array(fc.float(), { minLength: 2, maxLength: 10 }),
    fc.constantFrom("add", "sum of", "plus"),
    (numbers, phrase) => {
      const query = buildAdditionQuery(numbers, phrase);
      const result = parseAndCalculate(query);
      const expected = numbers.reduce((a, b) => a + b, 0);
      return Math.abs(result.result - expected) < 0.0001; // Float comparison
    }
  ),
  { numRuns: 100 }
);
```

### Unit Testing

Unit tests will cover:
- Specific example queries for each operation type
- Edge cases: empty input, single number, very large numbers, very small numbers
- Error conditions: division by zero, negative square roots, unparseable queries
- UI interactions: button clicks, Enter key press, example query clicks
- Responsive behavior: viewport size changes, touch events

**Test Organization:**
- `calculator.test.js`: Tests for calculation engine
- `parser.test.js`: Tests for query parsing
- `ui.test.js`: Tests for DOM interactions and display

### Integration Testing

End-to-end tests will verify:
- Complete user flows from input to result display
- Error recovery and input preservation
- Mobile responsiveness and touch interactions

## Responsive Design Strategy

### Breakpoints
- **Desktop**: > 768px - Full layout with generous spacing
- **Tablet**: 481px - 768px - Adjusted spacing, maintained layout
- **Mobile**: ≤ 480px - Stacked layout, larger touch targets

### Mobile Optimizations
- **Input field**: Full width with minimum 44px height for touch
- **Calculate button**: Minimum 44px height, full width on mobile
- **Example queries**: Larger tap targets (minimum 44px height)
- **Font sizes**: Minimum 16px to prevent zoom on iOS
- **Viewport meta tag**: Proper scaling and no user-scalable restrictions

### CSS Approach
Use CSS media queries for responsive behavior:
```css
/* Mobile-first approach */
.container { /* Mobile styles */ }

@media (min-width: 481px) { /* Tablet styles */ }
@media (min-width: 769px) { /* Desktop styles */ }
```

### Touch Interaction
- Use both `click` and `touchstart` event listeners where appropriate
- Prevent double-tap zoom on buttons
- Ensure adequate spacing between interactive elements (minimum 8px)

## Performance Considerations

- **Parsing**: O(n) complexity where n is query length - negligible for typical queries
- **Calculation**: O(1) for most operations, O(n) for sum/average where n is operand count
- **DOM updates**: Minimize reflows by batching updates
- **Target**: < 100ms from input submission to result display for typical queries

## Browser Compatibility

Target modern browsers with ES6+ support:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 5+)

No polyfills required for core functionality.
