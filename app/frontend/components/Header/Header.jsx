import { View, Text } from 'react-native'
import React from 'react'
import Points from './Items/Points'
import AlertSide from './Items/Alert'
import defaultTheme from '../../theme'
const data = {
  points: 2,
  ranks: 'No ranks'
}
export default function Header() {
  return (
    <View style = {{padding: 5, paddingLeft: 7, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', backgroundColor: defaultTheme.colors.secondary, height: defaultTheme.header.height }}>
      <Points point = {data} />
      <AlertSide/>
    </View>
  )
}