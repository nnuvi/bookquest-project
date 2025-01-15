import React from 'react';
import { Colors } from '@/constants/Colors';
import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function HomeLayout() {
  return (
     <Tabs 
     screenOptions={{
          tabBarActiveTintColor: Colors.yellow,
          headerShown: false,
          tabBarStyle: {
               borderTopWidth: 0,
               elevation: 0,
               height: 65,
               paddingTop: 10,
               backgroundColor: Colors.choco,
          },
     }}>
          <Tabs.Screen
               name="Homepage"
               options={{
               title: 'Home',
               tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bookshelf" size={24} color='black' />,
               }}
          />
          <Tabs.Screen
               name="Search"
               options={{
               title: 'Search',
               tabBarIcon: ({ color }) => <Octicons name="search" size={24} color='black' />,
               }}
          />
               <Tabs.Screen
               name="Notifications"
               options={{
               title: 'Notifications',
               tabBarIcon: ({ color }) => <MaterialIcons name="notifications" size={24} color='black' />,
               }}
          />
          <Tabs.Screen
               name="MyProfile"
               options={{
               title: 'Profile',
               tabBarIcon: ({ color }) => <FontAwesome6 name="circle-user" size={24} color='black' />,
               }}
          />
     </Tabs>
  );
}
