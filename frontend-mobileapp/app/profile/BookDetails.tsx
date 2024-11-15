import { Colors } from '@/constants/Colors';
import api from '@/utils/api';
import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  route: {
    params: {
      bookId: string;
    };
  };
};

type Book = {
  _id: string;
  title: string;
  author: string[];
  genre: string[];
  description: string;
  pageCount: number;
  isbn: number;
  publisher: string;
  image: string;
 }

export default function BookDetails() {
  //const { bookId } = route.params;
  const [book, setBook] = useState<Book | null>(null); 
  const route = useRoute();
  const { bookId } = route.params; 
  console.log('id', bookId);

  const getBookDetails = async () => {

    try {
      const res = await api.get(`/books/viewBook/${bookId}`);
      const data: Book = await res.data;
               console.log('res data', res.data);
               console.log('data', data);
               console.log('status',res.status);
               if (data) {
                console.log('data', data);
                setBook(data);
              } else {
                console.log('No books found');
              }
              return data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBookDetails();
    console.log('Books after setting state detail:', book);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'book_image_url' }} style={styles.bookImage} />
      <Text style={styles.bookTitle}>{book?.title}</Text>
      <Text style={styles.bookAuthor}>by {book?.author.join(', ')}</Text>
      <Text style={styles.bookAuthor}>Genre: {book?.genre.join(', ')}</Text>
      <Text style={styles.bookDetails}>Description: {book?.description}</Text>
      <Text style={styles.bookDetails}>Page Count: {book?.pageCount}</Text>
      <Text style={styles.bookDetails}>ISBN Number:{book?.isbn}</Text>
      <Text style={styles.bookDetails}>Publisher: {book?.publisher}</Text>
     { /*<TouchableOpacity style={styles.button}  onPress={() => {}} >
        <Text style={styles.buttonText}>Connect</Text>
      </TouchableOpacity>*/}
      <TouchableOpacity style={styles.button}  onPress={() => {}} >
        <Text style={styles.buttonText}>Borrow</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, alignItems: 'center', backgroundColor: Colors.background },
  bookImage: { width: '100%', height: 200, marginBottom: 20 },
  bookTitle: { fontSize: 24, fontWeight: 'bold' },
  bookAuthor: { fontSize: 18, color: 'gray', marginBottom: 10 },
  bookDetails: { fontSize: 14, textAlign: 'center' },
  button: {
    width: '50%',
    backgroundColor: Colors.blue,
    padding:10,
    margin:10,
    paddingVertical: 12,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 18,
    textAlign: 'center',
  },
});


