import { View } from "react-native";
import defaultTheme from "../../theme";
import NavigationBar from "./NavigationBar/NavigationBar";
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

const navigationTheme = {
  ...defaultTheme
}
export default function MainPage() {
  return (
    <View style = {{flex: 1, backgroundColor: defaultTheme.colors.primary}}>
      <NavigationContainer theme = {navigationTheme} independent={true}> 
        <NavigationBar/>
      </NavigationContainer>
    </View>
  );
}
