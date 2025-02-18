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
import { modal } from "./styles/modal";
import { button } from "./styles/button";
import checkbox from "./styles/checkbox";
import th from "./styles/theme";
import PressableStat from "./PressableStat";
import { shadow_12dp } from "./styles/theme";
import { useTheme } from "./styles/theme";
import { translate } from "../i18n/translations";
import Toast from "react-native-toast-message";

const MyModal = ({
  modalTitle,
  isModalVisible,
  setIsModalVisible,
  ModalContent,
  contentProps,
  closeButtonText = "Close",
}) => {
  const th = useTheme();

  const [filterModalButtonHover, setFilterModalButtonHover] = useState(false);
  return (
    <Modal
      animationType="none" // Animation (slide, fade, none)
      transparent={true} // Fond transparent
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)} // Ferme le modal
    >
      <Pressable
        style={modal(th).background}
        onPress={() => setIsModalVisible(false)}
      >
        <View
          style={modal(th).container} //modal(th).container}
          onStartShouldSetResponder={() => true}
        >
          <Text style={modal(th).title_center}>{modalTitle}</Text>
          <ModalContent {...contentProps} />
          <Pressable
            style={[
              button(th).container,
              modal(th).close_button_center,
              filterModalButtonHover && shadow_12dp,
            ]}
            onHoverIn={() => setFilterModalButtonHover(true)}
            onHoverOut={() => setFilterModalButtonHover(false)}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={button(th).text}>{translate(closeButtonText)}</Text>
          </Pressable>
        </View>
      </Pressable>

      <Toast />
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
