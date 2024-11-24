import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import FilterModalContent from "../../components/FilterModalContent";
import { bodyTypeNames, bodyTypeNamesDisplay } from "../../data/data";
import Test from "../../components/Test";

import { GestureHandlerRootView } from "react-native-gesture-handler";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SettingsScreen</Text>
      <Test />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
