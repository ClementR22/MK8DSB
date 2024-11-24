import React, { useEffect, useMemo } from "react";
import { Text, Pressable, StyleSheet, Modal, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { modal } from "./styles/modal"; // Vérifie si modal.background est bien défini ici
import { button_icon } from "./styles/button";
import { shadow_3dp } from "./styles/theme";
import Test from "./Test";
import { useRef } from "react";
import { useCallback } from "react";

const FilterModal = ({
  modalTitle = "Affichage",
  isModalVisible,
  setIsModalVisible,
  chosenBodyType,
  setChosenBodyType,
  toggleCheck,
}) => {
  // Référence pour le modal
  const bottomSheetModalRef = useRef(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const snapPoints = useMemo(() => ["50%", "90%"], []);

  useEffect(() => {
    if (isModalVisible) {
      handlePresentModalPress();
    }
  }, [isModalVisible, handlePresentModalPress]);

  return (
    <Modal
      animationType="none" // Animation (slide, fade, none)
      transparent={true} // Fond transparent
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)} // Ferme le modal
    >
      <Test
        modalTitle={modalTitle}
        setIsModalVisible={setIsModalVisible}
        bottomSheetModalRef={bottomSheetModalRef}
        chosenBodyType={chosenBodyType}
        setChosenBodyType={setChosenBodyType}
        toggleCheck={toggleCheck}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "flex-end", // Place le contenu en bas
  },
  contentContainer: {
    padding: 20,
    backgroundColor: "white", // Couleur du contenu
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "blue", // Changer la couleur pour que le texte se distingue
  },
});

export default FilterModal;
