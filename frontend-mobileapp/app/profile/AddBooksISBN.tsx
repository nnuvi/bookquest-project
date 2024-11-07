import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function AddBookISBNScreen() {
  const handleScanISBN = () => {
    console.log("Scanning ISBN...");
  };

  return (
    <View style={styles.container}>
      <Text>ISBN Scanner</Text>
      <Button title="Scan ISBN" onPress={handleScanISBN} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
