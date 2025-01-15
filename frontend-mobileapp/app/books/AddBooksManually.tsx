import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function AddBookManuallyScreen() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [formData, setFormData] = useState({
    title: "",
    author: [],
    genre: [],
    description: "",
    publisher: "",
    publishDate: "",
    pageCount: "",
    isbn: "",
  });

  const handleSaveBook = () => {
    console.log("Book saved:", { title, author });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profilePicContainer}>
        <Image source={{ uri: 'https://example.com/Book.jpg' }} style={styles.profilePic} />
        <Text style={styles.editPhotoText}>Edit Photo</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Book Name"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
        placeholder="Author Name"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveBook}>
        <Text style={styles.saveButtonText}>Save Book</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 150,
    height: 200, 
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#ddd',
  },
  editPhotoText: {
    fontSize: 16,
    color: Colors.choco
  },
  input: {
    width: '100%',
    height: 50,
    padding: 10,
    marginVertical: 10,
    borderColor: Colors.choco,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: Colors.savoy,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
    width: '100%',
    height: 50,
    backgroundColor: Colors.savoy,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 18,
    color: Colors.background,
    fontWeight: 'bold',
  },
});


