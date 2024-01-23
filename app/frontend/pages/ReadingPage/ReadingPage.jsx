import { View, Text } from 'react-native'
import React from 'react'
import defaultTheme from '../../theme'
import HeaderLearningPage from '../../components/Header/HeaderLearningPage'
const ReadingPage = () => {
  return (
    <View style = {{backgroundColor: defaultTheme.colors.primary, height: '100%'}}> 
      <HeaderLearningPage name = 'Reading' />
    </View>
  )
}

export default ReadingPage