import React, { useMemo } from "react";
import ElementsSelector from "../elementsSelector/ElementsSelector";
import useModalsStore from "@/stores/useModalsStore";
import Modal from "../Modal";

const EditSetModal = () => {
  const isEditModalVisible = useModalsStore((state) => state.isEditModalVisible);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);
  return (
    <Modal modalTitle="SelectASet" isModalVisible={isEditModalVisible} setIsModalVisible={setIsEditModalVisible}>
      <ElementsSelector />
    </Modal>
  );
};

export default EditSetModal;
