import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState} from 'react'
import HeaderLearningPage from '../../../components/Header/HeaderLearningPage'
import { useNavigation } from '@react-navigation/native'
import defaultTheme from '../../../theme'
const mockdata = {
 data: [
  {
    test: "In many countries around the world, rural people are moving to cities, so the population in the countryside is decreasing. Do you think this is a positive or a negative development?",
  },
  {
    test: "Some university students want to learn about other subjects in addition to their main subjects. Others believe it is more important to give all their time and attention to studying for a qualification. Discuss both these views and give your own opinion.",
  },
  {
    test: "Some people believe that social media sites, such as Facebook or Twitter, have a negative impact on young people and their ability to form personal relationships. Others believe that these sites bring people together in a beneficial way. Discuss both these views and give your own opinion."
  },
  {
    test: "Some people feel that the legal age at which people can marry should be at least 21. To what extent do you agree or disagree?"
  }
 ]
}

const ChooseExam = ({data}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigation();
  const toggleExpand = () => {
    setIsExpanded((prev) => (!prev));
  };
  return (
    
    <View>
      <TouchableOpacity 
        style = {{flex: 1, flexDirection: 'row'}} 
        onPress = {() =>navigation.navigate('WritingWorkspace',
        {
          exam: data
        })}>
        <View style = {{height: '100%', flex: 1}}> 

        <Text numberOfLines={isExpanded ? 0 : 2} style = {{fontSize: defaultTheme.typography.medium, color: defaultTheme.colors.word, fontWeight: defaultTheme.fontWeight.note}}>{data.test}</Text>  
        <TouchableOpacity onPress={toggleExpand}>
          <Text style={{ color: 'black' }}>{isExpanded ? 'Return' : 'Read More'}</Text>
        </TouchableOpacity>
          
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

const WritingTask1 = () => {
  return (
    <View style = {{backgroundColor: defaultTheme.colors.primary, height: '100%'}}>  

      <HeaderLearningPage name = 'Writing Task 2' />

      <ScrollView>
        <View style = {{...defaultTheme.basic, flex: 1}}>
          <Text style = {{color: defaultTheme.colors.word, fontSize: defaultTheme.typography.medium}}>Please choose the test</Text>
          {mockdata.data.map((test, index)=> (
            <ChooseExam key = {index} data = {test} />
          ))}
        </View>
      </ScrollView>

    </View>
  )
}

export default WritingTask1