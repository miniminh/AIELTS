import { View, Text, TouchableOpacity, Alert} from 'react-native'
import React from 'react'
import defaultTheme from '../../../../theme'
import { Ionicons } from '@expo/vector-icons'

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
  const handlePress = () => {
    Alert.alert(sectionName)
  }
  return (
    <View style = {{display: 'flex', flexDirection: 'row', width: '100%', backgroundColor: 'blue', justifyContent: 'space-between', alignItems: 'center', borderRadius: defaultTheme.border.radius}}>
      <View style = {{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 16, gap: 8}}>
        <Ionicons name= {iconName} size={30} color="white"/>
        <Text style = {{color: 'white', fontWeight: defaultTheme.fontWeight.semibold, fontSize: defaultTheme.typography.medium}}>{sectionName}</Text>
      </View>

      <View>
        <TouchableOpacity onPress = {handlePress}>      
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
const ChooseSection = ({color}) => {
  return (
    <View style = {{gap: 16}}>
      <Text style = {{color: color, fontWeight: 600, fontSize: defaultTheme.typography.large}}>What should we do today?</Text>

      {sections.map((section, index) => (
        <Section key={index} iconName={section.icon} sectionName={section.section} />
      ))}
      {sections.map((section, index) => (
        <Section key={index} iconName={section.icon} sectionName={section.section} />
      ))}
    </View>
  )
}

export default ChooseSection