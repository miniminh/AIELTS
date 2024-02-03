import { View, Text } from 'react-native'
import React from 'react'
import defaultTheme from '../../theme'
import ViewPage from '../../components/ViewPage'
import HeaderLearningPage from '../../components/Header/HeaderLearningPage'
import Updating from '../../components/Updating/Updating'
const ReadingPage = () => {
  return (
    <ViewPage> 
      <HeaderLearningPage name = 'Reading' />
      <Updating />
    </ViewPage>
  )
}

export default ReadingPage