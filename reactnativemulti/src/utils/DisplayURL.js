// DisplayURL.js
import React from 'react';
import { Text, Platform } from 'react-native';

const DisplayURL = ({ style }) => {
  if (Platform.OS === 'web') {
    return <Text style={style}>URL actuelle: {window.location.href}</Text>;
  }
  return null;
};

export default DisplayURL;
