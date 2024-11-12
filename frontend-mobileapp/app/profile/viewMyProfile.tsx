import { StyleSheet, Text, View, BackHandler, TouchableOpacity, Image, Button, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';  // Correct Camera import from expo-camera
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '@/constants/Colors';
import { readAsStringAsync, EncodingType } from 'expo-file-system';
import api from '@/utils/api';
import { binarizeImageOnCanvas } from '../../utils/preProcessImage'
import Canvas from 'react-native-canvas';


const Page = () => {
  const cameraRef = useRef<typeof Camera | null>(null); // Reference to Camera
  const [ocrText, setOcrText] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [image, setImage] = useState<null | string>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [guri, setGuri] = useState<null | string>(null);
  const canvasRef = useRef<Canvas>(null);


  // Handle back button press on Android
  const handleBackPress = () => {
    BackHandler.exitApp();
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, []);

  //Requesting Camerra permission
    useEffect(() => {
      const requestPermissions = async () => {
        try {
          const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
          const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
          if (cameraStatus === 'granted' && mediaStatus === 'granted') {
            setHasPermission(true);
          } else {
            setHasPermission(false);
          }
        } catch (error) {
          console.error('Error requesting permissions:', error);
          setHasPermission(false);
        }
      };
  
      requestPermissions();
    }, []);


// taking image
  const takeImage = async () => {
    const { width, height } = Dimensions.get('window');
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [width, height],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      setImage(uri); // This now works since image is of type 'string | null'
      console.log('Image captured:', uri);
      /*const canvas = canvasRef.current;
      if (!canvas) {
        console.log('Canvas not found');
        return;
      }

      // Binarize the image on the canvas
      await binarizeImageOnCanvas(canvas, uri);

      // Convert canvas content to a data URL (base64 string)
      const newURI = await canvas.toDataURL('image/png');
      setGuri(newURI);
      console.log('Binarized image:', newURI);*/
      await sendImageToServer(uri);
      console.log("sent function");
    }
    console.log("before result and setimg");
  };


  //Sending captured image to server
  const sendImageToServer = async (imageUri:any) => {
    console.log("Image upload started...");

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri, // Use the decoded URI here
      name: 'image.jpeg',
      type: 'image/jpeg', 
    });

    //const formData = new FormData();
    //formData.append('image', imageUri);
    console.log("img rd", formData);
    try {
      const res = await api.post('books/importBooksByImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("img sent");

      console.log(typeof res.data.data);
      console.log("img text", res.data.data);
      setOcrText(res.data.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  // Handle different permission states
  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text>Requesting camera permissions...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text>No access to camera. Please enable permissions from settings.</Text>
      </View>
    );
  }
  
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.captureButton} onPress={takeImage}>
            <Text style={styles.captureText}>Capture Image</Text>
          </TouchableOpacity>
        {/*{image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}*/}
          {imageUri && (
            <View style={styles.previewContainer}>
              <Image source={{ uri: imageUri }} style={styles.capturedImage} />
              {ocrText && <Text style={styles.ocrText}>{ocrText}</Text>}
            </View>
          )}
              {ocrText && <Text style={styles.ocrText}>{ocrText}</Text>}
          
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  captureButton: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    color: Colors.green,
  },
  captureText: {
    color: 'white',
  },
  textContainer: {
    padding: 20,
    backgroundColor: 'white',
  },
  previewContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  capturedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  ocrText: {
    marginTop: 10,
    paddingHorizontal: 10,
    textAlign: 'center',
    color: Colors.green,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default Page;
