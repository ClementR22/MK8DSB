import React, { memo, useCallback } from "react";
import useEditBuildModalStore from "@/stores/useEditBuildModalStore";
import Modal from "../../primitiveComponents/Modal";
import PannelPaginated from "../elementPickerCompact/PannelPaginated";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import { useScreenNameFromPath } from "@/hooks/useScreenNameFromPath";
import useBuildsListStore from "@/stores/useBuildsListStore";

const EditBuildModal: React.FC = () => {
  const isEditBuildModalVisible = useEditBuildModalStore((state) => state.isEditBuildModalVisible);
  const setIsEditBuildModalVisible = useEditBuildModalStore((state) => state.setIsEditBuildModalVisible);
  const isBuildsListUpdated = usePressableElementsStore((state) => state.isBuildsListUpdated);
  const selectedClassIdsByCategory = usePressableElementsStore((state) => state.selectedClassIdsByCategory);
  const setIsBuildsListUpdated = usePressableElementsStore((state) => state.setIsBuildsListUpdated);
  const updateBuildsList = useBuildsListStore((state) => state.updateBuildsList);
  const screenName = useScreenNameFromPath();

  const handleCloseEditBuildModal = useCallback(() => {
    if (!isBuildsListUpdated) {
      updateBuildsList(selectedClassIdsByCategory, screenName);
      setIsBuildsListUpdated(true);
    }
    setIsEditBuildModalVisible(false);
  }, [
    isBuildsListUpdated,
    selectedClassIdsByCategory,
    screenName,
    updateBuildsList,
    setIsBuildsListUpdated,
    setIsEditBuildModalVisible,
  ]);

  return (
    <Modal
      modalTitle="selectABuild"
      isModalVisible={isEditBuildModalVisible}
      setIsModalVisible={setIsEditBuildModalVisible}
      onClose={handleCloseEditBuildModal}
    >
      <PannelPaginated />
    </Modal>
  );
};

EditBuildModal.displayName = "EditBuildModal";

export default memo(EditBuildModal);
