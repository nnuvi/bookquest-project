import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import SignUp from './src/screens/Signup';
import BookDetailsScreen from './src/screens/BookDetailsScreen';
import AddBookScreen from './src/screens/AddBookScreen';
import ScanISBNScreen from './src/screens/ScanISBNScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddBook" component={AddBookScreen} />
        <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
        <Stack.Screen name="ScanISBN" component={ScanISBNScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
