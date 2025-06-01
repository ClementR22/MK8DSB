import React, { useState, useCallback } from "react";
import { Pressable, View, StyleSheet } from "react-native"; // Importez View et StyleSheet si nécessaire pour le positionnement du bouton
import Modal from "@/components/Modal"; // Assurez-vous que le chemin est correct
import SetImagesContainer from "./SetImagesContainer"; // Assurez-vous que le chemin est correct

interface SetImagesModalProps {
  setToShowClassIds: number[];
}

const SetImagesModal: React.FC<SetImagesModalProps> = React.memo(({ setToShowClassIds }) => {
  const [isImagesModalVisible, setIsImagesModalVisible] = useState(false);

  const openModal = useCallback(() => {
    setIsImagesModalVisible(true);
  }, []);
  const closeModal = useCallback(() => setIsImagesModalVisible(false), []);

  return (
    <>
      <Pressable onPress={openModal} style={styles.pressable}>
        <SetImagesContainer setToShowClassIds={setToShowClassIds} mode="icon" onPress={openModal} />
      </Pressable>

      <Modal
        modalTitle={null}
        isModalVisible={isImagesModalVisible}
        setIsModalVisible={setIsImagesModalVisible}
        onClose={closeModal}
      >
        <SetImagesContainer
          setToShowClassIds={setToShowClassIds}
          mode="image"
          // Dans le modal, displaySetImages est inutile car on ne veut pas l'ouvrir à nouveau
        />
      </Modal>
    </>
  );
});

const styles = StyleSheet.create({
  pressable: {
    width: "100%", // pour que toute la largeur de la SetCard soit cliquable
  },
});

export default SetImagesModal;
