import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home, CheckValues, Statistics, SystemOnOff } from "./src/screens";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle:{
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff"
  }
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={{alignItems: "center", justifyContent: "center"}}>
                <FontAwesome name="home" size={24} color={focused ? "#16247d" : "#111"} />
              </View>
            )
          }
        }}
        />

        <Tab.Screen 
        name="CheckValues" 
        component={CheckValues} 
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={{alignItems: "center", justifyContent: "center"}}>
                <MaterialCommunityIcons name="temperature-celsius" size={24} color={focused ? "#16247d" : "#111"} />
              </View>
            )
          }
        }}
        />

        <Tab.Screen 
        name="Statistics" 
        component={Statistics}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={{alignItems: "center", justifyContent: "center"}}>
                <Entypo name="line-graph" size={24} color={focused ? "#16247d" : "#111"} />
              </View>
            )
          }
        }} 
        />

        <Tab.Screen 
        name="SystemOnOff" 
        component={SystemOnOff} 
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <View style={{alignItems: "center", justifyContent: "center"}}>
                <FontAwesome name="power-off" size={24} color={focused ? "#16247d" : "#111"} />
              </View>
            )
          }
        }}
        />

      </Tab.Navigator>
    </NavigationContainer>

    // <View style={styles.container}>
    //   <Text>Hello!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
