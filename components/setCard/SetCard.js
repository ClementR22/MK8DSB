import React, { useState } from "react";
import { View } from "react-native";
import { card } from "../styles/card";
import { useTheme } from "@/contexts/ThemeContext";
import MyModal from "../modal/MyModal";
import SetImagesContainer from "./SetImagesContainer";
import StatSliderResultContainer from "../statSliderResult/StatSliderResultContainer";
import { button_icon } from "../styles/button";
import { shadow_3dp } from "../styles/theme";
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";
import ElementsSelector from "../elementsSelector/ElementsSelector";
import { usePressableImages } from "@/contexts/PressableImagesContext";
import { useSetsList } from "@/contexts/SetsListContext";
import SetNameInput from "../textInput/SetNameInput";
import TooltipWrapper from "../TooltipWrapper";
import BoxContainer from "../BoxContainer";
import { useScreen } from "@/contexts/ScreenContext";

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

  const {
    saveSetFromDisplay,
    saveSetFromFound,
    loadSetSaveToSearch,
    loadSetSaveToDisplay,
    loadSetSearchToDisplay,
    loadSetDisplayToSearch,
    removeSet,
    removeSetInMemory,
    setSetCardEdittedIndex,
    exportSet,
  } = useSetsList();

  const { updatePressableImagesList } = usePressableImages();

  const [isImagesModalVisible, setIsImagesModalVisible] = useState(false);
  const [isElementsSelectorModalVisible, setIsElementsSelectorModalVisible] = useState(false);

  const [isTextInputModalVisible, setIsTextInputModalVisible] = useState(false);

  const displaySetImages = () => {
    setIsImagesModalVisible(true);
  };

  const saveAndClose = () => {
    saveSetFromFound(setCardIndex);
    setIsTextInputModalVisible(false);
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

  const config = situationConfig[situation] ?? {};

  return (
    <View style={[card(theme).container, { flex: 1 }]}>
      {config.showTextInput && (
        <SetNameInput setToShowName={setToShowName} setCardIndex={setCardIndex} isWithConfimation={true} />
      )}

      <SetImagesContainer setToShowClassIds={setToShowClassIds} mode="icon" displaySetImages={displaySetImages} />

      {config.showStatSliderResult && <StatSliderResultContainer setsToShowMultipleStatsLists={[setToShowStats]} />}

      <MyModal isModalVisible={isImagesModalVisible} setIsModalVisible={setIsImagesModalVisible}>
        <SetImagesContainer setToShowClassIds={setToShowClassIds} mode="image" />
      </MyModal>

      <MyModal
        modalTitle="SelectASet"
        isModalVisible={isElementsSelectorModalVisible}
        setIsModalVisible={setIsElementsSelectorModalVisible}
      >
        <ElementsSelector />
      </MyModal>

      <MyModal
        modalTitle="NameTheSet"
        isModalVisible={isTextInputModalVisible}
        setIsModalVisible={setIsTextInputModalVisible}
        closeButtonText="OK"
        onClose={saveAndClose}
      >
        <SetNameInput setToShowName={setToShowName} setCardIndex={setCardIndex} />
      </MyModal>

      <BoxContainer flexDirection="row" key="displaySetActionButtonContainer">
        {config.showEdit && (
          <TooltipWrapper
            tooltipText="Edit"
            style={[button_icon(theme).container, shadow_3dp]}
            onPress={() => {
              setSetCardEdittedIndex(setCardIndex);
              setIsElementsSelectorModalVisible(true);
              updatePressableImagesList(setToShowClassIds);
            }}
          >
            <MaterialIcons name="edit" size={24} color={theme.on_primary} />
          </TooltipWrapper>
        )}

        {config.showRemove && (
          <TooltipWrapper
            tooltipText="Remove"
            style={[button_icon(theme).container, shadow_3dp]}
            onPress={() => {
              removeSet(setCardIndex, situation);
            }}
          >
            <Ionicons name="close" size={24} color={theme.on_primary} />
          </TooltipWrapper>
        )}

        {config.showSave && (
          <TooltipWrapper
            tooltipText="Save"
            style={[button_icon(theme).container, shadow_3dp]}
            onPress={() =>
              situation === "search" ? setIsTextInputModalVisible(true) : saveSetFromDisplay(setCardIndex)
            }
          >
            <MaterialIcons name="save" size={24} color={theme.on_primary} />
          </TooltipWrapper>
        )}

        {config.showLoadSaveToSearch && (
          <TooltipWrapper
            tooltipText={situation === "load" ? "LoadTheStats" : "LoadTheStatsToSearchScreen"}
            style={[button_icon(theme).container, shadow_3dp]}
            onPress={() => loadSetSaveToSearch(setCardIndex)}
          >
            <MaterialCommunityIcons
              name={situation === "save" ? "magnify" : "download"}
              size={24}
              color={theme.on_primary}
            />
          </TooltipWrapper>
        )}

        {config.showLoadSaveToDisplay && (
          <TooltipWrapper
            tooltipText={situation === "load" ? "LoadTheSet" : "LoadTheSetToDisplayScreen"}
            style={[button_icon(theme).container, shadow_3dp]}
            onPress={() => loadSetSaveToDisplay(setCardIndex)}
          >
            <MaterialIcons
              name={situation === "save" ? "display-settings" : "download"}
              size={24}
              color={theme.on_primary}
            />
          </TooltipWrapper>
        )}

        {config.showLoadSearchToDisplay && (
          <TooltipWrapper
            tooltipText="LoadTheSetToDisplayScreen"
            style={[button_icon(theme).container, shadow_3dp]}
            onPress={() => loadSetSearchToDisplay(setCardIndex)}
          >
            <MaterialIcons name="display-settings" size={24} color={theme.on_primary} />
          </TooltipWrapper>
        )}

        {config.showLoadDisplayToSearch && (
          <TooltipWrapper
            tooltipText="LoadTheStatsToSearchScreen"
            style={[button_icon(theme).container, shadow_3dp]}
            onPress={() => loadSetDisplayToSearch(setCardIndex)}
          >
            <MaterialCommunityIcons name="magnify" size={24} color={theme.on_primary} />
          </TooltipWrapper>
        )}

        {config.showRemoveInMemory && (
          <TooltipWrapper
            tooltipText="Remove"
            style={[button_icon(theme).container, shadow_3dp]}
            onPress={() => removeSetInMemory(setCardIndex)}
          >
            <MaterialCommunityIcons name="trash-can" size={24} color={theme.on_primary} />
          </TooltipWrapper>
        )}

        {config.showExport && (
          <TooltipWrapper
            tooltipText="Export"
            style={[button_icon(theme).container, shadow_3dp]}
            onPress={() => exportSet(setCardIndex, situation)}
          >
            <FontAwesome6 name="share" size={24} color={theme.on_primary} />
          </TooltipWrapper>
        )}
      </BoxContainer>
    </View>
  );
};

export default SetCard;
