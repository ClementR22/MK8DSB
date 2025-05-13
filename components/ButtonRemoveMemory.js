import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import Button from "@/components/Button";

const ButtonRemoveMemory = () => {
  const removeMemory = async () => {
    const keys = await AsyncStorage.getAllKeys();
    keys.forEach(async (key) => await AsyncStorage.removeItem(key));
  };

  return (
    <Button onPress={() => removeMemory()}>Remove memory</Button>
  );
};

export default ButtonRemoveMemory;
