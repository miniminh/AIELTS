import { View, Text, TouchableOpacity  } from 'react-native'
import React from 'react'
import defaultTheme from '../../theme'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'
import HeaderLearningPage from '../../components/Header/HeaderLearningPage';
const sectionWritings = [
  {
    name: 'Writing Task 1',
    content: 'This is bala'
  },
  {
    name: 'Writing Task 2',
    content: 'This is bala'
  }
]
const ChooseWritingSection = ({sectionWriting, contentWriting}) => {
  const navigation = useNavigation()
  const handlePress = (section) => {
    switch (section) {
      case 'Writing Task 1':
        navigation.navigate('WritingTask1');
        break;
      case 'Writing Task 2':
        navigation.navigate('WritingTask2');
        break;
    }
  }

  return (
    <View>
      <View style = {{display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: defaultTheme.colors.secondary, justifyContent: 'space-between', alignItems: 'center', borderRadius: defaultTheme.border.radius}}>
        <View style = {{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 16, gap: 8}}>
          <Text style = {{color: 'white', fontWeight: defaultTheme.fontWeight.semibold, fontSize: defaultTheme.typography.medium}}>{sectionWriting}</Text>
        </View>

        <View>
          <TouchableOpacity onPress = {() => handlePress(sectionWriting)}>      
            <View style={{ padding: 10 }}>
              <View style = {{backgroundColor: 'orange', borderRadius: 90, padding: 10}}>
                <Ionicons name="caret-forward-sharp" size={24} color="white"/>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style = {{paddingTop: 8, paddingLeft: 8}}>
        <Text style = {{fontSize: defaultTheme.typography.medium, fontWeight: defaultTheme.fontWeight.note, color: defaultTheme.colors.word}}>
         {contentWriting}
        </Text>
      </View>
  </View>

  )
}
const WritingPage = () => {

  return (
    <View> 
      <HeaderLearningPage name = 'Writing'/>
      <View style = {{padding: 8, gap: 16}}>
        <Text style = {{color: defaultTheme.colors.word, padding: 8, fontSize: defaultTheme.typography.medium}}>Please choose the section</Text>
        {sectionWritings.map((section, index) => (
          <ChooseWritingSection key={index} sectionWriting={section.name} contentWriting={section.content} />
        ))}
      </View>
 
    </View>
  )
}

export default WritingPage