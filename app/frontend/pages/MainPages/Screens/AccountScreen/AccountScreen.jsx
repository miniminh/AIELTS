import { View, Text } from 'react-native';
import Header from '../../../../components/Header/Header';
import defaultTheme from '../../../../theme';
function AccountScreen() {
  return (
    <View>
      <Header />
      
      <Text style = {{color: 'white'}}>Account</Text>
    </View>
  )
}

export default AccountScreen