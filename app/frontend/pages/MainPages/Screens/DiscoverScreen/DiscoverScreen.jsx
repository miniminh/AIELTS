import { View, Text } from 'react-native';
import Updating from '../../../../components/Updating/Updating';
import Header from '../../../../components/Header/Header';
import defaultTheme from '../../../../theme';
function DiscoverScreen() {
  return (
    <View style = {{...defaultTheme.defaultPage}}>
      <Header />
      <Updating />
    </View>
  )
}

export default DiscoverScreen