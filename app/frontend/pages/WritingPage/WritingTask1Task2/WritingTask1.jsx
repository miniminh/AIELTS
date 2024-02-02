import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState} from 'react'
import HeaderLearningPage from '../../../components/Header/HeaderLearningPage'
import { useNavigation } from '@react-navigation/native'
import defaultTheme from '../../../theme'
const mockdata = {
 data: [
  {
    test: 'The graph below shows the average monthly change in the prices of three metals during 2014.',
    image : [
      'https://www.ielts-writing.info/images/graphs/IELTS_Writing_Task_1_LineGraph_202.png'
    ]
  },
  {
    test: 'The chart shows the average number of hours each day that Chinese, American, Turkish and Brazilian tourists spent doing leisure activities while on holiday in Greece in August 2019.',
    image : [
      'https://www.ielts-writing.info/images/graphs/IELTS_Writing_Task_1_BarChart_201.png'
    ]
  },
  {
    test: 'The pie charts below compare the proportion of energy capacity in gigawatts (GW) in 2015 with the predictions for 2040. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    image : [
      'https://www.ielts-writing.info/images/graphs/IELTS_Writing_Task_1_PieChart-200.png'
    ]
  },
  {
    test: 'The maps show Pacific Railway Station station in 1998 and now. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    image : [
      'https://www.ielts-writing.info/images/graphs/IELTS_Writing_Task_1_Map-195-1.png',
      'https://www.ielts-writing.info/images/graphs/IELTS_Writing_Task_1_Map-195-2.png'
    ]
  },
  {
    test: 'The tables below show people(\')s reasons for giving up smoking, and when they intend to give up. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    image : [
      'https://www.ielts-writing.info/images/graphs/IELTS_Writing_Task_1_Table-188_1.png',
      'https://www.ielts-writing.info/images/graphs/IELTS_Writing_Task_1_Table-188_2.png'
    ]
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
          <Text style={{ color: 'orange' }}>{isExpanded ? 'Return' : '...'}</Text>
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

      <HeaderLearningPage name = 'Writing Task 1' />

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