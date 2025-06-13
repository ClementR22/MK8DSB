import React, { useMemo } from "react";
import SetCardContainer from "../setCard/SetCardContainer";
import ButtonImportSet from "../managingSetsButton/ButtonImportSet";
import Modal from "@/primitiveComponents/Modal";
import useSetsStore from "@/stores/useSetsStore";
import { useModalLoadSetStore } from "@/stores/useModalLoadSetStore";
import useModalsStore from "@/stores/useModalsStore";

const ModalLoadSet = () => {
  const setsListSaved = useSetsStore((state) => state.setsListSaved);
  const isLoadSetModalVisible = useModalLoadSetStore((state) => state.isLoadSetModalVisible);
  const setIsLoadSetModalVisible = useModalLoadSetStore((state) => state.setIsLoadSetModalVisible);
  const screenNameForEditModal = useModalsStore((state) => state.screenNameForEditModal);

  const savedSets = useMemo(() => {
    return setsListSaved;
  }, [setsListSaved]);

  return (
    <Modal
      modalTitle="LoadASavedSet"
      isModalVisible={isLoadSetModalVisible}
      setIsModalVisible={setIsLoadSetModalVisible}
      secondButton={<ButtonImportSet screenName={screenNameForEditModal} />}
    >
      <SetCardContainer setsToShow={savedSets} isInLoadSetModal={true} screenNameFromProps={screenNameForEditModal} />
    </Modal>
  );
};

export default ModalLoadSet;
