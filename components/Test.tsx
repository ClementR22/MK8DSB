import * as React from "react";
import { useState, useCallback, useMemo } from "react";
import { StyleSheet, Text, Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const Test = () => {
  // Utilisation du state pour gérer l'ouverture et la fermeture du modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Référence pour le BottomSheetModal
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  // Variables des snap points
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // Callback pour ouvrir le modal
  const handlePresentModalPress = useCallback(() => {
    setIsModalOpen(true); // Met à jour le state pour ouvrir le modal
  }, []);

  // Callback pour gérer les changements d'état du modal (ex : glissement à un autre snap point)
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  // Callback pour gérer la fermeture automatique du modal
  const handleModalDismiss = useCallback(() => {
    setIsModalOpen(false); // Ferme le modal automatiquement en mettant à jour le state
  }, []);

  // Effet secondaire pour contrôler l'ouverture/fermeture avec le state
  React.useEffect(() => {
    if (isModalOpen) {
      bottomSheetModalRef.current?.present(); // Ouvre le modal lorsque le state est vrai
    } else {
      bottomSheetModalRef.current?.dismiss(); // Ferme le modal lorsque le state est faux
    }
  }, [isModalOpen]); // Déclenche l'effet chaque fois que isModalOpen change

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <Button
          onPress={handlePresentModalPress}
          title="Open Modal"
          color="black"
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          onDismiss={handleModalDismiss} // Ferme le modal lorsque celui-ci est fermé
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
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
});

export default Test;
