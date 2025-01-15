import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { retroFont } from '@/utils/fontAdd'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/utils/api'
import Button from '@/components/common/Button'
import LogoText from '@/components/common/LogoText'
import { StatusBar } from 'expo-status-bar'


const Page = () => {
    
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [formData, setFormData] = useState({
		  username: "",
		  password: "",
	  });
     console.log('Current Form Data:', formData);
     const router = useRouter();
     
     const login = async (username: string, password: string ) => {
          try {
               console.log('fdata', { username, password });
               
               const res = await api.post("/auth/login", { username, password });
               console.log('res data', res.data);
               console.log('status',res.status);
               if(res.status === 200) {
                  router.replace('../home');
               } else {
                  alert('Invalid username or password');
               }
          } catch (error) {
               console.error('Error during login:', error);
               alert('Invalid username or password');
          }
     }

     const handleLogin = () => {
          const trimmedUsername = formData.username.trim();
          const trimmedPassword = formData.password.trim();
          console.log(trimmedUsername, trimmedPassword);
      
          if (!trimmedUsername || !trimmedPassword) {
            alert('Username and password are required.');
            return;
          }
          console.log('Submitting Data:', { username: trimmedUsername, password: trimmedPassword });
      
          login(trimmedUsername, trimmedPassword);
     }

  return (
    <View style={styles.container}>
      <StatusBar style='auto' translucent={true} backgroundColor="transparent" />
      <LogoText />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          placeholderTextColor={Colors.choco}
          style={styles.input}
          onChangeText={(text) => setFormData((prevState) => ({
               ...prevState,
               username: text, 
          }))}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor={Colors.choco}
          secureTextEntry
          style={styles.input}
          onChangeText={(text) => setFormData((prevState) => ({
               ...prevState,
               password: text, 
          }))}
        />
      </View>

      <Button title="Login" onPress={handleLogin}></Button>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.background,
     },
     text: {
          fontSize: 50,
          color: '#fff',
     },
     logoContainer: {
          alignItems: 'center',
          marginBottom: 10,
        },
        title: {
          fontSize: 55,
          color: Colors.choco,
          fontFamily: 'CustomFont', 
        },
        inputContainer: {
          width: '80%',
        },
        input: {
          backgroundColor: '#F1F1F1',
          textAlign: 'center',
          fontSize: 18,
          paddingVertical: 12,
          borderRadius: 8,
          marginBottom: 16,
        },
        button: {
          width: '80%',
          backgroundColor: 'gray',
          paddingVertical: 12,
          borderRadius: 50,
        },
        buttonText: {
          fontSize: 18,
          textAlign: 'center',
        },
        space: {
          height: 33,
        }
})