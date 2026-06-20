import { Colors } from '@/constants/Colors';
import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import Button from './Button';

// Define props interface
interface ErrorModalProps {
  visible: boolean;
  onClose?: () => void;
  message?: string;
}

const ErrorModal = ({ visible, onClose, message }: ErrorModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.errorText}>{message}</Text>
          <Button title="Close" onPress={onClose}/>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.transparent ,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    paddingVertical: 20,
    backgroundColor: Colors.gray,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  errorText: {
    paddingVertical: 20,
    marginBottom: 20,
    fontSize: 18,
    color: Colors.choco,
    textAlign: 'center',
  },
});

export default ErrorModal;
