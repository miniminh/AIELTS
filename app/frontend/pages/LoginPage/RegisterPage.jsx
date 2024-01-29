import { View, Text } from 'react-native'
import React from 'react'
import defaultTheme from '../../theme'
import HeaderLearningPage from '../../components/Header/HeaderLearningPage'
const RegisterPage = () => {
  return (
    <View style = {{...defaultTheme.defaultPage}}>
      <HeaderLearningPage name = 'Register'/>
      <Text>RegisterPage</Text>
    </View>
  )
}

export default RegisterPage