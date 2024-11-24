import React, { useCallback, useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Chip } from "react-native-paper";
import { bodyTypeNames, bodyTypeNamesDisplay } from "../data/data";
import { modal } from "./styles/modal";

const Test = ({
  modalTitle,
  setIsModalVisible,
  bottomSheetModalRef,
  chosenBodyType,
  setChosenBodyType,
  toggleCheck,
}) => {
  // Variables
  const snapPoints = useMemo(() => ["50%"], []);

  // Renders
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <BottomSheetModal
          snapPoints={snapPoints}
          ref={bottomSheetModalRef}
          style={styles.bottomSheetModal}
          onDismiss={() => {
            setIsModalVisible(false);
          }}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text style={modal.title_center}>{modalTitle}</Text>
            <View>
              {chosenBodyType.map((bodyType) => {
                return (
                  <Chip
                    key={[bodyType.name, bodyType.checked]} // bodyType.checked a été ajouté dans la key pour forcer le chip à re-render
                    onPress={() => {
                      console.log(bodyType.name);
                      toggleCheck(setChosenBodyType, bodyType.name); // Basculer la sélection
                    }}
                    style={[
                      styles.chip,
                      { backgroundColor: bodyType.checked ? "green" : "red" }, // Changer la couleur
                    ]}
                  >
                    {console.log("bodyType.checked", bodyType.checked)}
                    {bodyType.nameDisplay} {/* Afficher le nom plus lisible */}
                  </Chip>
                );
              })}
              {/* 
              <ElementsImagesSelector
                  pressableImages={pressableImages}
                  handlePressImage={handlePressImageCompleted}
                  displayCase={false}
                /> */}
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  bottomSheetModal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  chip: {
    margin: 5,
    padding: 10,
  },
});

export default Test;
