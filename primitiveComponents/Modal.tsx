import React, { ReactElement, ReactNode, useCallback, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";

import Button from "@/primitiveComponents/Button";
import Text from "./Text";
import useThemeStore from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import {
  BORDER_RADIUS_MODAL_CHILDREN_CONTAINER,
  MARGIN_HORIZONTAL_MODAL_CHILDREN_CONTAINER,
} from "@/utils/designTokens";
import { toastConfig } from "@/config/toastConfig";

interface ModalButtonProps {
  text: string;
  onPress: () => void;
  tooltipText: string;
  buttonColor?: string;
  buttonTextColor?: string;
}

const ModalButton = React.memo(({ text, onPress, tooltipText, buttonColor, buttonTextColor }: ModalButtonProps) => (
  <Button buttonColor={buttonColor} buttonTextColor={buttonTextColor} onPress={onPress} tooltipText={tooltipText}>
    {text}
  </Button>
));

interface ModalProps {
  modalTitle: string;
  isModalVisible: boolean;
  setIsModalVisible: (v: boolean) => void;
  children: ReactNode;
  onClose?: () => void;

  closeButtonText?: string;
  secondButton?: ReactElement<{ onComplete?: () => void }>;
  secondButtonProps?: {
    text: string;
    onPress: () => boolean | void;
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
  secondButton,
  secondButtonProps,
  closeAfterSecondButton = true,
  secondButtonPosition = "left",
  withoutChildrenContainer = false,
  ...props
}: ModalProps) => {
  const theme = useThemeStore((state) => state.theme);
  const tabBarHeight = useGeneralStore((state) => state.tabBarHeight);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const isClosingRef = useRef(false);

  useEffect(() => {
    if (isModalVisible) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isModalVisible]);

  const requestClose = useCallback(() => {
    if (isClosingRef.current) return;

    isClosingRef.current = true;

    // AVANT fermeture (UX)
    onClose?.();

    // lance l’animation
    bottomSheetModalRef.current?.dismiss();

    // sync état React
    setIsModalVisible(false);
  }, [onClose, setIsModalVisible]);

  const handleDismiss = useCallback(() => {
    // cleanup interne
    isClosingRef.current = false;

    // sécurité si fermeture externe
    if (isModalVisible) setIsModalVisible(false);
  }, [isModalVisible, setIsModalVisible]);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} onPress={requestClose} />,
    [requestClose]
  );

  /* ---------------------------------------------------------------------- */
  /*                              Second button                              */
  /* ---------------------------------------------------------------------- */

  const buttonContainerFlexDirection = secondButtonPosition === "left" ? "row" : "row-reverse";

  const renderSecondButton = useCallback(() => {
    let button: ReactElement | null = null;

    if (secondButton) {
      button = React.cloneElement(secondButton, {
        onComplete: () => setIsModalVisible(false),
      });
    }

    if (secondButtonProps) {
      const completedOnPress = () => {
        const isSuccess = secondButtonProps.onPress();
        if (closeAfterSecondButton || isSuccess) {
          setIsModalVisible(false);
        }
      };

      button = <ModalButton {...secondButtonProps} onPress={completedOnPress} />;
    }

    if (!button) return null;

    return <View style={[styles.buttonContainer, { flexDirection: buttonContainerFlexDirection }]}>{button}</View>;
  }, [secondButton, secondButtonProps, closeAfterSecondButton, buttonContainerFlexDirection, setIsModalVisible]);

  /* ---------------------------------------------------------------------- */
  /*                                   Render                                 */
  /* ---------------------------------------------------------------------- */

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      enablePanDownToClose={false} // swipe down désactivé
      enableContentPanningGesture={false}
      backgroundStyle={{ backgroundColor: theme.surface_container_highest }}
      backdropComponent={renderBackdrop}
      onDismiss={handleDismiss}
      {...props}
    >
      <BottomSheetView style={{ paddingBottom: tabBarHeight + 10, gap: 10 }}>
        {modalTitle && (
          <Text role="headline" size="small" textAlign="center" style={styles.titleCenter} namespace="modal">
            {modalTitle}
          </Text>
        )}

        <View
          style={!withoutChildrenContainer && [styles.childrenContainer, { backgroundColor: theme.surface_container }]}
        >
          {children}
        </View>

        {renderSecondButton()}
        <Toast config={toastConfig} bottomOffset={0} />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default React.memo(Modal);

/* -------------------------------------------------------------------------- */
/*                                    Styles                                  */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  childrenContainer: {
    marginHorizontal: MARGIN_HORIZONTAL_MODAL_CHILDREN_CONTAINER,
    borderRadius: BORDER_RADIUS_MODAL_CHILDREN_CONTAINER,
    overflow: "hidden",
  },
  titleCenter: {
    paddingHorizontal: 24,
  },
  buttonContainer: {
    gap: 10,
    justifyContent: "center",
  },
});
