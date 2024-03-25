import { StyleSheet, Text, View, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//icons
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import Timer from '../timer/timer';

SplashScreen.preventAutoHideAsync();

export default function TabPage() {
  //Custom Tab Button
  const TabBarCustomButton = ({ children, onPress, navigation }: any) => (
    <TouchableOpacity
      onPress={() => onPress()}
      style={[styles.center, { top: -30 }]}
    >
      <LinearGradient
        colors={['#EBAFFE', 'purple']}
        style={{
          height: 70,
          width: 70,
          borderRadius: 35,
          elevation: 20
        }}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  )

  //Tabs
  const Tab = createBottomTabNavigator();
  return (
    <>
      <Text>Tabs</Text>
      {/* <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'purple',
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: { height: 70 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Timer}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <View style={styles.center}>
                <Entypo name="home" size={30} color={focused ? 'purple' : 'black'} />
                <Text>Home</Text>
              </View>
            )
          }}
        />
        <Tab.Screen
          name="Portfoilo"
          component={Timer}
          options={{

            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <View style={styles.center}>
                <AntDesign name="piechart" size={30} color={focused ? 'purple' : 'black'} />
                <Text>Portfoilo</Text>
              </View>
            )
          }}
        />
        <Tab.Screen
          name="Timer"
          component={Timer}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <View >
                <FontAwesome5 name="exchange-alt" size={30} color="white" />
              </View>
            ),
            tabBarButton: (props) => (
              <TabBarCustomButton {...props} />
            )
          }}
        />
        <Tab.Screen
          name="Price"
          component={Timer}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <View style={styles.center}>
                <MaterialIcons name="show-chart" size={30} color={focused ? 'purple' : 'black'} />
                <Text>Prices</Text>
              </View>
            )
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Timer}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, size }) => (
              <View style={styles.center}>
                <FontAwesome name="star-o" size={30} color={focused ? 'purple' : 'black'} />
                <Text>Favorites</Text>
              </View>
            )
          }}
        />
      </Tab.Navigator> */}
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 100,
    width: 100,
  },
});
