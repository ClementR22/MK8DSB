import React from "react";
import MyModal from "./MyModal";
import useModalsStore from "@/stores/useModalsStore";
import useSetsStore from "@/stores/useSetsStore";
import SetNameInput from "../textInput/SetNameInput";

const RenameSetModal = () => {
  const saveSetFromFound = useSetsStore((state) => state.saveSetFromFound);
  const setsListFound = useSetsStore((state) => state.setsListFound);
  const setCardEdittedIndex = useSetsStore((state) => state.setCardEdittedIndex);
  const isTextInputModalVisible = useModalsStore((state) => state.isTextInputModalVisible);
  const setIsTextInputModalVisible = useModalsStore((state) => state.setIsTextInputModalVisible);

  const setFoundName = setsListFound[setCardEdittedIndex]?.name;

  const saveAndClose = () => {
    saveSetFromFound();
    setIsTextInputModalVisible(false);
  };

  return (
    <MyModal
      modalTitle="NameTheSet"
      isModalVisible={isTextInputModalVisible}
      setIsModalVisible={setIsTextInputModalVisible}
      closeButtonText="OK"
      onClose={saveAndClose}
    >
      <SetNameInput setToShowName={setFoundName} />
    </MyModal>
  );
};

export default RenameSetModal;
