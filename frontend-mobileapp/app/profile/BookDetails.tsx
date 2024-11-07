import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

type Props = {
  route: {
    params: {
      bookId: string;
    };
  };
};

export default function BookDetails({ route }: Props) {
  const { bookId } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'book_image_url' }} style={styles.bookImage} />
      <Text style={styles.bookTitle}>Book Title</Text>
      <Text style={styles.bookAuthor}>by Author Name</Text>
      <Text style={styles.bookDetails}>Detailed description of the book...</Text>
      <Button title="Connect" onPress={() => {}} />
      <Button title="Borrow" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center' },
  bookImage: { width: '100%', height: 200, marginBottom: 20 },
  bookTitle: { fontSize: 24, fontWeight: 'bold' },
  bookAuthor: { fontSize: 18, color: 'gray', marginBottom: 10 },
  bookDetails: { fontSize: 14, textAlign: 'center' },
});
