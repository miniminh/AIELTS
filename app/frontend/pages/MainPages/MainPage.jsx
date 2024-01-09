import NavigationBar from "./NavigationBar/NavigationBar";
import { View, StyleSheet } from "react-native";
import Header from "./Header/Header";
export default function MainPage() {
  return (
    <View style = {{flex: 1}}>
      
      <Header></Header>
      <NavigationBar/>
    </View>
  );
}
