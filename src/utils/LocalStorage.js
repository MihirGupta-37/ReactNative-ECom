import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    // Error saving data
  }
};

const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue !== null) {
      let jsonParseData = JSON.parse(jsonValue);
      return jsonParseData;
    }
    return null;
  } catch (error) {
    // Error retrieving data
  }
};

export default {saveData, getData};
