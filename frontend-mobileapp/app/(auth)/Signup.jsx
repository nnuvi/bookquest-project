import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password === confirmPassword) {
      //backend
      axios.post('http://your-backend-url.com/api/signup', {
        email,
        password,
      })
      .then(response => {
        const token = response.data.token;

        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert('Error', 'Could not sign up. Please try again.');
        console.log(error);
      });
    } else {
      Alert.alert('Error', 'Passwords do not match!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>𝕭𝖔𝖔k𝕼𝖚𝖊𝖘𝖙</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        placeholderTextColor="#aaa"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupText}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 36,
    marginBottom: 40,
    fontFamily: 'Cochin',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  signupButton: {
    backgroundColor: '#333',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
  },
  loginLink: {
    color: '#333',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
