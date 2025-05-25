import React, { useState, useCallback, useMemo } from "react";
import { Pressable, View, StyleSheet, Text } from "react-native"; // Importez View et StyleSheet si nécessaire pour le positionnement du bouton
import Modal from "@/components/Modal"; // Assurez-vous que le chemin est correct
import Button from "../Button";
import { translate } from "@/translations/translations";
import { deleteAllSetsInMemory } from "@/utils/asyncStorageOperations";

const DeleteAllSetsMemoryModal: React.FC = React.memo(({}) => {
  const [isDeleteMemoryModalVisible, setIsDeleteMemoryModalVisible] = useState(false);

  const openModal = useCallback(() => {
    setIsDeleteMemoryModalVisible(true);
  }, []);
  const closeModal = useCallback(() => setIsDeleteMemoryModalVisible(false), []);

  const deleteAllTheMemoryAndReloadSettings = useCallback(() => {
    deleteAllSetsInMemory();
  }, []);

  return (
    <>
      <Button onPress={openModal} tooltipText={undefined}>
        {translate("DeleteAllSetsInMemory")}
      </Button>

      <Modal
        modalTitle={undefined}
        isModalVisible={isDeleteMemoryModalVisible}
        setIsModalVisible={setIsDeleteMemoryModalVisible}
        closeButtonText="Cancel"
        leftButton={
          <Button onPress={deleteAllTheMemoryAndReloadSettings} tooltipText={undefined}>
            {translate("Confirm")}
          </Button>
        }
        onClose={closeModal}
      >
        <Text>{translate("DeleteAllSetsInMemoryText")}</Text>
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

export default DeleteAllSetsMemoryModal;
