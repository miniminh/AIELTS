import { View, Text } from 'react-native'
import React from 'react'
import SpeakingPage from '../SpeakingPage'
import SpeakingPart1 from '../SpeakingPart1'
import SpeakingPart2 from '../SpeakingPart2'
import SpeakingPart3 from '../SpeakingPart3'
import SpeakingWorkspace from '../SpeakingWorkspace/SpeakingWorkspace'
import { createStackNavigator } from '@react-navigation/stack';
const StackSpeaking = createStackNavigator();
const StackNavigatorSpeaking = () => {
  return (
    <StackSpeaking.Navigator>
      <StackSpeaking.Screen name = 'SpeakingPage' component = {SpeakingPage} options = {{headerShown: false}}/>
      <StackSpeaking.Screen name = 'SpeakingPart1' component = {SpeakingPart1} options = {{headerShown: false}}/>
      <StackSpeaking.Screen name = 'SpeakingPart2' component = {SpeakingPart2} options = {{headerShown: false}}/>
      <StackSpeaking.Screen name = 'SpeakingPart3' component = {SpeakingPart3} options = {{headerShown: false}}/>
      <StackSpeaking.Screen name = 'SpeakingWorkspace' component = {SpeakingWorkspace} options = {{headerShown: false}}/>
    </StackSpeaking.Navigator>
  )
}

export default StackNavigatorSpeaking