import React, { memo, useCallback } from "react";
import useModalsStore from "@/stores/useModalsStore";
import Modal from "../../primitiveComponents/Modal";
import ElementPickerCompactSelectorPannel from "../elementCompactSelector/ElementPickerCompactSelectorPannel";
import { useModalLoadSetStore } from "@/stores/useModalLoadSetStore";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import useSetsStore from "@/stores/useSetsStore";

const ModalEditSet: React.FC = () => {
  const isEditModalVisible = useModalsStore((state) => state.isEditModalVisible);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);
  const isSetsListUpdated = usePressableElementsStore((state) => state.isSetsListUpdated);
  const selectedClassIdsByCategory = usePressableElementsStore((state) => state.selectedClassIdsByCategory);
  const setIsSetsListUpdated = usePressableElementsStore((state) => state.setIsSetsListUpdated);
  const updateSetsList = useSetsStore((state) => state.updateSetsList);
  const screenNameForLoadModal = useModalLoadSetStore((state) => state.screenNameForLoadModal);

  const handleCloseEditModal = useCallback(() => {
    if (!isSetsListUpdated) {
      updateSetsList(selectedClassIdsByCategory, screenNameForLoadModal);
      setIsSetsListUpdated(true);
    }
    setIsEditModalVisible(false);
  }, [
    isSetsListUpdated,
    updateSetsList,
    selectedClassIdsByCategory,
    screenNameForLoadModal,
    setIsSetsListUpdated,
    setIsEditModalVisible,
  ]);

  return (
    <Modal
      modalTitle="SelectASet"
      isModalVisible={isEditModalVisible}
      setIsModalVisible={setIsEditModalVisible}
      onClose={handleCloseEditModal}
    >
      <ElementPickerCompactSelectorPannel />
    </Modal>
  );
};

ModalEditSet.displayName = "ModalEditSet";

export default memo(ModalEditSet);
