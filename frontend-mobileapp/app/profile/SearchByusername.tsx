
<<<<<<< Updated upstream
=======
const users = [
  { id: '1', username: 'User1', profileImage: 'user_profile_image_url' },
  { id: '2', username: 'User2', profileImage: 'user_profile_image_url' },
];

export default function SearchByUsername({  }) {
  const [query, setQuery] = useState<string>('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by username"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button title="Search" onPress={() => { /* Add search logic */ }} />

      <FlatList
        data={users.filter(user => user.username.includes(query))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity >
            <View style={styles.userItem}>
              <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
              <Text>{item.username}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 10 },
  userItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
});
>>>>>>> Stashed changes
