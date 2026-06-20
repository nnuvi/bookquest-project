import { Colors } from '@/constants/Colors';
import React from 'react';
import { Text, StyleSheet, TextStyle, View } from 'react-native';
import { retroFont } from '@/utils/fontAdd'
import { SafeAreaView } from 'react-native-safe-area-context';


type LogoTextProps = {
  color?: string; // Optional text color
  fontSize?: number; // Optional font size
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify';
};

const LogoText = ({ color = Colors.choco, fontSize = 55, textAlign = 'center' }: LogoTextProps) => {
  const style: TextStyle = { color, fontSize, textAlign };

  return (
     <SafeAreaView style={styles.logoContainer}>
       <Text style={[styles.logoText, style]}>BookQuest</Text>
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoText: {
    fontFamily: 'CustomFont', 
  },
  logoContainer: {
     alignItems: 'center',
     marginBottom: 20,
  },
});

export default LogoText;
