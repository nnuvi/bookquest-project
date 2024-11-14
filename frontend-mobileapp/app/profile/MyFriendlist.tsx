import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';
import { retroFont } from '@/utils/fontAdd';

interface Friend {
  id: string;
  username: string;
  profileImage: string;
}

interface FriendListProps {
  friends: Friend[];
}

const FriendList: React.FC<FriendListProps> = ({ friends }) => {
  const navigation = useNavigation();

  const handlePress = (username: string) => {
    navigation.navigate('ProfileView', { username });
  };  

  const renderItem = ({ item }: { item: Friend }) => (
    <View style={styles.friendContainer}>
      <TouchableOpacity onPress={() => handlePress(item.username)}>
        <Image source={{ uri: item.profileImage }} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress(item.username)}>
        <Text style={styles.username}>{item.username}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.messageButton}>
        <Text style={styles.messageText}>MESSAGE</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FRIENDS</Text>
      <FlatList
        data={friends}
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
  title: {
    color: Colors.choco,
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
    fontFamily: 'retroFont',
  },
  friendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: Colors.background,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    color: '#FFFFFF',
    fontSize: 18,
    flex: 1,
  },
  messageButton: {
    backgroundColor: Colors.choco,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  messageText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default FriendList;


