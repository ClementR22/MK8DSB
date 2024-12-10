import React, { useEffect, useMemo, useState } from "react";
import { Text, Pressable, StyleSheet, Modal, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { modal } from "../styles/modal"; // Vérifie si modal.background est bien défini ici
import { button_icon } from "../styles/button";
import { shadow_3dp } from "../styles/theme";
import { useRef } from "react";
import { useCallback } from "react";
import ElementsSelector from "./FilterSelector";
import { useTheme } from "../styles/theme";
import MultiStateToggleButton from "../MultiStateToggleButton";

const FilterSelectorModal = ({
  modalTitle = "Affichage",
  isModalVisible,
  setIsModalVisible,
  chosenBodyType,
  setChosenBodyType,
  toggleCheck,
}) => {
  const th = useTheme();
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

  const [orderNumber, setOrderNumber] = useState(0);
  const imagesOrderIconsNames = [
    "sort-numeric-ascending",
    "sort-alphabetical-ascending",
    "sort-alphabetical-descending",
    "graphql",
  ];

  return (
    <Modal
      animationType="none" // Animation (slide, fade, none)
      transparent={true} // Fond transparent
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)} // Ferme le modal
    >
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <Pressable
            style={modal(th).background}
            onPress={() => setIsModalVisible(false)}
          >
            <BottomSheetModal
              snapPoints={snapPoints}
              ref={bottomSheetModalRef}
              style={styles.bottomSheetModal}
              onDismiss={() => {
                setIsModalVisible(false);
              }}
            >
              <BottomSheetView style={styles.contentContainer}>
                <Text style={modal(th).title_center}>{modalTitle}</Text>
                <MultiStateToggleButton
                  number={orderNumber}
                  setNumber={setOrderNumber}
                  iconsNames={imagesOrderIconsNames}
                />
                <ElementsSelector
                  chosenBodyType={chosenBodyType}
                  setChosenBodyType={setChosenBodyType}
                  toggleCheck={toggleCheck}
                  orderNumber={orderNumber}
                />
              </BottomSheetView>
            </BottomSheetModal>
          </Pressable>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
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

export default FilterSelectorModal;
