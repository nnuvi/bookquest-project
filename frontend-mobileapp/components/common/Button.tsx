import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface ErrorModalProps {
  title: string;
  onPress?: () => void;
}

const Button = ({ title, onPress }: ErrorModalProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '80%',
    backgroundColor: 'gray',
    paddingVertical: 12,
    borderRadius: 50,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Button;
