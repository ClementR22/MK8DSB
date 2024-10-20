import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { button_icon_style } from "./_styles.js";

const ResultsNumber = ({ resultsNumber, setResultsNumber }) => {
  // Fonction pour incrémenter
  const increment = () => {
    setResultsNumber((prevResultsNumber) => prevResultsNumber + 1);
  };

  // Fonction pour décrémenter
  const decrement = () => {
    setResultsNumber((prevResultsNumber) =>
      prevResultsNumber > 0 ? prevResultsNumber - 1 : 0
    ); // Évite d'aller en dessous de 0
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultsNumberText}>{resultsNumber}</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={button_icon_style.container} onPress={decrement}>
          <MaterialCommunityIcons name="plus" color={"white"}></MaterialCommunityIcons>
        </Pressable>
        <Pressable style={button_icon_style.container} onPress={increment}>
          <MaterialCommunityIcons name="minus" color={"white"}></MaterialCommunityIcons>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "none",
    margin: 10,
  },
  resultsNumberText: {
    fontSize: 48,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 24,
  },
});

export default ResultsNumber;
