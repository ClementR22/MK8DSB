import React, { useMemo } from "react";
import MyModal from "./MyModal";
import { useLoadSetModal } from "@/contexts/LoadSetModalContext";
import SetCardContainer from "../setCard/SetCardContainer";
import { useSetsList } from "@/contexts/SetsListContext";
import ButtonImportSet from "../managingSetsPressable/ButtonImportSet";

const LoadSetModal = () => {
  const { setsListSaved } = useSetsList();
  const { isLoadSetModalVisible, toggleLoadSetModal } = useLoadSetModal();

  const savedSets = useMemo(() => {
    return setsListSaved;
  }, [setsListSaved]);

  return (
    <MyModal
      modalTitle="LoadASavedSet"
      isModalVisible={isLoadSetModalVisible}
      setIsModalVisible={(visible) => toggleLoadSetModal(visible)}
    >
      <ButtonImportSet />
      <SetCardContainer setsToShow={savedSets} isInLoadSetModal={true} />
    </MyModal>
  );
};

export default LoadSetModal;
