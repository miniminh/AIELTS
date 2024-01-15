import { StyleSheet, View, Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LearnScreen from '../Screens/LearnScreen/LearnScreen';
import DiscoverScreen from '../Screens/DiscoverScreen/DiscoverScreen';
import AccountScreen from '../Screens/AccountScreen/AccountScreen';
import StackNavigatorHome from './StackNavigatorHome';

const Tab = createBottomTabNavigator();

export default function NavigationBar() {
  return ( 
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            // Define the icon for each tab based on the route name
            if (route.name === 'Home') {
              iconName = 'home'; // Replace this with your desired icon name
            } else if (route.name === 'Account') {
              iconName = 'person-sharp'; // Replace this with another icon name
            } else if (route.name === 'Discover') {
              iconName = 'rocket';
            } else if (route.name === 'Learn') {
              iconName = 'book-sharp';
            }
            return (
              <View style = {styles.icon}>
                <Ionicons name={iconName} size={size} color={color}/>
              </View>
            );
          },
          headerShown: false,
        })}
        tabBarOptions={{
          activeTintColor: 'blue', // Change the active icon color
          inactiveTintColor: 'gray', 
        }}
      >
        <Tab.Screen name="Home" component={StackNavigatorHome} />
        <Tab.Screen name="Learn" component={LearnScreen} />
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  icon: {
    paddingTop: 10
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});
