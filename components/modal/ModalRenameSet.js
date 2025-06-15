import React from "react";
import useModalsStore from "@/stores/useModalsStore";
import useSetsStore from "@/stores/useSetsStore";
import SetNameInput from "../textInput/SetNameInput";
import Modal from "../../primitiveComponents/Modal";

const ModalRenameSet = () => {
  const saveSetFromFound = useSetsStore((state) => state.saveSetFromFound);
  const setsListFound = useSetsStore((state) => state.setsListFound);
  const setCardEditedIndex = useSetsStore((state) => state.setCardEditedIndex);
  const isRenameSetModalVisible = useModalsStore((state) => state.isRenameSetModalVisible);
  const setIsRenameSetModalVisible = useModalsStore((state) => state.setIsRenameSetModalVisible);

  const setFoundName = setsListFound[setCardEditedIndex]?.name;

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
