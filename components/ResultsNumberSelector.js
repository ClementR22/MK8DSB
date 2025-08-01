import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import ButtonIcon from "../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

const ResultsNumberSelector = ({ resultsNumber, setResultsNumber }) => {
  const theme = useThemeStore((state) => state.theme);

  // Fonction pour incrémenter
  const increment = () => {
    setResultsNumber((prevResultsNumber) => prevResultsNumber + 1);
  };

  // Fonction pour décrémenter
  const decrement = () => {
    setResultsNumber((prevResultsNumber) => (prevResultsNumber > 1 ? prevResultsNumber - 1 : 1)); // Évite d'aller en dessous de 0
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
      color: theme.on_surface,
    },
  });

  return (
    <View style={styles.container}>
      <ButtonIcon onPress={decrement} iconName="minus" iconType={IconType.MaterialCommunityIcons} />
      <Text style={styles.resultsNumberText}>{resultsNumber}</Text>
      <ButtonIcon onPress={increment} iconName="plus" iconType={IconType.MaterialCommunityIcons} />
    </View>
  );
};

export default ResultsNumberSelector;
