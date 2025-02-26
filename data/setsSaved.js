import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getSetsSavedKeysAndValues = async (onlyKeys = false) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    if (onlyKeys) {
      return keys;
    } else {
      const keyValuePairs = (await AsyncStorage.multiGet(keys)).map(
        (keyValuePair) => {
          const setSaved = JSON.parse(keyValuePair[1]);
          return setSaved;
        }
      );
      return keyValuePairs;
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return [];
  }
};
