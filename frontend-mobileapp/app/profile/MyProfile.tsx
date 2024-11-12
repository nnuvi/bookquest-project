import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';

type Book = {
  id: string;
  title: string;
  author: string;
  image: string;
};

const books: Book[] = [
  { id: '1', title: 'Book 1', author: 'Author 1', image: 'https://example.com/book1.jpg' },
  { id: '2', title: 'Book 2', author: 'Author 2', image: 'https://example.com/book2.jpg' },
];

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleAddBook = () => {
    Alert.alert(
      "How do you want to add your books?",
      "",
      [
        { text: "Manually", onPress: () => console.log("Add manually") },
        { text: "ISBN Scan", onPress: () => console.log("ISBN scan") },
        { text: "Cancel", style: "cancel" }
      ],
      { cancelable: true }
    );
  };

  const renderBookItem = ({ item }: { item: Book }) => (
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
          <TouchableOpacity style={styles.infoBox} onPress={() => navigation.navigate('Friends')}>
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
        <Text style={styles.name}>Name</Text>
        <Text style={styles.username}>@username</Text>
        <Text style={styles.bio}>This is a sample bio.</Text>
      </View>

      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <Text style={[styles.navItem, styles.highlighted]}>List</Text>
        <TouchableOpacity>
          <Text style={styles.navItem}>Borrowed</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navItem}>Lent</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddBook}>
          <Text style={styles.navItem}>Add+</Text>
        </TouchableOpacity>
      </View>

      {/* Book List */}
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.bookList}
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
    flexDirection: 'row',
    marginLeft: 148,
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
    marginBottom: 25,
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
});

export default ProfileScreen;
