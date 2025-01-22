import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface PageLoadingIndicatorProps {
  size?: 'small' | 'large'; // Size of the spinner
  color?: string;          // Color of the spinner
  backgroundColor?: string; // Background color for the loading screen
}

const PageLoadingIndicator: React.FC<PageLoadingIndicatorProps> = ({
  size = 'large',
  color = '#007AFF', // Default blue color
  backgroundColor = 'rgba(0, 0, 0, 0.5)', // Semi-transparent black
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PageLoadingIndicator;