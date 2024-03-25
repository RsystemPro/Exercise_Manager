import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import Timer from './screens/timer/timer';
import Setting from './screens/settings/setting';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <RootSiblingParent>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Timer'>

            <Stack.Screen name="Timer"
              options={{ headerShown: false }}
              component={Timer}
            />

            <Stack.Screen name="Setting"
              options={{ headerShown: false }}
              // options={
              //   ({ route }: any) => ({
              //     title: route?.params.name,
              //     headerTitleStyle: { fontWeight: 'bold' },
              //     headerTitleAlign: 'center',
              //     headerTitle: () => (
              //       <View style={{ flexDirection: 'row', ...Center }}>
              //         <Text style={{ fontSize: 25, marginLeft: 5 }}>{route?.params.name}</Text>
              //       </View>
              //     ),
              //     // headerRight: () => <FilledStar name="star-o" size={35} color="black" />,
              //   })
              // }
              component={Setting}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
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

