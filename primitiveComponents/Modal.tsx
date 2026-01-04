import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";

import Button from "@/primitiveComponents/Button";
import Text from "./Text";
import useThemeStore from "@/stores/useThemeStore";
import {
  BORDER_RADIUS_MODAL_CHILDREN_CONTAINER,
  MARGIN_HORIZONTAL_MODAL_CHILDREN_CONTAINER,
} from "@/utils/designTokens";
import { toastConfig } from "@/config/toastConfig";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  isModalVisible: boolean;
  setIsModalVisible: (v: boolean) => void;
  modalTitle: string;
  bottomButtonProps?: {
    text: string;
    onPress: () => boolean | void;
    tooltipText: string;
    buttonColor?: string;
    buttonTextColor?: string;
  };
  withoutChildrenContainer?: boolean;
  horizontalScroll?: boolean;
  children: ReactNode;
  onClose?: () => void;
}

const Modal = ({
  isModalVisible,
  setIsModalVisible,
  modalTitle,
  bottomButtonProps,
  withoutChildrenContainer = false,
  horizontalScroll = false,
  children,
  onClose,
}: ModalProps) => {
  const theme = useThemeStore((state) => state.theme);

  const insets = useSafeAreaInsets();
  const bottomOffset = insets.bottom;

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
  /*                                   Render                                 */
  /* ---------------------------------------------------------------------- */

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      backgroundStyle={{ backgroundColor: theme.surface_container_highest }}
      backdropComponent={renderBackdrop}
      onDismiss={handleDismiss}
      activeOffsetY={horizontalScroll ? [-5, 5] : undefined}
      failOffsetX={horizontalScroll ? [-10, 10] : undefined}
    >
      <BottomSheetView style={{ paddingBottom: bottomOffset, gap: 10 }}>
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

        {bottomButtonProps && (
          <View style={styles.buttonContainer}>
            <ModalButton
              {...bottomButtonProps}
              onPress={() => {
                bottomButtonProps.onPress();
                setIsModalVisible(false);
              }}
            />
          </View>
        )}

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
