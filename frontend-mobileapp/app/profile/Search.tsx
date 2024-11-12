import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Decide whether to navigate to search by book or username
    if (query) {
      // Basic check: if query includes spaces assume it's a book name
      if (query.includes(' ')) {
        navigation.navigate('SearchByBook', { query });
      } else {
        navigation.navigate('SearchByUser', { query });
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by book or username"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10 },
});
