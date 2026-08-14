import React, { useState } from 'react';

export const CalculatorApp: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    const val = parseFloat(display);
    setDisplay((val * -1).toString());
  };

  const inputPercent = () => {
    const val = parseFloat(display);
    setDisplay((val / 100).toString());
  };

  const performOperation = (nextOp: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const currentVal = prevValue || 0;
      let computed = currentVal;

      switch (operation) {
        case '+': computed = currentVal + inputValue; break;
        case '-': computed = currentVal - inputValue; break;
        case '×': computed = currentVal * inputValue; break;
        case '÷': computed = inputValue !== 0 ? currentVal / inputValue : 0; break;
      }

      setPrevValue(computed);
      setDisplay(computed.toString());
    }

    setWaitingForOperand(true);
    setOperation(nextOp);
  };

  const handleEquals = () => {
    if (operation === null || prevValue === null) return;
    performOperation('=');
    setOperation(null);
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#1C1C1E] p-4 text-white font-sans select-none justify-between">
      {/* Display Screen */}
      <div className="flex flex-1 flex-col justify-end text-right px-3 py-2">
        <span className="text-4xl font-light tracking-tight overflow-x-auto text-white">
          {display}
        </span>
      </div>

      {/* Calculator Buttons Grid (Native macOS Dark Layout) */}
      <div className="grid grid-cols-4 gap-2 text-xl font-medium">
        {/* Row 1 */}
        <button
          onClick={clear}
          className="h-14 rounded-full bg-[#A5A5A5] text-black hover:bg-[#D4D4D2] active:bg-[#A5A5A5] transition-colors"
        >
          {display !== '0' || prevValue !== null ? 'C' : 'AC'}
        </button>
        <button
          onClick={toggleSign}
          className="h-14 rounded-full bg-[#A5A5A5] text-black hover:bg-[#D4D4D2] active:bg-[#A5A5A5] transition-colors"
        >
          ±
        </button>
        <button
          onClick={inputPercent}
          className="h-14 rounded-full bg-[#A5A5A5] text-black hover:bg-[#D4D4D2] active:bg-[#A5A5A5] transition-colors"
        >
          %
        </button>
        <button
          onClick={() => performOperation('÷')}
          className={`h-14 rounded-full text-white transition-colors ${
            operation === '÷' ? 'bg-white text-[#FF9F0A]' : 'bg-[#FF9F0A] hover:bg-[#FFB340] active:bg-[#CC7F08]'
          }`}
        >
          ÷
        </button>

        {/* Row 2 */}
        <button onClick={() => inputDigit('7')} className="h-14 rounded-full bg-[#333333] text-white hover:bg-[#444444] transition-colors">
          7
        </button>
        <button onClick={() => inputDigit('8')} className="h-14 rounded-full bg-[#333333] text-white hover:bg-[#444444] transition-colors">
          8
        </button>
        <button onClick={() => inputDigit('9')} className="h-14 rounded-full bg-[#333333] text-white hover:bg-[#444444] transition-colors">
          9
        </button>
        <button
          onClick={() => performOperation('×')}
          className={`h-14 rounded-full text-white transition-colors ${
            operation === '×' ? 'bg-white text-[#FF9F0A]' : 'bg-[#FF9F0A] hover:bg-[#FFB340] active:bg-[#CC7F08]'
          }`}
        >
          ×
        </button>

        {/* Row 3 */}
        <button onClick={() => inputDigit('4')} className="h-14 rounded-full bg-[#333333] text-white hover:bg-[#444444] transition-colors">
          4
        </button>
        <button onClick={() => inputDigit('5')} className="h-14 rounded-full bg-[#333333] text-white hover:bg-[#444444] transition-colors">
          5
        </button>
        <button onClick={() => inputDigit('6')} className="h-14 rounded-full bg-[#333333] text-white hover:bg-[#444444] transition-colors">
          6
        </button>
        <button
          onClick={() => performOperation('-')}
          className={`h-14 rounded-full text-white transition-colors ${
            operation === '-' ? 'bg-white text-[#FF9F0A]' : 'bg-[#FF9F0A] hover:bg-[#FFB340] active:bg-[#CC7F08]'
          }`}
        >
          −
        </button>

        {/* Row 4 */}
        <button onClick={() => inputDigit('1')} className="h-14 rounded-full bg-[#333333] text-white hover:bg-[#444444] transition-colors">
          1
        </button>
        <button onClick={() => inputDigit('2')} className="h-14 rounded-full bg-[#333333] text-white hover:bg-[#444444] transition-colors">
          2
        </button>
        <button onClick={() => inputDigit('3')} className="h-14 rounded-full bg-[#333333] text-white hover:bg-[#444444] transition-colors">
          3
        </button>
        <button
          onClick={() => performOperation('+')}
          className={`h-14 rounded-full text-white transition-colors ${
            operation === '+' ? 'bg-white text-[#FF9F0A]' : 'bg-[#FF9F0A] hover:bg-[#FFB340] active:bg-[#CC7F08]'
          }`}
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={() => inputDigit('0')}
          className="col-span-2 h-14 rounded-full bg-[#333333] text-white hover:bg-[#444444] text-left pl-6 transition-colors"
        >
          0
        </button>
        <button onClick={inputDecimal} className="h-14 rounded-full bg-[#333333] text-white hover:bg-[#444444] transition-colors">
          .
        </button>
        <button onClick={handleEquals} className="h-14 rounded-full bg-[#FF9F0A] text-white hover:bg-[#FFB340] active:bg-[#CC7F08] transition-colors">
          =
        </button>
      </div>
    </div>
  );
};
