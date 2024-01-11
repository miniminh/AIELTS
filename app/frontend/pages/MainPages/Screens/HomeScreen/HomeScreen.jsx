import { View, ScrollView} from 'react-native'
import ChooseSection from './ChooseSection'
import Welcome from './Welcome'
const data = {
  name: 'Mai Tran Nguyen Khang'
}
function HomeScreen() {
  return (
    <ScrollView>
      <View style = {{ height: '100%', padding: 8 }}>
        <Welcome userInformation={data} color = "white" /> 
        <ChooseSection color = "white"/>
      </View>
    </ScrollView>

  )
}

export default HomeScreen