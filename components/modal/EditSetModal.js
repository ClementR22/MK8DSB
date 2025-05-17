import React, { useMemo } from "react";
import MyModal from "./MyModal";
import ElementsSelector from "../elementsSelector/ElementsSelector";
import useModalsStore from "@/stores/useModalsStore";

const EditSetModal = () => {
  const isEditModalVisible = useModalsStore((state) => state.isEditModalVisible);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);
  return (
    <MyModal modalTitle="SelectASet" isModalVisible={isEditModalVisible} setIsModalVisible={setIsEditModalVisible}>
      <ElementsSelector />
    </MyModal>
  );
};

export default EditSetModal;
