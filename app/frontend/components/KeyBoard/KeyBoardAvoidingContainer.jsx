import { SafeAreaView, KeyBoardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import React from 'react'

const KeyBoardAvoidingContainer = ({children}) => {
  return (
    <KeyBoardAvoidingView>
      {children}
    </KeyBoardAvoidingView>
  )
}

export default KeyBoardAvoidingContainer