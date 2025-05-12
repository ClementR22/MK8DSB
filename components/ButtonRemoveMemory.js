import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Pressable, Text } from "react-native";

const ButtonRemoveMemory = () => {
  const removeMemory = async () => {
    const keys = await AsyncStorage.getAllKeys();
    keys.forEach(async (key) => await AsyncStorage.removeItem(key));
  };

  return (
    <Pressable onPress={() => removeMemory()}>
      <Text>Remove memory</Text>
    </Pressable>
  );
};

export default ButtonRemoveMemory;
