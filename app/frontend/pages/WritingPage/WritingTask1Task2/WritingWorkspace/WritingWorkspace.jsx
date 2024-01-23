import { View, Text, Image, Button, Alert, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import defaultTheme from '../../../../theme';
import HeaderLearningPage from '../../../../components/Header/HeaderLearningPage';

const WritingSpace = () => {
  const [inputText, setInputText] = useState('');

  const handleInputText = (text) => {
    setInputText(text);
  };

  const handleButtonPress = () => {
    Alert.alert('Submit');
  };

  return (
    <View>
      <TextInput
        multiline
        editable
        placeholder="Type something here..."
        onChangeText={handleInputText}
        value={inputText}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, backgroundColor: 'white' }}
      />
      <Button title="Submit" onPress={handleButtonPress} />
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
              <WritingSpace />
              <Text style={{ color: defaultTheme.colors.word }}>{exam.test}</Text>
              <Image source={{ uri: exam.image[0] }} style={{ width: '100%', aspectRatio: 1.5 }} resizeMode="contain" />
              
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}

    </View>
  );
};

export default WritingWorkspace;
