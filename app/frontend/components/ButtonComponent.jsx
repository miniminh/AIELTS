import { View, Text } from 'react-native'
import { GoTriangleRight } from "react-icons/go";
import React from 'react'
import defaultTheme from '../theme';
const ButtonComponent = () => {
  return (
    <View style = {{backgroundColor: defaultTheme.colors.button, borderRadius: 90, padding: 10}}>
      <GoTriangleRight />
    </View>
  )
}

export default ButtonComponent