import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { button_icon } from "./styles/button";

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
      <Pressable style={button_icon.container} onPress={decrement}>
        <MaterialCommunityIcons name="minus" color={"white"}></MaterialCommunityIcons>
      </Pressable>
      <Text style={styles.resultsNumberText}>{resultsNumber}</Text>
      <Pressable style={button_icon.container} onPress={increment}>
        <MaterialCommunityIcons name="plus" color={"white"}></MaterialCommunityIcons>
      </Pressable>
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
    flexDirection: "row",
    paddingHorizontal: 14,
  },
  resultsNumberText: {
    fontSize: 48,
    textAlign: "center",
    width: "auto",
    flexGrow: 1,
  }
});

export default ResultsNumber;
