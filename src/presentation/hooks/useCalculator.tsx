import { useState, useRef, useEffect } from 'react';

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

  const lastOperation = useRef<Operator>(undefined);

  useEffect(() => {
    if (lastOperation.current) {
      const firstFormulaPart = formula.split(' ').at(0);
      setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
    } else {
      setFormula(`${number}`);
    }
  }, [number]);

  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
    lastOperation.current = undefined;
  };

  const deleteOperation = () => {
    let currentSign = '';
    let temporalNumber = '';
    if (number.includes('-')) {
      currentSign = '-';
      temporalNumber = number.substring(1);
    }
    if (temporalNumber.length > 1) {
      return setNumber(
        currentSign + temporalNumber.substring(0, temporalNumber.length - 1),
      );
    }

    setNumber('0');
  };

  const toggleSign = () => {
    if (number === '0') return;
    if (number.startsWith('-')) {
      setNumber(number.substring(1));
    } else {
      setNumber('-' + number);
    }
  };

  const buildNumber = (numberString: string) => {
    setNumber(number + numberString);
    if (number.includes('.') && numberString === '.') return;

    if (number.startsWith('0') || number.startsWith('-0')) {
      //para poner el punto decimal
      if (numberString === '.') {
        return setNumber(number + numberString);
      }
      //Evaluar si es otro cero y no hay punto

      if (numberString === '0' && number.includes('.')) {
        return setNumber(number + numberString);
      }

      //Evaluar si es diferente de cero, no hay punto y el primero numero
      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }
      //Evitar 00000.00

      if (numberString === '0' && !number.includes('.')) {
        return setNumber(number + numberString);
      }

      //Evaluar si es diferente de cero, no hay punto y el primero numero
      if (numberString !== '0' && !number.includes('.')) {
        return setNumber(numberString);
      }
      //Evitar 00000.00
      if (numberString === '0' && !number.includes('.')) {
        return;
      }
      return setNumber(number + numberString);
    }
    //Si el numero no empieza con cero
    setNumber(number + numberString);
  };

  const setLastNumber = () => {
    if (number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1));
    } else {
      setPrevNumber(number);
    }
    setNumber('0');
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };
  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };
  const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.subtract;
  };
  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };

  const calculateResult = () => {
    const result = calculateSubResult();
    setFormula(`${result}`);
    lastOperation.current = undefined;
    setPrevNumber('0');
  };

  const calculateSubResult = (): number => {
    const [firstValue, operator, secondValue] = formula.split(' ');
    const num1 = Number(firstValue);
    const num2 = Number(secondValue);

    if (isNaN(num2)) return num1;

    switch (lastOperation.current) {
      case Operator.add:
        return num1 + num2;
      case Operator.subtract:
        return num1 - num2;

      case Operator.multiply:
        return num1 * num2;
      case Operator.divide:
        if (num1 === 0) {
          return 0;
        } else {
          return num1 / num2;
        }
      default:
        return 0;
    }
  };

  return {
    //Properties
    number,
    toggleSign,
    prevNumber,
    formula,
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
