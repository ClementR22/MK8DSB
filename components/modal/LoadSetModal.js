import React, { useMemo } from "react";
import MyModal from "./MyModal";
import { useSavedSetModal } from "@/contexts/SavedSetModalContext";
import SetCardContainer from "../setCard/SetCardContainer";
import { useSetsList } from "@/contexts/SetsListContext";
import ButtonImportSet from "../managingSetsPressable/ButtonImportSet";

const LoadSetModal = ({ screenSituation }) => {
  const { setsListSaved } = useSetsList();
  const { savedSetModalVisible, toggleSavedSetModal } = useSavedSetModal();

  const savedSets = useMemo(() => {
    return setsListSaved;
  }, [setsListSaved]);

  return (
    <MyModal
      modalTitle="LoadASavedSet"
      isModalVisible={savedSetModalVisible}
      setIsModalVisible={(visible) => toggleSavedSetModal(visible)}
    >
      <ButtonImportSet screenSituation={screenSituation} />
      <SetCardContainer setsToShow={savedSets} situation="load" screenSituation={screenSituation} />
    </MyModal>
  );
};

export default LoadSetModal;
