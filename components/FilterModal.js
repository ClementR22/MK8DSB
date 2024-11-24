import React, { useEffect, useMemo } from "react";
import { Text, Pressable, StyleSheet, Modal } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { button_icon } from "./styles/button";
import { shadow_3dp } from "./styles/theme";
import { modal } from "./styles/modal";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

const FilterModal = ({
  modalTitle = "Affichage",
  isModalVisible,
  setIsModalVisible,
  bottomSheetModalRef,
  handlePresentModalPress,
}) => {
  // Points de snap du BottomSheet
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // Ouvrir le BottomSheet lorsque le Modal est visible
  useEffect(() => {
    if (isModalVisible) {
      handlePresentModalPress(); // Appelle la fonction pour ouvrir le BottomSheet
    }
  }, [isModalVisible, handlePresentModalPress]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)} // Ferme le Modal principal
    >
      <GestureHandlerRootView>
        {/* Fond du Modal qui ferme le Modal au clic */}
        <Pressable
          style={modal.background}
          onPress={() => setIsModalVisible(false)}
        >
          {/* Contenu du Modal */}
          <BottomSheetModalProvider>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              snapPoints={snapPoints}
              onDismiss={() => setIsModalVisible(false)} // Ferme le Modal principal lorsque le BottomSheet est fermé
            >
              <BottomSheetView style={styles.contentContainer}>
                <Text style={modal.title_center}>{modalTitle}</Text>
                <Text style={styles.modalText}>
                  Voici un contenu de modal 🎉
                </Text>
              </BottomSheetView>
            </BottomSheetModal>
          </BottomSheetModalProvider>
        </Pressable>
      </GestureHandlerRootView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default FilterModal;
