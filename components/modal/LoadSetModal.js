import React, { useMemo } from "react";
import { useLoadSetModal } from "@/contexts/LoadSetModalContext";
import SetCardContainer from "../setCard/SetCardContainer";
import { useSetsList } from "@/contexts/SetsListContext";
import ButtonImportSet from "../managingSetsPressable/ButtonImportSet";
import Modal from "@/components/Modal";

const LoadSetModal = () => {
  const { setsListSaved } = useSetsList();
  const { isLoadSetModalVisible, toggleLoadSetModal } = useLoadSetModal();

  const savedSets = useMemo(() => {
    return setsListSaved;
  }, [setsListSaved]);

  return (
    <Modal
      modalTitle="LoadASavedSet"
      isModalVisible={isLoadSetModalVisible}
      setIsModalVisible={(visible) => toggleLoadSetModal(visible)}
      leftButton={
        <ButtonImportSet />
      }
    >
      <SetCardContainer setsToShow={savedSets} isInLoadSetModal={true} />
    </Modal>
  );
};

export default LoadSetModal;
