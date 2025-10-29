// components/modal/ModalLoadBuild.tsx
import React, { memo } from "react"; // Import 'memo'
import BuildCardsContainer from "../setCard/BuildCardsContainer"; // Assuming correct path
import ButtonImportSet from "../managingSetsButton/ButtonImportSet"; // Assuming correct path
import Modal from "@/primitiveComponents/Modal"; // Assuming correct path
import { useModalLoadBuildStore } from "@/stores/useModalLoadBuildStore"; // Ensure this is correctly typed and implemented
import { useScreenNameFromPath } from "@/hooks/useScreenNameFromPath";
import useBuildsListStore from "@/stores/useBuildsListStore";

const ModalLoadBuild = () => {
  const setsListSaved = useBuildsListStore((state) => state.setsListSaved);

  const isLoadBuildModalVisible = useModalLoadBuildStore((state) => state.isLoadBuildModalVisible);
  const setIsLoadBuildModalVisible = useModalLoadBuildStore((state) => state.setIsLoadBuildModalVisible);

  const screenName = useScreenNameFromPath();

  return (
    <Modal
      modalTitle="loadASavedSet"
      isModalVisible={isLoadBuildModalVisible}
      setIsModalVisible={setIsLoadBuildModalVisible}
      secondButton={<ButtonImportSet screenName={screenName} />}
      withoutChildrenContainer
    >
      <BuildCardsContainer setsToShow={setsListSaved} isInLoadSetModal={true} screenNameFromProps={screenName} />
    </Modal>
  );
};

export default memo(ModalLoadBuild);
