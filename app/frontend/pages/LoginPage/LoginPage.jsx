import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

import axios from "axios";
import React, {useState} from 'react'
import defaultTheme from "../../theme";
import { useNavigation } from '@react-navigation/native';
import RegisterPage from "./RegisterPage";
const LoginPage = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [backendMessage, setBackendMessage] = useState("");

  const handleLogin = async () => {
    const apiURL = 'http://192.168.1.10:5000/login'
    try {
      const response = await axios.post(apiURL, {
        username,
        password,
      });

      if (response.status === 200) {
        setBackendMessage(response.data.message)
        console.log(response.data.message);
      } else {
        // Handle login failure
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  return (

    <View style= {{...defaultTheme.defaultPage, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image style={styles.image} source={require("../../assets/favicon.png")} /> 

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          onChangeText={(username) => setUsername(username)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      <TouchableOpacity>
        <Text style={{color: defaultTheme.colors.word}} onPress = {() => {navigation.navigate('Register')}}>Register</Text> 
      </TouchableOpacity> 
      <TouchableOpacity style={styles.loginBtn} onPress = {handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity> 

      <Text style = {{color: 'white'}}>
        {backendMessage}
      </Text>
    </View> 
  );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    marginBottom: 40,
  },
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
  loginBtn: {
    width: "70%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: '#FF8C00',
  },
});

export default LoginPage