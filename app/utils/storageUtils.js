import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

let key = 'todoItems';

export const getStoredTodoData = async () => {
  try {
    const storedData = await AsyncStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.log('Error retrieving stored data:', error);
    return [];
  }
};

export const handleStoreTodoData = async data => {
  try {
    let existingData = await getStoredTodoData();
    existingData.push(data);
    const jsonData = JSON.stringify(existingData);
    await AsyncStorage.setItem(key, jsonData);
    // console.log('Data is stored in async storage successfully!');
    return true;
  } catch (error) {
    console.log('Error storing data in async storage: ', error);
    return false;
  }
};

export const handleDeleteAllStorageData = async () => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Data under key '${key}' cleared from AsyncStorage.`);
  } catch (error) {
    console.log(
      `Error clearing data for key '${key}' from AsyncStorage:`,
      error,
    );
  }
};
