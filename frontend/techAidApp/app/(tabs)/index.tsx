import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppRegistry } from 'react-native';
import HomeScreen from '../../src/screens/HomeScreen';
import SignupScreen from '../../src/screens/SignupScreen';

// const Stack = createStackNavigator();

// const App: React.FC = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Signup" component={SignupScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

//AppRegistry.registerComponent('main', () => App);



export default function Index() {
  return <HomeScreen />;
}