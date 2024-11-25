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
  const [ borrowedBooks, setBorrowedBooks ] = useState([]);


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
    getBookCollection();
    getLentBook();
    getBorrowedBook();
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

  const getBorrowedBook = async () => {
    try {
      const res = await api.get('/books/borrowedBooks');
      console.log("borrowed current: ", res);
      console.log("borrowed current: ", res.data);
      const data: Book[] = res.data;
      console.log("current borrowed data: ", data);
      setBorrowedBooks(data);
    } catch (error) {
      console.error(error);
    }
  }

 /* useEffect(() => {
    getBookCollection();
    getLentBook();
    getBorrowedBook();
    console.log('bcccc:', bookCollection);
  }, []);*/

  useEffect(() => {
    console.log('Updated book collection:', bookCollection);
  }, [bookCollection, lentBooks, borrowedBooks]);

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

  const renderBookItem = ({ item }: { item: Book }) => (
    <View style={styles.bookItem}>
      <View style={styles.bookImage} />
      <TouchableOpacity style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author.join(", ")}</Text>
        {item.bookType !== 'myBook' && (
          (item.bookType === 'lent' || item.bookType === 'lentBook') ? (
          <Text style={styles.bookDate}>Lent on: {item.bookAdded}</Text>
          ) : item.bookType === 'borrow' || item.bookType === 'borrowedBook' ? (
          <Text style={styles.bookDate}>Borrowed on: {item.bookAdded}</Text>
          ) : null
        )}
      </TouchableOpacity>
      
      {item.bookType !== 'myBook' && (
          (item.bookType === 'lent' || item.bookType === 'lentBook') ? (
            <TouchableOpacity style={styles.lendButton}>
              <Text style={styles.lendButtonText}>Ask Back</Text>
            </TouchableOpacity>
          ) : item.bookType === 'borrow' || item.bookType === 'borrowedBook' ? (
            <TouchableOpacity style={styles.lendButton}>
              <Text style={styles.lendButtonText}>Return</Text>
            </TouchableOpacity>
          ) : null
        )}
        {/*<Text style={styles.lendButtonText}>Lend</Text>*/}
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
        <View style={styles.imageContainer}>
        <Image
          source={{ uri: 'https://example.com/profile-pic.jpg' }}
          style={styles.profilePic}
        />
        </View>
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
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>
            No books available.
          </Text>}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false} 
        />
      )}

      {activeTab === 'borrowed' && (
        <FlatList
          data={borrowedBooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.bookList}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>
            No books available.
          </Text>}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false} 
        />
      )}

      {activeTab === 'lent' && (
        <FlatList
          data={lentBooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.bookList}
          ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>
            No books available.
          </Text>}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false} 
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
    marginBottom: 10,
    width: '100%',
    /*flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,*/
  },
  imageContainer: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: Colors.choco,
    borderRadius: 75, // Half of the width/height to make it circular
    overflow: 'hidden',
    marginBottom: 10,
  },
  profilePic: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    /*position:'absolute',
    width: 'auto',
    height: 'auto',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.choco,*/
  },
  infoBoxes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '70%',
    marginTop: 20,
    marginRight: 10,
    //position:'absolute',
    /*position:'absolute',
    flexDirection: 'row',
    marginLeft: 180,
    marginTop: 50,*/
  },
  infoBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.choco,
    borderRadius: 10,
    elevation: 3, // For a slight shadow effect on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    /*backgroundColor: Colors.choco,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 8,
    width: 60,*/
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


