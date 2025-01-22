import { Colors } from '@/constants/Colors';
import api from '@/utils/api';
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router';
//import { useRouter, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity} from 'react-native';
import Toast from 'react-native-toast-message';
import { HeaderTitle } from '@/components/common/HeaderTitle';
import StatusBar from '@/components/common/StatusBar';
import DropdownModal from '@/components/common/DropdownModal';

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
  //const route = useRoute();
  //const { bookId } = route.params;
  const [book, setBook] = useState<Book | null>(null); 
  const { bookId } = useGlobalSearchParams< {bookId?: string} >();
  const [modalVisible, setModalVisible] = useState(false);

  const options = ['Option 1', 'Option 2', 'Option 3'];


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
  const getUsername = async (borrowedBy: string) => {
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

  const handleOptionActions = (option: string) => {
    switch (option) {
      case 'Option 1':
        console.log('Invalid option');
      break;
      case 'Option 2':
        console.log('Invalid option');
      break;
      case 'Option 3':
        console.log('Invalid option');
      break;
      default:
        console.log('Invalid option');
    }
  }

    const showToast = () => {
      Toast.show({
        type: 'success',
        text1: 'Hello!',
        text2: 'This is a success message 👋',
        position: 'top',
      });
    };
  return (
    <View style={styles.container}>
      <StatusBar/>
      <HeaderTitle 
        text = {'Book Information'} 
        threeDotsVisible = {true} 
        onPress={() => {setModalVisible(true)}}
      />

      <DropdownModal
          visible={modalVisible}
          options={options}
          onSelect={(option) => handleOptionActions(option)}
          onClose={() => setModalVisible(false)}
        />

      <View style={styles.subContiner}>
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
    {/* <TouchableOpacity style={styles.button}  onPress={showToast} >
        <Text style={styles.buttonText}>Connect</Text>
        <Toast />
    </TouchableOpacity> */}
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
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background 
  },
  subContiner: {
    flex: 1,
    flexDirection: 'column',
    padding: 16,
    alignItems: 'center',
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