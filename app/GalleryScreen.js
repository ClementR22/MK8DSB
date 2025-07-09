import React from "react";
import { StyleSheet, View } from "react-native";
import { ScreenProvider } from "@/contexts/ScreenContext";
import GalleryScreenok from "@/components/Test";

const GalleryScreen = () => {
  return (
    <ScreenProvider screenName="gallery">
      <GalleryScreenok></GalleryScreenok>
    </ScreenProvider>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
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
