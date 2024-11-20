import React, { useState, useEffect } from 'react';
import { View, Text,TouchableOpacity, FlatList, Image, StyleSheet,} from 'react-native';
import { Colors } from '@/constants/Colors';

interface Notification {
  id: string;
  type: 'connect' | 'action';
  username: string;
  message: string;
  bookName?: string;
}

const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unseenCount, setUnseenCount] = useState<number>(0);

  // fetching notifications dynamically
  useEffect(() => {
    // get notifications from backend and modify this part
    const fetchNotifications = async () => {
      const fetchedNotifications: Notification[] = [
        {
          id: '1',
          type: 'connect',
          username: 'user1',
          message: 'requested to connect with you.',
        },
        {
          id: '2',
          type: 'action',
          username: 'user2',
          message: 'notified you to return the "Book Name" back.',
          bookName: 'Book Name',
        },
      ];
      setNotifications(fetchedNotifications);
      setUnseenCount(fetchedNotifications.length);
    };

    fetchNotifications();
  }, []);

  const handleConnectBack = (id: string) => {
    // put the code of add user to friend list logic 
    console.log('User added to friend list');
    // remove notification
    handleDelete(id);
  };

  const handleDelete = (id: string) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);
    setUnseenCount(updatedNotifications.length);
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <View style={styles.notificationContainer}>
      <Image
        source={{ uri: 'https://via.placeholder.com/50' }}
        style={styles.profilePic}
      />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>
          <Text style={styles.username}>{item.username}</Text> {item.message}
        </Text>
        {item.type === 'connect' && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.connectButton}
              onPress={() => handleConnectBack(item.id)}
            >
              <Text style={styles.buttonText}>CONNECT BACK</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.buttonText}>DELETE</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ALERTS</Text>
        {unseenCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unseenCount}</Text>
          </View>
        )}
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background ,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  headerText: {
    fontSize: 24,
    color: Colors.yellow,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: Colors.choco,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    marginBottom: 15,
    borderRadius: 10,
    padding: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  connectButton: {
    backgroundColor: Colors.savoy,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: Colors.savoy,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default NotificationScreen;



