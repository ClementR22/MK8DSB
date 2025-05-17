import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import MyModal from "../modal/MyModal";
import SetImagesContainer from "./SetImagesContainer";
import StatSliderResultContainer from "../statSliderResult/StatSliderResultContainer";
import { usePressableImages } from "@/contexts/PressableImagesContext";
import SetNameInput from "../textInput/SetNameInput";
import BoxContainer from "../BoxContainer";
import { useScreen } from "@/contexts/ScreenContext";
import SetCardActionButtons from "./SetCardActionButtons";
import useModalsStore from "@/stores/useModalsStore";

const SetCard = ({
  setToShowName,
  setToShowClassIds,
  setToShowStats = null,
  setCardIndex = null,
  isInLoadSetModal = false,
}) => {
  const { screenName } = useScreen();
  const situation = isInLoadSetModal ? "load" : screenName;
  const { theme } = useTheme();

  /// DEBUG
  if (!setToShowName) {
    console.log("setToShowName not defined in SetCard");
  }

  const [isImagesModalVisible, setIsImagesModalVisible] = useState(false);

  const isEditModalVisible = useModalsStore((state) => state.isEditModalVisible);

  const displaySetImages = () => {
    setIsImagesModalVisible(true);
  };

  const situationConfig = {
    search: {
      showTextInput: false,
      showStatSliderResult: true,
      showEdit: false,
      showRemove: false,
      showSave: true,
      showLoadSaveToSearch: false,
      showLoadSaveToDisplay: false,
      showLoadSearchToDisplay: true,
      showLoadDisplayToSearch: false,
      showRemoveInMemory: false,
      showExport: true,
    },
    display: {
      showTextInput: true,
      showStatSliderResult: false,
      showEdit: true,
      showRemove: true,
      showSave: true,
      showLoadSaveToSearch: false,
      showLoadSaveToDisplay: false,
      showLoadSearchToDisplay: false,
      showLoadDisplayToSearch: true,
      showRemoveInMemory: false,
      showExport: true,
    },
    save: {
      showTextInput: true,
      showStatSliderResult: true,
      showEdit: true,
      showRemove: false,
      showSave: false,
      showLoadSaveToSearch: true,
      showLoadSaveToDisplay: true,
      showLoadSearchToDisplay: false,
      showLoadDisplayToSearch: false,
      showRemoveInMemory: true,
      showExport: true,
    },
    load: {
      showTextInput: false,
      showStatSliderResult: false,
      showEdit: false,
      showRemove: false,
      showSave: false,
      showLoadSaveToSearch: screenName === "search",
      showLoadSaveToDisplay: screenName === "display",
      showLoadSearchToDisplay: false,
      showLoadDisplayToSearch: false,
      showRemoveInMemory: false,
      showExport: false,
    },
  };

  const config = useMemo(() => {
    const base = situationConfig[situation] ?? {};
    return { ...base };
  }, [situation, screenName]);

  const { updatePressableImagesList } = usePressableImages();

  useEffect(() => {
    if (isEditModalVisible) {
      updatePressableImagesList(setToShowClassIds);
    }
  }, [isEditModalVisible]);

  return (
    <BoxContainer contentBackgroundColor={theme.surface} margin={0}>
      {config.showTextInput && (
        <SetNameInput setToShowName={setToShowName} setCardIndex={setCardIndex} isWithConfimation={true} />
      )}

      <SetImagesContainer setToShowClassIds={setToShowClassIds} mode="icon" displaySetImages={displaySetImages} />

      {config.showStatSliderResult && <StatSliderResultContainer setsToShowMultipleStatsLists={[setToShowStats]} />}

      <MyModal isModalVisible={isImagesModalVisible} setIsModalVisible={setIsImagesModalVisible}>
        <SetImagesContainer setToShowClassIds={setToShowClassIds} mode="image" />
      </MyModal>

      <SetCardActionButtons setCardIndex={setCardIndex} config={config} situation={situation} />
    </BoxContainer>
  );
};

export default SetCard;
