import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function AddBookManuallyScreen() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSaveBook = () => {
    console.log("Book saved:", { title, author });
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Book Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Author" value={author} onChangeText={setAuthor} style={styles.input} />
      <Button title="Save Book" onPress={handleSaveBook} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10 },
});
