import React from "react";
import { Modal as NativeModal, Pressable, StyleSheet, Text } from "react-native";
import { button } from "@/components/styles/button";
import { vh, vw } from "@/components/styles/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { translate } from "@/translations/translations";
import Toast from "react-native-toast-message";
import FlexContainer from "@/components/FlexContainer";
import Button from "@/components/Button";

function Modal({
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
}) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    background: {
      ...StyleSheet.absoluteFillObject,
      cursor: "auto",
      zIndex: -1,
      position: "absolute",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    container: {
      maxHeight: 0.9 * vh,
      zIndex: 10,
      cursor: "auto",
      //alignSelf: "center",
      width: 0.9 * vw,
      maxWidth: 400,
      borderRadius: 28,
      paddingVertical: 24,
      backgroundColor: theme.surface_container_high,
    },
    content: {
      flex: 1,
      marginBottom: 0,
      maxHeight: vh * 0.5,
      paddingVertical: 10,
      borderTopColor: theme.outline,
      borderTopWidth: 1,
      borderBottomColor: theme.outline,
      borderBottomWidth: 1,
    },
    title: {
      color: theme.on_surface,
      paddingHorizontal: 24,
      fontSize: 24,
      marginBottom: 16,
    },
    title_center: {
      color: theme.on_surface,
      alignSelf: "center",
      paddingHorizontal: 24,
      fontSize: 24,
      marginBottom: 0,
    },
    close_button_center: {
      alignSelf: "center",
      width: 100,
    },
    close_button_right: {
      flexGrow: 1,
      alignSelf: "flex-end",
      width: 100,
      marginRight: 24,
    },
    pressableStat: {
      marginBottom: 2,
      marginHorizontal: 24,
      alignItems: "center",
      flexDirection: "row",
      borderRadius: 24,
    },
  });

  return (
    <NativeModal
      animationType="none" // Animation (slide, fade, none)
      transparent={true} // Fond transparent
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)} // Ferme le modal
      {...props}
    >
      <Pressable style={styles.background} onPress={() => setIsModalVisible(false)}>
        <Pressable style={styles.container} onStartShouldSetResponder={() => true}>
          {modalTitle && <Text style={styles.title_center}>{translate(modalTitle)}</Text>}

          {children}

          <FlexContainer flexDirection={"row"} gap={10}>
            {leftButton}
            {isWithClosePressable && (
              <Button elevation={12} onPress={onClose ? onClose : () => setIsModalVisible(false)}>
                <Text style={button(theme).text}>{translate(closeButtonText)}</Text>
              </Button>
            )}
            {rightButton}
          </FlexContainer>
        </Pressable>
      </Pressable>
      <Toast />
    </NativeModal>
  );
}

export default Modal;
