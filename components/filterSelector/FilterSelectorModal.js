import React, { useEffect, useMemo, useState } from "react";
import { Text, Pressable, StyleSheet, Modal, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { modal } from "../styles/modal"; // Vérifie si modal.background est bien défini ici
import { button_icon } from "../styles/button";
import { shadow_3dp } from "../styles/theme";
import { useRef } from "react";
import { useCallback } from "react";
import FilterSelector from "./FilterSelector";
import { useTheme } from "../styles/theme";
import MultiStateToggleButton from "../MultiStateToggleButton";

const FilterSelectorModal = ({
  modalTitle,
  chosenBodyType,
  setChosenBodyType,
  toggleCheck,
  bottomSheetModalRef,
}) => {
  const th = useTheme();

  const snapPoints = useMemo(() => ["90%"], []);

  const [orderNumber, setOrderNumber] = useState(0);
  const imagesOrderIconsNames = [
    "sort-numeric-ascending",
    "sort-alphabetical-ascending",
    "sort-alphabetical-descending",
    "graphql",
  ];

  /* 
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);
  */
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      ref={bottomSheetModalRef}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={modal(th).title_center}>{modalTitle}</Text>
        <MultiStateToggleButton
          number={orderNumber}
          setNumber={setOrderNumber}
          iconsNames={imagesOrderIconsNames}
        />
        <FilterSelector
          chosenBodyType={chosenBodyType}
          setChosenBodyType={setChosenBodyType}
          toggleCheck={toggleCheck}
          orderNumber={orderNumber}
        />
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: "flex-end", // Place le contenu en bas
  },
  contentContainer: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 1,
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
