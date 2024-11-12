import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
type Book = {
  id: string;
  title: string;
  image: string;
};

const books: Book[] = [
  { id: '1', title: 'Book 1', image: 'https://example.com/book1.jpg' },
  { id: '2', title: 'Book 2', image: 'https://example.com/book2.jpg' },
  // Add more books as needed
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      style={styles.bookContainer}
      onPress={() => navigation.navigate('BookDetails', { bookId: item.id })}
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
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={[styles.activeNavItem]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Text style={styles.navItem}>Search</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Alerts')}>
            <Text style={styles.navItem}>Alerts</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.navItem}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Book List */}
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.bookList}
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
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.background,
    fontFamily: 'CustomFonts',
    textAlign: 'left',
    marginBottom: 2,
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
    flex: 1,
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
