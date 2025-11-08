import React, { ReactElement, ReactNode, useCallback, useEffect, useMemo } from "react";
import { Modal as NativeModal, Pressable, StyleSheet, View } from "react-native";
import Button from "@/primitiveComponents/Button";
import useThemeStore from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import {
  BORDER_RADIUS_MODAL_CHILDREN_CONTAINER,
  BORDER_RADIUS_MODAL_CONTAINER,
  MARGIN_HORIZONTAL_MODAL_CHILDREN_CONTAINER,
} from "@/utils/designTokens";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/config/toastConfig";
import Text from "./Text";
import { MenuProvider } from "react-native-popup-menu";

interface ModalButtonProps {
  text: string;
  onPress: () => void;
  tooltipText: string;
  buttonColor?: string;
  buttonTextColor?: string;
}

const ModalButton = React.memo(({ text, onPress, tooltipText, buttonColor, buttonTextColor }: ModalButtonProps) => {
  return (
    <Button
      buttonColor={buttonColor}
      buttonTextColor={buttonTextColor}
      onPress={onPress}
      minWidth={100}
      tooltipText={tooltipText}
    >
      {text}
    </Button>
  );
});

interface ModalProps {
  modalTitle: string;
  isModalVisible: boolean;
  setIsModalVisible: (newVisible: boolean) => void;
  children: ReactNode;
  onClose?: () => void; // option
  closeButtonText?: string;
  // on peut donner un composant
  secondButton?: ReactElement<{ onComplete?: () => void }>;
  // ou uniquement ses props
  secondButtonProps?: {
    text: string;
    onPress: () => void;
    tooltipText: string;
    buttonColor?: string;
    buttonTextColor?: string;
  };
  closeAfterSecondButton?: boolean;
  secondButtonPosition?: "left" | "right";
  withoutChildrenContainer?: boolean;
}

const Modal = ({
  modalTitle,
  isModalVisible,
  setIsModalVisible,
  children,
  onClose,
  closeButtonText = "close",
  secondButton,
  secondButtonProps,
  closeAfterSecondButton = true,
  secondButtonPosition = "left",
  withoutChildrenContainer = false,
  ...props
}: ModalProps) => {
  const theme = useThemeStore((state) => state.theme);

  const buttonContainerFlexDirection = secondButtonPosition === "left" ? "row" : "row-reverse";

  const renderSecondButton = useCallback(() => {
    if (secondButton) {
      return React.cloneElement(secondButton, {
        onComplete: () => setIsModalVisible(false),
      });
    }

    if (secondButtonProps) {
      const completedOnPress = () => {
        const isSucces = secondButtonProps.onPress();
        if (closeAfterSecondButton || isSucces) setIsModalVisible(false);
      };
      return <ModalButton {...secondButtonProps} onPress={completedOnPress} />;
    }
    return null;
  }, [secondButton, secondButtonProps, closeAfterSecondButton, setIsModalVisible]);

  const actualOnPressClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      setIsModalVisible(false);
    }
  }, [onClose, setIsModalVisible]);

  const handleBackgroundPress = useCallback(() => setIsModalVisible(false), [setIsModalVisible]);

  const handleContainerResponder = useCallback(() => true, []);

  const setIsAnyModalVisible = useGeneralStore((state) => state.setIsAnyModalVisible);

  useEffect(() => setIsAnyModalVisible(isModalVisible), [isModalVisible]);

  return (
    <NativeModal
      animationType="none" // Animation (slide, fade, none)
      transparent={true} // Fond transparent
      visible={isModalVisible}
      onRequestClose={actualOnPressClose} // Ferme le modal
      navigationBarTranslucent={true}
      statusBarTranslucent={true}
      {...props}
    >
      <MenuProvider skipInstanceCheck>
        <Pressable style={styles.background} onPress={handleBackgroundPress}>
          <Pressable
            style={[
              styles.container,
              {
                backgroundColor: theme.surface_container_highest,
                marginTop: 0,
              },
            ]}
            onStartShouldSetResponder={handleContainerResponder}
          >
            {modalTitle && (
              <Text role="headline" size="small" textAlign="center" style={styles.titleCenter} namespace="modal">
                {modalTitle}
              </Text>
            )}

            <View
              style={
                !withoutChildrenContainer && [styles.childrenContainer, { backgroundColor: theme.surface_container }]
              }
            >
              {children}
            </View>

            <View style={[styles.buttonContainer, { flexDirection: buttonContainerFlexDirection }]}>
              {renderSecondButton()}
              {<ModalButton text={closeButtonText} onPress={actualOnPressClose} tooltipText={closeButtonText} />}
            </View>
          </Pressable>
        </Pressable>
        <Toast config={toastConfig} bottomOffset={0} />
      </MenuProvider>
    </NativeModal>
  );
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    // cursor: "auto", // Web-specific. RN ignores.
    zIndex: -1,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    zIndex: 10,
    // cursor: "auto", // Web-specific. RN ignores.
    width: "90%",
    borderRadius: BORDER_RADIUS_MODAL_CONTAINER,
    paddingVertical: 12,
  },
  childrenContainer: {
    paddingHorizontal: 0,
    marginHorizontal: MARGIN_HORIZONTAL_MODAL_CHILDREN_CONTAINER,
    borderRadius: BORDER_RADIUS_MODAL_CHILDREN_CONTAINER,
    overflow: "hidden",
  },
  titleCenter: {
    paddingHorizontal: 24,
    marginBottom: 12,
    // fontFamily: "Roboto", // Ensure this font is loaded. If not, it falls back to default.
  },
  buttonContainer: {
    marginTop: 10, // Consider adding this dynamically if needed
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
});

export default React.memo(Modal);
