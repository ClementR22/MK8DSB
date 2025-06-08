import React, { ReactElement, ReactNode } from "react";
import { Modal as NativeModal, Pressable, StyleSheet, Text, View } from "react-native";
import { vh } from "@/components/styles/theme";
import { translate } from "@/translations/translations";
import FlexContainer from "@/primitiveComponents/FlexContainer";
import Button from "@/primitiveComponents/Button";
import { useThemeStore } from "@/stores/useThemeStore";
import Snackbar from "./Snackbar";

function ModalButton({
  text,
  onPress,
  tooltipText,
  disabled,
}: {
  text: string;
  onPress: () => void;
  tooltipText?: string;
  disabled?: boolean;
}) {
  return (
    <Button elevation={12} onPress={onPress} minWidth={100} tooltipText={tooltipText} disabled={disabled}>
      {translate(text)}
    </Button>
  );
}

interface ModalProps {
  modalTitle: string;
  isModalVisible: boolean;
  setIsModalVisible: (newVisible: boolean) => void;
  children: ReactNode;
  onClose: () => void;
  closeButtonText?: string;
  isWithClosePressable?: boolean;
  // can give a componenent
  secondButton?: ReactElement<{ onComplete?: () => void }>;
  // or props to make it here
  secondButtonProps?: { text: string; onPress: () => void; tooltipText?: string; disabled?: boolean };
  closeAfterSecondButton?: boolean;
  secondButtonPosition?: "left" | "right";
}

function Modal({
  modalTitle,
  isModalVisible,
  setIsModalVisible,
  children,
  onClose, // option // blabla
  closeButtonText = "Close",
  isWithClosePressable = true,
  secondButton,
  secondButtonProps,
  closeAfterSecondButton = true,
  secondButtonPosition = "left",
  ...props
}: ModalProps) {
  const theme = useThemeStore((state) => state.theme);

  const isSecondButtonLeft = secondButtonPosition == "left";

  const renderSecondButton = () => {
    if (secondButton) {
      return React.cloneElement(secondButton, {
        onComplete: () => setIsModalVisible(false),
      });
    }

    if (secondButtonProps) {
      const finalOnPress = () => {
        secondButtonProps.onPress();
        if (closeAfterSecondButton) setIsModalVisible(false);
      };
      return <ModalButton {...secondButtonProps} onPress={finalOnPress} />;
    }
    return null;
  };

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
      //maxHeight: "90%",
      //alignSelf: "center",
      // maxWidth: 400,
      zIndex: 10,
      cursor: "auto",
      width: "90%",
      borderRadius: 28,
      paddingVertical: 24,
      backgroundColor: theme.surface_container_high,
    },
    childrenContainer: {
      maxHeight: 0.6 * vh,
    },
    title_center: {
      color: theme.on_surface,
      alignSelf: "center",
      textAlign: "center",
      paddingHorizontal: 24,
      fontSize: 24,
      marginBottom: 0,
    },
    button_container: {
      marginTop: 10,
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

          <View style={styles.childrenContainer}>{children}</View>

          <FlexContainer
            flexDirection={isSecondButtonLeft ? "row" : "row-reverse"}
            gap={10}
            style={styles.button_container}
          >
            {renderSecondButton()}
            {isWithClosePressable && (
              <ModalButton text={closeButtonText} onPress={onClose ? onClose : () => setIsModalVisible(false)} />
            )}
          </FlexContainer>
        </Pressable>
      </Pressable>
      <Snackbar />
    </NativeModal>
  );
}

export default Modal;
