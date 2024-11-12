import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera } from 'react-native-camera-kit';
import NetInfo from '@react-native-community/netinfo';
import { Colors } from '@/constants/Colors';

export default function AddBookISBNScreen() {
  const [isbnData, setIsbnData] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  // Check Internet
  NetInfo.fetch().then(state => {
    setIsConnected(state.isConnected);
  });

  const handleScanISBN = () => {
    if (!isConnected) {
      Alert.alert("Connection Error", "There is no internet connection", [{ text: "OK" }]);
      return;
    }
    console.log("Scanning ISBN...");
  };

  const addBookToList = (isbn: string | null) => {
    if (isbn) {
      // Add the book to the user list with a mock name and author 
      console.log(`Adding book: ISBN: ${isbn}, Title: Mock Book, Author: Mock Author`);
    } else {
      Alert.alert("Error", "Cannot find the ISBN code.", [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ISBN Scanner</Text>
      <TouchableOpacity style={styles.scanButton} onPress={handleScanISBN}>
        <Text style={styles.scanButtonText}>Scan ISBN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton} onPress={() => addBookToList(isbnData)}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  scanButton: {
    position: 'absolute',
    bottom: 200,
    backgroundColor: Colors.background,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  scanButtonText: {
    fontSize: 16,
    color: 'white',
  },
  addButton: {
    position: 'absolute',
    bottom: 80, 
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.background,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
});



