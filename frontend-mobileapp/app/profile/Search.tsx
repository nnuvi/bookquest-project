import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, FlatList,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';

interface SearchResult {
  id: string;
  type: 'book' | 'user';
  title?: string;
  author?: string;
  username?: string;
  profileImage?: string;
  isConnected?: boolean;
  isBorrowed?: boolean;
}

interface SearchProps {
  results: SearchResult[];
  onConnect: (id: string) => void;
  onBorrow: (id: string) => void;
}

const Search: React.FC<SearchProps> = ({ results, onConnect, onBorrow }) => {
  const [query, setQuery] = useState('');
  const navigation = useNavigation();

  const handleProfilePress = (username: string) => {
    navigation.navigate('ProfileView', { username });
  };

  const renderButton = (item: SearchResult) => {
    if (item.type === 'book') {
      return item.isBorrowed ? (
        <TouchableOpacity style={styles.borrowedButton}>
          <Text style={styles.borrowText}>BORROWED</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.borrowButton}
          onPress={() => onBorrow(item.id)}
        >
          <Text style={styles.borrowText}>BORROW</Text>
        </TouchableOpacity>
      );
    } else if (item.type === 'user') {
      return item.isConnected ? (
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageText}>MESSAGE</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.connectButton}
          onPress={() => onConnect(item.id)}
        >
          <Text style={styles.connectText}>CONNECT</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  const renderItem = ({ item }: { item: SearchResult }) => (
    <View style={styles.resultContainer}>
      {item.type === 'book' ? (
        <>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.bookImage}
          />
          <View style={styles.bookInfo}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
            <TouchableOpacity onPress={() => handleProfilePress(item.username!)}>
              <Text style={styles.username}>{item.username}</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => handleProfilePress(item.username!)}>
            <Image source={{ uri: item.profileImage }} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleProfilePress(item.username!)}>
            <Text style={styles.username}>{item.username}</Text>
          </TouchableOpacity>
        </>
      )}
      {renderButton(item)}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#1E1E1E"
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <FlatList
        data={results.filter((item) =>
          item.type === 'book'
            ? item.title?.toLowerCase().includes(query.toLowerCase())
            : item.username?.toLowerCase().includes(query.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.savoy,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    marginVertical: 20,
  },
  backArrow: {
    color: '#1E1E1E',
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFD966',
    padding: 8,
    color: '#1E1E1E',
    borderRadius: 8,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 10,
  },
  bookImage: {
    width: 50,
    height: 70,
    borderRadius: 5,
    marginRight: 10,
  },
  bookInfo: {
    flex: 1,
  },
  title: {
    color: Colors.choco,
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    color: Colors.choco,
    fontSize: 14,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    color: Colors.choco,
    fontSize: 18,
    flex: 1,
  },
  borrowButton: {
    backgroundColor: Colors.choco,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  borrowedButton: {
    backgroundColor: Colors.choco,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  borrowText: {
    color: Colors.background,
    fontSize: 14,
  },
  messageButton: {
    backgroundColor: Colors.choco,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  messageText: {
    color: Colors.background,
    fontSize: 14,
  },
  connectButton: {
    backgroundColor: Colors.choco,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  connectText: {
    color: Colors.savoy,
    fontSize: 14,
  },
});

export default Search;

