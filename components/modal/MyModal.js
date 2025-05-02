import React, { useState } from "react";
import { Modal, Pressable, Text } from "react-native";
import { modal } from "../styles/modal";
import { button } from "../styles/button";
import { shadow_12dp } from "../styles/theme";
import { useTheme } from "../../utils/ThemeContext";
import { translate } from "../../i18n/translations";
import Toast from "react-native-toast-message";

const MyModal = ({
  modalTitle,
  isModalVisible,
  setIsModalVisible,
  ModalContentsList,
  contentPropsList,
  closeButtonText = "Close",
  checkBeforeClose = () => {
    return true;
  },
  isWithClosePressable = true,
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
        <Pressable
          style={modal(th).container}
          onStartShouldSetResponder={() => true}
        >
          {modalTitle && (
            <Text style={modal(th).title_center}>{translate(modalTitle)}</Text>
          )}
          {ModalContentsList.map((ModalContent, index) => (
            <ModalContent key={index} {...contentPropsList[index]} />
          ))}
          {isWithClosePressable && (
            <Pressable
              style={[
                button(th).container,
                modal(th).close_button_center,
                filterModalButtonHover && shadow_12dp,
              ]}
              onHoverIn={() => setFilterModalButtonHover(true)}
              onHoverOut={() => setFilterModalButtonHover(false)}
              onPress={async () => {
                const test = await checkBeforeClose();
                if (test) {
                  setIsModalVisible(false);
                }
              }}
            >
              <Text style={button(th).text}>{translate(closeButtonText)}</Text>
            </Pressable>
          )}
        </Pressable>
      </Pressable>
      <Toast />
    </Modal>
  );
};

export default MyModal;
