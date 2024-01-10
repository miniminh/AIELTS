import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainPage from './pages/MainPages/MainPage';
import defaultTheme from './theme';
export default function App() {
  return (
    <View style = {styles.container}>
      <MainPage  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: defaultTheme.colors.secondary,
    fontSize: defaultTheme.typography.fontSize
  },
});
