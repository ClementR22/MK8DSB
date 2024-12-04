import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const OrderSelector = ({ orderNumber, setOrderNumber }) => {
  const filterList = ["id", "alphabetical", "class"];

  const handlePress = () => {
    const nextIndex = (orderNumber + 1) % filterList.length;
    console.log("nextIndex", nextIndex);
    setOrderNumber(nextIndex);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.pressable,
        styles.selectedFilter, // le style reste actif car un seul bouton
      ]}
    >
      <MaterialCommunityIcons
        name={filterList[orderNumber]}
        size={24}
        style={styles.selectedText}
      ></MaterialCommunityIcons>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    display: "flex",
    height: 40,
    width: 40,
    borderRadius: 100,
    backgroundColor: "#6750A4",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedText: {
    color: "#fff",
  },
});

export default OrderSelector;
