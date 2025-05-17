import React from "react";
import MyModal from "./MyModal";
import useModalsStore from "@/stores/useModalsStore";
import useSetsStore from "@/stores/useSetsStore";
import SetNameInput from "../textInput/SetNameInput";

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
    <MyModal
      modalTitle="NameTheSet"
      isModalVisible={isRenameSetModalVisible}
      setIsModalVisible={setIsRenameSetModalVisible}
      closeButtonText="OK"
      onClose={saveAndClose}
    >
      <SetNameInput setToShowName={setFoundName} />
    </MyModal>
  );
};

export default RenameSetModal;
