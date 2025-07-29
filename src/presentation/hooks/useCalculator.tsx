import { useState, useEffect } from 'react';

enum Operator {
  add = '+',
  subtract = '-',
  multiply = 'x',
  divide = '/',
}

const useCalculator = () => {
  const [formula, setFormula] = useState('');
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');
  const [lastOperation, setLastOperation] = useState<Operator | undefined>(undefined);
  const [justCalculated, setJustCalculated] = useState(false);
  const [displayFormula, setDisplayFormula] = useState(''); // For the first text
  const [result, setResult] = useState('0'); // For the second text

  useEffect(() => {
    if (justCalculated) {
      // After calculation, show empty formula and result
      setDisplayFormula('');
      setResult(number);
    } else if (lastOperation && prevNumber !== '0') {
      // During operation, show full formula and current number
      setDisplayFormula(`${prevNumber} ${lastOperation}`);
      setResult(number);
    } else {
      // Default state, no formula, just current number
      setDisplayFormula('');
      setResult(number);
    }
    
    // Keep the old formula logic for internal calculations
    if (justCalculated) {
      setFormula(number);
    } else if (lastOperation && prevNumber !== '0') {
      setFormula(`${prevNumber} ${lastOperation} ${number}`);
    } else {
      setFormula(number);
    }
  }, [number, prevNumber, lastOperation, justCalculated]);

  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
    setLastOperation(undefined);
    setFormula('');
    setJustCalculated(false);
    setDisplayFormula('');
    setResult('0');
  };

  const deleteOperation = () => {
    let currentSign = '';
    let temporalNumber = '';
    if (number.includes('-')) {
      currentSign = '-';
      temporalNumber = number.substring(1);
    }
    if (temporalNumber.length > 1) {
      return setNumber(currentSign + temporalNumber.slice(0, -1))
    }

    setNumber('0');
  };

  const toggleSign = () => {
    if (number.includes('-')) {
      return setNumber(number.replace('-', ''));
    }

    setNumber('-' + number);
  };

  const buildNumber = (numberString: string) => {
    if (justCalculated) {
      // If we just calculated, start fresh with the new number
      setJustCalculated(false);
      setPrevNumber('0');
      if (numberString === '.') {
        return setNumber('0.');
      }
      return setNumber(numberString);
    }
    
    if (number.includes('.') && numberString === '.') return;

    if (number.startsWith('0') || number.startsWith('-0')) {
      // Punto decimal
      if (numberString === '.') {
        return setNumber(number + numberString);
      }

      // Evaluar si es otro cero y no hay punto
      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }

      // Evaluar si es diferente de cero, no hay punto, y es el primer numero
      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }

      // Evitar 000000.00
      if (numberString === '0' && !number.includes('.')) {
        return;
      }

      return setNumber(number + numberString);
    }

    setNumber(number + numberString);
  };

  const setLastNumber = () => {
    setJustCalculated(false);
    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1));
    } else {
      setPrevNumber(number);
    }
    setNumber('0');
  };

  const divideOperation = () => {
    setJustCalculated(false);
    if (lastOperation && prevNumber !== '0') {
      const result = calculateSubResult();
      setFormula(`${result}`);
      setPrevNumber(result.toString());
      setNumber('0');
    } else {
      setLastNumber();
    }
    setLastOperation(Operator.divide);
  };
  
  const multiplyOperation = () => {
    setJustCalculated(false);
    if (lastOperation && prevNumber !== '0') {
      const result = calculateSubResult();
      setFormula(`${result}`);
      setPrevNumber(result.toString());
      setNumber('0');
    } else {
      setLastNumber();
    }
    setLastOperation(Operator.multiply);
  };
  
  const subtractOperation = () => {
    setJustCalculated(false);
    if (lastOperation && prevNumber !== '0') {
      const result = calculateSubResult();
      setFormula(`${result}`);
      setPrevNumber(result.toString());
      setNumber('0');
    } else {
      setLastNumber();
    }
    setLastOperation(Operator.subtract);
  };
  
  const addOperation = () => {
    setJustCalculated(false);
    if (lastOperation && prevNumber !== '0') {
      const result = calculateSubResult();
      setFormula(`${result}`);
      setPrevNumber(result.toString());
      setNumber('0');
    } else {
      setLastNumber();
    }
    setLastOperation(Operator.add);
  };

  const calculateResult = () => {
    if (!lastOperation) {
      // No operation to perform, just keep the current number
      return;
    }
    
    const result = calculateSubResult();
    
    // Clear operation state and mark as just calculated
    setLastOperation(undefined);
    setPrevNumber('0');
    setJustCalculated(true);
    
    // Set the result
    setNumber(result.toString());
  };

  const calculateSubResult = (): number => {
    const num1 = Number(prevNumber);
    const num2 = Number(number);

    if (isNaN(num1) || isNaN(num2)) return num2 || 0;
    if (!lastOperation) return num2;

    switch (lastOperation) {
      case Operator.add:
        return num1 + num2;
      case Operator.subtract:
        return num1 - num2;
      case Operator.multiply:
        return num1 * num2;
      case Operator.divide:
        if (num2 === 0) return 0; // Prevent division by zero
        return num1 / num2;
      default:
        return num2;
    }
  };

  return {
    //Properties
    number,
    toggleSign,
    prevNumber,
    formula,
    displayFormula, // For the first text
    result, // For the second text
    //Methods
    buildNumber,
    clean,
    deleteOperation,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
    calculateResult,
  };
};

export default useCalculator;
