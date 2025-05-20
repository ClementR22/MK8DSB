import React from "react";
import { StyleSheet, View } from "react-native";
import ElementsSelector from "../components/elementsSelector/ElementsSelector";
import { ScreenProvider } from "../contexts/ScreenContext";

const GalleryScreen = () => {
  return (
    <ScreenProvider screenName="gallery">
      <View style={styles.container}>
        <ElementsSelector />
      </View>
    </ScreenProvider>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    backgroundColor: "red",
    padding: 8,
    color: "white",
  },
  categoryContainer: {
    backgroundColor: "green",
  },
  classContainer: {
    flexDirection: "row",
    backgroundColor: "red",
    justifyContent: "center",
  },
  elementContainer: {
    backgroundColor: "blue",
    alignItems: "center",
  },
});
