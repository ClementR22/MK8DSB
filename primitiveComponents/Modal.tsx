import React, { ReactElement, ReactNode, useCallback, useEffect, useRef } from "react";
import { Dimensions, Modal as NativeModal, Pressable, StyleSheet, View } from "react-native";
import Button from "@/primitiveComponents/Button";
import useThemeStore from "@/stores/useThemeStore";
import {
  BORDER_RADIUS_MODAL_CHILDREN_CONTAINER,
  MARGIN_HORIZONTAL_MODAL_CHILDREN_CONTAINER,
} from "@/utils/designTokens";
import Toast from "react-native-toast-message";
import { toastConfig } from "@/config/toastConfig";
import Text from "./Text";
import { MenuProvider } from "react-native-popup-menu";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

interface ModalButtonProps {
  text: string;
  onPress: () => void;
  tooltipText: string;
  buttonColor?: string;
  buttonTextColor?: string;
}

const ModalButton = React.memo(({ text, onPress, tooltipText, buttonColor, buttonTextColor }: ModalButtonProps) => {
  return (
    <Button buttonColor={buttonColor} buttonTextColor={buttonTextColor} onPress={onPress} tooltipText={tooltipText}>
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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (isModalVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.close();
    }
  }, [isModalVisible]);

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

  const renderBackDrop = useCallback((props: any) => {
    return <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />;
  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      enableDynamicSizing
      enablePanDownToClose={false}
      backgroundStyle={{ backgroundColor: theme.surface_container_highest }}
      backdropComponent={renderBackDrop}
      onDismiss={() => setIsModalVisible(false)}
      {...props}
    >
      <MenuProvider skipInstanceCheck>
        <BottomSheetView>
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
          </View>
          <Toast config={toastConfig} bottomOffset={0} />
        </BottomSheetView>
      </MenuProvider>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  background: {
    height: Dimensions.get("screen").height, // ou "screen"
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
