import React, { useState } from "react";
import { View } from "react-native";
import { card } from "../styles/card";
import { useTheme } from "../../utils/ThemeContext";
import MyModal from "../modal/MyModal";
import SetImagesContainer from "./SetImagesContainer";
import StatSliderResultContainer from "../statSliderResult/StatSliderResultContainer";
import { button_icon } from "../styles/button";
import { shadow_3dp } from "../styles/theme";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import ElementsSelector from "../elementsSelector/ElementsSelector";
import { usePressableImages } from "../../utils/PressableImagesContext";
import { useSetsList } from "../../utils/SetsListContext";
import MyTextInput from "../MyTextInput";
import TooltipWrapper from "../TooltipWrapper";
import Container from "../Container";

const SetCard = ({
  setToShowName = null,
  setToShowClassIds,
  setToShowStats = null,
  chosenStats,
  setCardIndex = null,
  situation,
  screenSituation = null,
}) => {
  const { theme } = useTheme();

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
  } = useSetsList();

  const { updatePressableImagesList } = usePressableImages();

  const [isImagesModalVisible, setIsImagesModalVisible] = useState(false);
  const [isElementsSelectorModalVisible, setIsElementsSelectorModalVisible] =
    useState(false);

  const [isTextInputModalVisible, setIsTextInputModalVisible] = useState(false);

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
    },
    load: {
      showTextInput: true,
      showStatSliderResult: false,
      showEdit: false,
      showRemove: false,
      showSave: false,
      showLoadSaveToSearch: screenSituation === "search",
      showLoadSaveToDisplay: screenSituation === "display",
      showLoadSearchToDisplay: false,
      showLoadDisplayToSearch: false,
      showRemoveInMemory: false,
    },
  };

  const config = situationConfig[situation] ?? {};

  return (
    <View style={[card(theme).container, { flex: 1 }]}>
      {config.showTextInput && (
        <MyTextInput
          setToShowName={setToShowName}
          setCardIndex={setCardIndex}
          situation={situation}
          isWithConfimation={true}
        />
      )}

      <SetImagesContainer
        setToShowClassIds={setToShowClassIds}
        mode="icon"
        displaySetImages={displaySetImages}
      />

      {config.showStatSliderResult && (
        <StatSliderResultContainer
          setsToShowMultipleStatsLists={[setToShowStats]}
          chosenStats={chosenStats}
          situation={situation}
        />
      )}

      <MyModal
        isModalVisible={isImagesModalVisible}
        setIsModalVisible={setIsImagesModalVisible}
        ModalContentsList={[SetImagesContainer]}
        contentPropsList={[
          { setToShowClassIds: setToShowClassIds, mode: "image" },
        ]}
        closeButtonText="Close"
      />
      <MyModal
        modalTitle="SelectASet"
        isModalVisible={isElementsSelectorModalVisible}
        setIsModalVisible={setIsElementsSelectorModalVisible}
        ModalContentsList={[ElementsSelector]}
        contentPropsList={[
          {
            situation: situation,
          },
        ]}
      />
      <MyModal
        modalTitle="NameTheSet"
        isModalVisible={isTextInputModalVisible}
        setIsModalVisible={setIsTextInputModalVisible}
        ModalContentsList={[MyTextInput]}
        contentPropsList={[
          {
            setToShowName: setToShowName,
            setCardIndex: setCardIndex,
            situation: situation,
          },
        ]}
        closeButtonText="OK"
        checkBeforeClose={async () => {
          return await saveSetFromFound(setCardIndex);
        }}
      />
      <Container
        theme={theme}
        flexDirection="row"
        key="displaySetActionButtonContainer"
      >
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
              situation == "search"
                ? setIsTextInputModalVisible(true)
                : saveSetFromDisplay(setCardIndex)
            }
          >
            <MaterialIcons name="save" size={24} color={theme.on_primary} />
          </TooltipWrapper>
        )}

        {config.showLoadSaveToSearch && (
          <TooltipWrapper
            tooltipText={
              situation === "load"
                ? "LoadTheStats"
                : "LoadTheStatsToSearchScreen"
            }
            style={[button_icon(theme).container, shadow_3dp]}
            onPress={() => loadSetSaveToSearch(setCardIndex)}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={theme.on_primary}
            />
          </TooltipWrapper>
        )}

        {config.showLoadSaveToDisplay && (
          <TooltipWrapper
            tooltipText={
              situation === "load" ? "LoadTheSet" : "LoadTheSetToDisplayScreen"
            }
            style={[button_icon(theme).container, shadow_3dp]}
            onPress={() => loadSetSaveToDisplay(setCardIndex)}
          >
            <MaterialIcons
              name="display-settings"
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
            <MaterialIcons
              name="display-settings"
              size={24}
              color={theme.on_primary}
            />
          </TooltipWrapper>
        )}

        {config.showLoadDisplayToSearch && (
          <TooltipWrapper
            tooltipText="LoadTheStatsToSearchScreen"
            style={[button_icon(theme).container, shadow_3dp]}
            onPress={() => loadSetDisplayToSearch(setCardIndex)}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={theme.on_primary}
            />
          </TooltipWrapper>
        )}

        {config.showRemoveInMemory && (
          <TooltipWrapper
            tooltipText="Remove"
            style={[button_icon(theme).container, shadow_3dp]}
            onPress={() => removeSetInMemory(setCardIndex)}
          >
            <MaterialCommunityIcons
              name="trash-can"
              size={24}
              color={theme.on_primary}
            />
          </TooltipWrapper>
        )}
      </Container>
    </View>
  );
};

export default SetCard;
