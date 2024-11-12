import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';

type BookDetailsRouteParams = {
  bookId: string;
  title: string;
  author: string;
  isbn: string;
  username: string;
  cover: string;
};

const BookDetails = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: BookDetailsRouteParams }, 'params'>>();
  const { title, author, isbn, username, cover } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Image source={{ uri: cover }} style={styles.bookImage} />
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>Name: {title}</Text>
        <Text style={styles.detailText}>Author: {author}</Text>
        <Text style={styles.detailText}>ISBN: {isbn}</Text>
        <Text style={styles.detailText}>Username: {username}</Text>
      </View>
      <TouchableOpacity style={styles.borrowButton}>
        <Text style={styles.borrowText}>Borrow</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: '#3B2719',
  },
  bookImage: {
    width: 200,
    height: 250,
    backgroundColor: '#ddd',
    marginBottom: 20,
    alignSelf: 'center'
  },
  detailsContainer: {
    backgroundColor: Colors.savoy,
    padding: 20,
    borderRadius: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 10,
  },
  borrowButton: {
    backgroundColor: Colors.savoy,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  borrowText: {
    fontSize: 16,
    color: Colors.background,
    fontWeight: 'bold',
  },
});

export default BookDetails;
