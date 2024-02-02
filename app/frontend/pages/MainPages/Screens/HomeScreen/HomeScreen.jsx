import { View, ScrollView, Text} from 'react-native'
import ChooseSection from './ChooseSection'
import Welcome from './Welcome'
import defaultTheme from '../../../../theme';
import Header from '../../../../components/Header/Header';
const data = {
  name: 'Mai Tran Nguyen Khang'
}
function HomeScreen() {
  return (
    <View style = {{height: '100%'}}> 
      <Header />
      <ScrollView >
        <View style = {{padding: 8 }}>
          <Welcome userInformation={data} color = {defaultTheme.colors.word} /> 
          <ChooseSection color = "white"/>
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen