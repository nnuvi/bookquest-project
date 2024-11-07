import React from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';

export default function MyProfileScreen({ navigation }) {
  const handleAddBook = () => {
    Alert.alert("Add Book", "How do you want to add your book?", [
      { text: "Manually", onPress: () => navigation.navigate('AddBook') },
      { text: "ISBN Scan", onPress: () => navigation.navigate('AddISBN') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'profile_image_url' }} style={styles.profileImage} />
      <Text style={styles.username}>Username</Text>
      <Text style={styles.bio}>User bio here...</Text>
      <View style={styles.infoContainer}>
        <Text>100 Books</Text>
        <Button title="Friends (19)" onPress={() => navigation.navigate('FriendList')} />
      </View>
      <View style={styles.tabsContainer}>
        <Button title="List" onPress={() => {}} />
        <Button title="Borrowed" onPress={() => navigation.navigate('MyBorrowed')} />
        <Button title="Lent" onPress={() => navigation.navigate('MyLent')} />
        <Button title="Add +" onPress={handleAddBook} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  username: { fontSize: 20, fontWeight: 'bold' },
  bio: { fontSize: 14, color: 'choco', marginBottom: 10 },
  infoContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  tabsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
});
