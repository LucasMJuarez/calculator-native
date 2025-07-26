import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../../config/theme/app-theme';

const CalculatorScreen = () => {
  return (
    <View style={styles.calculatorContainer}>
      <View style={{paddingHorizontal: 30, paddingBottom: 20}}>
        <Text style={styles.mainResult}>1500</Text>
        <Text style={styles.subResult}>0</Text>
      </View>
    </View>
  );
};

export default CalculatorScreen;
