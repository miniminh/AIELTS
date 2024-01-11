import { View, Text } from 'react-native'
import React from 'react'
import defaultTheme from '../../../../theme'
const Welcome = ({userInformation, color}) => {
  return (
    <View>
      <Text style = {{color: color, fontSize: defaultTheme.typography.small}}>Welcome back, </Text>
      <Text style = {{color: color, fontSize: defaultTheme.typography.large, padding: 8}}>{userInformation.name}</Text>     
    </View>
  )
}

export default Welcome