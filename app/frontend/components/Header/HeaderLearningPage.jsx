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
      backgroundColor: defaultTheme.colors.secondary,
      height: defaultTheme.header.height
    }}> 
    <TouchableOpacity onPress = {handleGoBack}>
        <Ionicons name="caret-back-sharp" size={24} color="black" />
    </TouchableOpacity>
      <Text style={{ flex: 1, textAlign: 'center' }}>
        {name}
      </Text>
      <View style={{ width: 24 }} /> 
    </View>
  )
}

export default HeaderLearningPage