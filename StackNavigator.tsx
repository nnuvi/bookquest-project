import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import FriendListOthers from '../screens/FriendListOthers';
import ProfileViewPage from '../screens/ProfileViewPage';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="BookDetails" component={BookDetailsScreen} />
      <Stack.Screen name="FriendListOthers" component={FriendListOthers} />
      <Stack.Screen name="ProfileView" component={ProfileViewPage} />
    </Stack.Navigator>
  );
}
