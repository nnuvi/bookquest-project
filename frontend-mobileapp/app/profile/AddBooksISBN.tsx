import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import api from '@/utils/api';

export default function ISBNScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isbn, setIsbn] = useState(null);

  // Request Camera Permissions
  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getPermissions();
  }, []);

  // Handle the scanned barcode
  const handleBarcodeScanned = ({ type, data }) => {
    console.log('Scanned type:', type);
    console.log('Scanned data:', data);
    setScanned(true);
    setIsbn(data); // Set the scanned ISBN
    Alert.alert('Scanned ISBN', `ISBN: ${data}`);
    importByISBN(data);
  };

  // Reset the scanner to scan again
  const scanAgain = () => {
    setScanned(false);
    setIsbn(null);
  };

  // If camera permission is not granted, show a message
  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const importByISBN = async(isbn) => {
    try {
    console.log("isbn", isbn);
    const res = await api.post(`/books/importBooksByISBN`,{isbn})
    console.log(res.data);
    Alert.alert('Imported Books', `Imported ${res.data.length} books`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan ISBN Barcode</Text>

      {!scanned ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarcodeScanned}
          style={StyleSheet.absoluteFillObject}
        >
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Scan the ISBN Barcode</Text>
          </View>
        </BarCodeScanner>
      ) : (
        <View style={styles.scannedInfo}>
          <Text>Scanned ISBN: {isbn}</Text>
          <Button title="Scan Again" onPress={scanAgain} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  overlayText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  scannedInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
  },
});
