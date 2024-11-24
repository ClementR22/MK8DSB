import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Chip } from "react-native-paper";
import Toast from "react-native-toast-message";

const FilterModalContent = ({
  chosenBodyType,
  setChosenBodyType,
  toggleCheck,
}) => {
  return (
    <View style={styles.container}>
      {/* Afficher les chips pour chaque bodyType */}
      {chosenBodyType.map((bodyType) => (
        <Pressable
          key={bodyType.name} // Ajout d'une clé unique pour chaque élément
          onPress={() => {
            toggleCheck(setChosenBodyType, bodyType.name);
            Toast.show({
              type: "success",
              text1: `Toggled ${bodyType.name}`,
            });
          }}
          style={styles.chipContainer}
        >
          <Text>Salut</Text>
        </Pressable>
      ))}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow", //"#f5f5f5",
  },
  chipContainer: {
    marginVertical: 5,
  },
  chip: {
    margin: 10,
    backgroundColor: "#e0e0e0",
  },
  selectedChip: {
    backgroundColor: "#6200ee",
    color: "white",
  },
});

export default FilterModalContent;
