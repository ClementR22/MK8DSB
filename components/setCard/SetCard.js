import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
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
import { translate } from "../../i18n/translations";
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
  const th = useTheme();

  const {
    saveSetFromDisplay,
    saveSetFromFound,
    loadSetSaveToSearch,
    loadSetSaveToDisplay,
    loadSetSearchToDisplay,
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
      showRemoveInMemory: false,
    },
    save: {
      showTextInput: true,
      showStatSliderResult: true,
      showEdit: true,
      showRemove: false,
      showSave: false,
      showLoadSaveToSearch: false,
      showLoadSaveToDisplay: true,
      showLoadSearchToDisplay: false,
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
      showRemoveInMemory: false,
    },
  };

  const config = situationConfig[situation] ?? {};

  return (
    <View style={[card(th).container, { flex: 1 }]}>
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
        modalTitle={""}
        isModalVisible={isImagesModalVisible}
        setIsModalVisible={setIsImagesModalVisible}
        ModalContentsList={[SetImagesContainer]}
        contentPropsList={[
          { setToShowClassIds: setToShowClassIds, mode: "image" },
        ]}
        closeButtonText="Close"
      />
      <MyModal
        modalTitle={translate("Selectionner")}
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
        modalTitle={translate("NameTheSet")}
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
        closeButtonText={translate("Confirm")}
        checkBeforeClose={async () => {
          return await saveSetFromFound(setCardIndex);
        }}
      />
      <Container
        theme={th}
        flexDirection={"row"}
        key="displaySetActionButtonContainer"
      >
        {config.showEdit && (
          <TooltipWrapper
            tooltipText={translate("Edit")}
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() => {
              setSetCardEdittedIndex(setCardIndex);
              setIsElementsSelectorModalVisible(true);
              updatePressableImagesList(setToShowClassIds);
            }}
          >
            <MaterialIcons name="edit" size={24} color={th.on_primary} />
          </TooltipWrapper>
        )}

        {config.showRemove && (
          <TooltipWrapper
            tooltipText={translate("Remove")}
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() => {
              removeSet(setCardIndex, situation);
            }}
          >
            <Ionicons name="close" size={24} color={th.on_primary} />
          </TooltipWrapper>
        )}

        {config.showSave && (
          <TooltipWrapper
            tooltipText={translate("Save")}
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() =>
              situation == "search"
                ? setIsTextInputModalVisible(true)
                : saveSetFromDisplay(setCardIndex)
            }
          >
            <MaterialIcons name="save" size={24} color={th.on_primary} />
          </TooltipWrapper>
        )}

        {config.showLoadSaveToSearch && (
          <TooltipWrapper
            tooltipText={translate("LoadTheStats")}
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() => loadSetSaveToSearch(setCardIndex)}
          >
            <Text>{"LoadTheStats"}</Text>
          </TooltipWrapper>
        )}

        {config.showLoadSaveToDisplay && (
          <TooltipWrapper
            tooltipText={translate("LoadToDisplayScreen")}
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() => loadSetSaveToDisplay(setCardIndex)}
          >
            <MaterialIcons
              name="display-settings"
              size={24}
              color={th.on_primary}
            />
          </TooltipWrapper>
        )}

        {config.showLoadSearchToDisplay && (
          <TooltipWrapper
            tooltipText={translate("LoadToDisplayScreen")}
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() => loadSetSearchToDisplay(setCardIndex)}
          >
            <MaterialIcons
              name="display-settings"
              size={24}
              color={th.on_primary}
            />
          </TooltipWrapper>
        )}

        {config.showRemoveInMemory && (
          <Pressable
            style={[button_icon(th).container, shadow_3dp]}
            onPress={() => removeSetInMemory(setCardIndex)}
          >
            <MaterialCommunityIcons
              name="trash-can"
              size={24}
              color={th.on_primary}
            />
          </Pressable>
        )}
      </Container>
    </View>
  );
};

export default SetCard;
