import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const lentBooks = [
  { id: '1', title: 'Book Lent One', toUser: 'UserA' },
  { id: '2', title: 'Book Lent Two', toUser: 'UserB' },
];

export default function MyLent() {
  return (
    <View style={styles.container}>
      <FlatList
        data={lentBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.lentTo}>Lent to: {item.toUser}</Text>
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
  lentTo: { fontSize: 14, color: 'gray' },
});
