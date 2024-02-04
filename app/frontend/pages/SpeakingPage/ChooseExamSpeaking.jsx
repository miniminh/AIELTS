import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import defaultTheme from '../../theme';

const ChooseExamSpeaking = ({data}) => {

  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity 
        style = {{flex: 1, flexDirection: 'row'}} 
        onPress = {() =>navigation.navigate('SpeakingWorkspace',
        {
          exam: data
        })}>
        <View style = {{height: '100%', flex: 1}}> 

        <Text style = {{fontSize: defaultTheme.typography.medium, color: defaultTheme.colors.word, fontWeight: defaultTheme.fontWeight.note}}>{data.question}</Text>  

          
        </View>

        <View>
          {data.image && (        
          <Image style = {{width: 90, height: 90}}
            source = {{uri: data.image[0]}}
        />) }

        </View>
      </TouchableOpacity>

    </View>
  )
}

export default ChooseExamSpeaking