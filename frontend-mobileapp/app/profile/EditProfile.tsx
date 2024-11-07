import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Modal, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';

export default function EditProfileScreen() {
  const [username, setUsername] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Function to select a profile picture from the gallery
  const handleChoosePhoto = () => {
    launchImageLibrary(
      { mediaType: 'photo', maxWidth: 300, maxHeight: 300, quality: 0.5 },
      (response: ImagePickerResponse) => {
        if (response.assets && response.assets.length > 0) {
          setProfileImage(response.assets[0].uri || null);
        }
        setModalVisible(false); 
      }
    );
  };

  // Function to save the profile data
  const handleSaveProfile = () => {
    // Backend
    Alert.alert('Profile Updated', 'Your profile has been saved successfully.');
    console.log("Profile saved:", { username, bio, profileImage });
  };

  return (
    <View style={styles.container}>
      {/* Profile Image Display */}
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Choose Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Username and Bio Inputs */}
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        style={styles.input}
        multiline
      />

      {/* Save Profile Button */}
      <Button title="Save Profile" onPress={handleSaveProfile} />

      {/* Modal for Choosing Profile Picture */}
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
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#f5f5f5' },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: { color: '#888', fontSize: 16 },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
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

