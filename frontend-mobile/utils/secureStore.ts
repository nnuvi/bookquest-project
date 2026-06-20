import * as SecureStore from 'expo-secure-store';

export const saveToken = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log(`Token saved: ${value}`);
  } catch (error) {
    console.error(`Error saving token for key "${key}":`, error);
  }
};

export const getToken = async (key: string) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    console.log(`Token retrieved for key "${key}":`, value);
    return value;
  } catch (error) {
    console.error(`Error retrieving token for key "${key}":`, error);
    return null;
  }
};

export const deleteToken = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log(`Token deleted for key "${key}"`);
  } catch (error) {
    console.error(`Error deleting token for key "${key}":`, error);
  }
};