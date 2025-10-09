import React, { memo, useCallback } from "react";
import useModalsStore from "@/stores/useModalsStore";
import Modal from "../../primitiveComponents/Modal";
import PannelPaginated from "../elementPickerCompact/PannelPaginated";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import useSetsStore from "@/stores/useSetsStore";

const ModalEditSet: React.FC = () => {
  const isEditModalVisible = useModalsStore((state) => state.isEditModalVisible);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);
  const isSetsListUpdated = usePressableElementsStore((state) => state.isSetsListUpdated);
  const selectedClassIdsByCategory = usePressableElementsStore((state) => state.selectedClassIdsByCategory);
  const setIsSetsListUpdated = usePressableElementsStore((state) => state.setIsSetsListUpdated);
  const updateSetsList = useSetsStore((state) => state.updateSetsList);

  const handleCloseEditModal = useCallback(() => {
    if (!isSetsListUpdated) {
      updateSetsList(selectedClassIdsByCategory);
      setIsSetsListUpdated(true);
    }
    setIsEditModalVisible(false);
  }, [isSetsListUpdated, updateSetsList, selectedClassIdsByCategory, setIsSetsListUpdated, setIsEditModalVisible]);

  return (
    <Modal
      modalTitle="SelectASet"
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
