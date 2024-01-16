import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
const WritingPageHeader = () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  }
  return (
    <View>
      <TouchableOpacity onPress = {handleGoBack}>
        <Text>Go Back</Text>
      </TouchableOpacity>
    </View>
  )
}

export default WritingPageHeader