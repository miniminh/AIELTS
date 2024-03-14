import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'
import defaultTheme from '../../theme'
import axios from 'axios'
import HeaderLearningPage from '../../components/Header/HeaderLearningPage'
import { useNavigation } from '@react-navigation/native';
import {AUTHENTICATION} from '@env'
const RegisterPage = () => {
  const navigation = useNavigation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister =  async () => {
    const apiUrl = AUTHENTICATION + 'register'
    const userRegister = {
      username: username,
      password: password
    }

    if ([username, password, confirmPassword].some(value => value === '') ) {
      Alert.alert('The value must be not null')
      return 
    } else if (password !== confirmPassword) {
      Alert.alert('Password incorrect')
      return
    } 
    try {
      const respone = await axios.post(apiUrl, userRegister)
        if (respone.status === 200) {
        Alert.alert(respone.data.message);
        navigation.navigate('Login')
      } 
    } catch (error) {
      Alert.alert('Some error', error.response.data.error)
    }
    
  }
  return (
    <View style = {{...defaultTheme.defaultPage}}>
      <HeaderLearningPage name = 'Register '/>

      <View style = {{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        
        <View style = {styles.inputView}>
          <TextInput 
            style = {styles.TextInput}
            placeholderTextColor="#003f5c"
            placeholder='Username'
            onChangeText =  {(username) => setUsername(username)}
          />
        </View>

        <View style = {styles.inputView}>
          <TextInput 
            style = {styles.TextInput}
            placeholderTextColor="#003f5c"
            placeholder='Password'
            secureTextEntry={true}
            onChangeText =  {(password) => setPassword(password)}
          />
        </View>

        <View style = {styles.inputView}>
          <TextInput 
            style = {styles.TextInput}
            placeholderTextColor="#003f5c"
            placeholder='Confirm password'
            secureTextEntry={true}
            onChangeText =  {(confirmPassword) => setConfirmPassword(confirmPassword)}
          />
        </View>

        <TouchableOpacity style={styles.registerBtn} onPress = {handleRegister}>
          <Text style={styles.loginText}>REGISTER</Text> 
        </TouchableOpacity> 

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  inputView: {
    backgroundColor: "white",
    borderRadius: 15,
    width: "70%",
    height: 45,
    marginBottom: 20
  },
  TextInput: {
    height: 50,
    flex: 1,
    marginLeft: 20,
    textAlign: 'left'
  },
  registerBtn: {
    width: "70%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: '#FF8C00',
  },
})
export default RegisterPage