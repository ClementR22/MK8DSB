import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const MultiStateToggleButton = ({ number, setNumber }) => {
  const imagesOrderIconsNames = [
    "sort-numeric-ascending",
    "sort-alphabetical-ascending",
    "sort-alphabetical-descending",
    "graphql",
  ];

  const handlePress = () => {
    const newNumber = (number + 1) % imagesOrderIconsNames.length;
    setNumber(newNumber);
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
        name={imagesOrderIconsNames[number]}
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

export default MultiStateToggleButton;
