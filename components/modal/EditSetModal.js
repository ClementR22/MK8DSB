import React, { useMemo } from "react";
import MyModal from "./MyModal";
import ElementsSelector from "../elementsSelector/ElementsSelector";
import useModalsStore from "@/stores/useModalsStore";

const EditSetModal = () => {
  const isElementsSelectorModalVisible = useModalsStore((state) => state.isElementsSelectorModalVisible);
  const setIsElementsSelectorModalVisible = useModalsStore((state) => state.setIsElementsSelectorModalVisible);

  return (
    <MyModal
      modalTitle="SelectASet"
      isModalVisible={isElementsSelectorModalVisible}
      setIsModalVisible={setIsElementsSelectorModalVisible}
    >
      <ElementsSelector />
    </MyModal>
  );
};

export default EditSetModal;
