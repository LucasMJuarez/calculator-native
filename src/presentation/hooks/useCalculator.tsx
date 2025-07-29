import React from 'react';

const useCalculator = () => {
  const [number, setNumber] = React.useState('0');

  const clean = () => {
    setNumber('0');
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
  return {
    //Properties
    number,
    toggleSign,
    //Methods
    buildNumber,
    clean,
    deleteOperation,
  };
};

export default useCalculator;
