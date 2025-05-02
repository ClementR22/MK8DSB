import React, { useMemo } from "react";
import MyModal from "./MyModal";
import { useSavedSetModal } from "../../utils/SavedSetModalContext";
import SetCardContainer from "../setCard/SetCardContainer";
import { useSetsList } from "../../utils/SetsListContext";

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
      ModalContentsList={[SetCardContainer]}
      contentPropsList={[
        {
          setsToShow: savedSets,
          situation: "load",
          screenSituation: screenSituation,
        },
      ]}
    />
  );
};

export default LoadSetModal;
