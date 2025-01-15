import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import api from '@/utils/api';
import { useUser } from './getMe';
import StatusBar from '@/components/common/StatusBar';
import { HeaderText } from '@/components/common/HeaderTitle';

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
  borrowedBy: string;
};

const ProfileView = () => {
  const route = useRoute();
  const { profileId } = route.params; 
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(false);
  const [ bookCollection, setBookCollection ] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    bio: "",
  });
  const {userId} = useUser();
  console.log("profileid: ", profileId);

  const handleConnectToggle = () => {
    setIsConnected(!isConnected);
  };

  const getProfileInfo = async() => {
    try {
      const res = await api.get(`/users/profile/${profileId}`);
      console.log("user current: ", res.data);
      const data = res.data;
      console.log("user current data: ", data);
      setFormData(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const getBookCollection = async () => {
    try {
      const res = await api.get(`/books/${profileId}/bookList`);
      ////console.log("bc current: ", res.data);
      const data = res.data.bookCollection;
      ////console.log("bc current data: ", Array.isArray(res.data));
      setBookCollection(data);
      console.log("bc now: ", bookCollection);
    } catch (error) {
      console.error(error);
    }
  }

  const [sentRequest, setSentRequest] = useState(false);

  const sendBorrowRequest = async (bookId: string) => {
    try {
      const res = await api.post(`/books/${profileId}/borrowBook/${bookId}`);
      console.log(res.data);
      console.log(res.status);
      setSentRequest(true);
      console.log("borrow request sent");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect (() => {
    getProfileInfo();
    getBookCollection();
    console.log('invoked profileinfo and bc');
  }, []);

  useEffect(() => {
    //console.log('Updated book collection:', bookCollection);
    console.log('Updated book collection:');
  }, [bookCollection]);

  

  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity style={styles.bookItem}
    onPress={() => { router.push(`/profile/BookDetails?bookId=${item._id.toString()}`)}}
    >
      <Image style={styles.bookImage} />
      <View style={styles.bookDetails}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author.join(", ")}</Text>
      </View>
      <TouchableOpacity style={styles.borrowButton}>
      {sentRequest? 
        (
          <Text style={styles.borrowButtonText} >Requested</Text> 
        ) : item.borrowedBy === userId? 
        (
          <Text style={styles.borrowButtonText} >Return</Text>
        ) :
        (
          <Text style={styles.borrowButtonText} onPress={() => sendBorrowRequest(item._id)}>Borrow</Text>
        ) 
      }
      </TouchableOpacity>
    </TouchableOpacity>
  );
  //console.log("item._id", item._id);

  return (
    <View style={styles.container}>
      <StatusBar />
      <HeaderText text = {'Profile'}/>
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
          <TouchableOpacity style={styles.infoBox} onPress={() => router}>
            <Text style={styles.infoText}>19</Text>
            <Text style={styles.infoLabel}>Friends</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Connect Button Container */}
      <View style={styles.connectButtonContainer}>
        <TouchableOpacity 
          style={[styles.connectButton, isConnected && styles.connectedButton]} 
          onPress={handleConnectToggle}
        >
          <Text style={styles.connectButtonText}>
            {isConnected ? 'Connected' : 'Connect'}
          </Text>
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
        <Text style={[styles.navItem, styles.highlighted]}>Books</Text>
      </View>

      {/* Book List */}
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
  },
  infoBoxes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '70%',
    marginTop: 20,
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
    elevation: 3, // For a slight shadow effect on Android
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
  connectButtonContainer: {
    alignItems: 'flex-end', 
    marginBottom: 0, 
  },
  connectButton: {
    position: 'absolute',
    right: 5,
    top: 50, 
    paddingVertical: 5,
    paddingHorizontal: 25,
    backgroundColor: Colors.choco,
    borderRadius: 8,
  },
  connectedButton: {
    backgroundColor: Colors.savoy,
  },
  connectButtonText: {
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
    //marginBottom: 25,
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
  borrowButton: {
    backgroundColor: Colors.choco,
    padding: 10,
    borderRadius: 8,
  },
  borrowButtonText: {
    color: Colors.background,
    fontWeight: 'bold',
  },
});

export default ProfileView;
