import { View, Text } from 'react-native';
import Updating from '../../../../components/Updating/Updating';
import Header from '../../../../components/Header/Header';
import defaultTheme from '../../../../theme';
import ViewPage from '../../../../components/ViewPage';
function DiscoverScreen() {
  return (
    <ViewPage>
      <Header />
      <Updating />
    </ViewPage>
  )
}

export default DiscoverScreen