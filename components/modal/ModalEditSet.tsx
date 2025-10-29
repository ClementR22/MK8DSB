import React, { memo, useCallback } from "react";
import useModalsStore from "@/stores/useModalsStore";
import Modal from "../../primitiveComponents/Modal";
import PannelPaginated from "../elementPickerCompact/PannelPaginated";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import { useScreenNameFromPath } from "@/hooks/useScreenNameFromPath";
import useBuildsListStore from "@/stores/useBuildsListStore";

const ModalEditSet: React.FC = () => {
  const isEditModalVisible = useModalsStore((state) => state.isEditModalVisible);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);
  const isBuildsListUpdated = usePressableElementsStore((state) => state.isBuildsListUpdated);
  const selectedClassIdsByCategory = usePressableElementsStore((state) => state.selectedClassIdsByCategory);
  const setIsBuildsListUpdated = usePressableElementsStore((state) => state.setIsBuildsListUpdated);
  const updateBuildsList = useBuildsListStore((state) => state.updateBuildsList);
  const screenName = useScreenNameFromPath();

  const handleCloseEditModal = useCallback(() => {
    if (!isBuildsListUpdated) {
      updateBuildsList(selectedClassIdsByCategory, screenName);
      setIsBuildsListUpdated(true);
    }
    setIsEditModalVisible(false);
  }, [
    isBuildsListUpdated,
    selectedClassIdsByCategory,
    screenName,
    updateBuildsList,
    setIsBuildsListUpdated,
    setIsEditModalVisible,
  ]);

  return (
    <Modal
      modalTitle="selectASet"
      isModalVisible={isEditModalVisible}
      setIsModalVisible={setIsEditModalVisible}
      onClose={handleCloseEditModal}
    >
      <PannelPaginated />
    </Modal>
  );
};

ModalEditSet.displayName = "ModalEditSet";

export default memo(ModalEditSet);
