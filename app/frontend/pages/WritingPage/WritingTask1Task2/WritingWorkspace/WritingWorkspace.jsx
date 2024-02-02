import { View, Text, Image, Button, Alert, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import defaultTheme from '../../../../theme';
import HeaderLearningPage from '../../../../components/Header/HeaderLearningPage';
import axios from 'axios';
const WritingSpace = ({exam}) => {
  const [inputText, setInputText] = useState('');

  const handleInputText = (text) => {
    setInputText(text);
  };

  const apiUrl = 'http://14.161.10.40:14024/api/v1/llm/grade'
  const dataWriting = {
    Question: exam.test,
    Answer: inputText
  }

  const handleButtonPress = async() => {
    console.log("Vo day")
    console.log(dataWriting)
    const response = await axios.post(apiUrl, dataWriting, {headers: {
      'Content-Type': 'application/json',
      'public-key': 'vuadev007'
    }})
    console.log(response.data.result)
    Alert.alert(response.result)

  };

  return (
    <View> 
      <TextInput
        multiline
        editable
        placeholder="Typing here..."
        onChangeText={handleInputText}
        value={inputText}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, backgroundColor: 'white', minHeight: 100}}
      />
      <Button title="Submit" onPress={handleButtonPress} color = {defaultTheme.colors.button}/>
      <View style = {{backgroundColor: 'white', height: 2, width: '100%', marginBottom: 20}}/>
      
      <Text style={{ color: defaultTheme.colors.word }}>{exam.test}</Text>
      {exam.image && (<Image source={{ uri: exam.image[0] }} style={{ width: '100%', aspectRatio: 1.5 }} resizeMode="contain" /> )}
    </View>
  );
};

const WritingWorkspace = () => {
  const [exam, setTest] = useState();
  const param = useRoute().params;

  useEffect(() => {
    if (param && param.exam) {
      setTest(param.exam);
    }
  }, [param]);

  return (
    <View style={{ ...defaultTheme.defaultPage, height: '100%' }}>
      <HeaderLearningPage />

      {exam && (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : null} // Use 'null' for Android
          enabled
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ ...defaultTheme.basic, height: '100%' }}>
              <WritingSpace exam = {exam}/>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}

    </View>
  );
};

export default WritingWorkspace;
