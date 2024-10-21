import { View } from "react-native";
import { Pressable } from "react-native";
import { Text } from "react-native";
import { ScrollView } from "react-native";
import Checkbox from "expo-checkbox";
import { Modal } from "react-native";
import { StyleSheet } from "react-native";

import { imageSize } from "./PressableImage";
import { modal } from "./styles/modal";
import { button } from "./styles/button";
import checkbox from "./styles/checkbox";

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
        <Pressable style={modal.background} onPress={() => setFoundedStatsModalVisible(false)}>
          <Pressable style={modal.container}>
            <Text style={modal.title_center}>Stats à afficher</Text>
            <View style={modal.content}>
              {isFoundedStatsVisible.map((stat) => (
                <View key={stat.name} style={checkbox.container}>
                  <Checkbox
                    value={stat.checked}
                    onValueChange={() =>
                      toggleCheck(setIsFoundedStatsVisible, stat.name)
                    }
                    style={checkbox.square}
                  />
                  <Text style={checkbox.text}>{stat.name}</Text>
                </View>
              ))}
            </View>
            <Pressable
              style={[button.container, modal.close_button_center]}
              onPress={() => setFoundedStatsModalVisible(false)}
            >
              <Text style={button.text}>Fermer</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
