import React, { useState, useCallback, useMemo } from "react";
import { StyleSheet, Text } from "react-native"; // Importez View et StyleSheet si nécessaire pour le positionnement du bouton
import Modal from "@/components/Modal"; // Assurez-vous que le chemin est correct
import Button from "../Button";
import { translate, translateToLanguage } from "@/translations/translations";
import { deleteAllSetsInMemory } from "@/utils/asyncStorageOperations";
import { useLanguageStore } from "@/stores/useLanguageStore";
import StatsVisibleListDefaultSelector from "../settingsComponent/StatsVisibleListDefaultSelector";

const DefaultVisibleStatsModal: React.FC = React.memo(() => {
  const language = useLanguageStore((state) => state.language);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);
  const closeModal = useCallback(() => setIsModalVisible(false), []);

  const deleteAllTheMemoryAndReloadSettings = useCallback(() => {
    deleteAllSetsInMemory();
  }, []);

  return (
    <>
      <Button onPress={() => setIsModalVisible(true)} tooltipText={undefined}>
        {translateToLanguage("DefaultVisibleStats", language)}
      </Button>
      <Modal
        modalTitle={undefined}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onClose={closeModal}
      >
        <StatsVisibleListDefaultSelector />
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

export default DefaultVisibleStatsModal;
