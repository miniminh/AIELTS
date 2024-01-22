import { View, Text } from 'react-native'
import React from 'react'
import WritingTask1 from '../WritingTask1Task2/WritingTask1'
import WritingTask2 from '../WritingTask1Task2/WritingTask2'
import WritingPage from '../../WritingPage/WritingPage'
import { createStackNavigator } from '@react-navigation/stack';
const StackWriting = createStackNavigator();
const StackNavigatorWriting = () => {
  return (
    <StackWriting.Navigator >
      <StackWriting.Screen name = 'WritingPage' component = {WritingPage} options = {{headerShown: false}}/>
      <StackWriting.Screen name = 'WritingTask1' component = {WritingTask1} options = {{headerShown: false }}/>
      <StackWriting.Screen name = 'WritingTask2' component = {WritingTask2} />
    </StackWriting.Navigator>
  )
}

export default StackNavigatorWriting
