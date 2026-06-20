import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const BookCoverSelector = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 0,
    });

    if (result.assets) {
      const images = result.assets.map(asset => asset.uri);
      setGalleryImages(images as string[]);
    }
  };

  const selectCover = (uri: string) => {
    setSelectedImage(uri);
  };

  return (
    <View style={styles.container}>
      {/* Header with Cancel and Done buttons */}
      <View style={styles.header}>
        <TouchableHighlight style={styles.button} onPress={() => setSelectedImage(null)}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => {/* Handle Done action */}}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableHighlight>
      </View>

      {/* Selected Book Cover Preview */}
      <View style={styles.preview}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <Text style={styles.placeholder}>No Cover Selected</Text>
        )}
      </View>

      {/* Gallery Button */}
      <TouchableHighlight style={styles.galleryButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Open Gallery</Text>
      </TouchableHighlight>

      {/* Gallery Images */}
      <Text style={styles.galleryTitle}>Gallery</Text>
      <FlatList
        data={galleryImages}
        numColumns={3}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectCover(item)}>
            <Image source={{ uri: item }} style={styles.galleryImage} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D2B48C', // Background color to match design
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8B4513', // Dark brown color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  preview: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
  },
  placeholder: {
    width: 150,
    height: 200,
    backgroundColor: '#EEE',
    textAlign: 'center',
    lineHeight: 200,
    color: '#555',
  },
  galleryButton: {
    backgroundColor: '#8B4513', // Dark brown color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'center',
  },
  galleryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  galleryImage: {
    width: 100,
    height: 100,
    margin: 5,
  },
});

export default BookCoverSelector;

