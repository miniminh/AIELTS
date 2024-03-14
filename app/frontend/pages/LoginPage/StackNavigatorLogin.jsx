import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import defaultTheme from '../../theme';
import MainPage from '../MainPages/MainPage';
const StackLogin = createStackNavigator();
const navigationTheme = {
  ...defaultTheme
}
const StackNavigatorLogin = () => {
  return (
    <View style = {{flex: 1, backgroundColor: defaultTheme.colors.primary}}>
    <NavigationContainer theme = {navigationTheme} independent={true}>
      <StackLogin.Navigator initialRouteName='Login'>
        <StackLogin.Screen name = 'Login' component = {LoginPage} options = {{headerShown: false}} />
        <StackLogin.Screen name = 'Register' component = {RegisterPage} options = {{headerShown: false}} />
        <StackLogin.Screen name = 'Main' component = {MainPage} options = {{headerShown: false}} />
      </StackLogin.Navigator>
    </NavigationContainer>
    </View>
  )
}

export default StackNavigatorLogin