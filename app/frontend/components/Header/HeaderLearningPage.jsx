import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'
import defaultTheme from '../../theme';
const HeaderLearningPage = ({name}) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  }
  return (
    <View style = {{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: defaultTheme.colors.background,
      height: defaultTheme.header.height,
      paddingLeft: 8,
      paddingRight: 8
    }}> 
    <TouchableOpacity onPress = {handleGoBack} style = {{ backgroundColor: 'white', borderRadius: 90}} >
      <View style = {{padding: 4}}>
        <Ionicons name="caret-back-sharp" size={24} color="black"   />
      </View>

    </TouchableOpacity>
      <Text style = {{ 
        flex: 1,
        textAlign: 'center', 
        fontWeight: defaultTheme.fontWeight.semibold, 
        color: defaultTheme.colors.word, 
        fontSize: defaultTheme.typography.medium
      }}>
        {name}
      </Text>
      <View style={{ width: 32 }} /> 
    </View>
  )
}

export default HeaderLearningPage