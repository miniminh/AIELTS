import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import MainPage from './pages/MainPages/MainPage';
import defaultTheme from './theme';
import LoginPage from './pages/LoginPage/LoginPage';
import StackNavigatorLogin from './pages/LoginPage/StackNavigatorLogin';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

export default function App() {
  return (
    <View style = {styles.container}>
      <MainPage />
      <BannerAd
        unitId={TestIds.ADAPTIVE_BANNER}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: defaultTheme.colors.background,
    fontSize: defaultTheme.typography.fontSize,
  },
});
