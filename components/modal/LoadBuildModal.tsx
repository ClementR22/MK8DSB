// components/modal/LoadBuildModal.tsx
import React, { memo } from "react"; // Import 'memo'
import BuildCardsContainer from "../buildCard/BuildCardsContainer"; // Assuming correct path
import Modal from "@/primitiveComponents/Modal"; // Assuming correct path
import useLoadBuildModalStore from "@/stores/useLoadBuildModalStore"; // Ensure this is correctly typed and implemented
import { useScreenNameFromPath } from "@/hooks/useScreenNameFromPath";
import useBuildsListStore from "@/stores/useBuildsListStore";

const LoadBuildModal = () => {
  const screenName = useScreenNameFromPath();

  const buildsListSaved = useBuildsListStore((state) => state.buildsListSaved);

  const isLoadBuildModalVisible = useLoadBuildModalStore((state) => state.isLoadBuildModalVisible);
  const setIsLoadBuildModalVisible = useLoadBuildModalStore((state) => state.setIsLoadBuildModalVisible);

  return (
    <Modal
      modalTitle={screenName === "search" ? "loadStatsOfABuild" : "loadABuild"}
      isModalVisible={isLoadBuildModalVisible}
      setIsModalVisible={setIsLoadBuildModalVisible}
      withoutChildrenContainer
    >
      <BuildCardsContainer builds={buildsListSaved} isInLoadBuildModal={true} screenNameFromProps={screenName} />
    </Modal>
  );
};

export default memo(LoadBuildModal);
