import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, FlatList,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import api from '@/utils/api';
import { router } from 'expo-router';
import { useUser } from '../profile/getMe'
import Octicons from '@expo/vector-icons/Octicons';
import StatusBar from '@/components/common/StatusBar';
import { HeaderTitle } from '@/components/common/HeaderTitle';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type User = {
  _id: number;
  username: string;
  bio: string;
}

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

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
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
    const handler = setTimeout(() => {
        setDebouncedQuery(query);
        console.log(query);
    }, 300); // Adjust delay as needed
    return () => {
        clearTimeout(handler); // Clear timeout if query changes
    };
}, [query]);

useEffect(() => {
  if (debouncedQuery.trim() === '') {
    console.log("deb query effect", debouncedQuery);
    setResults([]); // Clear results if input is empty
    return;
  }
  console.log("deb data:",debouncedQuery);
  handleSearch(debouncedQuery);
}, [debouncedQuery])

  const handleSearch = async (text: string) => {
    console.log("res text:", text);
    if (text.length < 3) {
      setResults([]);
      return;
    }
    console.log("res2 text:", text);
    try {
      const res = await api.get(`/users/searchProfile?q=${text}`);
      console.log("res:", res);
      const data = res.data;
      console.log(data);
      const filteredResults = data.filter((user: { _id: any; }) => user._id !== authUser?._id);
      setResults(filteredResults);
    } catch (error) {
      console.error(error);
    }
  }

  console.log("authuser Id: ", authUser?._id);

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity 
      style={styles.resultContainer}
      onPress={() => router.push({
        pathname: '/profile/ProfileView/[profileId]',
        params: { profileId: item._id },
      })}
    >
      <Image
      source={{ uri: 'https://via.placeholder.com/100' }}
      style={styles.bookImage}
      />
      <View style={styles.bookInfo}>
        <Text style={styles.title}>{item.username}</Text>
        <Text style={styles.author}>{item.bio}</Text>
      </View>
    </TouchableOpacity>
  );

  /*
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
*/
/*
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
*/

  return (
    
    <View style={styles.container}>
      <StatusBar />
      <HeaderTitle text= {'Search'}/>
      <View style={styles.containerBody}>
      <View style={styles.searchBar}>
        <TouchableOpacity 
          style={styles.searchIcon} 
          onPress={() => router.push('../profile/ProfileView')}
        >
          <Octicons name="search" size={24} color='black' />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor= {Colors.text}
          onChangeText={setQuery}
        />
      </View>
      <FlatList
      data={results}
      renderItem={renderItem}
      keyExtractor={(item => item._id.toString())}
      ListEmptyComponent={
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No search result available.
        </Text>}
      />
    </View>
    </View>
  );
};
  { /*     
    <FlatList
       data={results.filter((item) =>
         item.type === 'book'
           ? item.title?.toLowerCase().includes(query.toLowerCase())
           : item.username?.toLowerCase().includes(query.toLowerCase())
       )}
       keyExtractor={(item) => item.id}
       renderItem={renderItem}
     />*/}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    
  },
  containerBody:{
    paddingHorizontal: 20,
  },
  bar: {
    backgroundColor: Colors.choco,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 0,
    paddingHorizontal: null,
  },
  barTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.background,
    textAlign: 'left',
    marginBottom: 10,
  },
  searchIcon:{
    fontSize: 30,
    paddingRight:10,
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
    color: Colors.black,
    fontSize: 24,
    fontWeight: '200',
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFD966',
    padding: 8,
    color: Colors.black,
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

