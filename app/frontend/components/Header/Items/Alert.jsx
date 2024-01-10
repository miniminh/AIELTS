import { View, Text,  TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import React from 'react'

const GoalButton = () => {
  const onPress = () => Alert.alert("Goal")
  return (
    <TouchableOpacity onPress = {onPress} style = {{backgroundColor: 'orange'}}>
      <Icon name = "fire" size = {30} style = {{padding: 4}} />
    </TouchableOpacity>
  )
}

const StreakButton = () => {
  const onPress = () => {Alert.alert("Streak")}
  return (
    <TouchableOpacity onPress = {onPress} style = {{backgroundColor: 'orange'}}>
      <IconMaterial name = "star-outline" size = {30} style = {{padding: 4}} />
    </TouchableOpacity>
  )
}
export default function AlertSide() {
  return (
    <View style = {{gap: 4, display: 'flex', flexDirection: 'row', alignItems : 'center'}}>
      <GoalButton/>
      <StreakButton />
    </View>
  )
}