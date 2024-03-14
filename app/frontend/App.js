import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import MainPage from './pages/MainPages/MainPage';
import StackNavigatorLogin from './pages/LoginPage/StackNavigatorLogin';
import defaultTheme from './theme';
import * as SecureStore from 'expo-secure-store';
import { useState, useEffect } from 'react';

async function getToken() {
  let result = await SecureStore.getItemAsync('auth_token');
  if (result) {
    return true;
  } else {
    return false;
  }
}

async function logOut() {
  await SecureStore.deleteItemAsync('auth_token')
}

export default function App() { 
  const [token, setToken] = useState(null);
  logOut()
  useEffect(() => {
    const checkToken = async () => {
      const tokenExists = await getToken();
      setToken(tokenExists);
    };
    checkToken();
  }, []);


  return (
    <View style = {styles.container}>
      {token ? <MainPage /> : <StackNavigatorLogin/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: defaultTheme.colors.background,
    fontSize: defaultTheme.typography.fontSize,
  },
});
