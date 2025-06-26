import React, { memo } from "react";
import useModalsStore from "@/stores/useModalsStore";
import Modal from "../../primitiveComponents/Modal";
import ElementsSelector from "../elementsSelector/ElementsSelector";

const ModalEditSet = () => {
  const isEditModalVisible = useModalsStore((state) => state.isEditModalVisible);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);

  return (
    <Modal modalTitle="SelectASet" isModalVisible={isEditModalVisible} setIsModalVisible={setIsEditModalVisible}>
      <ElementsSelector />
    </Modal>
  );
};

export default memo(ModalEditSet);
