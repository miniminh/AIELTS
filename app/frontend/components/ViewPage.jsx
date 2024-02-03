import { View, Text } from 'react-native'
import React from 'react'
import defaultTheme from '../theme'
const ViewPage = ({children}) => {
  return (
    <View style = {{...defaultTheme.defaultPage}}>
      {children}
    </View>
  )
}

export default ViewPage