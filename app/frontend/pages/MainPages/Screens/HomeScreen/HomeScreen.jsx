import { View, ScrollView, Text} from 'react-native'
import ChooseSection from './ChooseSection'
import Welcome from './Welcome'

import Header from '../../../../components/Header/Header';
const data = {
  name: 'Mai Tran Nguyen Khang'
}
function HomeScreen() {
  return (
    <View>
      <Header />
      <ScrollView>
      <View style = {{ height: '100%', padding: 8 }}>
        <Welcome userInformation={data} color = "white" /> 
        <ChooseSection color = "white"/>
      </View>
    </ScrollView>
    </View>
  )
}

export default HomeScreen