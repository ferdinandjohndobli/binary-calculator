'use client';

import React from 'react';
import BinaryCalculator from './binary-calculator';
import useCursorEffects from './app/cursor-effects';

// This wrapper component adds the cursor effects to the original BinaryCalculator
export default function BinaryCalculatorWithCursor() {
  // Track theme from BinaryCalculator for cursor effects
  const [currentTheme, setCurrentTheme] = React.useState('cyber');
  
  // Apply cursor effects using our custom hook
  useCursorEffects(currentTheme);
  
  return (
    <BinaryCalculator onThemeChange={setCurrentTheme} />
  );
}