import React from "react";
import useModalsStore from "@/stores/useModalsStore";
import useSetsStore from "@/stores/useSetsStore";
import SetNameInput from "../textInput/SetNameInput";
import Modal from "../../primitiveComponents/Modal";

const ModalRenameSet = () => {
  const saveSetFromFound = useSetsStore((state) => state.saveSetFromFound);
  const setsListFound = useSetsStore((state) => state.setsListFound);
  const setCardEdittedIndex = useSetsStore((state) => state.setCardEdittedIndex);
  const isRenameSetModalVisible = useModalsStore((state) => state.isRenameSetModalVisible);
  const setIsRenameSetModalVisible = useModalsStore((state) => state.setIsRenameSetModalVisible);

  const setFoundName = setsListFound[setCardEdittedIndex]?.name;

  return (
    <Modal
      modalTitle="NameTheSet"
      isModalVisible={isRenameSetModalVisible}
      setIsModalVisible={setIsRenameSetModalVisible}
      secondButtonProps={{ text: "Confirm", onPress: saveSetFromFound }}
    >
      <SetNameInput setToShowName={setFoundName} flex={null} />
      {/* // flex={null} permet d'éviter que SetNameInput soit écrasé */}
    </Modal>
  );
};

export default ModalRenameSet;
