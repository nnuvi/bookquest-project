import React from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

type CustomStatusBarProps = {
  style?: 'auto' | 'inverted' | 'light' | 'dark'; // Optional style prop
  translucent?: boolean; // Optional translucent prop
  backgroundColor?: string; // Optional background color prop
};

const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
  style = 'auto',
  translucent = true,
  backgroundColor = 'transparent',
}) => {
  return (
    <ExpoStatusBar
      style={style}
      translucent={translucent}
      backgroundColor={backgroundColor}
    />
  );
};

export default CustomStatusBar;
