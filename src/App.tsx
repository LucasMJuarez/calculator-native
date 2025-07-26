import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import CalculatorScreen from './presentation/screens/CalculatorScreen';
import { styles } from './config/theme/app-theme';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.background}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CalculatorScreen />
    </View>
  );
}



export default App;
