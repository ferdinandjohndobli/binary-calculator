'use client';

import { useState, useEffect, useRef } from 'react';

export default function BinaryCalculator({ onThemeChange }) {
  const renderInputAlert = () => {
    if (!showInputAlert) return null;
    return (
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg animate-bounce">
        Only binary digits (0 and 1) are allowed!
      </div>
    );
  };
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [showInputAlert, setShowInputAlert] = useState(false);
  const [theme, setTheme] = useState('cyber');
  const [calculationCount, setCalculationCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [rainParticles, setRainParticles] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showVisualization, setShowVisualization] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [conversionBase, setConversionBase] = useState('decimal');
  const [customBase, setCustomBase] = useState('');
  const [visualizationBits, setVisualizationBits] = useState(8);
  const [binaryInputMode, setBinaryInputMode] = useState('text');
  const [learningTab, setLearningTab] = useState('binary');
  const [showBitwiseOps, setShowBitwiseOps] = useState(false);
  const [bitwiseOp, setBitwiseOp] = useState('AND');
  const [bitwiseResult, setBitwiseResult] = useState('');
  const [showLogicGates, setShowLogicGates] = useState(false);
  const [currentGate, setCurrentGate] = useState('AND');
  const [gateInputs, setGateInputs] = useState({a: 0, b: 0});
  const [gateAnimationStep, setGateAnimationStep] = useState(0);
  const [gateAnimationPlaying, setGateAnimationPlaying] = useState(false);
  const [showAlgorithms, setShowAlgorithms] = useState(false);
  const [algorithmType, setAlgorithmType] = useState('binarySearch');
  const [binarySearchArray, setBinarySearchArray] = useState([0, 1, 2, 3, 4, 5, 6, 7]);
  const [binarySearchTarget, setBinarySearchTarget] = useState(5);
  const [binarySearchStep, setBinarySearchStep] = useState(0);
  const [binarySearchLog, setBinarySearchLog] = useState([]);
  const [binarySort, setBinarySort] = useState([5, 2, 8, 3, 1, 6, 4, 7]);
  const [binSortStep, setBinSortStep] = useState(0);
  const [sortingLog, setSortingLog] = useState([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (onThemeChange) {
      onThemeChange(theme);
    }
  }, [theme, onThemeChange]);

  useEffect(() => {
    if (!isMounted) return;
    
    if (theme === 'matrix') {
      const particles = Array.from({ length: 40 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 16 + Math.random() * 16,
        speed: 1 + Math.random() * 3,
        content: Math.random() > 0.5 ? '1' : '0'
      }));
      setRainParticles(particles);
    }
  }, [theme, isMounted]);
  
  // Binary search algorithm steps
  const [binarySearchSteps, setBinarySearchSteps] = useState([]);
  
  // Run binary search when requested
  useEffect(() => {
    if (showAlgorithms && algorithmType === 'binarySearch' && binarySearchArray.length > 0) {
      const steps = runBinarySearch();
      setBinarySearchSteps(steps);
    }
  }, [showAlgorithms, algorithmType, binarySearchArray, binarySearchTarget]);
  
  // Radix sort algorithm steps
  const [radixSortSteps, setRadixSortSteps] = useState([]);
  
  // Run radix sort when requested
  useEffect(() => {
    if (showAlgorithms && algorithmType === 'radixSort' && binarySort.length > 0) {
      const steps = runRadixSort();
      setRadixSortSteps(steps);
    }
  }, [showAlgorithms, algorithmType, binarySort]);

  const themes = {
    cyber: {
      name: "Cyberpunk",
      mainBg: "bg-gray-900",
      panelBg: "futuristic-panel",
      accent: "text-blue-400",
      accentBg: "bg-blue-600 hover:bg-blue-500",
      secondaryBg: "bg-purple-600 hover:bg-purple-500",
      text: "text-gray-100",
      muted: "text-gray-400",
      border: "border-blue-500/30",
      buttonClass: "button-glow text-white",
      inputBg: "bg-gray-800",
      gradient: "from-blue-600 to-purple-600",
      digit0: "text-gray-400",
      digit1: "text-blue-400 text-glow",
      resultBg: "bg-gray-800/70",
      icon: "💾",
      specialClass: "cyber-border",
    },
    neon: {
      name: "Neon",
      mainBg: "bg-black",
      panelBg: "bg-black border border-pink-500/50 shadow-lg",
      accent: "text-pink-500",
      accentBg: "bg-pink-600 hover:bg-pink-500",
      secondaryBg: "bg-purple-600 hover:bg-purple-500",
      text: "text-gray-100",
      muted: "text-gray-400",
      border: "border-pink-500/50",
      buttonClass: "neon-outline text-white",
      inputBg: "bg-gray-900",
      gradient: "from-pink-600 to-yellow-400",
      digit0: "text-gray-400",
      digit1: "text-pink-500 text-glow",
      resultBg: "bg-gray-900/70",
      icon: "🌆",
      specialClass: "wave-effect",
    },
    future: {
      name: "Futuristic",
      mainBg: "bg-indigo-900",
      panelBg: "glass-effect-dark",
      accent: "text-cyan-400",
      accentBg: "bg-cyan-600 hover:bg-cyan-500",
      secondaryBg: "bg-indigo-600 hover:bg-indigo-500",
      text: "text-gray-100",
      muted: "text-gray-400",
      border: "border-cyan-500/30",
      buttonClass: "button-glow text-white",
      inputBg: "bg-indigo-800/50",
      gradient: "from-cyan-500 to-indigo-500",
      digit0: "text-gray-400",
      digit1: "text-cyan-400 text-glow",
      resultBg: "bg-indigo-800/50",
      icon: "🚀",
      specialClass: "holographic",
    },
    matrix: {
      name: "Matrix",
      mainBg: "bg-black",
      panelBg: "bg-black/80 border border-green-500/50 shadow-lg",
      accent: "text-green-500",
      accentBg: "bg-green-600 hover:bg-green-500",
      secondaryBg: "bg-green-900 hover:bg-green-800",
      text: "text-green-400",
      muted: "text-green-700",
      border: "border-green-500/30",
      buttonClass: "neon-outline text-green-400",
      inputBg: "bg-black/70",
      gradient: "from-green-700 to-green-500",
      digit0: "text-green-800",
      digit1: "text-green-400 text-glow-intense animate-glow-pulse",
      resultBg: "bg-black/70",
      icon: "🖥️",
      specialClass: "data-flow",
    },
    retro: {
      name: "Retro",
      mainBg: "bg-gray-900",
      panelBg: "bg-gray-800 border-2 border-orange-500/50",
      accent: "text-orange-500",
      accentBg: "bg-orange-600 hover:bg-orange-500",
      secondaryBg: "bg-amber-600 hover:bg-amber-500",
      text: "text-amber-100",
      muted: "text-amber-200/50",
      border: "border-orange-500/50",
      buttonClass: "text-white",
      inputBg: "bg-gray-700",
      gradient: "from-orange-600 to-amber-500",
      digit0: "text-gray-400",
      digit1: "text-orange-500",
      resultBg: "bg-gray-700/80",
      icon: "🕹️",
      specialClass: "retro-scanlines",
    },
    midnight: {
      name: "Midnight",
      mainBg: "bg-slate-900",
      panelBg: "bg-slate-800/90 border border-blue-700/50",
      accent: "text-blue-500",
      accentBg: "bg-blue-800 hover:bg-blue-700",
      secondaryBg: "bg-purple-800 hover:bg-purple-700",
      text: "text-sky-100",
      muted: "text-sky-300/40",
      border: "border-blue-700/30",
      buttonClass: "text-white shadow-lg",
      inputBg: "bg-slate-700/80",
      gradient: "from-blue-800 to-violet-700",
      digit0: "text-slate-400",
      digit1: "text-blue-500 text-glow",
      resultBg: "bg-slate-800/80",
      icon: "🌙",
      specialClass: "star-field",
    },
    candy: {
      name: "Candy",
      mainBg: "bg-pink-900/80",
      panelBg: "bg-pink-800/70 border border-pink-400/50",
      accent: "text-pink-400",
      accentBg: "bg-pink-500 hover:bg-pink-400",
      secondaryBg: "bg-sky-500 hover:bg-sky-400",
      text: "text-pink-100",
      muted: "text-pink-200/50",
      border: "border-pink-400/30",
      buttonClass: "text-white shadow-md",
      inputBg: "bg-pink-700/50",
      gradient: "from-pink-500 to-sky-400",
      digit0: "text-pink-300/40",
      digit1: "text-pink-400 text-glow",
      resultBg: "bg-pink-800/60",
      icon: "🍬",
      specialClass: "glass-effect",
    },
    synthwave: {
      name: "Synthwave",
      mainBg: "synthwave-grid",
      panelBg: "bg-slate-900/70 border border-purple-500/50",
      accent: "text-purple-400",
      accentBg: "bg-purple-600 hover:bg-purple-500",
      secondaryBg: "bg-pink-600 hover:bg-pink-500",
      text: "text-purple-100",
      muted: "text-purple-300/50",
      border: "border-purple-500/40",
      buttonClass: "neon-outline text-white",
      inputBg: "bg-slate-800/60",
      gradient: "from-purple-600 to-pink-500",
      digit0: "text-slate-400",
      digit1: "text-purple-400 text-glow",
      resultBg: "bg-slate-900/60",
      icon: "🎹",
      specialClass: "rgb-split",
    }
  };

  const currentTheme = themes[theme];

  const isBinary = (str) => {
    return /^[01]+$/.test(str);
  };

  const validateInputs = () => {
    if (!firstNumber || !secondNumber) {
      setError('Both input fields are required');
      shakeElement('error-message');
      return false;
    }

    if (!isBinary(firstNumber) || !isBinary(secondNumber)) {
      setError('Inputs must be binary numbers (only 0s and 1s)');
      shakeElement('error-message');
      return false;
    }

    setError('');
    return true;
  };
  
  const BinaryVisualizer = ({ binary, maxBits = 8 }) => {
    if (!binary || !isBinary(binary)) return null;
    
    const paddedBinary = binary.padStart(maxBits, '0');
    const decimal = parseInt(binary, 2);
    
    return (
      <div className={`flex flex-col space-y-4 p-4 w-full overflow-x-auto ${currentTheme.panelBg} rounded-lg my-4`}>
        <div className="flex justify-between items-center">
          <h3 className={`text-sm font-medium ${currentTheme.accent}`}>Binary Visualization</h3>
          <div className={`text-xs ${currentTheme.muted}`}>
            <span className="mr-1">Bits:</span>
            <select 
              value={visualizationBits}
              onChange={(e) => setVisualizationBits(parseInt(e.target.value))}
              className={`bg-transparent border ${currentTheme.border} rounded px-1`}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-center items-center space-x-1 overflow-x-auto pb-2 snap-x">
          {paddedBinary.split('').map((bit, index) => {
            const position = paddedBinary.length - index - 1;
            const value = Math.pow(2, position);
            
            return (
              <div 
                key={index} 
                className={`binary-bit ${bit === '1' ? 'binary-bit-1' : 'binary-bit-0'} ${currentTheme.specialClass} snap-center`}
              >
                <span className={`binary-bit-position ${currentTheme.accent}`}>2<sup>{position}</sup></span>
                {bit}
                <span className={`binary-bit-value ${bit === '0' ? 'opacity-50' : ''} ${currentTheme.muted}`}>
                  {bit === '1' ? value : 0}
                </span>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div className={`${currentTheme.text}`}>
            Binary: <span className="font-mono">{binary}</span>
          </div>
          <div className={`${currentTheme.accent}`}>
            Decimal: <span className="font-mono">{decimal}</span>
          </div>
        </div>
        
        <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${currentTheme.gradient}`}
            style={{ 
              width: `${Math.min(100, (decimal / Math.pow(2, maxBits)) * 100)}%`,
              transition: 'width 0.5s ease-out'
            }}
          />
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-2">
          <div className={`text-xs ${currentTheme.muted}`}>
            <span>Hex: </span>
            <span className="font-mono">{decimal.toString(16).toUpperCase()}</span>
          </div>
          <div className={`text-xs ${currentTheme.muted}`}>
            <span>Octal: </span>
            <span className="font-mono">{decimal.toString(8)}</span>
          </div>
          <div className={`text-xs ${currentTheme.muted}`}>
            <span>ASCII: </span>
            <span className="font-mono">
              {decimal >= 32 && decimal <= 126 ? String.fromCharCode(decimal) : '—'}
            </span>
          </div>
        </div>
      </div>
    );
  };
  
  const convertFromBinary = (binary, targetBase) => {
    if (!binary || !isBinary(binary)) return '';
    
    const decimal = parseInt(binary, 2);
    
    switch (targetBase) {
      case 'decimal': 
        return decimal.toString();
      case 'hexadecimal': 
        return '0x' + decimal.toString(16).toUpperCase();
      case 'octal': 
        return '0' + decimal.toString(8);
      case 'ascii':
        return decimal >= 32 && decimal <= 126 
          ? String.fromCharCode(decimal) 
          : 'Non-printable';
      case 'custom':
        if (!customBase || parseInt(customBase) <= 1 || isNaN(parseInt(customBase)))
          return 'Invalid base';
        return decimal.toString(parseInt(customBase));
      default:
        return decimal.toString();
    }
  };
  
  const convertToBinary = (value, sourceBase) => {
    if (!value) return '';
    
    let decimal;
    
    try {
      switch (sourceBase) {
        case 'decimal':
          decimal = parseInt(value, 10);
          break;
        case 'hexadecimal':
          const hexVal = value.startsWith('0x') ? value.slice(2) : value;
          decimal = parseInt(hexVal, 16);
          break;
        case 'octal':
          const octalVal = value.startsWith('0') ? value.slice(1) : value;
          decimal = parseInt(octalVal, 8);
          break;
        case 'custom':
          if (!customBase || parseInt(customBase) <= 1 || isNaN(parseInt(customBase)))
            return 'Invalid base';
          decimal = parseInt(value, parseInt(customBase));
          break;
        default:
          decimal = parseInt(value, 10);
      }
      
      if (isNaN(decimal)) return 'Invalid input';
      return decimal.toString(2);
    } catch (e) {
      return 'Conversion error';
    }
  };
  
  // Calculate bitwise operations
  const calculateBitwiseOperation = () => {
    if (!isBinary(firstNumber) && bitwiseOp !== 'NOT') {
      return 'Invalid first number';
    }
    
    if (!isBinary(secondNumber) && 
        bitwiseOp !== 'NOT' && 
        bitwiseOp !== 'LEFT SHIFT' && 
        bitwiseOp !== 'RIGHT SHIFT') {
      return 'Invalid second number';
    }
    
    try {
      const num1 = parseInt(firstNumber || '0', 2);
      const num2 = bitwiseOp !== 'NOT' && bitwiseOp !== 'LEFT SHIFT' && bitwiseOp !== 'RIGHT SHIFT' 
        ? parseInt(secondNumber || '0', 2) 
        : 0;
        
      const shiftAmount = parseInt(customBase || '1', 10);
      
      let result;
      
      switch (bitwiseOp) {
        case 'AND':
          result = num1 & num2;
          break;
        case 'OR':
          result = num1 | num2;
          break;
        case 'XOR':
          result = num1 ^ num2;
          break;
        case 'NOT':
          result = ~num1 & 0xff;
          break;
        case 'LEFT SHIFT':
          result = num1 << shiftAmount;
          break;
        case 'RIGHT SHIFT':
          result = num1 >> shiftAmount;
          break;
        default:
          result = 0;
      }
      
      return result.toString(2);
    } catch (error) {
      return 'Calculation error';
    }
  };
  
  const calculateLogicGate = (gate, a, b) => {
    switch (gate) {
      case 'AND':
        return a && b ? 1 : 0;
      case 'OR':
        return a || b ? 1 : 0;
      case 'NAND':
        return a && b ? 0 : 1;
      case 'NOR':
        return a || b ? 0 : 1;
      case 'XOR':
        return (a ? 1 : 0) ^ (b ? 1 : 0);
      case 'XNOR':
        return (a ? 1 : 0) ^ (b ? 1 : 0) ? 0 : 1;
      case 'NOT':
        return a ? 0 : 1;
      case 'BUFFER':
        return a ? 1 : 0;
      default:
        return 0;
    }
  };
  
  const getGateSymbolPath = (gate) => {
    switch (gate) {
      case 'AND':
        return "M40,30 L40,120 L100,120 A40,40 0 0 0 100,30 Z";
      case 'OR':
        return "M40,30 Q70,30 100,75 Q70,120 40,120 Q60,75 40,30 Z";
      case 'NAND':
        return "M40,30 L40,120 L100,120 A40,40 0 0 0 100,30 Z M140,75 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0";
      case 'NOR':
        return "M40,30 Q70,30 100,75 Q70,120 40,120 Q60,75 40,30 Z M140,75 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0";
      case 'XOR':
        return "M30,30 Q50,30 80,75 Q50,120 30,120 Q50,75 30,30 Z M40,30 Q70,30 100,75 Q70,120 40,120 Q60,75 40,30 Z";
      case 'XNOR':
        return "M30,30 Q50,30 80,75 Q50,120 30,120 Q50,75 30,30 Z M40,30 Q70,30 100,75 Q70,120 40,120 Q60,75 40,30 Z M140,75 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0";
      case 'NOT':
        return "M40,30 L40,120 L100,75 Z M110,75 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0";
      case 'BUFFER':
        return "M40,30 L40,120 L100,75 Z";
      default:
        return "";
    }
  };
  
  const resetGateAnimation = () => {
    setGateAnimationStep(0);
    setGateAnimationPlaying(false);
  };
  
  const playGateAnimation = () => {
    resetGateAnimation();
    setGateAnimationPlaying(true);
    setTimeout(() => setGateAnimationStep(1), 500);  // Input A lights up
    setTimeout(() => setGateAnimationStep(2), 1000); // Input B lights up (if applicable)
    setTimeout(() => setGateAnimationStep(3), 1500); // Gate processing
    setTimeout(() => {
      setGateAnimationStep(4); // Output lights up
      setGateAnimationPlaying(false);
    }, 2000);
  };
  
  const getTruthTable = (gate) => {
    switch (gate) {
      case 'AND':
        return [
          { a: 0, b: 0, out: 0 },
          { a: 0, b: 1, out: 0 },
          { a: 1, b: 0, out: 0 },
          { a: 1, b: 1, out: 1 }
        ];
      case 'OR':
        return [
          { a: 0, b: 0, out: 0 },
          { a: 0, b: 1, out: 1 },
          { a: 1, b: 0, out: 1 },
          { a: 1, b: 1, out: 1 }
        ];
      case 'NAND':
        return [
          { a: 0, b: 0, out: 1 },
          { a: 0, b: 1, out: 1 },
          { a: 1, b: 0, out: 1 },
          { a: 1, b: 1, out: 0 }
        ];
      case 'NOR':
        return [
          { a: 0, b: 0, out: 1 },
          { a: 0, b: 1, out: 0 },
          { a: 1, b: 0, out: 0 },
          { a: 1, b: 1, out: 0 }
        ];
      case 'XOR':
        return [
          { a: 0, b: 0, out: 0 },
          { a: 0, b: 1, out: 1 },
          { a: 1, b: 0, out: 1 },
          { a: 1, b: 1, out: 0 }
        ];
      case 'XNOR':
        return [
          { a: 0, b: 0, out: 1 },
          { a: 0, b: 1, out: 0 },
          { a: 1, b: 0, out: 0 },
          { a: 1, b: 1, out: 1 }
        ];
      case 'NOT':
        return [
          { a: 0, out: 1 },
          { a: 1, out: 0 }
        ];
      case 'BUFFER':
        return [
          { a: 0, out: 0 },
          { a: 1, out: 1 }
        ];
      default:
        return [];
    }
  };
  
  // Get gate description for educational purposes
  const getGateDescription = (gate) => {
    switch (gate) {
      case 'AND':
        return "The AND gate outputs 1 only when all inputs are 1. Otherwise, it outputs 0. It's like a series circuit where all switches must be closed for the light to turn on.";
      case 'OR':
        return "The OR gate outputs 1 if at least one input is 1. It outputs 0 only when all inputs are 0. It's like a parallel circuit where any closed switch will turn on the light.";
      case 'NAND':
        return "The NAND gate (NOT-AND) is the inverse of an AND gate. It outputs 0 only when all inputs are 1. Otherwise, it outputs 1. NAND gates are universal gates, meaning any logical function can be built using only NAND gates.";
      case 'NOR':
        return "The NOR gate (NOT-OR) is the inverse of an OR gate. It outputs 1 only when all inputs are 0. Otherwise, it outputs 0. NOR gates are universal gates, meaning any logical function can be built using only NOR gates.";
      case 'XOR':
        return "The XOR (Exclusive OR) gate outputs 1 when exactly one input is 1. It outputs 0 when both inputs are the same. XOR is often used in binary addition and parity checking.";
      case 'XNOR':
        return "The XNOR (Exclusive NOR) gate is the inverse of XOR. It outputs 1 when both inputs are the same and 0 when they differ. It's sometimes called an equivalence gate.";
      case 'NOT':
        return "The NOT gate (inverter) outputs the opposite of its input. It changes 1 to 0 and 0 to 1. It's the simplest gate and acts like a logical negation.";
      case 'BUFFER':
        return "The BUFFER gate outputs the same value as its input. It doesn't change the logical value but can be used to amplify or isolate signals in electronic circuits.";
      default:
        return "";
    }
  };

  // Binary Search Algorithm Simulation
  const runBinarySearch = () => {
    // Reset and initialize the binary search
    setBinarySearchStep(0);
    const newLog = [];
    
    const arr = [...binarySearchArray].sort((a, b) => a - b);
    const target = binarySearchTarget;
    
    let left = 0;
    let right = arr.length - 1;
    let steps = [];
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      steps.push({
        left,
        mid,
        right,
        current: arr[mid],
        found: arr[mid] === target,
        array: arr.map((value, index) => ({
          value,
          isLeft: index === left,
          isRight: index === right,
          isMid: index === mid,
          isActive: index >= left && index <= right,
          isTarget: value === target
        }))
      });
      
      if (arr[mid] === target) {
        // Found the target
        newLog.push(`Found ${target} at index ${mid}`);
        break;
      } else if (arr[mid] < target) {
        newLog.push(`${arr[mid]} < ${target}, searching right half`);
        left = mid + 1;
      } else {
        newLog.push(`${arr[mid]} > ${target}, searching left half`);
        right = mid - 1;
      }
      
      if (left > right) {
        newLog.push(`${target} not found in the array`);
        steps.push({
          left: -1,
          mid: -1,
          right: -1,
          current: null,
          found: false,
          array: arr.map(value => ({
            value,
            isLeft: false,
            isRight: false,
            isMid: false,
            isActive: false,
            isTarget: value === target
          }))
        });
      }
    }
    
    setBinarySearchLog(newLog);
    return steps;
  };

  // Radix Sort (Binary) Algorithm Simulation
  const runRadixSort = () => {
    const arr = [...binarySort];
    const maxNum = Math.max(...arr);
    const maxBits = Math.floor(Math.log2(maxNum)) + 1;
    const steps = [];
    const newLog = [];
    
    // Create a deep copy of the array for sorting
    let sortedArray = [...arr];
    steps.push({
      array: sortedArray.map(value => ({ value, active: false })),
      message: "Initial array"
    });
    newLog.push("Starting Radix Sort (binary/base-2)");

    // Sort by each bit position, from least significant to most significant
    for (let bitPos = 0; bitPos < maxBits; bitPos++) {
      const zeroBucket = [];
      const oneBucket = [];
      
      // Distribute
      for (const num of sortedArray) {
        // Check the bit at position bitPos
        if ((num & (1 << bitPos)) === 0) {
          zeroBucket.push(num);
        } else {
          oneBucket.push(num);
        }
      }
      
      // Record current state before merging
      const currentState = {
        zeroBucket: zeroBucket.map(value => ({ value, active: true, bit: 0 })),
        oneBucket: oneBucket.map(value => ({ value, active: true, bit: 1 })),
        bitPosition: bitPos,
        message: `Sorting by bit position ${bitPos} (value ${Math.pow(2, bitPos)})`
      };
      steps.push(currentState);
      newLog.push(`Split by bit ${bitPos} (${Math.pow(2, bitPos)}): [${zeroBucket.join(", ")}] and [${oneBucket.join(", ")}]`);
      
      // Merge buckets
      sortedArray = [...zeroBucket, ...oneBucket];
      
      // Record state after merging
      steps.push({
        array: sortedArray.map(value => ({ 
          value, 
          active: true,
          from: zeroBucket.includes(value) ? 0 : 1
        })),
        message: `Merged after bit position ${bitPos}`
      });
      newLog.push(`Merged: [${sortedArray.join(", ")}]`);
    }
    
    // Final sorted array
    steps.push({
      array: sortedArray.map(value => ({ value, active: false, final: true })),
      message: "Final sorted array"
    });
    newLog.push(`Final sorted array: [${sortedArray.join(", ")}]`);
    
    setSortingLog(newLog);
    return steps;
  };

  // Generate binary representation of a decimal number with color highlight
  const getBinaryRepresentation = (decimal, highlightBit = -1, maxBits = 8) => {
    const binary = decimal.toString(2).padStart(maxBits, '0');
    return (
      <div className="flex space-x-1">
        {binary.split('').map((bit, index) => (
          <span 
            key={index} 
            className={`inline-block font-mono ${
              index === binary.length - 1 - highlightBit 
                ? `${currentTheme.accentBg} text-white px-1 rounded` 
                : bit === '1' ? currentTheme.accent : currentTheme.muted
            }`}
          >
            {bit}
          </span>
        ))}
      </div>
    );
  };

  const shakeElement = (id) => {
    if (!isMounted) return;
    
    const element = document.getElementById(id);
    if (element) {
      element.classList.add('animate-shake');
      setTimeout(() => {
        element.classList.remove('animate-shake');
      }, 500);
    }
  };

  const pulseElement = (id) => {
    if (!isMounted) return;
    
    const element = document.getElementById(id);
    if (element) {
      element.classList.add('animate-pulse');
      setTimeout(() => {
        element.classList.remove('animate-pulse');
      }, 500);
    }
  };

  const calculateResult = () => {
    if (!validateInputs()) return;

    setAnimating(true);
    
    const num1 = parseInt(firstNumber, 2);
    const num2 = parseInt(secondNumber, 2);
    let calculatedResult;

    try {
      switch (operation) {
        case '+':
          calculatedResult = (num1 + num2).toString(2);
          break;
        case '-':
          if (num2 > num1) {
            throw new Error('Result would be negative, which is not supported in this calculator');
          }
          calculatedResult = (num1 - num2).toString(2);
          break;
        case '*':
          calculatedResult = (num1 * num2).toString(2);
          break;
        case '/':
          if (num2 === 0) {
            throw new Error('Division by zero is not allowed');
          }
          // Convert to binary and keep only the integer part
          calculatedResult = Math.floor(num1 / num2).toString(2);
          break;
        default:
          calculatedResult = '0';
      }

      // Add to history
      const newHistoryItem = {
        id: Date.now(),
        first: firstNumber,
        second: secondNumber,
        operation: operation,
        result: calculatedResult,
        decimal1: num1,
        decimal2: num2,
        decimalResult: parseInt(calculatedResult, 2)
      };
      
      setHistory(prevHistory => [newHistoryItem, ...prevHistory.slice(0, 9)]);
      setResult(calculatedResult);
      setCalculationCount(prev => prev + 1);
      pulseElement('result-container');

      // Reset animation flag after a delay
      setTimeout(() => {
        setAnimating(false);
      }, 600);
    } catch (err) {
      setError(err.message);
      shakeElement('error-message');
      setAnimating(false);
    }
  };

  const handleClear = () => {
    setFirstNumber('');
    setSecondNumber('');
    setOperation('+');
    setResult('');
    setError('');
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const getOperationSymbol = (op) => {
    switch (op) {
      case '+': return '+';
      case '-': return '-';
      case '*': return '*';
      case '/': return '/';
      default: return op;
    }
  };

  // Confetti effect for milestone calculations
  useEffect(() => {
    if (!isMounted) return;
    
    if (calculationCount > 0 && calculationCount % 5 === 0) {
      setShowConfetti(true);
      
      // Hide confetti after 3 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [calculationCount, isMounted]);

  // If not mounted yet (server rendering), show a simple placeholder
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative">
        {showInputAlert && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg animate-bounce">
            Only binary digits (0 and 1) are allowed!
          </div>
        )}
        <div className="text-white text-2xl">Loading Binary Calculator...</div>
      </div>
    );
  }

  // Simulated confetti without the react-confetti package
  const renderConfetti = () => {
    if (!showConfetti) return null;
    
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {Array.from({ length: 100 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i % 5 === 0 ? 'bg-red-500' : 
              i % 5 === 1 ? 'bg-yellow-500' : 
              i % 5 === 2 ? 'bg-blue-500' : 
              i % 5 === 3 ? 'bg-green-500' : 
              'bg-purple-500'
            }`}
            style={{
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animation: `fall ${1 + Math.random() * 3}s linear forwards`,
            }}
          />
        ))}
      </div>
    );
  };

  // Matrix Rain effect
  const renderMatrixRain = () => {
    if (theme !== 'matrix') return null;
    
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {rainParticles.map((particle, i) => (
          <div 
            key={i}
            className={`absolute font-mono text-green-500 text-glow opacity-${Math.floor(Math.random() * 5) + 5}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              fontSize: `${particle.size}px`,
              animation: `fall ${particle.speed}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {particle.content}
          </div>
        ))}
      </div>
    );
  };

  // Static float elements - consistent between renders to prevent hydration issues
  const staticFloatElements = Array.from({ length: 20 }).map((_, i) => ({
    top: `${(i * 5) % 100}%`,
    left: `${(i * 7) % 100}%`,
    delay: `${(i * 0.2) % 5}s`,
    duration: `${5 + (i * 0.5) % 5}s`,
    scale: 1 + (i % 5) * 0.2,
    content: i % 2 === 0 ? '1' : '0'
  }));

  return (
    <div data-theme={theme} className={`min-h-screen ${theme === 'matrix' ? 'bg-black' : 'bg-[#0f172a] cyber-grid'} flex flex-col items-center overflow-hidden py-12 px-4 transition-all duration-500`}>
      {renderInputAlert()}
      {renderConfetti()}
      {renderMatrixRain()}
      
      {/* Decorative elements - not shown in matrix theme */}
      {theme !== 'matrix' && (
        <>
          <div className="fixed top-1/4 -left-20 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-float"></div>
          <div className="fixed bottom-1/4 -right-20 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        </>
      )}
      
      {/* Floating binary digits for non-matrix themes - with static positions to avoid hydration issues */}
      <div className="fixed inset-0 pointer-events-none">
        {staticFloatElements.map((elem, i) => (
          <div 
            key={i}
            className={`absolute text-xs ${elem.content === '1' ? currentTheme.digit1 : currentTheme.digit0} font-mono opacity-20 animate-float`}
            style={{
              top: elem.top,
              left: elem.left,
              animationDelay: elem.delay,
              animationDuration: elem.duration,
              transform: `scale(${elem.scale})`,
            }}
          >
            {elem.content}
          </div>
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative max-w-5xl w-full z-10">
        {/* Header with title and theme switcher */}
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-4xl sm:text-5xl font-bold ${currentTheme.accent} ${theme === 'matrix' ? 'text-glow-intense animate-glow-pulse' : 'text-glow'}`}>
            Binary<span className={`${theme === 'matrix' ? currentTheme.accent : 'text-white'}`}>Calculator</span>
          </h1>
          
          <div className="relative">
            <button 
              onClick={() => setShowThemeSelector(prev => !prev)}
              className={`h-10 px-3 rounded-full flex items-center justify-center space-x-2
                ${currentTheme.accentBg} ${currentTheme.buttonClass} transition-all duration-300 transform hover:scale-105 active:scale-95`}
              aria-label="Change theme"
            >
              <span className="text-lg">{currentTheme.icon}</span>
              <span className="hidden sm:inline">{currentTheme.name}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {showThemeSelector && (
              <div className="absolute right-0 top-12 z-50 bg-gray-900/95 backdrop-blur-lg rounded-lg p-3 shadow-2xl border border-gray-700 animate-fade-in grid grid-cols-2 gap-2 w-64">
                <div className="col-span-2 mb-1 text-xs text-gray-400">Select Theme</div>
                {Object.keys(themes).map((themeName) => (
                  <button
                    key={themeName}
                    onClick={() => {
                      changeTheme(themeName);
                      setShowThemeSelector(false);
                    }}
                    className={`p-2 rounded flex items-center space-x-2 transition-all duration-200
                      ${theme === themeName ? 'bg-gray-800 ring-1 ring-' + themes[themeName].accent.replace('text-', '') : 'hover:bg-gray-800/50'}`}
                    aria-label={`Switch to ${themes[themeName].name} theme`}
                  >
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${themes[themeName].accentBg}`}>
                      <span className="text-lg">{themes[themeName].icon}</span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className={`text-sm font-medium ${theme === themeName ? themes[themeName].accent : 'text-white'}`}>
                        {themes[themeName].name}
                      </span>
                      <span className="text-xs text-gray-400 truncate w-24">
                        {themes[themeName].description}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Main calculator UI */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 w-full">
          {/* Calculator panel */}
          <div className={`lg:col-span-3 ${currentTheme.panelBg} rounded-2xl p-6 shadow-xl transition-all duration-500 animate-fade-in relative overflow-hidden`}>
            {/* Background glowing effect for matrix theme */}
            {theme === 'matrix' && (
              <div className="absolute inset-0 bg-green-500/5 animate-pulse-slow pointer-events-none"></div>
            )}
          
            {/* Error message */}
            {error && (
              <div 
                id="error-message"
                className={`mb-6 p-4 rounded-md ${theme === 'matrix' ? 'bg-red-900/30 border border-red-700/50 text-red-400' : 'bg-red-500/20 border border-red-500/50 text-red-300'} animate-slide-in`}
              >
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}
            
            {/* Input fields */}
            <div className="space-y-6 relative z-10">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className={`text-sm font-medium ${currentTheme.text}`}>
                    First Binary Number
                  </label>
                  <button
                    onClick={() => setBinaryInputMode(binaryInputMode === 'text' ? 'visual' : 'text')}
                    className={`text-xs ${currentTheme.accent} hover:underline flex items-center space-x-1`}
                  >
                    <span>{binaryInputMode === 'text' ? 'Switch to Visual Mode' : 'Switch to Text Mode'}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M5 12a1 1 0 102 0V6.414l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L5 6.414V12z" />
                      <path d="M15 8a1 1 0 00-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                    </svg>
                  </button>
                </div>
                
                {binaryInputMode === 'text' ? (
                  <div className={`relative rounded-lg overflow-hidden ${currentTheme.border} border transition-all duration-300`}>
                    <input
                      type="text"
                      value={firstNumber}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const sanitizedValue = inputValue.replace(/[^01]/g, '');
                        setFirstNumber(sanitizedValue);
                        if (inputValue !== sanitizedValue) {
                          setShowInputAlert(true);
                          setTimeout(() => setShowInputAlert(false), 2000);
                        }
                      }}
                      placeholder="Enter binary number (e.g., 1010)"
                      className={`w-full p-4 outline-none font-mono ${currentTheme.inputBg} ${currentTheme.text} transition-all duration-300`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className={`text-xs font-mono ${currentTheme.accent} ${theme === 'matrix' ? 'animate-blink' : ''}`}>BIN</span>
                    </div>
                  </div>
                ) : (
                  <div className={`p-3 rounded-lg ${currentTheme.border} border transition-all duration-300 ${currentTheme.inputBg}`}>
                    <div className="flex flex-wrap justify-center gap-2 mb-2">
                      {Array.from({ length: 8 }).map((_, i) => {
                        const index = 7 - i;
                        const bit = firstNumber.padStart(8, '0')[index] || '0';
                        return (
                          <button
                            key={i}
                            onClick={() => {
                              const bits = firstNumber.padStart(8, '0').split('');
                              bits[index] = bit === '1' ? '0' : '1';
                              setFirstNumber(bits.join('').replace(/^0+/, '') || '0');
                            }}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-lg transition-all ${
                              bit === '1' 
                                ? `${currentTheme.accentBg} ${currentTheme.buttonClass} shadow-lg animate-glow-pulse` 
                                : `bg-gray-800 text-gray-400`
                            }`}
                          >
                            {bit}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <div className="flex space-x-10">
                        <span className={currentTheme.accent}>2<sup>7</sup></span>
                        <span className={currentTheme.accent}>2<sup>6</sup></span>
                        <span className={currentTheme.accent}>2<sup>5</sup></span>
                        <span className={currentTheme.accent}>2<sup>4</sup></span>
                        <span className={currentTheme.accent}>2<sup>3</sup></span>
                        <span className={currentTheme.accent}>2<sup>2</sup></span>
                        <span className={currentTheme.accent}>2<sup>1</sup></span>
                        <span className={currentTheme.accent}>2<sup>0</sup></span>
                      </div>
                    </div>
                  </div>
                )}
                
                {firstNumber && isBinary(firstNumber) && (
                  <div className="flex justify-between mt-1">
                    <p className={`text-xs ${currentTheme.muted}`}>
                      Decimal: {parseInt(firstNumber, 2)}
                    </p>
                    <p className={`text-xs ${currentTheme.muted}`}>
                      Hex: 0x{parseInt(firstNumber, 2).toString(16).toUpperCase()}
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${currentTheme.text}`}>
                  Operation
                </label>
                <div className={`relative ${currentTheme.border} border rounded-lg overflow-hidden`}>
                  <select
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                    className={`w-full p-4 appearance-none font-mono focus:outline-none ${currentTheme.inputBg} ${currentTheme.text}`}
                  >
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">×</option>
                    <option value="÷">÷</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${currentTheme.accent}`} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className={`text-sm font-medium ${currentTheme.text}`}>
                    Second Binary Number
                  </label>
                </div>
                
                {binaryInputMode === 'text' ? (
                  <div className={`relative rounded-lg overflow-hidden ${currentTheme.border} border transition-all duration-300`}>
                    <input
                      type="text"
                      value={secondNumber}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        const sanitizedValue = inputValue.replace(/[^01]/g, '');
                        setSecondNumber(sanitizedValue);
                        if (inputValue !== sanitizedValue) {
                          setShowInputAlert(true);
                          setTimeout(() => setShowInputAlert(false), 2000);
                        }
                      }}
                      placeholder="Enter binary number (e.g., 0101)"
                      className={`w-full p-4 outline-none font-mono ${currentTheme.inputBg} ${currentTheme.text} transition-all duration-300`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className={`text-xs font-mono ${currentTheme.accent} ${theme === 'matrix' ? 'animate-blink' : ''}`}>BIN</span>
                    </div>
                  </div>
                ) : (
                  <div className={`p-3 rounded-lg ${currentTheme.border} border transition-all duration-300 ${currentTheme.inputBg}`}>
                    <div className="flex flex-wrap justify-center gap-2 mb-2">
                      {Array.from({ length: 8 }).map((_, i) => {
                        const index = 7 - i;
                        const bit = secondNumber.padStart(8, '0')[index] || '0';
                        return (
                          <button
                            key={i}
                            onClick={() => {
                              const bits = secondNumber.padStart(8, '0').split('');
                              bits[index] = bit === '1' ? '0' : '1';
                              setSecondNumber(bits.join('').replace(/^0+/, '') || '0');
                            }}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center font-mono text-lg transition-all ${
                              bit === '1' 
                                ? `${currentTheme.accentBg} ${currentTheme.buttonClass} shadow-lg animate-glow-pulse` 
                                : `bg-gray-800 text-gray-400`
                            }`}
                          >
                            {bit}
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <div className="flex space-x-10">
                        <span className={currentTheme.accent}>2<sup>7</sup></span>
                        <span className={currentTheme.accent}>2<sup>6</sup></span>
                        <span className={currentTheme.accent}>2<sup>5</sup></span>
                        <span className={currentTheme.accent}>2<sup>4</sup></span>
                        <span className={currentTheme.accent}>2<sup>3</sup></span>
                        <span className={currentTheme.accent}>2<sup>2</sup></span>
                        <span className={currentTheme.accent}>2<sup>1</sup></span>
                        <span className={currentTheme.accent}>2<sup>0</sup></span>
                      </div>
                    </div>
                  </div>
                )}
                
                {secondNumber && isBinary(secondNumber) && (
                  <div className="flex justify-between mt-1">
                    <p className={`text-xs ${currentTheme.muted}`}>
                      Decimal: {parseInt(secondNumber, 2)}
                    </p>
                    <p className={`text-xs ${currentTheme.muted}`}>
                      Hex: 0x{parseInt(secondNumber, 2).toString(16).toUpperCase()}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={calculateResult}
                  disabled={animating}
                  className={`flex-1 ${currentTheme.accentBg} ${currentTheme.buttonClass} py-4 px-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none relative overflow-hidden ${theme === 'matrix' ? 'cyber-border' : ''}`}
                >
                  <span className="relative z-10 font-medium tracking-wide">CALCULATE</span>
                  <span className="absolute inset-0 bg-gradient-to-r opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                </button>
                <button
                  onClick={handleClear}
                  className={`flex-1 ${currentTheme.secondaryBg} ${currentTheme.buttonClass} py-4 px-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none relative overflow-hidden`}
                >
                  <span className="relative z-10 font-medium tracking-wide">CLEAR</span>
                  <span className="absolute inset-0 bg-gradient-to-r opacity-0 hover:opacity-20 transition-opacity duration-300"></span>
                </button>
              </div>
            </div>
            
            {/* Result display */}
            {result && (
              <div 
                id="result-container"
                className={`mt-8 rounded-xl p-5 ${currentTheme.resultBg} ${currentTheme.border} border animate-expand overflow-hidden relative`}
              >
                {/* Background grid effect for Matrix theme */}
                {theme === 'matrix' && (
                  <div className="absolute inset-0 retro-grid opacity-20 pointer-events-none"></div>
                )}
              
                <div className="flex justify-between items-center mb-2 relative z-10">
                  <h2 className={`text-lg font-medium ${currentTheme.text}`}>
                    <span className="mr-2">Result:</span>
                    <span className={`${currentTheme.accent} font-mono ${theme === 'matrix' ? 'animate-blink' : ''}`}>
                      {firstNumber} {getOperationSymbol(operation)} {secondNumber}
                    </span>
                  </h2>
                  <span className={`text-xs ${currentTheme.muted} ${theme === 'matrix' ? 'animate-blink' : ''}`}>
                    BINARY OUTPUT
                  </span>
                </div>
                
                <div className="relative">
                  {/* Binary result */}
                  <div className="flex items-center mt-1 overflow-x-auto">
                    <div className="flex-shrink-0 flex justify-center text-3xl font-mono">
                      <span className={`mr-2 ${currentTheme.muted}`}>=</span>
                      <div className="space-x-1">
                        {result.split('').map((digit, i) => (
                          <span
                            key={i}
                            className={`inline-block animate-float-digit ${digit === '1' ? currentTheme.digit1 : currentTheme.digit0}`}
                            style={{ animationDelay: `${i * 0.05}s` }}
                          >
                            {digit}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative grid lines with static elements */}
                  <div className="absolute inset-0 pointer-events-none opacity-20">
                    <div className="w-full h-full grid grid-cols-12 gap-1">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className={`border-r ${currentTheme.border}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 flex justify-between items-center relative z-10">
                  <div className={`text-sm ${currentTheme.muted} font-mono`}>
                    <span className="font-medium inline-block mr-2">
                      Decimal:
                    </span>
                    <span className={`${currentTheme.text} animate-fade-in inline-block`} style={{ animationDelay: '0.3s' }}>
                      {parseInt(result, 2).toLocaleString()}
                    </span>
                  </div>
                  <div className={`text-xs ${currentTheme.muted} font-mono`}>
                    {result.length} bits
                  </div>
                </div>
              </div>
            )}

            {/* Visualization and tools section */}
            <div className="mt-8">
              <h3 className={`text-lg font-medium ${currentTheme.accent} mb-3`}>Learning Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    setShowVisualization(!showVisualization);
                    if (showVisualization) {
                      setShowTools(false);
                      setShowBitwiseOps(false);
                      setShowTutorial(false);
                    }
                  }}
                  className={`${currentTheme.border} border rounded-xl p-4 ${currentTheme.specialClass} 
                    ${showVisualization 
                      ? `${currentTheme.accentBg} text-white` 
                      : `bg-gray-800/40 hover:bg-gray-700/60 ${currentTheme.text}`} 
                    transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center gap-2 shadow-lg`}
                  aria-label="Visualize Binary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-medium text-center">Visualize Binary</span>
                </button>
                
                <button
                  onClick={() => {
                    setShowTools(!showTools);
                    if (showTools) {
                      setShowVisualization(false);
                      setShowBitwiseOps(false);
                      setShowTutorial(false);
                    }
                  }}
                  className={`${currentTheme.border} border rounded-xl p-4 ${currentTheme.specialClass} 
                    ${showTools 
                      ? `${currentTheme.accentBg} text-white` 
                      : `bg-gray-800/40 hover:bg-gray-700/60 ${currentTheme.text}`} 
                    transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center gap-2 shadow-lg`}
                  aria-label="Binary Tools"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium text-center">Binary Tools</span>
                </button>
                
                <button
                  onClick={() => {
                    setShowBitwiseOps(!showBitwiseOps);
                    if (showBitwiseOps) {
                      setShowVisualization(false);
                      setShowTools(false);
                      setShowTutorial(false);
                    }
                  }}
                  className={`${currentTheme.border} border rounded-xl p-4 ${currentTheme.specialClass} 
                    ${showBitwiseOps 
                      ? `${currentTheme.accentBg} text-white` 
                      : `bg-gray-800/40 hover:bg-gray-700/60 ${currentTheme.text}`} 
                    transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center gap-2 shadow-lg`}
                  aria-label="Bitwise Operations"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  <span className="font-medium text-center">Bitwise Ops</span>
                </button>
                
                <button
                  onClick={() => {
                    setShowTutorial(!showTutorial);
                    setTutorialStep(0);
                    if (showTutorial) {
                      setShowVisualization(false);
                      setShowTools(false);
                      setShowBitwiseOps(false);
                      setShowAlgorithms(false);
                    }
                  }}
                  className={`${currentTheme.border} border rounded-xl p-4 ${currentTheme.specialClass} 
                    ${showTutorial 
                      ? `${currentTheme.accentBg} text-white` 
                      : `bg-gray-800/40 hover:bg-gray-700/60 ${currentTheme.text}`} 
                    transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center gap-2 shadow-lg`}
                  aria-label="Start Tutorial"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="font-medium text-center">Start Tutorial</span>
                </button>
                
                <button
                  onClick={() => {
                    setShowAlgorithms(!showAlgorithms);
                    if (showAlgorithms) {
                      setShowVisualization(false);
                      setShowTools(false);
                      setShowBitwiseOps(false);
                      setShowTutorial(false);
                      setShowLogicGates(false);
                    }
                  }}
                  className={`${currentTheme.border} border rounded-xl p-4 ${currentTheme.specialClass} 
                    ${showAlgorithms 
                      ? `${currentTheme.accentBg} text-white` 
                      : `bg-gray-800/40 hover:bg-gray-700/60 ${currentTheme.text}`} 
                    transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center gap-2 shadow-lg`}
                  aria-label="Binary Algorithms"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                  <span className="font-medium text-center">Binary Algorithms</span>
                </button>
                
                <button
                  onClick={() => {
                    setShowLogicGates(!showLogicGates);
                    if (showLogicGates) {
                      setShowVisualization(false);
                      setShowTools(false);
                      setShowBitwiseOps(false);
                      setShowTutorial(false);
                      setShowAlgorithms(false);
                    } else {
                      resetGateAnimation();
                    }
                  }}
                  className={`${currentTheme.border} border rounded-xl p-4 ${currentTheme.specialClass} 
                    ${showLogicGates 
                      ? `${currentTheme.accentBg} text-white` 
                      : `bg-gray-800/40 hover:bg-gray-700/60 ${currentTheme.text}`} 
                    transition-all duration-300 transform hover:scale-105 flex flex-col items-center justify-center gap-2 shadow-lg`}
                  aria-label="Logic Gates"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-medium text-center">Logic Gates</span>
                </button>
              </div>
            </div>
            
            {/* Binary Visualization */}
            {showVisualization && (
              <div className="mt-2 animate-fade-in">
                {result ? (
                  <BinaryVisualizer binary={result} maxBits={visualizationBits} />
                ) : (
                  <div className={`p-4 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} text-center ${currentTheme.muted}`}>
                    Perform a calculation to visualize the result
                  </div>
                )}
              </div>
            )}
            
            {/* Binary Tools Section */}
            {/* Binary Tools Section */}
            {showTools && (
              <div className={`mt-4 p-4 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} animate-fade-in`}>
                <h3 className={`text-base font-medium ${currentTheme.accent} mb-3`}>Binary Conversion Tools</h3>
                
                <div className="space-y-4">
                  {/* Conversion form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${currentTheme.text}`}>
                        Binary Input
                      </label>
                      <div className={`relative rounded-lg overflow-hidden ${currentTheme.border} border`}>
                        <input
                          type="text"
                          value={result || ''}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            const sanitizedValue = inputValue.replace(/[^01]/g, '');
                            setResult(sanitizedValue);
                            if (inputValue !== sanitizedValue) {
                              setShowInputAlert(true);
                              setTimeout(() => setShowInputAlert(false), 2000);
                            }
                          }}
                          placeholder="Enter binary number"
                          className={`w-full p-2 text-sm outline-none font-mono ${currentTheme.inputBg} ${currentTheme.text}`}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${currentTheme.text}`}>
                        Convert To
                      </label>
                      <div className={`relative rounded-lg overflow-hidden ${currentTheme.border} border`}>
                        <select
                          value={conversionBase}
                          onChange={(e) => setConversionBase(e.target.value)}
                          className={`w-full p-2 text-sm appearance-none font-mono ${currentTheme.inputBg} ${currentTheme.text}`}
                        >
                          <option value="decimal">Decimal</option>
                          <option value="hexadecimal">Hexadecimal</option>
                          <option value="octal">Octal</option>
                          <option value="ascii">ASCII</option>
                          <option value="custom">Custom Base</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Custom base input */}
                  {conversionBase === 'custom' && (
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${currentTheme.text}`}>
                        Custom Base (2-36)
                      </label>
                      <div className={`relative rounded-lg overflow-hidden ${currentTheme.border} border w-24`}>
                        <input
                          type="number"
                          min="2"
                          max="36"
                          value={customBase}
                          onChange={(e) => setCustomBase(e.target.value)}
                          className={`w-full p-2 text-sm outline-none font-mono ${currentTheme.inputBg} ${currentTheme.text}`}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Conversion result */}
                  <div>
                    <div className={`text-sm font-medium mb-1 ${currentTheme.text} flex justify-between items-center`}>
                      <span>Result:</span>
                      <span className={`text-xs ${currentTheme.muted}`}>{conversionBase.charAt(0).toUpperCase() + conversionBase.slice(1)}</span>
                    </div>
                    <div className={`p-3 rounded-lg ${currentTheme.resultBg} font-mono text-sm ${currentTheme.accent} min-h-[2.5rem] break-all`}>
                      {result && isBinary(result) 
                        ? convertFromBinary(result, conversionBase)
                        : <span className={currentTheme.muted}>Enter a valid binary number</span>
                      }
                    </div>
                  </div>
                  
                  {/* Binary operations guide */}
                  <div className="mt-4 border-t border-gray-700 pt-4">
                    <div className={`text-sm font-medium mb-2 ${currentTheme.accent}`}>Binary Operations Guide</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className={`${currentTheme.text}`}>
                        <div className="font-medium mb-1">Binary AND (&)</div>
                        <div className="font-mono">0 & 0 = 0</div>
                        <div className="font-mono">0 & 1 = 0</div>
                        <div className="font-mono">1 & 0 = 0</div>
                        <div className="font-mono">1 & 1 = 1</div>
                      </div>
                      <div className={`${currentTheme.text}`}>
                        <div className="font-medium mb-1">Binary OR (|)</div>
                        <div className="font-mono">0 | 0 = 0</div>
                        <div className="font-mono">0 | 1 = 1</div>
                        <div className="font-mono">1 | 0 = 1</div>
                        <div className="font-mono">1 | 1 = 1</div>
                      </div>
                      <div className={`${currentTheme.text} mt-2`}>
                        <div className="font-medium mb-1">Binary XOR (^)</div>
                        <div className="font-mono">0 ^ 0 = 0</div>
                        <div className="font-mono">0 ^ 1 = 1</div>
                        <div className="font-mono">1 ^ 0 = 1</div>
                        <div className="font-mono">1 ^ 1 = 0</div>
                      </div>
                      <div className={`${currentTheme.text} mt-2`}>
                        <div className="font-medium mb-1">Binary NOT (~)</div>
                        <div className="font-mono">~0 = 1</div>
                        <div className="font-mono">~1 = 0</div>
                        <div className="font-mono mt-1">Left Shift: &lt;&lt; (x2)</div>
                        <div className="font-mono">Right Shift: &gt;&gt; (/2)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Bitwise Operations Tool */}
            {showBitwiseOps && (
              <div className={`mt-4 p-4 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} animate-fade-in ${currentTheme.specialClass}`}>
                <h3 className={`text-base font-medium ${currentTheme.accent} mb-3`}>Bitwise Operations</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <div className="flex justify-between items-center mb-1">
                        <label className={`block text-sm font-medium ${currentTheme.text}`}>
                          Operation Type
                        </label>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {['AND', 'OR', 'XOR', 'NOT', 'LEFT SHIFT', 'RIGHT SHIFT'].map((op) => (
                          <button
                            key={op}
                            onClick={() => setBitwiseOp(op)}
                            className={`px-3 py-1 rounded text-xs transition-all ${
                              bitwiseOp === op 
                                ? currentTheme.accentBg
                                : `bg-gray-800 ${currentTheme.text}`
                            }`}
                          >
                            {op}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className={`block text-sm font-medium ${currentTheme.text}`}>
                          {bitwiseOp === 'LEFT SHIFT' || bitwiseOp === 'RIGHT SHIFT' ? 'Shift Amount' : 'Input Mode'}
                        </label>
                      </div>
                      {bitwiseOp === 'LEFT SHIFT' || bitwiseOp === 'RIGHT SHIFT' ? (
                        <div className={`relative rounded-lg overflow-hidden ${currentTheme.border} border w-24`}>
                          <input
                            type="number"
                            min="0"
                            max="31"
                            value={customBase || '1'}
                            onChange={(e) => setCustomBase(e.target.value)}
                            className={`w-full p-2 text-sm outline-none font-mono ${currentTheme.inputBg} ${currentTheme.text}`}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => setBinaryInputMode(binaryInputMode === 'text' ? 'visual' : 'text')}
                            className={`w-full py-1 px-2 rounded text-xs ${currentTheme.accentBg}`}
                          >
                            {binaryInputMode === 'text' ? 'Using Text Input' : 'Using Visual Input'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 rounded bg-black/30 relative">
                    <div className={`absolute top-2 right-2 text-xs ${currentTheme.muted}`}>
                      <button 
                        onClick={() => {
                          const calculatedResult = calculateBitwiseOperation();
                          setBitwiseResult(calculatedResult);
                        }}
                        className={`${currentTheme.accentBg} px-3 py-1 rounded-md text-white`}
                      >
                        Calculate
                      </button>
                    </div>
                  
                    <div className="flex items-center justify-center space-x-4 mb-6 pt-4">
                      <div className="text-center">
                        <div className={`text-sm ${currentTheme.muted} mb-1`}>First Number</div>
                        <div className={`text-lg font-mono ${currentTheme.text}`}>{firstNumber || '0'}</div>
                        <div className={`text-xs ${currentTheme.muted} mt-1`}>
                          Decimal: {firstNumber ? parseInt(firstNumber, 2) : 0}
                        </div>
                      </div>
                      
                      <div className={`text-2xl ${currentTheme.accent} font-bold`}>
                        {bitwiseOp === 'AND' ? '&' :
                         bitwiseOp === 'OR' ? '|' :
                         bitwiseOp === 'XOR' ? '^' :
                         bitwiseOp === 'NOT' ? '~' :
                         bitwiseOp === 'LEFT SHIFT' ? '\u00AB' :
                         bitwiseOp === 'RIGHT SHIFT' ? '\u00BB' : ''}
                      </div>
                      
                      {bitwiseOp !== 'NOT' && bitwiseOp !== 'LEFT SHIFT' && bitwiseOp !== 'RIGHT SHIFT' ? (
                        <div className="text-center">
                          <div className={`text-sm ${currentTheme.muted} mb-1`}>Second Number</div>
                          <div className={`text-lg font-mono ${currentTheme.text}`}>{secondNumber || '0'}</div>
                          <div className={`text-xs ${currentTheme.muted} mt-1`}>
                            Decimal: {secondNumber ? parseInt(secondNumber, 2) : 0}
                          </div>
                        </div>
                      ) : (
                        bitwiseOp === 'LEFT SHIFT' || bitwiseOp === 'RIGHT SHIFT' ? (
                          <div className="text-center">
                            <div className={`text-sm ${currentTheme.muted} mb-1`}>Shift By</div>
                            <div className={`text-lg font-mono ${currentTheme.text}`}>{customBase || '1'}</div>
                          </div>
                        ) : null
                      )}
                    </div>
                    
                    <div className={`mt-6 p-3 rounded-lg ${currentTheme.resultBg} ${currentTheme.border} border`}>
                      <div className="flex justify-between items-center mb-2">
                        <div className={`text-sm font-medium ${currentTheme.text}`}>Result:</div>
                        <div className={`text-xs ${currentTheme.muted}`}>Binary</div>
                      </div>
                      <div className={`font-mono text-lg ${currentTheme.accent} break-all text-center`}>
                        {bitwiseResult || <span className={currentTheme.muted}>Click Calculate</span>}
                      </div>
                      {bitwiseResult && (
                        <div className={`mt-2 text-xs ${currentTheme.muted} text-right`}>
                          Decimal: {parseInt(bitwiseResult, 2) || 0}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className={`text-xs ${currentTheme.muted} mt-2 text-center`}>
                    Bitwise operations are fundamental in computer programming for tasks like flags, permissions, and optimization.
                  </div>
                </div>
              </div>
            )}
            
            {/* Interactive Tutorial */}
            
            {/* Logic Gates Visualization */}
            {showLogicGates && (
              <div className={`mt-4 p-4 rounded-lg ${
                theme === 'matrix' ? 'bg-black/80 border-2 border-green-800/50' : currentTheme.inputBg
              } border ${theme === 'matrix' ? 'border-green-700/30' : currentTheme.border} animate-fade-in ${currentTheme.specialClass}`}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className={`text-base font-medium ${theme === 'matrix' ? 'text-green-400 text-glow-intense' : currentTheme.accent}`}>Logic Gates</h3>
                  <div className="flex flex-wrap gap-2">
                    {['AND', 'OR', 'NAND', 'NOR', 'XOR', 'XNOR', 'NOT', 'BUFFER'].map(gate => (
                      <button
                        key={gate}
                        onClick={() => {
                          setCurrentGate(gate);
                          resetGateAnimation();
                        }}
                        className={`px-3 py-1 text-xs rounded transition-all
                          ${currentGate === gate ? 
                            theme === 'matrix' ? 'bg-green-700 text-white text-glow' : currentTheme.accentBg 
                            : theme === 'matrix' ? 'bg-gray-900 border border-green-900/70' : 'bg-gray-800'}`}
                          style={theme === 'matrix' && currentGate === gate ? {boxShadow: '0 0 8px rgba(16,185,129,0.5)'} : {}}
                      >
                        {gate}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="min-h-[300px]">
                  <div className="mb-4">
                    <p className={`text-sm ${theme === 'matrix' ? 'text-green-400 font-medium' : currentTheme.text} mb-3 ${theme === 'matrix' ? 'text-glow' : ''}`}>
                      {getGateDescription(currentGate)}
                    </p>
                    
                    {/* Gate inputs controls */}
                    <div className="flex gap-4 mb-6">
                      <div className="flex-1">
                        <div className={`text-sm font-medium mb-2 ${theme === 'matrix' ? 'text-green-400' : currentTheme.text}`}>Input A</div>
                        <div className="flex justify-center">
                          <button
                            onClick={() => setGateInputs(prev => ({...prev, a: prev.a ? 0 : 1}))}
                            className={`w-16 h-16 rounded-full transition-all ${
                              gateInputs.a 
                                ? theme === 'matrix'
                                  ? 'bg-gradient-to-br from-green-600 to-teal-700 shadow-lg shadow-green-500/50' 
                                  : 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30' 
                                : theme === 'matrix'
                                  ? 'bg-gray-900 border border-green-800/50'
                                  : 'bg-gray-800 border border-gray-700'
                            }`}
                          >
                            <span className={`text-2xl font-mono ${theme === 'matrix' && gateInputs.a ? 'text-green-300 text-glow' : ''}`}>
                              {gateInputs.a}
                            </span>
                          </button>
                        </div>
                      </div>
                      
                      {currentGate !== 'NOT' && currentGate !== 'BUFFER' && (
                        <div className="flex-1">
                          <div className={`text-sm font-medium mb-2 ${theme === 'matrix' ? 'text-green-400' : currentTheme.text}`}>Input B</div>
                          <div className="flex justify-center">
                            <button
                              onClick={() => setGateInputs(prev => ({...prev, b: prev.b ? 0 : 1}))}
                              className={`w-16 h-16 rounded-full transition-all ${
                                gateInputs.b 
                                  ? theme === 'matrix'
                                    ? 'bg-gradient-to-br from-green-600 to-teal-700 shadow-lg shadow-green-500/50' 
                                    : 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg shadow-blue-500/30' 
                                  : theme === 'matrix'
                                    ? 'bg-gray-900 border border-green-800/50'
                                    : 'bg-gray-800 border border-gray-700'
                              }`}
                            >
                              <span className={`text-2xl font-mono ${theme === 'matrix' && gateInputs.b ? 'text-green-300 text-glow' : ''}`}>
                                {gateInputs.b}
                              </span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Gate animation */}
                    <div className="logic-gate">
                      <svg className="logic-gate-svg" viewBox="0 0 400 150">
                        {/* Gate symbol */}
                        <path 
                          d={getGateSymbolPath(currentGate)}
                          className={`gate-symbol logic-gate-path ${gateAnimationStep >= 3 || theme === 'matrix' ? 'logic-gate-animate' : ''}`}
                          style={{
                            stroke: `var(--${theme}-primary)`,
                            strokeWidth: theme === 'matrix' ? 3.5 : 2,
                            opacity: theme === 'matrix' ? 0.9 : 1
                          }}
                        />
                        
                        {/* Input wires */}
                        <path
                          d="M10,50 L40,50"
                          className={`logic-gate-path ${gateAnimationStep >= 1 || theme === 'matrix' ? 'logic-gate-animate' : ''}`}
                          style={{
                            stroke: gateInputs.a ? `var(--${theme}-primary)` : theme === 'matrix' ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.3)',
                            strokeWidth: theme === 'matrix' ? 3 : 3,
                            filter: theme === 'matrix' && gateInputs.a ? 'drop-shadow(0 0 3px var(--matrix-primary))' : 'none'
                          }}
                        />
                        
                        {currentGate !== 'NOT' && currentGate !== 'BUFFER' && (
                          <path
                            d="M10,100 L40,100"
                            className={`logic-gate-path ${gateAnimationStep >= 2 || theme === 'matrix' ? 'logic-gate-animate' : ''}`}
                            style={{
                              stroke: gateInputs.b ? `var(--${theme}-primary)` : theme === 'matrix' ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.3)',
                              strokeWidth: theme === 'matrix' ? 3 : 3,
                              filter: theme === 'matrix' && gateInputs.b ? 'drop-shadow(0 0 3px var(--matrix-primary))' : 'none'
                            }}
                          />
                        )}
                        
                        {/* Output wire */}
                        <path
                          d={currentGate.includes('NOT') || currentGate.includes('NOR') || currentGate.includes('NAND') ? 
                            "M148,75 L200,75" : 
                            "M100,75 L200,75"}
                          className={`logic-gate-path ${gateAnimationStep >= 4 || theme === 'matrix' ? 'logic-gate-animate' : ''}`}
                          style={{
                            stroke: calculateLogicGate(currentGate, gateInputs.a, gateInputs.b) ? 
                              `var(--${theme}-secondary)` : theme === 'matrix' ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.3)',
                            strokeWidth: theme === 'matrix' ? 3 : 3,
                            filter: theme === 'matrix' && calculateLogicGate(currentGate, gateInputs.a, gateInputs.b) ? 
                              'drop-shadow(0 0 4px var(--matrix-secondary))' : 'none'
                          }}
                        />
                        
                        {/* Input values */}
                        <circle 
                          cx="10" cy="50" 
                          className={`input-bit ${gateInputs.a ? 'input-bit-1' : 'input-bit-0'} ${gateAnimationStep >= 1 ? 'animate-pulse-slow' : ''}`}
                        />
                        
                        {currentGate !== 'NOT' && currentGate !== 'BUFFER' && (
                          <circle 
                            cx="10" cy="100" 
                            className={`input-bit ${gateInputs.b ? 'input-bit-1' : 'input-bit-0'} ${gateAnimationStep >= 2 ? 'animate-pulse-slow' : ''}`}
                          />
                        )}
                        
                        {/* Output value */}
                        <circle 
                          cx="200" cy="75" 
                          className={`output-bit ${
                            calculateLogicGate(currentGate, gateInputs.a, gateInputs.b) ? 
                              'output-bit-1' : 'output-bit-0'
                          } ${gateAnimationStep >= 4 ? 'gate-output-flash' : ''}`}
                        />
                        
                        {/* Data flow particles for animation */}
                        {gateAnimationStep >= 1 && gateAnimationStep < 4 && gateAnimationPlaying && (
                          <>
                            {gateInputs.a === 1 && (
                              <circle 
                                cx="25" cy="50" 
                                className="data-flow-particle flow-particle"
                                style={{"--flow-x-start": "0px", "--flow-y-start": "0px", "--flow-x-end": "15px", "--flow-y-end": "25px"}}
                              />
                            )}
                            
                            {gateInputs.b === 1 && currentGate !== 'NOT' && currentGate !== 'BUFFER' && (
                              <circle 
                                cx="25" cy="100" 
                                className="data-flow-particle flow-particle"
                                style={{"--flow-x-start": "0px", "--flow-y-start": "0px", "--flow-x-end": "15px", "--flow-y-end": "-25px"}}
                              />
                            )}
                          </>
                        )}
                        
                        {gateAnimationStep >= 4 && calculateLogicGate(currentGate, gateInputs.a, gateInputs.b) === 1 && (
                          <circle 
                            cx="150" cy="75" 
                            className="data-flow-particle flow-particle"
                            style={{"--flow-x-start": "0px", "--flow-y-start": "0px", "--flow-x-end": "50px", "--flow-y-end": "0px"}}
                          />
                        )}
                        
                        {/* Input labels */}
                        <text 
                          x="10" 
                          y="40" 
                          className={`text-xs ${theme === 'matrix' ? 'text-green-400' : currentTheme.muted} 
                            ${theme === 'matrix' && gateAnimationPlaying ? 'animate-pulse' : ''}`} 
                          textAnchor="middle"
                          style={theme === 'matrix' ? {
                            filter: gateAnimationPlaying ? 
                              'drop-shadow(0 0 4px rgba(16,185,129,0.9)) drop-shadow(0 0 8px rgba(16,185,129,0.7))' : 
                              'drop-shadow(0 0 2px rgba(16,185,129,0.7))',
                            fontWeight: 'bold'
                          } : {}}
                        >
                          A
                        </text>
                        {currentGate !== 'NOT' && currentGate !== 'BUFFER' && (
                          <text 
                            x="10" 
                            y="115" 
                            className={`text-xs ${theme === 'matrix' ? 'text-green-400' : currentTheme.muted}
                              ${theme === 'matrix' && gateAnimationPlaying ? 'animate-pulse' : ''}`} 
                            textAnchor="middle"
                            style={theme === 'matrix' ? {
                              filter: gateAnimationPlaying ? 
                                'drop-shadow(0 0 4px rgba(16,185,129,0.9)) drop-shadow(0 0 8px rgba(16,185,129,0.7))' : 
                                'drop-shadow(0 0 2px rgba(16,185,129,0.7))',
                              fontWeight: 'bold'
                            } : {}}
                          >
                            B
                          </text>
                        )}
                        
                        {/* Output label */}
                        <text 
                          x="200" 
                          y="65" 
                          className={`text-xs ${theme === 'matrix' ? 'text-green-400' : currentTheme.muted}
                            ${theme === 'matrix' && gateAnimationPlaying ? 'animate-pulse' : ''}`} 
                          textAnchor="middle"
                          style={theme === 'matrix' ? {
                            filter: gateAnimationPlaying ? 
                              'drop-shadow(0 0 4px rgba(16,185,129,0.9)) drop-shadow(0 0 8px rgba(16,185,129,0.7))' : 
                              'drop-shadow(0 0 2px rgba(16,185,129,0.7))',
                            fontWeight: 'bold'
                          } : {}}
                        >
                          OUT
                        </text>
                      </svg>
                    </div>
                    
                    {/* Animation controls */}
                    <div className="flex justify-center mt-4 space-x-4">
                      <button
                        onClick={() => {
                          // Add animation class to button if in Matrix theme
                          if (theme === 'matrix') {
                            const button = document.getElementById('play-animation-btn');
                            if (button) {
                              button.classList.remove('matrix-button-pulse');
                              // Trigger a reflow to restart the animation
                              void button.offsetWidth;
                              button.classList.add('matrix-button-pulse');
                            }
                          }
                          playGateAnimation();
                        }}
                        id="play-animation-btn"
                        disabled={gateAnimationPlaying}
                        className={`px-4 py-2 rounded-lg ${theme === 'matrix' ? 'bg-green-600 text-glow' : currentTheme.accentBg} text-white 
                          ${gateAnimationPlaying ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                        style={theme === 'matrix' ? {boxShadow: '0 0 8px rgba(16,185,129,0.7)'} : {}}
                      >
                        Play Animation
                      </button>
                      <button
                        onClick={() => {
                          // Add animation class to button if in Matrix theme
                          if (theme === 'matrix') {
                            const button = document.getElementById('reset-animation-btn');
                            if (button) {
                              button.classList.remove('matrix-button-pulse');
                              // Trigger a reflow to restart the animation
                              void button.offsetWidth;
                              button.classList.add('matrix-button-pulse');
                            }
                          }
                          resetGateAnimation();
                        }}
                        id="reset-animation-btn"
                        className={`px-4 py-2 rounded-lg ${theme === 'matrix' ? 'bg-gray-900 border border-green-700/50' : 'bg-gray-800'} text-white hover:scale-105`}
                        style={theme === 'matrix' ? {textShadow: '0 0 3px rgba(16,185,129,0.7)'} : {}}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  
                  {/* Truth Table */}
                  <div className="mt-8">
                    <h4 className={`text-sm font-medium ${theme === 'matrix' ? 'text-green-400 text-glow' : currentTheme.accent} mb-2`}>Truth Table</h4>
                    <div className="overflow-x-auto">
                      <table className="truth-table">
                        <thead>
                          <tr>
                            <th>A</th>
                            {currentGate !== 'NOT' && currentGate !== 'BUFFER' && <th>B</th>}
                            <th>OUT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getTruthTable(currentGate).map((row, index) => (
                            <tr 
                              key={index}
                              className={
                                (gateInputs.a === row.a && 
                                (currentGate === 'NOT' || currentGate === 'BUFFER' || gateInputs.b === row.b)) ? 
                                'active-row' : ''
                              }
                            >
                              <td>{row.a}</td>
                              {currentGate !== 'NOT' && currentGate !== 'BUFFER' && <td>{row.b}</td>}
                              <td>{row.out}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Algorithm Visualizations */}
            {showAlgorithms && (
              <div className={`mt-4 p-4 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} animate-fade-in ${currentTheme.specialClass}`}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className={`text-base font-medium ${currentTheme.accent}`}>Binary Algorithm Visualizations</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setAlgorithmType('binarySearch')}
                      className={`px-3 py-1 text-xs rounded ${algorithmType === 'binarySearch' ? currentTheme.accentBg : 'bg-gray-800'}`}
                    >
                      Binary Search
                    </button>
                    <button
                      onClick={() => setAlgorithmType('radixSort')}
                      className={`px-3 py-1 text-xs rounded ${algorithmType === 'radixSort' ? currentTheme.accentBg : 'bg-gray-800'}`}
                    >
                      Radix Sort (Binary)
                    </button>
                  </div>
                </div>
                
                <div className="min-h-[300px]">
                  {/* Binary Search Visualization */}
                  {algorithmType === 'binarySearch' && (
                    <div className="animate-fade-in">
                      <div className="mb-4">
                        <p className={`text-sm ${currentTheme.text} mb-3`}>
                          Binary search is an efficient algorithm that finds an element in a sorted array by repeatedly dividing the search space in half.
                        </p>
                        
                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="flex-1">
                            <div className={`text-sm font-medium mb-1 ${currentTheme.text}`}>Array (sorted):</div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={binarySearchArray.join(', ')}
                                onChange={(e) => {
                                  try {
                                    const newArray = e.target.value.split(',').map(num => parseInt(num.trim()));
                                    if (!newArray.some(isNaN)) {
                                      setBinarySearchArray(newArray);
                                    }
                                  } catch (e) {}
                                }}
                                className={`p-2 text-sm rounded ${currentTheme.inputBg} ${currentTheme.text} border ${currentTheme.border} w-full`}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <div className={`text-sm font-medium mb-1 ${currentTheme.text}`}>Target:</div>
                            <input
                              type="number"
                              value={binarySearchTarget}
                              onChange={(e) => setBinarySearchTarget(parseInt(e.target.value))}
                              className={`p-2 text-sm rounded ${currentTheme.inputBg} ${currentTheme.text} border ${currentTheme.border} w-20`}
                            />
                          </div>
                          
                          <div>
                            <div className={`text-sm font-medium mb-1 ${currentTheme.text}`}>Step:</div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => setBinarySearchStep(Math.max(0, binarySearchStep - 1))}
                                disabled={binarySearchStep === 0}
                                className={`p-1 rounded ${binarySearchStep === 0 ? 'opacity-50' : currentTheme.secondaryBg}`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <span className={`${currentTheme.text}`}>{binarySearchStep + 1}/{binarySearchSteps.length}</span>
                              <button
                                onClick={() => setBinarySearchStep(Math.min(binarySearchSteps.length - 1, binarySearchStep + 1))}
                                disabled={binarySearchStep >= binarySearchSteps.length - 1}
                                className={`p-1 rounded ${binarySearchStep >= binarySearchSteps.length - 1 ? 'opacity-50' : currentTheme.accentBg}`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Binary search visualization */}
                        {binarySearchSteps.length > 0 && binarySearchStep < binarySearchSteps.length && (
                          <div className={`p-4 rounded-lg bg-gray-900 border ${currentTheme.border}`}>
                            <div className="flex flex-wrap justify-center gap-2 mb-4">
                              {binarySearchSteps[binarySearchStep].array.map((item, idx) => (
                                <div
                                  key={idx}
                                  className={`w-12 h-12 flex items-center justify-center rounded ${
                                    item.isMid ? `${currentTheme.accentBg} text-white` :
                                    item.isTarget && item.isActive ? `bg-green-500/30 border-2 border-green-500` :
                                    item.isLeft ? `border-2 border-yellow-500` :
                                    item.isRight ? `border-2 border-blue-500` :
                                    item.isActive ? `${currentTheme.inputBg} border ${currentTheme.border}` :
                                    `bg-gray-800/50 text-gray-500`
                                  }`}
                                >
                                  <div className="text-center">
                                    <div className="font-mono">{item.value}</div>
                                    <div className="text-[10px] mt-0.5 opacity-70">
                                      {getBinaryRepresentation(item.value, -1, 4)}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <div className="grid grid-cols-3 gap-3 mb-3">
                              <div className={`p-2 rounded bg-gray-800/50 border border-yellow-500/50 text-center`}>
                                <div className="text-xs text-yellow-500">Left</div>
                                <div className={`font-mono ${currentTheme.text}`}>{binarySearchSteps[binarySearchStep].left}</div>
                              </div>
                              <div className={`p-2 rounded ${currentTheme.accentBg} text-center`}>
                                <div className="text-xs text-white/70">Middle</div>
                                <div className="font-mono text-white">{binarySearchSteps[binarySearchStep].mid}</div>
                              </div>
                              <div className={`p-2 rounded bg-gray-800/50 border border-blue-500/50 text-center`}>
                                <div className="text-xs text-blue-500">Right</div>
                                <div className={`font-mono ${currentTheme.text}`}>{binarySearchSteps[binarySearchStep].right}</div>
                              </div>
                            </div>
                            
                            <div className={`p-3 rounded bg-gray-800/30 border ${currentTheme.border} mb-3`}>
                              <div className="flex justify-between items-center mb-1">
                                <div className={`text-sm ${currentTheme.muted}`}>Middle value:</div>
                                <div className={`font-mono ${currentTheme.accent}`}>
                                  {binarySearchSteps[binarySearchStep].current}
                                </div>
                              </div>
                              <div className="flex justify-between items-center">
                                <div className={`text-sm ${currentTheme.muted}`}>Target value:</div>
                                <div className={`font-mono ${currentTheme.text}`}>
                                  {binarySearchTarget}
                                </div>
                              </div>
                            </div>
                            
                            {binarySearchLog.length > 0 && binarySearchStep < binarySearchLog.length && (
                              <div className={`p-2 rounded ${
                                binarySearchLog[binarySearchStep].includes('Found') ? 'bg-green-900/30 border border-green-700' :
                                binarySearchLog[binarySearchStep].includes('not found') ? 'bg-red-900/30 border border-red-700' :
                                'bg-gray-800/50'
                              }`}>
                                <div className={`text-sm ${
                                  binarySearchLog[binarySearchStep].includes('Found') ? 'text-green-400' :
                                  binarySearchLog[binarySearchStep].includes('not found') ? 'text-red-400' :
                                  currentTheme.text
                                }`}>
                                  {binarySearchLog[binarySearchStep]}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 text-xs text-center text-gray-400">
                        Binary search works in O(log n) time, making it very efficient for large datasets.
                        <br />It relies on the fact that the data must be sorted first.
                      </div>
                    </div>
                  )}
                  
                  {/* Radix Sort Visualization */}
                  {algorithmType === 'radixSort' && (
                    <div className="animate-fade-in">
                      <div className="mb-4">
                        <p className={`text-sm ${currentTheme.text} mb-3`}>
                          Radix Sort (binary version) sorts numbers by processing each bit position, from least significant to most significant.
                        </p>
                        
                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="flex-1">
                            <div className={`text-sm font-medium mb-1 ${currentTheme.text}`}>Array:</div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={binarySort.join(', ')}
                                onChange={(e) => {
                                  try {
                                    const newArray = e.target.value.split(',').map(num => parseInt(num.trim()));
                                    if (!newArray.some(isNaN)) {
                                      setBinarySort(newArray);
                                    }
                                  } catch (e) {}
                                }}
                                className={`p-2 text-sm rounded ${currentTheme.inputBg} ${currentTheme.text} border ${currentTheme.border} w-full`}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <div className={`text-sm font-medium mb-1 ${currentTheme.text}`}>Step:</div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => setBinSortStep(Math.max(0, binSortStep - 1))}
                                disabled={binSortStep === 0}
                                className={`p-1 rounded ${binSortStep === 0 ? 'opacity-50' : currentTheme.secondaryBg}`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </button>
                              <span className={`${currentTheme.text}`}>{binSortStep + 1}/{radixSortSteps.length}</span>
                              <button
                                onClick={() => setBinSortStep(Math.min(radixSortSteps.length - 1, binSortStep + 1))}
                                disabled={binSortStep >= radixSortSteps.length - 1}
                                className={`p-1 rounded ${binSortStep >= radixSortSteps.length - 1 ? 'opacity-50' : currentTheme.accentBg}`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Radix sort visualization */}
                        {radixSortSteps.length > 0 && binSortStep < radixSortSteps.length && (
                          <div className={`p-4 rounded-lg bg-gray-900 border ${currentTheme.border}`}>
                            <div className={`text-sm mb-3 ${currentTheme.accent} font-medium`}>
                              {radixSortSteps[binSortStep].message}
                            </div>
                            
                            {/* Display array */}
                            {radixSortSteps[binSortStep].array && (
                              <div className="flex flex-wrap justify-center gap-2 mb-4">
                                {radixSortSteps[binSortStep].array.map((item, idx) => (
                                  <div
                                    key={idx}
                                    className={`flex flex-col items-center p-2 rounded ${
                                      item.final ? `bg-green-900/30 border border-green-500` :
                                      item.from === 0 ? 'bg-blue-900/20 border border-blue-500/30' :
                                      item.from === 1 ? 'bg-purple-900/20 border border-purple-500/30' :
                                      item.active ? `${currentTheme.inputBg}` : 'bg-gray-800/50'
                                    }`}
                                  >
                                    <div className="font-mono text-lg">{item.value}</div>
                                    <div className="text-xs mt-1">
                                      {getBinaryRepresentation(item.value, radixSortSteps[binSortStep].bitPosition)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {/* Display buckets */}
                            {radixSortSteps[binSortStep].zeroBucket && radixSortSteps[binSortStep].oneBucket && (
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className={`p-3 rounded bg-blue-900/20 border border-blue-500/30`}>
                                  <div className="text-blue-400 text-sm mb-2">Bit 0 Bucket</div>
                                  <div className="flex flex-wrap gap-2">
                                    {radixSortSteps[binSortStep].zeroBucket.map((item, idx) => (
                                      <div key={idx} className="flex flex-col items-center p-2 bg-gray-800/50 rounded">
                                        <div className="font-mono">{item.value}</div>
                                        <div className="text-xs mt-1">
                                          {getBinaryRepresentation(item.value, radixSortSteps[binSortStep].bitPosition)}
                                        </div>
                                      </div>
                                    ))}
                                    {radixSortSteps[binSortStep].zeroBucket.length === 0 && (
                                      <div className="text-gray-500 italic">Empty</div>
                                    )}
                                  </div>
                                </div>
                                
                                <div className={`p-3 rounded bg-purple-900/20 border border-purple-500/30`}>
                                  <div className="text-purple-400 text-sm mb-2">Bit 1 Bucket</div>
                                  <div className="flex flex-wrap gap-2">
                                    {radixSortSteps[binSortStep].oneBucket.map((item, idx) => (
                                      <div key={idx} className="flex flex-col items-center p-2 bg-gray-800/50 rounded">
                                        <div className="font-mono">{item.value}</div>
                                        <div className="text-xs mt-1">
                                          {getBinaryRepresentation(item.value, radixSortSteps[binSortStep].bitPosition)}
                                        </div>
                                      </div>
                                    ))}
                                    {radixSortSteps[binSortStep].oneBucket.length === 0 && (
                                      <div className="text-gray-500 italic">Empty</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            {/* Log message */}
                            {sortingLog.length > 0 && binSortStep < sortingLog.length && (
                              <div className={`p-2 rounded bg-gray-800/50`}>
                                <div className={`text-sm ${currentTheme.text}`}>
                                  {sortingLog[binSortStep]}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 text-xs text-center text-gray-400">
                        Radix Sort is a non-comparative sorting algorithm that works in O(n*k) time, where k is the number of bits required to represent the largest number.
                        <br />It's very efficient when the range of numbers is limited.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {showTutorial && (
              <div className={`mt-4 p-4 rounded-lg ${currentTheme.inputBg} border ${currentTheme.border} animate-fade-in ${currentTheme.specialClass}`}>
                <div className="flex justify-between items-center mb-3">
                  <h3 className={`text-base font-medium ${currentTheme.accent}`}>Binary Calculator Tutorial</h3>
                  <div className={`text-xs ${currentTheme.muted}`}>
                    Step {tutorialStep + 1} of 5
                  </div>
                </div>
                
                <div className="min-h-[200px] relative">
                  {/* Tutorial content */}
                  <div className="space-y-4 animate-fade-in">
                    {tutorialStep === 0 && (
                      <div>
                        <h4 className={`text-lg ${currentTheme.text} mb-2`}>Welcome to the Binary Calculator!</h4>
                        <p className={`${currentTheme.text} mb-4`}>
                          This tutorial will guide you through the basics of binary numbers and how to use this calculator.
                        </p>
                        <div className={`p-3 rounded ${currentTheme.accentBg} bg-opacity-20 ${currentTheme.text}`}>
                          <p className="mb-2">
                            <span className={`${currentTheme.accent} font-medium`}>What is Binary?</span> Binary is a base-2 number system that uses only two digits: 0 and 1. It's the foundation of all computer operations.
                          </p>
                          <p>
                            Each position in a binary number represents a power of 2, starting from the rightmost digit (2⁰=1).
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {tutorialStep === 1 && (
                      <div>
                        <h4 className={`text-lg ${currentTheme.text} mb-2`}>Entering Binary Numbers</h4>
                        <p className={`${currentTheme.text} mb-4`}>
                          In this calculator, you can enter binary numbers in two ways:
                        </p>
                        <div className={`p-3 rounded ${currentTheme.accentBg} bg-opacity-20 ${currentTheme.text}`}>
                          <p className="mb-2">
                            <span className={`${currentTheme.accent} font-medium`}>Text Mode:</span> Type digits directly in the input field (only 0s and 1s).
                          </p>
                          <p className="mb-2">
                            <span className={`${currentTheme.accent} font-medium`}>Visual Mode:</span> Click on individual bits to toggle between 0 and 1.
                          </p>
                          <p>
                            Try switching between modes using the link above each input field!
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {tutorialStep === 2 && (
                      <div>
                        <h4 className={`text-lg ${currentTheme.text} mb-2`}>Performing Calculations</h4>
                        <p className={`${currentTheme.text} mb-3`}>
                          You can perform basic arithmetic operations with binary numbers:
                        </p>
                        <div className={`grid grid-cols-2 gap-3 p-3 rounded ${currentTheme.accentBg} bg-opacity-20 ${currentTheme.text}`}>
                          <div>
                            <div className={`${currentTheme.accent} font-medium mb-1`}>+</div>
                            <div className="text-sm">1010 + 0011 = 1101</div>
                            <div className="text-sm text-opacity-70">Decimal: 10 + 3 = 13</div>
                          </div>
                          <div>
                            <div className={`${currentTheme.accent} font-medium mb-1`}>-</div>
                            <div className="text-sm">1010 - 0011 = 0111</div>
                            <div className="text-sm text-opacity-70">Decimal: 10 - 3 = 7</div>
                          </div>
                          <div>
                            <div className={`${currentTheme.accent} font-medium mb-1`}>*</div>
                            <div className="text-sm">1010 * 0011 = 11110</div>
                            <div className="text-sm text-opacity-70">Decimal: 10 * 3 = 30</div>
                          </div>
                          <div>
                            <div className={`${currentTheme.accent} font-medium mb-1`}>/</div>
                            <div className="text-sm">1010 / 0011 = 0011</div>
                            <div className="text-sm text-opacity-70">Decimal: 10 / 3 = 3</div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {tutorialStep === 3 && (
                      <div>
                        <h4 className={`text-lg ${currentTheme.text} mb-2`}>Additional Features</h4>
                        <p className={`${currentTheme.text} mb-4`}>
                          This calculator includes several advanced features to explore:
                        </p>
                        <div className={`p-3 rounded ${currentTheme.accentBg} bg-opacity-20 ${currentTheme.text}`}>
                          <p className="mb-2">
                            <span className={`${currentTheme.accent} font-medium`}>Visualization:</span> See how binary digits map to decimal values.
                          </p>
                          <p className="mb-2">
                            <span className={`${currentTheme.accent} font-medium`}>Conversion Tools:</span> Convert between binary and other number systems.
                          </p>
                          <p className="mb-2">
                            <span className={`${currentTheme.accent} font-medium`}>Bitwise Operations:</span> Perform AND, OR, XOR and other bit-level operations.
                          </p>
                          <p>
                            <span className={`${currentTheme.accent} font-medium`}>Themes:</span> Choose from multiple visual themes for the calculator.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {tutorialStep === 4 && (
                      <div>
                        <h4 className={`text-lg ${currentTheme.text} mb-2`}>Let's Practice!</h4>
                        <p className={`${currentTheme.text} mb-4`}>
                          Now you're ready to try using the calculator on your own:
                        </p>
                        <div className={`p-3 rounded ${currentTheme.accentBg} bg-opacity-20 ${currentTheme.text}`}>
                          <p className="mb-3">
                            <span className={`${currentTheme.accent} font-medium`}>Suggested exercise:</span> Try calculating the binary sum of 1010 and 0101.
                          </p>
                          <ol className="list-decimal list-inside pl-2 space-y-2">
                            <li>Enter 1010 as the first number</li>
                            <li>Select "+" as the operation</li>
                            <li>Enter 0101 as the second number</li>
                            <li>Click CALCULATE to see the result</li>
                            <li>You should get 1111 (decimal 15)</li>
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Tutorial navigation */}
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setTutorialStep(prev => Math.max(0, prev - 1))}
                      disabled={tutorialStep === 0}
                      className={`px-3 py-1 rounded text-sm ${tutorialStep === 0 ? 'opacity-50 cursor-not-allowed' : currentTheme.secondaryBg}`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => {
                        if (tutorialStep < 4) {
                          setTutorialStep(prev => prev + 1);
                        } else {
                          setShowTutorial(false);
                        }
                      }}
                      className={`px-3 py-1 rounded text-sm ${currentTheme.accentBg}`}
                    >
                      {tutorialStep < 4 ? 'Next' : 'Finish Tutorial'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Matrix-style terminal output for Matrix theme */}
            {theme === 'matrix' && (
              <div className="mt-4 font-mono text-xs text-green-500/70">
                <div className="animate-blink">{'>'} system.binary.calculator.v2.1</div>
                <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>{'>'} user.session.active</div>
                <div className="animate-fade-in" style={{ animationDelay: '1s' }}>{'>'} calculations.total: {calculationCount}</div>
                {showVisualization && <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>{'>'} binary.visualization.enabled</div>}
                {showTools && <div className="animate-fade-in" style={{ animationDelay: '1.3s' }}>{'>'} advanced.tools.accessed</div>}
              </div>
            )}
          </div>
          
          {/* History and information panel */}
          <div className={`lg:col-span-2 ${currentTheme.panelBg} rounded-2xl p-6 shadow-xl h-full flex flex-col animate-fade-in relative overflow-hidden`} style={{ animationDelay: '0.2s' }}>
            {/* Background effect for Matrix theme */}
            {theme === 'matrix' && (
              <div className="absolute inset-0 bg-green-500/5 animate-pulse-slow pointer-events-none"></div>
            )}
          
            <div className="flex justify-between items-center mb-4 relative z-10">
              <h2 className={`text-xl font-medium ${currentTheme.accent} ${theme === 'matrix' ? 'animate-blink' : ''}`}>
                History
              </h2>
              <button 
                onClick={toggleHistory}
                className={`text-sm ${currentTheme.buttonClass} px-3 py-1 rounded hover:scale-105 active:scale-95 transition-transform duration-200`}
              >
                {showHistory ? 'Hide' : 'Show'}
              </button>
            </div>
            
            {showHistory && history.length > 0 ? (
              <div className="overflow-y-auto flex-grow space-y-3 pr-2 fancy-scrollbar relative z-10">
                {history.map((item) => (
                  <div 
                    key={item.id}
                    className={`${currentTheme.border} border rounded-lg p-3 hover:bg-opacity-30 transition-all ${currentTheme.inputBg} animate-fade-in`}
                  >
                    <div className="flex flex-col">
                      <div className={`font-mono text-sm mb-1 ${currentTheme.text}`}>
                        {item.first} {getOperationSymbol(item.operation)} {item.second}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className={`font-mono ${currentTheme.accent}`}>
                          = {item.result}
                        </div>
                        <div className={`text-xs ${currentTheme.muted}`}>
                          ({item.decimalResult})
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              showHistory ? (
                <div className={`flex-grow flex items-center justify-center ${currentTheme.muted} text-center relative z-10`}>
                  <p>No calculations yet</p>
                </div>
              ) : (
                <div className={`flex-grow flex items-center justify-center ${currentTheme.muted} text-center relative z-10`}>
                  <p>Click 'Show' to view calculation history</p>
                </div>
              )
            )}
            
            <div className={`mt-6 pt-4 border-t ${currentTheme.border} relative z-10`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className={`${currentTheme.accent} font-medium ${theme === 'matrix' ? 'animate-glow-pulse' : ''}`}>Learning Center</h3>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => setLearningTab('binary')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-all duration-300 
                      ${learningTab === 'binary' 
                        ? `${currentTheme.accentBg} text-white font-medium shadow-lg` 
                        : `bg-gray-800/40 hover:bg-gray-700/50 ${currentTheme.text}`}`}
                    aria-label="Basic binary concepts"
                  >
                    Basics
                  </button>
                  <button 
                    onClick={() => setLearningTab('conversions')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-all duration-300 
                      ${learningTab === 'conversions' 
                        ? `${currentTheme.accentBg} text-white font-medium shadow-lg` 
                        : `bg-gray-800/40 hover:bg-gray-700/50 ${currentTheme.text}`}`}
                    aria-label="Binary conversions"
                  >
                    Conversions
                  </button>
                  <button 
                    onClick={() => setLearningTab('operations')}
                    className={`px-3 py-1.5 text-sm rounded-md transition-all duration-300 
                      ${learningTab === 'operations' 
                        ? `${currentTheme.accentBg} text-white font-medium shadow-lg` 
                        : `bg-gray-800/40 hover:bg-gray-700/50 ${currentTheme.text}`}`}
                    aria-label="Binary operations"
                  >
                    Operations
                  </button>
                </div>
              </div>
              
              {/* Binary number system basics */}
              {learningTab === 'binary' && (
                <div className="animate-fade-in">
                  <p className={`text-sm ${currentTheme.text} mb-2`}>
                    Binary is a base-2 number system using only 0 and 1 digits. Each digit's position represents a power of 2.
                  </p>
                  <div className={`text-xs font-mono ${currentTheme.muted} mb-1`}>
                    Example: 1010₂ = 10₁₀
                  </div>
                  <div className={`grid grid-cols-4 gap-1 text-xs ${currentTheme.text} font-mono`}>
                    <div className={`${currentTheme.accent}`}>2³=8</div>
                    <div className={`${currentTheme.accent}`}>2²=4</div>
                    <div className={`${currentTheme.accent}`}>2¹=2</div>
                    <div className={`${currentTheme.accent}`}>2⁰=1</div>
                    <div>1</div>
                    <div>0</div>
                    <div>1</div>
                    <div>0</div>
                    <div>8</div>
                    <div>0</div>
                    <div>2</div>
                    <div>0</div>
                  </div>
                  <div className={`mt-3 text-xs ${currentTheme.muted}`}>
                    8 + 0 + 2 + 0 = 10
                  </div>
                  
                  <div className={`mt-3 text-xs ${currentTheme.text}`}>
                    <span className={`${currentTheme.accent} font-medium`}>Did you know?</span> Binary numbers are the foundation of all computing. Every piece of data in computers, from text to images, is stored as a sequence of binary digits (bits).
                  </div>
                </div>
              )}
              
              {/* Binary conversions */}
              {learningTab === 'conversions' && (
                <div className="animate-fade-in">
                  <p className={`text-sm ${currentTheme.text} mb-2`}>
                    Converting between number systems is essential in computing. Here's how to convert between commonly used formats:
                  </p>
                  
                  <div className="mt-2 space-y-2">
                    <div>
                      <div className={`text-xs font-medium ${currentTheme.accent}`}>Decimal to Binary</div>
                      <p className={`text-xs ${currentTheme.text}`}>
                        Divide by 2 repeatedly and read remainders in reverse.
                      </p>
                      <div className={`text-xs ${currentTheme.muted} font-mono`}>
                        Example: 10₁₀ = 1010₂
                      </div>
                    </div>
                    
                    <div>
                      <div className={`text-xs font-medium ${currentTheme.accent}`}>Binary to Hex</div>
                      <p className={`text-xs ${currentTheme.text}`}>
                        Group binary digits in sets of 4, then convert each set.
                      </p>
                      <div className={`text-xs ${currentTheme.muted} font-mono`}>
                        Example: 1010₂ = A₁₆
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 grid-rows-4 gap-1 mt-2">
                      <div className={`col-span-4 text-xs font-medium ${currentTheme.accent}`}>Hex to Binary Table</div>
                      <div className={`text-xs ${currentTheme.text} font-mono`}>0 = 0000</div>
                      <div className={`text-xs ${currentTheme.text} font-mono`}>1 = 0001</div>
                      <div className={`text-xs ${currentTheme.text} font-mono`}>2 = 0010</div>
                      <div className={`text-xs ${currentTheme.text} font-mono`}>3 = 0011</div>
                      <div className={`text-xs ${currentTheme.text} font-mono`}>4 = 0100</div>
                      <div className={`text-xs ${currentTheme.text} font-mono`}>5 = 0101</div>
                      <div className={`text-xs ${currentTheme.text} font-mono`}>6 = 0110</div>
                      <div className={`text-xs ${currentTheme.text} font-mono`}>7 = 0111</div>
                      <div className={`text-xs ${currentTheme.text} font-mono`}>8 = 1000</div>
                      <div className={`text-xs ${currentTheme.text} font-mono`}>9 = 1001</div>
                      <div className={`text-xs ${currentTheme.text} font-mono`}>A = 1010</div>
                      <div className={`text-xs ${currentTheme.text} font-mono`}>B = 1011</div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Binary operations */}
              {learningTab === 'operations' && (
                <div className="animate-fade-in">
                  <p className={`text-sm ${currentTheme.text} mb-2`}>
                    Binary operations are the foundation of computer logic. Here are some basic operations:
                  </p>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                    <div>
                      <div className={`text-xs font-medium ${currentTheme.accent}`}>Binary Addition</div>
                      <div className={`mt-1 text-xs ${currentTheme.text} font-mono`}>
                        0 + 0 = 0<br />
                        0 + 1 = 1<br />
                        1 + 0 = 1<br />
                        1 + 1 = 10 (carry the 1)
                      </div>
                    </div>
                    
                    <div>
                      <div className={`text-xs font-medium ${currentTheme.accent}`}>Binary Subtraction</div>
                      <div className={`mt-1 text-xs ${currentTheme.text} font-mono`}>
                        0 - 0 = 0<br />
                        1 - 0 = 1<br />
                        1 - 1 = 0<br />
                        0 - 1 = 1 (borrow)
                      </div>
                    </div>
                    
                    <div className="col-span-2 mt-1">
                      <div className={`text-xs font-medium ${currentTheme.accent}`}>Bitwise Operations</div>
                      <p className={`text-xs ${currentTheme.text}`}>
                        Used extensively in programming for efficient operations on binary data.
                      </p>
                      <div className={`text-xs ${currentTheme.muted} mt-1`}>
                        Example: 1010 AND 1100 = 1000
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Matrix-specific extra info */}
            {theme === 'matrix' && (
              <div className="mt-4 text-xs text-green-500/70 font-mono animate-fade-in" style={{ animationDelay: '1.5s' }}>
                <div>{'>'} system.access.granted</div>
                <div>{'>'} binary.operations.enabled</div>
                <div>{'>'} neural.link.established</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer with counter */}
        <div className={`mt-8 text-xs text-center ${currentTheme.muted} flex justify-center items-center space-x-2 animate-fade-in`} style={{ animationDelay: '0.4s' }}>
          <span>Calculations: {calculationCount}</span>
          <span>•</span>
          <span>Binary Calculator v2.0</span>
          <span>•</span>
          <span className="text-xs">Made with Next.js</span>
          <span>•</span>
          <span className="text-xs">© All Rights Reserved</span>
          <span>•</span>
          <span className="text-xs">Vibe-Coded by: Ferdinand John F. Dobli</span>
        </div>
      </div>
    </div>
  );
}