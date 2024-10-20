import { View } from "react-native";
import { Pressable } from "react-native";
import { Text } from "react-native";
import { ScrollView } from "react-native";
import Checkbox from "expo-checkbox";
import { Modal } from "react-native";
import { StyleSheet } from "react-native";

import { imageSize } from "./PressableImage";

export const StatSliderResultSelectorModal = ({
  foundedStatsModalVisible,
  setFoundedStatsModalVisible,
  isFoundedStatsVisible,
  setIsFoundedStatsVisible,
  toggleCheck,
}) => {
  return (
    <Modal
      animationType="none" // Utilise slide, fade, none pour les animations
      transparent={true} // Définit si le fond est transparent
      visible={foundedStatsModalVisible}
      onRequestClose={() => setFoundedStatsModalVisible(false)} // Fonction pour fermer le modal
    >
      <ScrollView>
        <Pressable style={styles.modalBackground} onPress={() => setFoundedStatsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Ceci est une fenêtre modale</Text>
            <View style={styles.checkBoxesContainer}>
              {isFoundedStatsVisible.map((stat) => (
                <View key={stat.name} style={styles.checkBoxContainer}>
                  <Checkbox
                    value={stat.checked}
                    onValueChange={() =>
                      toggleCheck(setIsFoundedStatsVisible, stat.name)
                    }
                    style={styles.checkbox}
                  />
                  <Text style={styles.checkBoxItemLabel}>{stat.name}</Text>
                </View>
              ))}
            </View>
            <Pressable
              style={styles.pressable}
              onPress={() => setFoundedStatsModalVisible(false)}
            >
              <Text style={styles.pressableText}>Fermer</Text>
            </Pressable>
          </View>
        </Pressable>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  checkBoxContainer: {
    marginBottom: 2,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "red",
  },
  checkbox: {
    width: 30,
    height: 30,
  },
  checkBoxItemLabel: {
    fontSize: 18,
    marginVertical: 10,
  },
  checkBoxesContainer: {
    marginBottom: 20,
    alignItems: "flex-start",
    backgroundColor: "blue",
  },
  modalBackground: {
    cursor: "auto",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "purple",
    borderRadius: 10,
    alignItems: "center",
    width: 6 * imageSize,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  pressable: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  pressableText: {
    color: "white",
    fontSize: 16,
  },
});
