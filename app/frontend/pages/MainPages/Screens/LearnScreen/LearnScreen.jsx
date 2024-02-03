import { View, Text } from 'react-native';
import Header from '../../../../components/Header/Header';
import Updating from '../../../../components/Updating/Updating';
import defaultTheme from '../../../../theme';
function LearnScreen() {
  return (
    <View style = {{...defaultTheme.defaultPage}}>
      <Header />
      <Updating />
    </View>
  )
}

export default LearnScreen

