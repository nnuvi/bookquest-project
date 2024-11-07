import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

export default function AddBooks({ navigation }) {
  const handleAddOption = () => {
    Alert.alert("Add Book", "How do you want to add your book?", [
      { text: "Manually", onPress: () => navigation.navigate('AddBookManually') },
      { text: "ISBN Scan", onPress: () => navigation.navigate('AddBookISBN') },
    ]);
  };

  return (
    <View style={styles.container}>
      <Button title="Add +" onPress={handleAddOption} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
