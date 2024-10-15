import React from "react";
import { View, StyleSheet } from "react-native";
import PressableImage from "./PressableImage";

const ElementsImagesDeselector = ({
  pressableImages,
  handlePressImage,
  display,
}) => {
  return (
    <View
      style={{
        backgroundColor: "green",
        flexDirection: display ? "row" : "column",
        paddingHorizontal: 10,
      }}
    >
      {Object.entries(pressableImages).map(([categoryKey, categoryValue]) => (
        <View key={categoryKey} style={styles.categoryContainer}>
          {Object.entries(categoryValue).map(([classKey, classValue]) =>
            Object.entries(classValue).map(
              ([imageKey, { source, pressed }], imgIndex) => {
                if (pressed) {
                  return (
                    <View
                      key={`${categoryKey}-${classKey}-${imageKey}-${imgIndex}`} // Clé unique pour chaque élément
                      style={styles.pressableImages}
                    >
                      <PressableImage
                        imageKey={`${categoryKey}-${classKey}-${imageKey}-${imgIndex}`}
                        source={source}
                        pressed={pressed}
                        setPressableImage={() =>
                          handlePressImage(categoryKey, classKey, imageKey)
                        }
                        disabled={display}
                      />
                    </View>
                  );
                }
                return null; // Ne rien afficher si `pressed` est faux
              }
            )
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Permet le retour à la ligne
    backgroundColor: "blue",
  },
  pressableImages: {
    marginVertical: 10,
  },
});

export default ElementsImagesDeselector;
