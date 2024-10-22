import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

type Props = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (): void => {
    axios.post('http://your-backend-url.com/api/login', {
      email,
      password,
    })
    .then(response => {
      const token = response.data.token;
      // Store the JWT token (in AsyncStorage or a state management solution)
      Alert.alert('Success', 'Logged in successfully!');
      navigation.navigate('Home');
    })
    .catch(error => {
      Alert.alert('Error', 'Invalid email or password. Please try again.');
      console.error(error);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>𝕭𝖔𝖔𝖐𝕼𝖚𝖊𝖘𝖙</Text>
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
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupText}>DON’T HAVE AN ACCOUNT? SIGN UP</Text>
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
  loginButton: {
    backgroundColor: '#333',
    padding: 15,
    width: '100%',
    alignItems: 'center',
    borderRadius: 5,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
  },
  signupText: {
    color: '#333',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
