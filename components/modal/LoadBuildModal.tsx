// components/modal/LoadBuildModal.tsx
import React, { memo } from "react"; // Import 'memo'
import BuildCardsContainer from "../buildCard/BuildCardsContainer"; // Assuming correct path
import ButtonImportBuild from "../managingBuildsButton/ButtonImportBuild"; // Assuming correct path
import Modal from "@/primitiveComponents/Modal"; // Assuming correct path
import useLoadBuildModalStore from "@/stores/useLoadBuildModalStore"; // Ensure this is correctly typed and implemented
import { useScreenNameFromPath } from "@/hooks/useScreenNameFromPath";
import useBuildsListStore from "@/stores/useBuildsListStore";

const LoadBuildModal = () => {
  const buildsListSaved = useBuildsListStore((state) => state.buildsListSaved);

  const isLoadBuildModalVisible = useLoadBuildModalStore((state) => state.isLoadBuildModalVisible);
  const setIsLoadBuildModalVisible = useLoadBuildModalStore((state) => state.setIsLoadBuildModalVisible);

  const screenName = useScreenNameFromPath();

  return (
    <Modal
      modalTitle="loadASavedSet"
      isModalVisible={isLoadBuildModalVisible}
      setIsModalVisible={setIsLoadBuildModalVisible}
      secondButton={<ButtonImportBuild screenName={screenName} />}
      withoutChildrenContainer
    >
      <BuildCardsContainer builds={buildsListSaved} isInLoadSetModal={true} screenNameFromProps={screenName} />
    </Modal>
  );
};

export default memo(LoadBuildModal);
