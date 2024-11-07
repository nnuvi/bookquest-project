import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const borrowedBooks = [
  { id: '1', title: 'Book Borrowed One', dueDate: '2024-12-01' },
  { id: '2', title: 'Book Borrowed Two', dueDate: '2024-12-15' },
];

export default function MyBorrowed() {
  return (
    <View style={styles.container}>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.dueDate}>Due Date: {item.dueDate}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  bookItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  bookTitle: { fontSize: 16, fontWeight: 'bold' },
  dueDate: { fontSize: 14, color: 'gray' },
});
