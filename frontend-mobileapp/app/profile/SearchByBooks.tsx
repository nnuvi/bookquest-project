
<<<<<<< Updated upstream
=======
const books = [
  { id: '1', title: 'Book Title One', author: 'Author1', cover: 'book_cover_url' },
  { id: '2', title: 'Book Title Two', author: 'Author2', cover: 'book_cover_url' },
];

export default function SearchByBooks({ }) {
  const [query, setQuery] = useState<string>('');

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by book title"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button title="Search" onPress={() => { /* Add search logic */ }} />

      <FlatList
        data={books.filter(book => book.title.includes(query))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity >
            <View style={styles.bookItem}>
              <Image source={{ uri: item.cover }} style={styles.bookImage} />
              <Text>{item.title}</Text>
              <Text style={styles.author}>by {item.author}</Text>
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
  bookItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  bookImage: { width: 50, height: 70, marginRight: 10 },
  author: { color: 'gray' },
});
>>>>>>> Stashed changes
