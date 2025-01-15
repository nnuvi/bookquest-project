import React, { useState, useEffect } from 'react';
import { View, Text,TouchableOpacity, FlatList, Image, StyleSheet, SafeAreaView} from 'react-native';
import { Colors } from '@/constants/Colors';
import api from '@/utils/api';
import StatusBar from '@/components/common/StatusBar';
import { HeaderText } from '@/components/common/HeaderTitle';
// import { SafeAreaView } from 'react-native-safe-area-context';
type User = {
     _id: string;
     fullName: string;
};

type Notification = {
     _id: string;
     from: User;
     to: User;
     type: string;
     message: string;
     read: boolean;
     request: string;
     book: string;
}

const NotificationScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unseenCount, setUnseenCount] = useState<number>(0);

  const getAllNotifications = async() => {
     try {
          console.log('noti before api');
          const res = await api.get("/notifications/");
          const data = await res.data;
          console.log('noti data', data);
          //const notificationId = data._id;
          //console.log('noti id', notificationId);
          setNotifications(data);
          setUnseenCount(data.length);
          console.log('noti after api')
          console.log('noti statusstatus',res.status);
     } catch (error) {
          console.error(error);
     }
  }

  const sendAction = async (action:string, notificationId:string) => {
     try {
          console.log('res action: ', action);
          const res = await api.put(`/books/approveDecline/`, {action, notificationId});
          console.log('res', res);
          console.log('res status', res.status);
          await getAllNotifications();
          //console.log('res data', res.data);
     } catch (error) {
          console.error(error);
     }
  }

  const getReminer = async () => {
     try {
          const res = await api.get('/notifications/reminder');
          console.log('res reminder', res);
          console.log('res reminder status', res.status);
     } catch (error) {
          console.error(error);
     }
  }

  useEffect(() => {
     getAllNotifications();
     getReminer();
  }, []);


  const renderNotification = ({ item }: { item: Notification }) => (
    <View style={styles.notificationContainer}>
      <Image
        source={{ uri: 'https://via.placeholder.com/50' }}
        style={styles.profilePic}
      />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationText}>
          {/*<Text style={styles.username}>{item.from.fullName}</Text> */}{item.message}
        </Text>
        {item.type === 'bookRequest' && (
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.connectButton}
              onPress={() => sendAction('approved', item._id)}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => sendAction('declined', item._id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar />
      <HeaderText text = {'Notification'}/>
      <View style={styles.containerBody}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Unread Notifications</Text>
        {unseenCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unseenCount}</Text>
          </View>
        )}
      </View>
      <View style={styles.headerSpace}></View>
      <FlatList
        data={notifications}
        keyExtractor={(item => item._id.toString())}
        renderItem={renderNotification}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>
        No Notification available.
        </Text>}
        //scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ flexGrow: 1 }}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
     container: {
       flex: 1, // Full height for the parent container
       backgroundColor: Colors.background,
     },
     containerBody: {
       flex: 1, // Allow containerBody to fill the rest of the screen
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
       //fontFamily: 'CustomFont',
       textAlign: 'left',
       marginBottom: 10,
     },
     header: {
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'space-between',
       margin: 4,
     },
     headerSpace: {
       //height: 10,
       borderBottomWidth: 3,
       borderBottomColor: Colors.choco,
     },
     headerText: {
       fontSize: 16,
       color: Colors.yellow,
       fontWeight: 'bold',
     },
     badge: {
       backgroundColor: Colors.choco,
       borderRadius: 15,
       width: 20,
       height: 20,
       justifyContent: 'center',
       alignItems: 'center',
     },
     badgeText: {
       color: '#FFFFFF',
       fontSize: 11,
       fontWeight: 'bold',
     },
     notificationContainer: {
       flexDirection: 'row',
       alignItems: 'center',
       backgroundColor: Colors.background,
       margin: 10,
       borderRadius: 10,
       padding: 10,
       borderBottomWidth: 1,
       borderBottomColor: Colors.choco,
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



