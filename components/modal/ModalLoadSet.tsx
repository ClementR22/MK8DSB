// components/modal/ModalLoadSet.tsx
import React, { memo } from "react"; // Import 'memo'
import SetCardsContainer from "../setCard/SetCardsContainer"; // Assuming correct path
import ButtonImportSet from "../managingSetsButton/ButtonImportSet"; // Assuming correct path
import Modal from "@/primitiveComponents/Modal"; // Assuming correct path
import useSetsStore from "@/stores/useSetsStore";
import { useModalLoadSetStore } from "@/stores/useModalLoadSetStore"; // Ensure this is correctly typed and implemented

const ModalLoadSet = () => {
  const setsListSaved = useSetsStore((state) => state.setsListSaved);

  const isLoadSetModalVisible = useModalLoadSetStore((state) => state.isLoadSetModalVisible);
  const setIsLoadSetModalVisible = useModalLoadSetStore((state) => state.setIsLoadSetModalVisible);

  const screenNameForLoadModal = useModalLoadSetStore((state) => state.screenNameForLoadModal);

  return (
    <Modal
      modalTitle="LoadASavedSet"
      isModalVisible={isLoadSetModalVisible}
      setIsModalVisible={setIsLoadSetModalVisible}
      secondButton={<ButtonImportSet screenName={screenNameForLoadModal} />}
      withoutChildrenContainer
    >
      <SetCardsContainer
        setsToShow={setsListSaved}
        isInLoadSetModal={true}
        screenNameFromProps={screenNameForLoadModal}
      />
    </Modal>
  );
};

export default memo(ModalLoadSet);
