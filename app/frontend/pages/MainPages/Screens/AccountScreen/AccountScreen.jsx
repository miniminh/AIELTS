import { View, Text } from 'react-native';
import Header from '../../../../components/Header/Header';
import defaultTheme from '../../../../theme';
import Updating from '../../../../components/Updating/Updating'; 
import ViewPage from '../../../../components/ViewPage';
function AccountScreen() {
  return (
    <ViewPage>
      <Header />
      <Updating />
    </ViewPage>
  )
}

export default AccountScreen