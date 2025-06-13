import React from "react";
import ElementsSelector from "../elementsSelector/ElementsSelector";
import useModalsStore from "@/stores/useModalsStore";
import Modal from "../../primitiveComponents/Modal";

const ModalEditSet = () => {
  const isEditModalVisible = useModalsStore((state) => state.isEditModalVisible);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);
  return (
    <Modal modalTitle="SelectASet" isModalVisible={isEditModalVisible} setIsModalVisible={setIsEditModalVisible}>
      <ElementsSelector />
    </Modal>
  );
};

export default ModalEditSet;
