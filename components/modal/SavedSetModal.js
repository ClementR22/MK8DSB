import React, { useMemo } from "react";
import MyModal from "./MyModal";
import { useSavedSetModal } from "../../utils/SavedSetModalContext";
import SetCardContainer from "../setCard/SetCardContainer";
import { useSetsList } from "../../utils/SetsListContext";
import { translate } from "../../i18n/translations";

const SavedSetModal = ({}) => {
  const { setsListSaved } = useSetsList();
  const { savedSetModalVisible, toggleSavedSetModal } = useSavedSetModal();

  const savedSets = useMemo(() => {
    return setsListSaved;
  }, [setsListSaved]);

  return (
    <MyModal
      modalTitle={translate("LoadASavedSet")}
      isModalVisible={savedSetModalVisible}
      setIsModalVisible={(visible) => toggleSavedSetModal(visible)}
      ModalContentsList={[SetCardContainer]}
      contentPropsList={[
        {
          setsToShow: savedSets,
          situation: "save",
        },
      ]}
    />
  );
};

export default SavedSetModal;
