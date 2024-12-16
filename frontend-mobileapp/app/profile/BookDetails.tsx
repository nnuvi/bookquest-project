import { Colors } from '@/constants/Colors';
import api from '@/utils/api';
import { useRoute } from '@react-navigation/native';
import { useLocalSearchParams, useSearchParams } from 'expo-router';
//import { useRouter, useLocalSearchParams } from 'expo-router';
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
  borrowedBy: string;
 }

export default function BookDetails() {
  //const { bookId } = route.params;
  const [book, setBook] = useState<Book | null>(null); 
  const route = useRoute();
  console.log('Route params:', route.params);

  const { bookId } = useLocalSearchParams<{ bookId: string }>();
if (!bookId) {
  console.error('No bookId provided');
  return <Text>Book not found</Text>;
}

  //const router = useRouter();
  //const { state } = router.location; // Access state
  //const bookId = state?.bookId;
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

  const [username, setUsername] = useState('None');
  const getUsername = async (borrowedBy) => {
    if (!borrowedBy) {
      console.error('No borrowedBy provided');
      return;
    }
    try {
      const res = await api.get(`/users/profile/${borrowedBy}`);
      const data = res.data;
      console.log("User current data: ", data);
      setUsername(data.username);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  useEffect(() => {
    if (book?.borrowedBy) {
      getUsername(book.borrowedBy);
    }
  }, [book?.borrowedBy]);

  useEffect(() => {
    getBookDetails();
    console.log('Books after setting state detail:', book);
  }, []);
<Text style={styles.title}></Text>
  return (
    <View style={styles.container}>
    <View style={styles.firstContainer}>
    <View style={styles.imgContainer}>
      <Image source={{ uri: 'book_image_url' }} style={styles.bookImage} />
    </View>
    <View style={styles.detailsContainer}>
      <Text style={styles.bookTitle}>{book?.title || 'N/A'}</Text>
      <Text style={styles.bookAuthor}>by {book?.author.join(', ') || 'N/A'}</Text>
      <Text style={styles.bookAuthor}>Genre: {book?.genre.join(', ') || 'N/A'}</Text>
      <Text>
      <Text style={styles.title}>Pages:</Text>
      <Text style={styles.bookDetails}> {book?.pageCount || 'N/A'}</Text>
      </Text>
      <Text>
      <Text style={styles.title}>ISBN:</Text>
      <Text style={styles.bookDetails}> {book?.isbn || 'N/A'}</Text>
      </Text>
      <Text>
      <Text style={styles.title}>Publisher:</Text>
      <Text style={styles.bookDetails}> {book?.publisher || 'N/A'}</Text>
      </Text>
    </View>
    </View>
    <View style={styles.descriptionContainer}>
      <Text style={styles.description}>Description: {book?.description || 'N/A'}</Text>
    </View>
    <Text>
    <Text style={styles.title}>Borrowed By:</Text>
      <Text style={styles.bookDetails}> {username === 'None'? 'None' : `@${username}`}</Text>
    </Text>
     { /*<TouchableOpacity style={styles.button}  onPress={() => {}} >
        <Text style={styles.buttonText}>Connect</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}  onPress={() => {}} >
        <Text style={styles.buttonText}>Borrow</Text>
      </TouchableOpacity>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    flexDirection: 'column',
    padding: 16, 
    alignItems: 'center', 
    backgroundColor: Colors.background 
  },
  bookImage: { 
    width: '100%', 
    height: 200, 
    margin: 20 
  },
  bookTitle: { 
    fontSize: 20, 
    fontWeight: 'bold' 
  },
  bookAuthor: { 
    fontSize: 16, 
    color: Colors.savoy, 
    marginBottom: 10 
  },
  bookDetails: { 
    fontSize: 15, 
  },
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
  imgContainer: {
    flex: 1,
    width: '100%',
    height: 200,
    borderWidth: 10,
    //padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderBlockColor: Colors.savoy,
  },
  detailsContainer: {
    flex: 1,
    width: '100%',
    padding: 16,
    textAlign: 'left',
    justifyContent: 'center'
  },
  descriptionContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  description: {
    fontSize: 17,
  },
  firstContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.choco
  }
});


