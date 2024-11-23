import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import Checkbox from "expo-checkbox";
import { imageSize } from "./PressableImage";
import { modal } from "./styles/modal";
import { button } from "./styles/button";
import checkbox from "./styles/checkbox";
import th from "./styles/theme";
import PressableStat from "./PressableStat";

const MyModal = ({
  modalTitle,
  isModalVisible,
  setIsModalVisible,
  ModalContent,
  contentProps,
}) => {
  const [filterModalButtonHover, setFilterModalButtonHover] = useState(false);
  return (
    <Modal
      animationType="none" // Animation (slide, fade, none)
      transparent={true} // Fond transparent
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)} // Ferme le modal
    >
      <Pressable
        style={modal.background}
        onPress={() => setIsModalVisible(false)}
      >
        <Pressable style={modal.container}>
          <Text style={modal.title_center}>{modalTitle}</Text>
          <ModalContent {...contentProps} />
          <Pressable
            style={[
              button.container,
              modal.close_button_center,
              filterModalButtonHover ? shadow_12dp : null,
            ]}
            onHoverIn={() => setFilterModalButtonHover(true)}
            onHoverOut={() => setFilterModalButtonHover(false)}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={button.text}>Valider</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default MyModal;

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
