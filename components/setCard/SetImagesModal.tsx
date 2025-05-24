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
      <Pressable onPress={openModal} style={styles.previewContainer}>
        <SetImagesContainer setToShowClassIds={setToShowClassIds} mode="icon" onPress={openModal} />
      </Pressable>

      {/* Le modal lui-même */}
      <Modal
        modalTitle={null}
        isModalVisible={isImagesModalVisible}
        setIsModalVisible={setIsImagesModalVisible}
        onClose={closeModal}
      >
        {/* Le contenu détaillé du modal */}
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
  previewContainer: {
    // Styles pour le conteneur du bouton/aperçu si besoin
    // Par exemple, pour ajouter une marge ou un alignement
  },
});

export default SetImagesModal;
