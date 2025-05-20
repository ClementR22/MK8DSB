import React from "react";
import useModalsStore from "@/stores/useModalsStore";
import useSetsStore from "@/stores/useSetsStore";
import SetNameInput from "../textInput/SetNameInput";
import Modal from "../Modal";

const RenameSetModal = () => {
  const saveSetFromFound = useSetsStore((state) => state.saveSetFromFound);
  const setsListFound = useSetsStore((state) => state.setsListFound);
  const setCardEdittedIndex = useSetsStore((state) => state.setCardEdittedIndex);
  const isRenameSetModalVisible = useModalsStore((state) => state.isRenameSetModalVisible);
  const setIsRenameSetModalVisible = useModalsStore((state) => state.setIsRenameSetModalVisible);

  const setFoundName = setsListFound[setCardEdittedIndex]?.name;

  const saveAndClose = () => {
    saveSetFromFound();
    setIsRenameSetModalVisible(false);
  };

  return (
    <Modal
      modalTitle="NameTheSet"
      isModalVisible={isRenameSetModalVisible}
      setIsModalVisible={setIsRenameSetModalVisible}
      closeButtonText="OK"
      onClose={saveAndClose}
    >
      <SetNameInput setToShowName={setFoundName} />
    </Modal>
  );
};

export default RenameSetModal;
