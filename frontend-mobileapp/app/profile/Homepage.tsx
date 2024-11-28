import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { retroFont } from '@/utils/fontAdd';
import { router } from 'expo-router';
import api from '@/utils/api'


 type Book = {
  _id: string;
  title: string;
  image: string;
 }

const HomeScreen = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [books, setBooks] = useState<Book[]>([]);
  console.log('Current Form Data:', formData);
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
      onPress={() => { router.push(`/profile/BookDetails?bookId=${item._id.toString()}`)}}
    >
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <Text style={styles.bookTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Bar at the top */}
      <View style={styles.bar}>
        <Text style={styles.barTitle}>BookQuest</Text>
        <View style={styles.navOptions}>
          <TouchableOpacity >
            <Text style={[styles.activeNavItem]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text style={styles.navItem} onPress={() => router.push('/profile/Search')}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text style={styles.navItem} onPress={() => router.push('/profile/Notifications')}>Alerts</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Text style={styles.navItem} onPress={() => router.push('/profile/MyProfile')}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Book List */}
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item._id.toString()}
        numColumns={2}
        contentContainerStyle={styles.bookList}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No books available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  bar: {
    backgroundColor: Colors.choco,
    padding: 16,
    paddingTop: 50,
    paddingBottom: 10,
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
    textDecorationLine: 'underline',
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
