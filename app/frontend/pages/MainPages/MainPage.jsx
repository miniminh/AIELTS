import NavigationBar from "./NavigationBar/NavigationBar";
import { View, StyleSheet } from "react-native";
import Header from "../../components/Header/Header";
import defaultTheme from "../../theme";
export default function MainPage() {
  return (
    <View style = {{flex: 1, backgroundColor: defaultTheme.colors.primary}}>
      <Header />
      <NavigationBar/>
    </View>
  );
}
