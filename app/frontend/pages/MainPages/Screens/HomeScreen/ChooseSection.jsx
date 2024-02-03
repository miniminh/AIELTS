import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import defaultTheme from '../../../../theme'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
const sections = [
  {
    section: 'Reading',
    icon: 'book'
  },
  {
    section: 'Listening',
    icon: 'headset'
  },
  {
    section: 'Writing',
    icon: 'pencil'
  },
  {
    section: 'Speaking',
    icon: 'mic-sharp'
  }
]
const Section = ({iconName, sectionName}) => {
  const navigation = useNavigation()
  const handlePress = (section) => {
    switch (section) {
      case 'Reading':
        navigation.navigate('Reading');
        break;
      case 'Listening':
        navigation.navigate('Listening');
        break;
      case 'Writing':
        navigation.navigate('Writing');
        break;
      case 'Speaking':
        navigation.navigate('Speaking')
    }
  }
  return (
    <View style = {{display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: defaultTheme.colors.secondary, justifyContent: 'space-between', alignItems: 'center', borderRadius: defaultTheme.border.radius}}>
      <View style = {{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 16, gap: 8}}>
        <Ionicons name= {iconName} size={30} color="white"/>
        <Text style = {{color: defaultTheme.colors.word, fontWeight: defaultTheme.fontWeight.semibold, fontSize: defaultTheme.typography.medium}}>{sectionName}</Text>
      </View>

      <View>
        <TouchableOpacity onPress = {() => handlePress(sectionName)}>      
          <View style={{ padding: 10 }}>
            <View style = {{backgroundColor: defaultTheme.colors.button, borderRadius: 90, padding: 10, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'center'}}>
              <Ionicons style = {{ textAlign: 'center'}} name="caret-forward-sharp" size={24} color="black"/>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}
const ChooseSection = ({color}) => {
  return (
    <View style = {{gap: 16}}>
      <Text style = {{color: color, fontWeight: 600, fontSize: defaultTheme.typography.large}}>What should we do today?</Text>

      {sections.map((section, index) => (
        <Section key={index} iconName={section.icon} sectionName={section.section} />
      ))}
    </View>
  )
}

export default ChooseSection