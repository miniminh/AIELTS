import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TouchableOpacity} from 'react-native';
import ButtonComponent from '../../components/ButtonComponent';
import { Ionicons } from '@expo/vector-icons'
import defaultTheme from '../../theme';
import HeaderLearningPage from '../../components/Header/HeaderLearningPage';
import { useNavigation } from '@react-navigation/native';
import ViewPage from '../../components/ViewPage';
const sectionSpeakings= [
  {
    name: 'Speaking Part 1',
    content: 'In IELTS Speaking Part 1, examiner will ask you some general questions on familiar topics such as home, family, work,...'
  },
  {
    name: 'Speaking Part 2',
    content: 'In IELTS Speaking Part 2, the examiner will ask you to speak for between one and two minutes on a topic.',
  },
  {
    name: 'Speaking Part 3',
    content: 'In IELTS Speaking Part 3, you will be asked to discuss questions related to the topic area in part 2.'
  },
]

const ChooseSpeakingSection = ({sectionSpeaking, contentSpeaking}) => {
  const navigation = useNavigation()
  const handlePress = (section) => {
    switch(section) {
      case 'Speaking Part 1':
        navigation.navigate('SpeakingPart1');
        break;
      case 'Speaking Part 2':
        navigation.navigate('SpeakingPart2');
        break;
      case 'Speaking Part 3':
        navigation.navigate('SpeakingPart3');
        break;
    }
  }
  return (
    <View style = {{paddingBottom: 40}}> 

      <View style = {{display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: defaultTheme.colors.secondary, justifyContent: 'space-between', alignItems: 'center', borderRadius: defaultTheme.border.radius}}>
        <View style = {{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 16, gap: 8}}>
          <Text style = {{color: 'white', fontWeight: defaultTheme.fontWeight.semibold, fontSize: defaultTheme.typography.medium}}>{sectionSpeaking}</Text>
        </View>

        <View>
          <TouchableOpacity onPress = {() => handlePress(sectionSpeaking)}>      
            <View style={{ padding: 10 }}>
              <View style = {{backgroundColor: defaultTheme.colors.button, borderRadius: 90, padding: 10}}>
                <Ionicons name="caret-forward-sharp" size={24} color="black"/>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style = {{paddingTop: 8, paddingLeft: 8}}>
        <Text style = {{fontSize: defaultTheme.typography.medium, fontWeight: defaultTheme.fontWeight.note, color: defaultTheme.colors.word}}>
         {contentSpeaking}
        </Text>
      </View>
  </View>

  )
}
export default function SpeakingPage() {
  return (
    <ViewPage>  
      <HeaderLearningPage name = 'Speaking'/>
      <View style = {{...defaultTheme.basic}}>
        <Text style = {{color: defaultTheme.colors.word, padding: 8, fontSize: defaultTheme.typography.medium}}>Please choose the section</Text>
        {sectionSpeakings.map((section, index) => (
          <ChooseSpeakingSection key={index} sectionSpeaking={section.name} contentSpeaking={section.content} />
        ))}
      </View>
    </ViewPage>
  )
}