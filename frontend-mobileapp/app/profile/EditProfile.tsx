import { Colors } from '@/constants/Colors';
import api from '@/utils/api';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const EditProfile = async() => {
    try {
      const res = await api.post("/users/editProfile", {username, email, bio, currentPassword, newPassword });
      console.log(res.data);
      setSuccess(true);
    } catch (error) {
      console.log("error:", error);
    }
    console.log(username, email, bio, currentPassword, newPassword);
  }

  const logout = async () => {
    try {
      const res = await api.post("/auth/logout");
      console.log(res.data);
      console.log("logged out");
      router.push('/');
    } catch (error) {
      console.log("error:", error);
    }
  }

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
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder="New Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholder="Current Password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.saveButton} onPress={() => {EditProfile()}}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
      {
        success && <View style={styles.successBox}><Text style={styles.successText}>Profile updated successfully!</Text></View>
      }
      <View style={styles.view}>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText} onPress={() => {logout()}}>Logout</Text>
      </TouchableOpacity>
      </View>
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
  successText: {
    alignItems: 'center',
    fontSize: 16,
    color: Colors.choco,
  },
  successBox: {
    backgroundColor: Colors.savoy,
    padding: 10,
    marginTop: 20
  },
  logoutButton: {
    backgroundColor: '#6A4E37',
    padding: 15,
    marginVertical: 100,
    width: '40%',
    alignItems: 'center',
    borderRadius: 44
  },
  logoutText: {
    color: Colors.background,
  },
  view: {
    flex: 1,
    alignItems: 'center'
  }
});

export default EditProfile;

