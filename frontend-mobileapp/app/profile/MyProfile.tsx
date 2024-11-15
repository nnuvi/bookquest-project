import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { router, useRouter } from 'expo-router';
import api from '@/utils/api';


type Book = {
  _id: string;
  title: string;
  author: string[]; // Assuming the author is an array of strings
  genre: string[]; // Assuming the genre is an array of strings
  publisher: string;
  publicationDate: Date | null; // Assuming publicationDate can be null
  pageCount: number | null; // pageCount can be null
  description: string;
  isbn: number | null; // isbn can be null
  bookAdded: Date | null;
  bookType: string;
};


type BorrowedBook = {
  id: string;
  title: string;
  author: string;
  image: string;
  dateBorrowed: string;
};

const borrowedBooks: BorrowedBook[] = [
  { id: '1', title: 'Book 1', author: 'Author 1', image: 'https://example.com/book1.jpg', dateBorrowed: '2024-11-10' },
  { id: '2', title: 'Book 2', author: 'Author 2', image: 'https://example.com/book2.jpg', dateBorrowed: '2024-10-25' },
];

const ProfileScreen = () => {
  const route = useRouter();
  const [activeTab, setActiveTab] = useState('list');
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    bio: "",
  });

  const [ bookCollection, setBookCollection ] = useState([]);
  const [ lentBooks, setlentBooks ] = useState([]);


  const getMe = async() => {
    try {
      const res = await api.get('/auth/me');
      console.log("user current: ", res.data);
      const data = res.data;
      console.log("user current data: ", data);
      setFormData(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getMe();
    console.log('meee:', formData);
  }, []);

  const getBookCollection = async () => {
    try {
      const res = await api.get('/books/myBooks');
      console.log("bc current: ", res.data);
      const data: Book[] = res.data.bookCollection;
      console.log("bc current data: ", data);
      setBookCollection(data);
    } catch (error) {
      console.error(error);
    }
  }

  const getLentBook = async () => {
    try {
      const res = await api.get('/books/lentBooks');
      console.log("lent current: ", res);
      console.log("lent current: ", res.data);
      const data: Book[] = res.data;
      console.log("current lent data: ", data);
      setlentBooks(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBookCollection();
    getLentBook();
    console.log('bcccc:', bookCollection);
  }, []);

  useEffect(() => {
    console.log('Updated book collection:', bookCollection);
  }, [bookCollection, lentBooks]);

  const handleAddBook = () => {
    Alert.alert(
      "How do you want to add your books?",
      "",
      [
        { text: "Manually", onPress: () => router.push('/profile/AddBooksManually') },
        { text: "Image", onPress: () => router.push('/profile/viewMyProfile') },
        { text: "ISBN Scan", onPress: () => router.push('/profile/AddBooksISBN') },
        { text: "Cancel", style: "cancel" }
      ],
      { cancelable: true }
    );
  };
  console.log('meee:');

 /* const renderBookItem = ({ item }: { item: Book }) => (
    <View style={styles.bookItem}>
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
      </View>
      <TouchableOpacity style={styles.lendButton}>
        <Text style={styles.lendButtonText}>Lend</Text>
      </TouchableOpacity>
    </View>
  );*/

  const renderBookItem = ({ item }: { item: Book }) => (

    <View style={styles.bookItem}>
      <View style={styles.bookImage} />
      <TouchableOpacity style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author.join(", ")}</Text>
        {item.bookType !== 'myBook' && (
          <Text style={styles.bookDate}>Lent on: {item.bookAdded}</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.lendButton}>
        <Text style={styles.lendButtonText}>Lend</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLentBookItem = ({ item }: { item: Book }) => (
    <View style={styles.bookItem}>
      <Image source={{ }} style={styles.bookImage} />
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        {item.bookType !== 'myBook' && (
          <Text style={styles.bookDate}>Lent on: {item.bookAdded}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.notifyButton}>
        <Text style={styles.notifyButtonText}>Notify</Text>
      </TouchableOpacity>
    </View>
  );

  const renderBorrowedBookItem = ({ item }: { item: BorrowedBook }) => (
    <View style={styles.bookItem}>
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <Text style={styles.bookDate}>Borrowed on: {item.dateBorrowed}</Text>
      </View>
      <TouchableOpacity style={styles.giveBackButton}>
        <Text style={styles.giveBackButtonText}>Give Back</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://example.com/profile-pic.jpg' }}
          style={styles.profilePic}
        />
        <View style={styles.infoBoxes}>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>100</Text>
            <Text style={styles.infoLabel}>Books</Text>
          </View>
          <TouchableOpacity style={styles.infoBox} >
            <Text style={styles.infoText}>19</Text>
            <Text style={styles.infoLabel}>Friends</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Edit Button Container */}
      <View style={styles.editButtonContainer}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Details */}
      <View style={styles.profileDetails}>
        <Text style={styles.name}>{formData.fullName}</Text>
        <Text style={styles.username}>@{formData.username}</Text>
        <Text style={styles.bio}>{formData.bio}</Text>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => setActiveTab('list')}>
          <Text style={[styles.navItem, activeTab === 'list' && styles.highlighted]}>List</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setActiveTab('borrowed')}>
          <Text style={[
              styles.navItem,
              activeTab === 'borrowed' && styles.highlighted,
            ]} >Borrowed</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('lent')}>
          <Text style={[
              styles.navItem,
              activeTab === 'lent' && styles.highlighted,
            ]}>Lent</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddBook}>
          <Text style={styles.navItem}>Add+</Text>
        </TouchableOpacity>
      </View>

      {/* Book List */}
      {activeTab === 'list' && (
        
        <FlatList
        //{console.log("{ item }");}
          data={bookCollection}
          renderItem={renderBookItem}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.bookList}
        />
      )}

      {activeTab === 'borrowed' && (
        <FlatList
          data={borrowedBooks}
          renderItem={renderBorrowedBookItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.bookList}
        />
      )}

      {activeTab === 'lent' && (
        <FlatList
          data={lentBooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.bookList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.choco,
  },
  infoBoxes: {
    position:'absolute',
    flexDirection: 'row',
    marginLeft: 150,
  },
  infoBox: {
    backgroundColor: Colors.choco,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 8,
    width: 60,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.background,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.background,
  },
  editButtonContainer: {
    alignItems: 'flex-end', 
    marginBottom: 0, 
  },
 editButton: {
    position: 'absolute',
    right: 5,
    top: 50, 
    paddingVertical: 5,
    paddingHorizontal: 25,
    backgroundColor: Colors.choco,
    borderRadius: 8,
  },
  editButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  profileDetails: {
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.choco,
  },
  username: {
    fontSize: 16,
    color: Colors.choco,
  },
  bio: {
    fontSize: 14,
    color: Colors.choco,
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: Colors.choco,
    padding: 10,
    justifyContent: 'space-around',
    //marginBottom: 10,
    marginTop:10,
  },
  navItem: {
    fontSize: 16,
    color: Colors.background,
  },
  highlighted: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  bookList: {
    paddingBottom: 20,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.choco,
  },
  bookImage: {
    width: 50,
    height: 75,
    borderRadius: 5,
    marginRight: 10,
    borderColor: Colors.choco,
  },
  bookDetails: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.choco,
  },
  bookAuthor: {
    fontSize: 14,
    color: Colors.choco,
  },
  lendButton: {
    backgroundColor: Colors.choco,
    padding: 10,
    borderRadius: 8,
  },
  lendButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  bookDate: {
    fontSize: 12,
    color: Colors.choco,
  },
  notifyButton: {
    backgroundColor: Colors.choco,
    padding: 10,
    borderRadius: 8,
  },
  notifyButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
  giveBackButton: {
    backgroundColor: Colors.choco,
    padding: 10,
    borderRadius: 8,
  },
  giveBackButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;


