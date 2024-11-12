import { Colors } from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const EditProfile = () => {
  const [username, setUsername] = useState('Username');
  const [email, setEmail] = useState('user@example.com');
  const [bio, setBio] = useState('This is my bio.');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profilePicContainer}>
        <Image source={{ uri: 'https://example.com/profile-pic.jpg' }} style={styles.profilePic} />
        <Text style={styles.editPhotoText}>Edit Photo</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={bio}
        onChangeText={setBio}
        placeholder="Bio"
        multiline
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  profilePicContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    borderBlockColor: Colors.choco,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editPhotoText: {
    fontSize: 14,
    color: Colors.choco,
    marginTop: 5,
  },
  input: {
    backgroundColor: '#6A4E37',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#6A4E37',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfile;

