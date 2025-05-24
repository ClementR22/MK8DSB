import React, { useMemo } from "react";
import SetCardContainer from "../setCard/SetCardContainer";
import ButtonImportSet from "../managingSetsPressable/ButtonImportSet";
import Modal from "@/components/Modal";
import useSetsStore from "@/stores/useSetsStore";
import { useLoadSetModalStore } from "@/stores/useLoadSetModalStore";

const LoadSetModal = () => {
  const setsListSaved = useSetsStore((state) => state.setsListSaved);
  const isLoadSetModalVisible = useLoadSetModalStore((state) => state.isLoadSetModalVisible);
  const setIsLoadSetModalVisible = useLoadSetModalStore((state) => state.setIsLoadSetModalVisible);

  const savedSets = useMemo(() => {
    return setsListSaved;
  }, [setsListSaved]);

  return (
    <Modal
      modalTitle="LoadASavedSet"
      isModalVisible={isLoadSetModalVisible}
      setIsModalVisible={setIsLoadSetModalVisible}
      leftButton={<ButtonImportSet />}
    >
      <SetCardContainer setsToShow={savedSets} isInLoadSetModal={true} />
    </Modal>
  );
};

export default LoadSetModal;
