import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/constants/Colors';

interface Friend {
  id: string;
  username: string;
  profileImage: string;
  isConnected: boolean;
}

interface FriendListProps {
  friends: Friend[];
  onConnect: (id: string) => void;
}

const FriendListOthers: React.FC<FriendListProps> = ({ friends, onConnect }) => {
  const navigation = useNavigation();

  const handleProfilePress = (username: string) => {
    navigation.navigate('ProfileView', { username });
  };

  const renderButton = (friend: Friend) => {
    return friend.isConnected ? (
      <TouchableOpacity style={styles.messageButton}>
        <Text style={styles.messageText}>MESSAGE</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={styles.connectButton} onPress={() => onConnect(friend.id)}>
        <Text style={styles.connectText}>CONNECT</Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }: { item: Friend }) => (
    <View style={styles.friendContainer}>
      <TouchableOpacity onPress={() => handleProfilePress(item.username)}>
        <Image source={{ uri: item.profileImage }} style={styles.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleProfilePress(item.username)}>
        <Text style={styles.username}>{item.username}</Text>
      </TouchableOpacity>
      {renderButton(item)}
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
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
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
  connectButton: {
    backgroundColor: Colors.savoy,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  connectText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
});

export default FriendListOthers;

