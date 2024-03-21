import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TestScreen from './src/screens/Test';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/Login';

export default function App() {

  const Stack = React.useMemo(createNativeStackNavigator, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TestScreen" component={TestScreen} options={{ title: "Test Screen" }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

