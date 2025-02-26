import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { button_icon } from "./styles/button";
import { shadow_12dp } from "./styles/theme";
import { useTheme } from "../utils/ThemeContext";

const ResultsNumberSelector = ({ resultsNumber, setResultsNumber }) => {
  const th = useTheme();
  const [hovered_1, setHover_1] = useState(false);
  const [hovered_2, setHover_2] = useState(false);

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
      <Pressable
        style={[button_icon(th).container, hovered_1 && shadow_12dp]}
        onPress={decrement}
        onHoverIn={() => setHover_1(true)}
        onHoverOut={() => setHover_1(false)}
      >
        <MaterialCommunityIcons
          name="minus"
          color={"white"}
        ></MaterialCommunityIcons>
      </Pressable>
      <Text style={styles.resultsNumberText}>{resultsNumber}</Text>
      <Pressable
        style={[button_icon(th).container, hovered_2 && shadow_12dp]}
        onPress={increment}
        onHoverIn={() => setHover_2(true)}
        onHoverOut={() => setHover_2(false)}
      >
        <MaterialCommunityIcons
          name="plus"
          color={"white"}
        ></MaterialCommunityIcons>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  },
});

export default ResultsNumberSelector;
