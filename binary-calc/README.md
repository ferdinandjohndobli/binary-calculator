# Binary Calculator

An interactive binary calculator built with Next.js, styled with Tailwind CSS, and enhanced with animations and effects.

## Features

- Interactive binary calculator with support for:
  - Addition
  - Subtraction
  - Multiplication
  - Division
- Input validation for binary numbers (only 0s and 1s)
- Error handling for invalid inputs, division by zero, and negative results
- Clean, responsive UI with advanced animations and transitions
- Multiple theme options (Blue, Green, Purple, Dark)
- Interactive animations using Framer Motion
- Celebration effects with confetti on milestone calculations
- Sound effects for all interactions
- Animated result display

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `app/page.js` - Main page component
- `app/layout.js` - Root layout component
- `binary-calculator.jsx` - Binary calculator component
- `app/globals.css` - Global CSS with Tailwind imports
- `public/sounds/` - Directory for sound effect files

## Technologies Used

- Next.js
- React
- Tailwind CSS
- Framer Motion (animations)
- React Confetti (celebration effects)

## Usage

1. Enter binary numbers in the input fields (only 0s and 1s are allowed)
2. Select an operation (+, -, ×, ÷)
3. Click "Calculate" to see the result in binary format
4. The decimal equivalent is also displayed for reference
5. Use the theme selector in the top-right to change the calculator's appearance
6. Complete 5 calculations to see a special celebration effect!

## Notes

This project was created as part of Activity 12 for APPDEV class, using AI tools to generate and enhance the code and UI.