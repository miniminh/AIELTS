import { View, Text } from 'react-native';

import defaultTheme from '../../../../theme';
function DiscoverScreen() {
  return (
    <View style = {{...defaultTheme.defaultPage}}>
      <Text style = {{color: defaultTheme.colors.word}}>Updating</Text>
    </View>
  )
}

export default DiscoverScreen