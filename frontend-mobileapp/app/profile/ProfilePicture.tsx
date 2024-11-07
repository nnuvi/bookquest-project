import React, { useState } from 'react';
import { View, Image, Button, Modal, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';

export default function ProfilePicture() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleChoosePhoto = () => {
    launchImageLibrary(
      { mediaType: 'photo', maxWidth: 300, maxHeight: 300, quality: 0.5 },
      (response: ImagePickerResponse) => {
        if (response.assets && response.assets.length > 0) {
          setProfileImage(response.assets[0].uri || null);
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Choose Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Modal for choosing profile picture */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Profile Picture</Text>
            <Button title="Choose from Gallery" onPress={handleChoosePhoto} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="#888" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: { color: '#888', fontSize: 16 },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, marginBottom: 10 },
});
