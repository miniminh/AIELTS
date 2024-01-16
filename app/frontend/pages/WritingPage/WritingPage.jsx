import { View, Text, TouchableOpacity  } from 'react-native'
import React from 'react'
import defaultTheme from '../../theme'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'
import HeaderLearningPage from '../../components/Header/HeaderLearningPage';
const sectionWriting = [
  {
    name: 'WritingTask1'
  },
  {
    name: 'WritingTask2'
  }
]
const ChooseWritingSection = ({sectionWriting}) => {
  const navigation = useNavigation()
  const handlePress = (section) => {
    switch (section) {
      case 'WritingTask1':
        navigation.navigate('WritingTask1');
        break;
      case 'WritingTask2':
        navigation.navigate('WritingTask2');
        break;
    }
  }

  return (
    <View style = {{display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'blue', justifyContent: 'space-between', alignItems: 'center', borderRadius: defaultTheme.border.radius}}>
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
  )
}
const WritingPage = () => {

  return (
    <View>
      <HeaderLearningPage name = 'Writing'/>
      <Text style = {{color: defaultTheme.colors.word}}>What do you want to do?</Text>
      {sectionWriting.map((section, index) => (
        <ChooseWritingSection key={index} sectionWriting={section.name} />
      ))}
    </View>
  )
}

export default WritingPage