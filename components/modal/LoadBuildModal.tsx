// components/modal/LoadBuildModal.tsx
import React, { memo, useCallback, useRef } from "react"; // Import 'memo'
import BuildCardsContainer from "../buildCard/BuildCardsContainer"; // Assuming correct path
import ButtonImportBuild from "../managingBuildsButton/ButtonImportBuild"; // Assuming correct path
import Modal from "@/primitiveComponents/Modal"; // Assuming correct path
import useLoadBuildModalStore from "@/stores/useLoadBuildModalStore"; // Ensure this is correctly typed and implemented
import { useScreenNameFromPath } from "@/hooks/useScreenNameFromPath";
import useBuildsListStore from "@/stores/useBuildsListStore";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Button } from "react-native";

const LoadBuildModal = () => {
  const buildsListSaved = useBuildsListStore((state) => state.buildsListSaved);

  const isLoadBuildModalVisible = useLoadBuildModalStore((state) => state.isLoadBuildModalVisible);
  const setIsLoadBuildModalVisible = useLoadBuildModalStore((state) => state.setIsLoadBuildModalVisible);

  const screenName = useScreenNameFromPath();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <Button onPress={handlePresentModalPress} title="Present Modal" color="black" />
      <Modal
        modalTitle={screenName === "search" ? "loadStatsOfABuild" : "loadABuild"}
        isModalVisible={isLoadBuildModalVisible}
        setIsModalVisible={setIsLoadBuildModalVisible}
        secondButton={<ButtonImportBuild screenName={screenName} />}
        withoutChildrenContainer
        bottomSheetModalRef={bottomSheetModalRef}
      >
        <BuildCardsContainer builds={buildsListSaved} isInLoadBuildModal={true} screenNameFromProps={screenName} />
      </Modal>
    </>
  );
};

export default memo(LoadBuildModal);
