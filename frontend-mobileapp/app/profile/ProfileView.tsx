import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const userBooks = [
  { id: '1', title: 'User Book One', author: 'Author1', cover: 'book_cover_url' },
  { id: '2', title: 'User Book Two', author: 'Author2', cover: 'book_cover_url' },
];

export default function ProfileViewPage() {
  return (
    <View style={styles.container}>
      {/* Profile Information */}
      <Image source={{ uri: 'user_profile_image_url' }} style={styles.profileImage} />
      <Text style={styles.username}>Username</Text>
      <Text style={styles.bio}>User bio information...</Text>

      {/* User's Book List */}
      <FlatList
        data={userBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Image source={{ uri: item.cover }} style={styles.bookImage} />
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>by {item.author}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center' },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  username: { fontSize: 20, fontWeight: 'bold' },
  bio: { fontSize: 14, color: 'gray', marginBottom: 10 },
  bookItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', width: '100%' },
  bookImage: { width: 50, height: 70, marginRight: 10 },
  bookTitle: { fontSize: 16, fontWeight: 'bold' },
  bookAuthor: { fontSize: 14, color: 'gray' },
});
