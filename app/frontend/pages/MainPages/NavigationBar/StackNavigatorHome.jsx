
import React from 'react'
import ReadingPage from '../../ReadingPage/ReadingPage';
import ListeningPage from '../../ListeningPage/ListeningPage';
import StackNavigatorWriting from '../../WritingPage/StackNavigatorWriting/StackNavigatorWriting';
import SpeakingPage from '../../SpeakingPage/SpeakingPage';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function StackNavigatorHome() {
  return (
    <Stack.Navigator >
      <Stack.Screen name = 'HomeScreen' component = {HomeScreen} options = {{headerShown: false}}/>
      <Stack.Screen name = 'Reading' component = {ReadingPage} />
      <Stack.Screen name = 'Listening' component = {ListeningPage} />
      <Stack.Screen name = 'Writing' component = {StackNavigatorWriting} options = {{headerShown: false}}/>
      <Stack.Screen name = 'Speaking' component = {SpeakingPage} />
    </Stack.Navigator>
  )
}