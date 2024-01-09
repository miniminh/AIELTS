import { View, Text, Image, StyleSheet, ViewComponent } from 'react-native'
import React from 'react'
const image1 = require("../../../../assets/favicon.png");
const data = {
  points: 0,
  ranks: 'No ranks'
}
export default function Points() {
  return (
    <View>
      <Image source = {image1} />
      <Text> {data.points} Points</Text>
      <Text> {data.ranks} </Text>
    </View>
  )
}