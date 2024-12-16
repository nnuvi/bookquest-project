import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';
import { useUser } from './getMe';
import api from '@/utils/api';
import { Colors } from '@/constants/Colors';

type Friends = {
  _id: string;
  fullName: string;
  username: string;
  bio: string;
}

export default function FriendListScreen() {
  //const { userId } = useUser();
  const [ friendList, setFriendList ] = useState();

  const getFriendList = async() => {
    try {
      const res = await api.post('/users/friends');
      const data: Friends = await res.data;
      console.log(data);
      setFriendList(data);
      console.log(friendList);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect (() => {
    getFriendList();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={friendList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
            <Text style={styles.text}>{item.fullName}</Text>
            <View style={styles.buttonContainer}>
              <Text onPress={() => {}}>Unfriend</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: Colors.background },
  friendItem: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 20, 
    borderBottomWidth: 1 
  },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10, borderWidth: 10 },
  text: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  buttonContainer:{
    marginLeft: 'auto', 
    marginRight: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: Colors.savoy,
  }
});


