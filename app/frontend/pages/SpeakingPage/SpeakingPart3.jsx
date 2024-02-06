import { View, Text, ScrollView } from 'react-native'
import React, {useState} from 'react'
import HeaderLearningPage from '../../components/Header/HeaderLearningPage'
import { useNavigation } from '@react-navigation/native'
import defaultTheme from '../../theme'
import ChooseExamSpeaking from './ChooseExamSpeaking'
const mockdata = {
  data: [
    {
      question: "Do you think adverts have a big impact on what people buy?"
    },
    {
      question: "Are adverts useful for people?"
    },
    {
      question: 'Do you think advertising aimed at children is acceptable?'
    }
    
  ]
}
const SpeakingPart3 = () => {
  return (
    <View style = {{backgroundColor: defaultTheme.colors.primary, height: '100%'}}>  

      <HeaderLearningPage name = 'Speaking Part 3' />

      <ScrollView>
        <View style = {{...defaultTheme.basic, flex: 1}}>
          <Text style = {{color: defaultTheme.colors.word, fontSize: defaultTheme.typography.medium}}>Please choose the test</Text>
          {mockdata.data.map((test, index)=> (
            <ChooseExamSpeaking key = {index} data = {test} />
          ))}
        </View>
      </ScrollView>

    </View>
  )
}

export default SpeakingPart3