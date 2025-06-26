// components/modal/ModalLoadSet.tsx
import React, { memo } from "react"; // Import 'memo'
import SetCardContainer from "../setCard/SetCardContainer"; // Assuming correct path
import ButtonImportSet from "../managingSetsButton/ButtonImportSet"; // Assuming correct path
import Modal from "@/primitiveComponents/Modal"; // Assuming correct path
import useSetsStore from "@/stores/useSetsStore";
import { useModalLoadSetStore } from "@/stores/useModalLoadSetStore"; // Ensure this is correctly typed and implemented

const ModalLoadSet = () => {
  // --- Zustand Store Selections ---
  // Select setsListSaved directly as it's already stable from the store
  const setsListSaved = useSetsStore((state) => state.setsListSaved);

  const isLoadSetModalVisible = useModalLoadSetStore((state) => state.isLoadSetModalVisible);
  const setIsLoadSetModalVisible = useModalLoadSetStore((state) => state.setIsLoadSetModalVisible);

  // Select screenNameForLoadModal from useModalsStore
  const screenNameForLoadModal = useModalLoadSetStore((state) => state.screenNameForLoadModal);

  // --- No need for useMemo(savedSets) here, as setsListSaved is already the direct value ---
  // const savedSets = setsListSaved; // This is functionally equivalent

  return (
    <Modal
      modalTitle="LoadASavedSet" // Ensure this key is handled by your translation system
      isModalVisible={isLoadSetModalVisible}
      setIsModalVisible={setIsLoadSetModalVisible}
      secondButton={<ButtonImportSet screenName={screenNameForLoadModal} />} // Pass the screen name to the import button
    >
      <SetCardContainer
        setsToShow={setsListSaved} // Use setsListSaved directly
        isInLoadSetModal={true} // Boolean prop for context
        screenNameFromProps={screenNameForLoadModal} // Pass the screen name for context
      />
    </Modal>
  );
};

// Memoize the component to prevent unnecessary re-renders from its parent
// as it doesn't receive any props directly. It only depends on Zustand store changes.
export default memo(ModalLoadSet);
