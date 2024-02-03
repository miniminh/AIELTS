import { View, Text } from 'react-native'
import React from 'react'
import defaultTheme from '../../theme'
const Updating = () => {
  return (
    <View style = {{ justifyContent: 'center', alignItems: 'center', flex: 1}}>
    <Text style = {{fontSize: 30, color: defaultTheme.colors.word}}>
      UPDATING
    </Text>
    </View>
  )
}

export default Updating