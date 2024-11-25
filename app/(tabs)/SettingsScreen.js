import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { bodyTypeNames, bodyTypeNamesDisplay } from "../../data/data";

import { GestureHandlerRootView } from "react-native-gesture-handler";

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SettingsScreen</Text>
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
