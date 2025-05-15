import React, { useState } from "react";
import { Modal, Pressable, Text } from "react-native";
import { modal } from "../styles/modal";
import { button } from "../styles/button";
import { shadow_12dp } from "../styles/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { translate } from "@/translations/translations";
import Toast from "react-native-toast-message";
import FlexContainer from "@/components/FlexContainer";

const MyModal = ({
  modalTitle,
  isModalVisible,
  setIsModalVisible,
  children,
  onClose, // option
  closeButtonText = "Close",
  isWithClosePressable = true,
  leftButton = null,
  rightButton = null,
  ...props
}) => {
  const { theme } = useTheme();

  const [filterModalButtonHover, setFilterModalButtonHover] = useState(false);

  return (
    <Modal
      animationType="none" // Animation (slide, fade, none)
      transparent={true} // Fond transparent
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)} // Ferme le modal
      {...props}
    >
      <Pressable style={modal(theme).background} onPress={() => setIsModalVisible(false)}>
        <Pressable style={modal(theme).container} onStartShouldSetResponder={() => true}>
          {modalTitle && <Text style={modal(theme).title_center}>{translate(modalTitle)}</Text>}

          {children}

          <FlexContainer flexDirection={"row"} gap={(leftButton || rightButton) ? 10 : 0}>
            {leftButton}
            {isWithClosePressable && (
              <Pressable
                style={[button(theme).container, modal(theme).close_button_center, filterModalButtonHover && shadow_12dp]}
                onHoverIn={() => setFilterModalButtonHover(true)}
                onHoverOut={() => setFilterModalButtonHover(false)}
                onPress={onClose ? onClose : () => setIsModalVisible(false)}
              >
                <Text style={button(theme).text}>{translate(closeButtonText)}</Text>
              </Pressable>
            )}
            {rightButton}
          </FlexContainer>
        </Pressable>
      </Pressable>
      <Toast />
    </Modal>
  );
};

export default MyModal;
