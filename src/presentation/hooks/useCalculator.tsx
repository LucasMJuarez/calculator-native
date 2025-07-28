import React from 'react'

const useCalculator = () => {
    const [number, setNumber] = React.useState('0');


    const buildNumber = (numberString: string) => {
        setNumber(number + numberString)
        if(number.includes('.') && numberString === '.') return;
        
        if(number.startsWith('0') || number.startsWith('-0')) {
            //para poner el punto decimal
            if(numberString === '.') {
            return setNumber(number + numberString);
            }
            //Evaluar si es otro cero y no hay punto

            if(numberString === '0' && number.includes('.')) {
                return setNumber(number + numberString);
            }

            //Evaluar si es diferente de cero, no hay punto y el primero numero
            if(numberString !== '0' && !number.includes('.')) {
                return setNumber(numberString);
            }
            //Evitar 00000.00

            if(numberString === '0' && !number.includes('.')) {
                return setNumber(number + numberString);
            }

            //Evaluar si es diferente de cero, no hay punto y el primero numero
            if(numberString !== '0' && !number.includes('.')) {
                return setNumber(numberString);
            }
            //Evitar 00000.00
            if(numberString === '0' && !number.includes('.')) {
                return;
            }
            return setNumber(number + numberString);
        }
        //Si el numero no empieza con cero
        setNumber( number + numberString);
    }
    return {
    //Properties
        number,

        
    //Methods
        buildNumber
    }
}


export default useCalculator
