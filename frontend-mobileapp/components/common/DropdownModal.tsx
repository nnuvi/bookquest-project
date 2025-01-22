import { Colors } from '@/constants/Colors';
import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextStyle,
  ViewStyle,
} from 'react-native';

type DropdownModalProps = {
     visible: boolean; // Type for visibility
     options: string[]; // Array of strings for dropdown options
     top?: number;
     onSelect: (option: string) => void; // Callback for when an option is selected
     onClose: () => void; // Callback for closing the modal
};

const DropdownModal = ({ visible, options, top = 40, onSelect, onClose } : DropdownModalProps) => {
  const style: TextStyle = { top };
  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={[styles.overlay, style as ViewStyle]} onPress={onClose}>
        <View style={styles.modalContent}>
          <FlatList
            data={options}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default DropdownModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  modalContent: {
    width: '50%',
    backgroundColor: Colors.choco,
    borderRadius: 10,
    padding: 10,
  },
  option: {
    padding: 15,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    color: Colors.yellow,
  },
});
