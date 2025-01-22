import React, { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { router, useRouter } from 'expo-router';
import api from '@/utils/api';
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SafeAreaView } from 'react-native-safe-area-context';
import ListItemsSkeleton from '@/components/skeleton/ListItemsSkeleton';

type Book = {
  _id: string;
  title: string;
  author: string[];
  genre: string[];
  publisher: string;
  publicationDate: Date | null; 
  pageCount: number | null;
  description: string;
  isbn: number | null;
  bookAdded: Date | null;
  bookType: string;
  borrowedBy: String;
};
type User = {
  _id: string | null;
  fullName: string | '';
  username: string | null;
  bio: string | null;
}
 
const ProfileScreen = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('list');
  const [bookCollection, setBookCollection] = useState<Book[]>([]); // Array of books
  const [lentBooks, setLentBooks] = useState<Book[]>([]); // Array of lent books
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]); // Array of borrowed books
  const [friendsNo, setFriendsNo] = useState<number | undefined>(); // Friends count (number or undefined)
  const [bookNo, setBookNo] = useState<number>(0); // Book count (defaults to 0)
  const [user, setUser] = useState<User>();
  
  const {data:authUser} = useQuery<User>({queryKey: ['authUser']});
  const queryClient = useQueryClient();
  
  useEffect(() => {
    if (authUser) {
      setUser(authUser);
      console.log("authUser", user?.username);
    }
  }, [authUser]);
  
  useEffect(() => {
    console.log("ue user", user?.username);  // Log user whenever it changes
  }, [user]);

  const getMe = async() => {
    try {
      const res = await api.get('/auth/me');
      const data = res.data;
      console.log("current getMe: ", data.username);
      setFriendsNo(res.data.friends.length);
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
  }, []);
  
  const getBookCollection = async () => {
    try {
      setLoading(true);
      const res = await api.get('/books/myBooks');
      const data: Book[] = res.data.bookCollection;
      console.log("bc current book data: ", data.map(books=>books.title));
      setBookNo(res.data.bookCollection.length);
      setBookCollection(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  const getLentBook = async () => {
    try {
      const res = await api.get('/books/lentBooks');
      const data: Book[] = res.data;
      console.log("current lent data: ", data.map(books=>books.title));
      setLentBooks(data);
    } catch (error) {
      console.error(error);
    }
  }

  const getBorrowedBook = async () => {
    try {
      const res = await api.get('/books/borrowedBooks');
      const data: Book[] = res.data;
      console.log("current borrowed book title: ", data.map(books=>books.title));
      setBorrowedBooks(data);
    } catch (error) {
      console.error(error);
    }
  }

  const returnBook = async (bookId: string) => {
    try {
      console.log("bookId", bookId);
      const res = await api.put('/books/returnBook', { bookId });
      console.log("res book data: ", res.data.title);
      await getBookCollection();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log('Updated book collection:', bookCollection.map(books=> books.title));
  }, [bookCollection, lentBooks, borrowedBooks, activeTab]);

  const calculateDaysSinceAdded = (bookAddedDate: moment.MomentInput) => {
    if (!bookAddedDate) return "Unknown date"; // Handle missing dates
    const addedDate = moment(bookAddedDate);
    if (!addedDate.isValid()) return "Invalid date"; // Handle invalid dates
    const today = moment();
    const daysPassed = today.diff(addedDate, 'days');
    return daysPassed > 0 ? `${daysPassed} days ago` : "Today";
  };

  const renderBookItem = ({ item }: { item: Book }) => (
    <View style={styles.bookItem}>
      <View style={styles.bookImage} />
      <TouchableOpacity 
        style={styles.bookDetails} 
        onPress={() => router.push({
          pathname: '/books/bookDetails/[bookId]',
          params: { bookId: item._id },
      })}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author.join(", ")}</Text>
        {item.bookType !== 'myBook' && (
          (item.bookType === 'lent' || item.bookType === 'lentBook') ? (
          <Text style={styles.bookDate}>Lent {calculateDaysSinceAdded(item.bookAdded)} </Text>
          ) : item.bookType === 'borrow' || item.bookType === 'borrowedBook' ? (
          <Text style={styles.bookDate}>Borrowed {calculateDaysSinceAdded(item.bookAdded)} </Text>
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
              <Text style={styles.lendButtonText} onPress={() => {returnBook(item._id)}}>Return</Text>
            </TouchableOpacity>
          ) : null
        )}
    </View>
  );

  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleOptionPress = (route: string) => {
    setModalVisible(false);
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={router.back}>
          {/* <Ionicons name="arrow-back-outline" size={24} color="black" /> */}
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign name="message1" size={25} color="black" />
        </TouchableOpacity>
      </View>
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
            <Text style={styles.infoText}>{bookNo}</Text>
            <Text style={styles.infoLabel}>Books</Text>
          </View>
          <TouchableOpacity style={styles.infoBox} >
            <Text style={styles.infoText}>{friendsNo}</Text>
            <Text 
              style={styles.infoLabel} 
              onPress={() => router.push('../friends/MyFriendlist')}>
              Friends
            </Text>
          </TouchableOpacity>
          </View>
      </View>

      {/* Edit Button Container */}
      <View style={styles.editButtonContainer}>
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => { router.push(`/profile/EditProfile`)}}>
          <Text style={styles.editButtonText} >Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Profile Details */}
      <View style={styles.profileDetails}>
        <Text style={styles.name}>{user?.fullName}</Text>
        <Text style={styles.username}>@{user?.username}</Text>
        <Text style={styles.bio}>{user?.bio}</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>How do you want to add your books?</Text>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionPress('/profile/AddBooksManually')}
            >
              <Text style={styles.optionText}>Manually</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleOptionPress('/profile/viewMyProfile')}
            >
              <Text style={styles.optionText}>Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
            >
              <Text style={styles.optionText}>ISBN Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.navItem}>Add+</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'list' && (
        // loading ? (
        //   <ListItemsSkeleton />
        // ) : (

        // )
        <FlatList
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: Colors.choco,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 10,
  },
  profilePic: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  infoBoxes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '70%',
    marginTop: 10,
    marginRight: 10,
  },
  infoBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.choco,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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
    marginTop:10,
  },
  navItem: {
    fontSize: 16,
    color: Colors.background,
  },
  highlighted: {
    fontWeight: 'bold',
    color:Colors.yellow,
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
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.gray,
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 20,
    backgroundColor: Colors.savoy,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-between',
    marginTop: 5,
  }
});

export default ProfileScreen;


