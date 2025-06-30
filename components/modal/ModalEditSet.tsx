import React, { memo } from "react";
import useModalsStore from "@/stores/useModalsStore";
import Modal from "../../primitiveComponents/Modal";
import ElementsSelectorPannel from "../elementsSelector/ElementsSelectorPannel";

const ModalEditSet = () => {
  const isEditModalVisible = useModalsStore((state) => state.isEditModalVisible);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);

  return (
    <Modal modalTitle="SelectASet" isModalVisible={isEditModalVisible} setIsModalVisible={setIsEditModalVisible}>
      <ElementsSelectorPannel />
    </Modal>
  );
};

export default memo(ModalEditSet);
