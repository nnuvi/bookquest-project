import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Colors } from '@/constants/Colors';
import { retroFont } from '@/utils/fontAdd';
import { router } from 'expo-router';
import api from '@/utils/api'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import LogoText from '@/components/common/LogoText';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import DropdownModal from '@/components/common/DropdownModal';
import StatusBar from '@/components/common/StatusBar';


 type Book = {
  _id: string;
  title: string;
  image: string;
 }
 type User = {
  _id: string | null;
  username: string | null;
 }

const HomeScreen = () => {
  const [user, setUser] = useState<User>();
  const [books, setBooks] = useState<Book[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const {data:authUser} = useQuery<User>({queryKey: ['authUser']});
	const queryClient = useQueryClient();

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
      console.log("authUser", authUser);
    }
  }, [authUser]);

  const getBookCollection = async () => {
    try {
      const res = await api.get("/books/myBooks");
      const data: Book[] = await res.data.bookCollection;
               console.log('res data', res.data);
               console.log('data', data);
               console.log('status',res.status);
               if (data) {
                console.log('data', data);
                setBooks(data);
              } else {
                console.log('No books found');
                setBooks([]);  // Ensure an empty array is set if no books are available
              }
              return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  // Fetch data when the component mounts
  useEffect(() => {
    getBookCollection();
    console.log('Books after setting state:', books);
  }, []);

  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      style={styles.bookContainer}
      onPress={() => router.push({
        pathname: '/books/bookDetails/[bookId]',
        params: { bookId: item._id },
      })}
    >
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <Text style={styles.bookTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const options = ['Option 1', 'Option 2', 'Option 3', 'Log out'];

  const handleOptionActions = (option: string) => {
    if (option === 'Log out') {
      try {
        api.post('/auth/logout');
        console.log('Logged out');
        router.replace('/');
      } catch (error) {
        console.error(error);
      }
    }
    else{
      console.log('option selected', option)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      {/* Bar at the top */}
      
      <View style={styles.bar}>
        <View style={styles.headerItems}>
          <LogoText color= {Colors.background} fontSize={40} textAlign = 'left'/>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
          </TouchableOpacity>
        </View>

        
        <DropdownModal
          visible={modalVisible}
          options={options}
          onSelect={(option) => handleOptionActions(option)}
          onClose={() => setModalVisible(false)}
        />
      
        {/* <View style={styles.navOptions}>
          <TouchableOpacity >
            <Text style={[styles.activeNavItem]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text 
              style={styles.navItem} 
              onPress={() => router.push('/home/Search')}>
                Search
            </Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text 
              style={styles.navItem} 
              onPress={() => router.push('/home/Notifications')}>
                Alerts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text 
              style={styles.navItem} 
              onPress={() => router.push('/home/MyProfile')}>
                Profile
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>

      {/* Book List */}
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item._id.toString()}
        numColumns={2}
        contentContainerStyle={styles.bookList}
        ListEmptyComponent={
          <Text style={{ 
            textAlign: 'center', 
            marginTop: 20 
          }}>
          No books available.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerItems:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  bar: {
    backgroundColor: Colors.choco,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 0,
  },
  barTitle: {
    fontSize: 40,
    color: Colors.background,
    fontFamily: 'CustomFont',
    textAlign: 'left',
    marginBottom: 10,
  },
  navOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: {
    fontSize: 16,
    color: Colors.background,
  },
  activeNavItem: {
    fontWeight: 'bold',
    color: '#FFF', 
  },
  bookList: {
    padding: 16,
  },
  bookContainer: {
    //flex: 1,
    width: '45%',
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
  },
  bookImage: {
    width: 100,
    height: 140,
    marginBottom: 10,
    backgroundColor: '#ddd',
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B2719',
  },
});

export default HomeScreen;