import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import TooltipWrapper from "./TooltipWrapper3";

const ButtonMultiStateToggle = ({
  number,
  setNumber,
  filterCase = false,
  text,
}) => {
  const statFilterIconsNames = [
    "approximately-equal",
    "greater-than-or-equal",
    "equal",
  ];
  const elementOrderIconsNames = [
    "sort-numeric-ascending",
    "sort-alphabetical-ascending",
    "sort-alphabetical-descending",
    "graphql",
  ];

  const iconsNames = filterCase ? statFilterIconsNames : elementOrderIconsNames;

  const handlePress = () => {
    const newNumber = (number + 1) % iconsNames.length;
    setNumber(newNumber);
  };

  return (
    <TooltipWrapper
      tooltipText={text}
      style={[
        styles.pressable,
        styles.selectedFilter, // le style reste actif car un seul bouton
      ]}
      onPress={handlePress}
    >
      <MaterialCommunityIcons
        name={iconsNames[number]}
        size={24}
        style={styles.selectedText}
      />
    </TooltipWrapper>
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

export default ButtonMultiStateToggle;
