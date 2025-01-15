import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors'
import { retroFont } from '@/utils/fontAdd'
import api from '@/utils/api'
import Button from '@/components/common/Button';
import LogoText from '@/components/common/LogoText';
import StatusBar from '@/components/common/StatusBar';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const signup = async (fullName: string, username: string, email: string, password: string ) => {
    setError(null); 
        try {
          console.log('fsdata', { fullName, username, email, password });
          
          const res = await api.post("/auth/signup", { fullName, username, email, password });
          console.log('res data', res.data);
          console.log('status',res.status);
          //const data = await res.data;

            if(res.status === 200 || 201) {
              setLoading(false);
              alert('signup complete;')
              router.push('/auth/login');
            } else {
              setError('Something went wrong in Routing.'); 
            }
          
        } catch (err:any) {
          if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);  // Backend error message
          } else {
            setError("Something went wrong. Please try again."); 
          }
          console.error("Error during signup:", err);
          setLoading(false);
      }
  }
  
  const handleSignup = () => {
    const trimmedName = formData.name.trim();
    const trimmedUsername = formData.username.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPassword = formData.password.trim();

    /*if (!trimmedUsername || !trimmedPassword  || !trimmedName || !trimmedEmail) {
      alert('Check your inputs.');
      return;
    }*/

    if(!trimmedName){
      alert('Enter your Name');
      return;
    }
    else if(!trimmedUsername){
      alert('Enter your Username');
      return;
    }
    else if(!trimmedEmail){
      alert('Enter an Email Address.');
      return;
    }
    else if(!trimmedPassword){
      alert('Enter a Password.');
      return;
    }

    console.log('Current Form Data:', formData);
    console.log('Submitting Data:', { 
      name: trimmedName, 
      username: trimmedUsername, 
      email: trimmedEmail, 
      password: trimmedPassword 
    });

  
    signup(trimmedName, trimmedUsername, trimmedEmail, trimmedPassword);
 
}

  return (
    <View style={styles.container}>
      {/* Full Page Transparent Loading Indicator */}
      <StatusBar />
      <Modal visible={loading} transparent animationType="fade">
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.choco} />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </Modal>

      <LogoText />
      
      <View style={styles.inputContainer}>
       <TextInput
          placeholder="Name"
          placeholderTextColor= {Colors.choco}
          style={styles.input}
          onChangeText={(text) => setFormData((prevState) => ({
            ...prevState,
            name: text, 
       }))}
        />
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
          placeholder="Email"
          placeholderTextColor={Colors.choco}
          style={styles.input}
          onChangeText={(text) => setFormData((prevState) => ({
            ...prevState,
            email: text, 
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

      <Button title='Signup' onPress={handleSignup}></Button>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
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
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  loadingText: {
    marginTop: 10,
    color: Colors.choco, 
    fontSize: 18,
  },
  errorText:{
    color: Colors.red,
    marginTop: 20,
    fontSize: 19
  }
});

export default Page;