import  { useState, useRef } from 'react';


enum Operator {
  add,
  subtract,
  multiply,
  divide,
}


const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const [prevNumber, setPrevNumber] = useState('0');

  const lastOperation = useRef<Operator>(Operator.add);

  const clean = () => {
    setNumber('0');
    setPrevNumber('0');
  };

  const deleteOperation = () => {
    let currentSign = '';
    let temporalNumber = '';
    if (number.includes('-')) {
      currentSign = '-';
      temporalNumber = number.substring(1);
    }
    if(temporalNumber.length > 1) {
     return setNumber(currentSign + temporalNumber.substring(0, temporalNumber.length - 1));
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
    if(number.endsWith('.')) {
      setPrevNumber(number.slice(0, -1));
    }else {
      setPrevNumber(number);
    }
    setNumber('0');
  }


  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  }
   const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  }
   const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.subtract;
  }
   const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  }

  return {
    //Properties
    number,
    toggleSign,
    prevNumber,
    //Methods
    buildNumber,
    clean,
    deleteOperation,
    divideOperation,
    multiplyOperation,
    subtractOperation,
    addOperation,
  };
};

export default useCalculator;
