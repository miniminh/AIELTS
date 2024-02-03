import { View, Text } from 'react-native'
import React from 'react'
import ViewPage from '../../components/ViewPage'
import defaultTheme from '../../theme'
import HeaderLearningPage from '../../components/Header/HeaderLearningPage'
import Updating from '../../components/Updating/Updating'
const ListeningPage = () => {
  return (
    <ViewPage>
      <HeaderLearningPage name = 'Listening' />
      <Updating />
    </ViewPage>
  )
}

export default ListeningPage