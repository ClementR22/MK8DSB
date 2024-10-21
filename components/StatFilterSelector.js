import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const StatFilterSelector = ({ statFilterNumber, setStatFilterNumber }) => {
  const filterList = ["≃", "≥", "="];

  const handlePress = () => {
    const nextIndex = (statFilterNumber + 1) % filterList.length;
    setStatFilterNumber(nextIndex);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.pressable,
        styles.selectedFilter, // le style reste actif car un seul bouton
      ]}
    >
      <Text style={styles.selectedText}>{filterList[statFilterNumber]}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "red",
  },
  selectedText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default StatFilterSelector;
