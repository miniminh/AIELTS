import { View, Text, Image, StyleSheet, ViewComponent } from 'react-native'
import React from 'react'
const image1 = require("../../../assets/favicon.png");

const Points = ({point}) => {
  return (
    <View>
      <View style = {{display: 'flex', flexDirection: 'row', gap: 7, alignItems: 'center'}}>
        <Image source = {image1} style = {{width: 45, height: 45}}/>
        <View>
          <Text style = {{fontWeight: '600', color: 'white', fontSize: 18}}>{point.points} points</Text>
          <Text style = {{fontWeight: '600', color: 'orange', fontSize: 16}}>{point.ranks}</Text>
        </View>
      </View>
    </View>
  )
}

export default Points