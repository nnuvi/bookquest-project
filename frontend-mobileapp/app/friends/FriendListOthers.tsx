import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';

const friends = [
  { id: '1', username: 'Friend1', profileImage: 'friend_profile_image_url' },
  { id: '2', username: 'Friend2', profileImage: 'friend_profile_image_url' },
];

export default function FriendListOthers() {
  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
            <Text style={styles.username}>{item.username}</Text>
            <Button title="View Profile"  />
            <Button title="Message" onPress={() => { /* Message logic */ }} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  friendItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  username: { fontSize: 16, fontWeight: 'bold', flex: 1 },
});


