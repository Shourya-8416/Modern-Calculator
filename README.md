# Natural Language Calculator 🧮

## Theme: Retro Revival

### Reimagining the Classic Calculator for the Modern Age

This project embodies the **Retro Revival** theme by taking the timeless concept of a calculator—a tool that has been fundamental to computation since the 1960s—and breathing new life into it through natural language processing. While traditional calculators required users to learn button sequences and mathematical notation, this calculator bridges the gap between vintage simplicity and contemporary conversational interfaces.

---

## 🎨 The Retro Revival Concept

### What Makes This "Retro"?

**Traditional calculators** from the 1970s-1990s were revolutionary devices that:
- Simplified complex mathematical operations
- Featured physical buttons for each operation (+, -, ×, ÷)
- Required users to input numbers in a specific sequence
- Displayed results on LED or LCD screens
- Were limited by their physical interface

### The Revival: Modernizing the Classic

This project **revives** the calculator concept by:

1. **Conversational Interface** - Instead of pressing buttons, users type natural language queries like "add 5 and 10" or "what is 20 percent of 150"

2. **Intelligent Parsing** - The calculator understands multiple ways to express the same operation, just like talking to a human

3. **Retro-Modern Aesthetic** - Clean, minimalist design with a gradient background reminiscent of 80s-90s tech aesthetics, combined with modern rounded corners and smooth animations

4. **Expanded Operations** - Beyond basic arithmetic, it handles percentages, averages, square roots, and exponentiation—all through plain English

5. **Error Handling** - Unlike old calculators that just showed "ERROR", this provides helpful, human-readable error messages

---

## 🔄 From Traditional to Natural Language

### Traditional Calculator Workflow
```
User thinks: "I need to calculate 20% of 150"
User does:   [2] [0] [%] [×] [1] [5] [0] [=]
Result:      30
```

### Natural Language Calculator Workflow
```
User thinks: "I need to calculate 20% of 150"
User types:  "what is 20 percent of 150"
Result:      30
```

The revival lies in **removing the cognitive load** of translating thoughts into button sequences. Users can now express mathematical queries the same way they think about them.

---

## ✨ Features

### 🗣️ Natural Language Processing
- **8 Operation Types**: Addition, Subtraction, Multiplication, Division, Percentage, Average, Square Root, Exponentiation
- **Multiple Phrase Variations**: "add 5 and 10", "sum of 5 and 10", "5 plus 10" all work
- **Case Insensitive**: Works with any capitalization
- **Flexible Input**: Handles decimals, negatives, and multiple numbers

### 🎯 User-Friendly Interface
- **Example Queries**: Click-to-try examples for each operation type
- **Real-time Feedback**: Instant results as you calculate
- **Error Messages**: Clear, actionable error messages (not just "ERROR")
- **Input Preservation**: Your query stays in the input field after errors for easy correction

### 📱 Modern Responsiveness
- **Mobile-First Design**: Optimized for smartphones and tablets
- **Touch-Friendly**: Minimum 44px touch targets for easy tapping
- **Responsive Layout**: Adapts to any screen size (mobile, tablet, desktop)
- **Cross-Browser**: Works on all modern browsers

### 🎨 Retro-Modern Design
- **Gradient Background**: Purple gradient reminiscent of 80s-90s tech aesthetics
- **Smooth Animations**: Hover effects and transitions for modern feel
- **Clean Typography**: System fonts for readability
- **Visual Feedback**: Color-coded success (green) and error (red) states

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.x (for local development server)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd natural-language-calculator
   ```

2. **Install dependencies** (for testing)
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   python -m http.server 8000
   ```

4. **Open in browser**
   ```
   http://localhost:8000
   ```

---

## 💡 Usage Examples

### Basic Arithmetic
```
"add 5 and 10"           → 15
"subtract 8 from 20"     → 12
"multiply 6 by 7"        → 42
"divide 100 by 4"        → 25
```

### Advanced Operations
```
"what is 20 percent of 150"    → 30
"average of 10, 20, 30"        → 20
"square root of 144"           → 12
"5 to the power of 3"          → 125
```

### Multiple Numbers
```
"sum of 1, 2, 3, 4, 5"         → 15
"average of 5, 10, 15, 20"     → 12.5
```

### Decimals and Negatives
```
"add 5.5 and 10.2"             → 15.7
"add -5 and 10"                → 5
```

---

## 🏗️ Architecture

### The Retro Revival in Code

The project follows a **three-layer architecture** that mirrors the evolution from mechanical calculators to modern computing:

```
┌─────────────────────────────────────┐
│     Presentation Layer (UI)         │  ← Modern: Natural language input
├─────────────────────────────────────┤
│     Parsing Layer (NLP)             │  ← Revival: Interprets human language
├─────────────────────────────────────┤
│     Calculation Layer (Engine)      │  ← Retro: Classic mathematical operations
└─────────────────────────────────────┘
```

### Components

1. **Parser Module** (`src/parser.js`)
   - Extracts mathematical operations from natural language
   - Supports multiple phrase variations
   - Handles edge cases and invalid input

2. **Calculator Engine** (`src/calculator.js`)
   - Executes mathematical operations
   - Validates operands and handles errors
   - Returns formatted results

3. **UI Controller** (`src/ui.js`)
   - Manages user interactions
   - Displays results and errors
   - Handles example query clicks

---

## 🧪 Testing

### Comprehensive Test Suite

The project includes **90 tests** across multiple categories:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Test Coverage
- **Unit Tests**: Individual component testing (31 calculator tests, 22 parser tests, 6 UI tests)
- **Property-Based Tests**: 8 property tests using fast-check (100+ iterations each)
- **Integration Tests**: 23 end-to-end flow tests

---

## 🎯 Design Philosophy

### Bridging Past and Present

The **Retro Revival** theme is reflected in every design decision:

| Traditional Calculator | Natural Language Calculator |
|----------------------|---------------------------|
| Physical buttons | Natural language input |
| LED/LCD display | Modern web interface |
| Limited operations | Expanded capabilities |
| Cryptic error codes | Human-readable messages |
| Fixed interface | Responsive design |
| Single device | Cross-platform |

### Key Principles

1. **Simplicity**: Like classic calculators, the interface is clean and focused
2. **Accessibility**: Natural language removes barriers to entry
3. **Reliability**: Comprehensive testing ensures accuracy
4. **Responsiveness**: Works seamlessly across all devices
5. **Feedback**: Clear visual and textual feedback for all actions

---

## 🛠️ Technology Stack

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with gradients, animations, and media queries
- **JavaScript (ES6+)**: Modular architecture with ES modules
- **Vitest**: Fast unit testing framework
- **fast-check**: Property-based testing library
- **JSDOM**: DOM testing environment

---

## 📱 Responsive Design

### Mobile-First Approach

The calculator adapts to three breakpoints:

- **Mobile** (≤480px): Full-width layout, stacked elements
- **Tablet** (481-768px): Optimized spacing, two-column examples
- **Desktop** (>768px): Maximum width container, generous spacing

### Touch Optimization
- Minimum 44px touch targets (Apple's recommendation)
- Minimum 16px font size (prevents iOS zoom)
- Touch event listeners alongside click events
- Adequate spacing between interactive elements (8px minimum)

---

## 🎨 Visual Design

### Color Palette

```css
Primary Gradient:   #667eea → #764ba2  (Purple gradient)
Success:            #d4edda (Light green background)
Success Text:       #155724 (Dark green)
Error:              #f8d7da (Light red background)
Error Text:         #721c24 (Dark red)
Neutral:            #f5f5f5 (Light gray)
Text:               #333 (Dark gray)
```

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto)
- **Heading**: 28px (desktop), 24px (mobile)
- **Input/Button**: 16px (prevents mobile zoom)
- **Examples**: 14px

---

## 🔮 Future Enhancements

Potential features to further the Retro Revival theme:

- [ ] **Voice Input**: Speak your calculations (ultimate natural interface)
- [ ] **Calculation History**: Like the paper tape on old adding machines
- [ ] **Themes**: Switch between retro color schemes (80s neon, 90s beige, etc.)
- [ ] **Scientific Mode**: Trigonometry, logarithms, and more
- [ ] **Unit Conversions**: "convert 5 miles to kilometers"
- [ ] **Currency Calculations**: "what is 100 USD in EUR"

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgments

This project pays homage to:
- **Classic calculators** of the 1970s-1990s (HP, Texas Instruments, Casio)
- **Natural language processing** pioneers who made conversational interfaces possible
- **Modern web standards** that enable responsive, accessible applications

---

## 📞 Contact

For questions, suggestions, or contributions, please open an issue or submit a pull request.

---

**Built with ❤️ as a tribute to the calculators that shaped computing history, reimagined for the modern web.**
