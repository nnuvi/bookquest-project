import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { useFonts } from 'expo-font'

const Page = () => {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'CustomFont': require('../assets/fonts/Retrograde.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Optional: Show a loading spinner here
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>BookQuest</Text>
      </View>
      <View style={styles.authButtons}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('./auth/login')}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('./auth/signup')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 55,
    color: Colors.choco,
    fontFamily: 'CustomFont', 
    
  },
  authButtons: {
    width: '80%',
  },
  button: {
    backgroundColor: '#F1F1F1',
    paddingVertical: 15,
    borderRadius: 25,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
  accountText: {
    marginTop: 20,
    fontSize: 14,
    color: '#FFFFFF',
  },
  linkText: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
})