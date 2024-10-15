import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

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
        <Pressable style={styles.button} onPress={decrement}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={increment}>
          <Text style={styles.buttonText}>+</Text>
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
  },
  resultsNumberText: {
    fontSize: 48,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
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
