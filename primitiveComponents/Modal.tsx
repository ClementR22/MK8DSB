import React, { ReactElement, ReactNode, useCallback, useEffect, useMemo } from "react";
import { Modal as NativeModal, Pressable, StyleSheet, Text, View } from "react-native";
import { translate } from "@/translations/translations";
import FlexContainer from "@/primitiveComponents/FlexContainer";
import Button from "@/primitiveComponents/Button";
import { useThemeStore } from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import Snackbar from "./Snackbar";
import {
  BORDER_RADIUS_MODAL_CHILDREN_CONTAINER,
  BORDER_RADIUS_MODAL_CONTAINER,
  MARGIN_HORIZONTAL_MODAL_CHILDREN_CONTAINER,
} from "@/utils/designTokens";

interface ModalButtonProps {
  text: string;
  onPress: () => void;
  tooltipText?: string;
  buttonColor?: string;
  buttonTextColor?: string;
}

const ModalButton = React.memo(({ text, onPress, tooltipText, buttonColor, buttonTextColor }: ModalButtonProps) => {
  return (
    <Button
      buttonColor={buttonColor}
      buttonTextColor={buttonTextColor}
      elevation={12}
      onPress={onPress}
      minWidth={100}
      tooltipText={tooltipText}
    >
      {translate(text)}
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
  secondButtonProps?: { text: string; onPress: () => void | boolean; tooltipText?: string };
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
  closeButtonText = "Close",
  secondButton,
  secondButtonProps,
  closeAfterSecondButton = true,
  secondButtonPosition = "left",
  withoutChildrenContainer = false,
  ...props
}: ModalProps) => {
  const theme = useThemeStore((state) => state.theme);

  const containerBackgroundColorStyle = useMemo(
    () => ({
      backgroundColor: theme.surface_container_highest,
    }),
    [theme.surface_container_highest]
  );

  const contentColorStyle = useMemo(
    () => ({
      backgroundColor: theme.surface_container,
    }),
    [theme.surface_container]
  );

  const titleColorStyle = useMemo(
    () => ({
      color: theme.on_surface,
    }),
    [theme.on_surface]
  );

  const buttonContainerFlexDirection = useMemo(
    () => (secondButtonPosition === "left" ? "row" : "row-reverse"),
    [secondButtonPosition]
  );

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
      <Pressable style={styles.background} onPress={handleBackgroundPress}>
        <Pressable
          style={[styles.container, containerBackgroundColorStyle, { marginTop: 0 }]}
          onStartShouldSetResponder={handleContainerResponder}
        >
          {modalTitle && <Text style={[styles.title_center, titleColorStyle]}>{translate(modalTitle)}</Text>}

          <View style={!withoutChildrenContainer && [styles.childrenContainer, contentColorStyle]}>{children}</View>

          <View style={{ flexDirection: buttonContainerFlexDirection, ...styles.buttonContainer }}>
            {renderSecondButton()}
            {<ModalButton text={closeButtonText} onPress={actualOnPressClose} />}
          </View>
        </Pressable>
        <Snackbar />
      </Pressable>
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
    maxWidth: 360,
    borderRadius: BORDER_RADIUS_MODAL_CONTAINER,
    paddingVertical: 12,
  },
  childrenContainer: {
    paddingHorizontal: 0,
    marginHorizontal: MARGIN_HORIZONTAL_MODAL_CHILDREN_CONTAINER,
    borderRadius: BORDER_RADIUS_MODAL_CHILDREN_CONTAINER,
    overflow: "hidden",
  },
  title_center: {
    alignSelf: "center",
    textAlign: "center",
    paddingHorizontal: 24,
    fontSize: 22,
    fontWeight: "400", // fontWeight should be a string in RN
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
