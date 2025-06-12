import React, { useMemo } from "react";
import StatSliderResultContainer from "../statSliderResult/StatSliderResultContainer";
import SetNameInput from "../textInput/SetNameInput";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import FlexContainer from "@/primitiveComponents/FlexContainer";
import { useScreen } from "@/contexts/ScreenContext";
import SetCardActionButtons from "./SetCardActionButtons";
import useModalsStore from "@/stores/useModalsStore";
import usePressableElementsStore from "@/stores/usePressableElementsStore";
import useSetsStore from "@/stores/useSetsStore";
import SetCardMoreActionsButton from "./SetCardMoreActionsButton";
import { useThemeStore } from "@/stores/useThemeStore";
import SetImagesModal from "./SetImagesModal";
import { Text, View } from "react-native";

const SetCard = ({
  setToShowName,
  setToShowClassIds,
  setToShowStats = null,
  setCardIndex = null,
  isInLoadSetModal = false,
  screenNameFromProps,
  hideRemoveSet = false,
}) => {
  const contextScreenName = useScreen();
  const screenName = screenNameFromProps ?? contextScreenName;
  const situation = isInLoadSetModal ? "load" : screenName;
  const theme = useThemeStore((state) => state.theme);

  const situationConfig = {
    search: {
      showTextInput: false,
      showIndex: true,
      showStatSliderResult: true,
      actionNamesList: ["export", "loadSearchToDisplay", "save"],
      moreActionNamesList: undefined,
    },
    display: {
      showTextInput: true,
      showIndex: false,
      showStatSliderResult: false,
      actionNamesList: ["edit", "loadDisplayToSearch", "save"],
      moreActionNamesList: [], // va valoir ["export", "remove"] ou bien ["export"]
    },
    save: {
      showTextInput: true,
      showIndex: false,
      showStatSliderResult: true,
      actionNamesList: ["edit", "loadSaveToSearch", "loadSaveToDisplay"],
      moreActionNamesList: ["export", "removeInMemory"],
    },
    load: {
      showTextInput: true,
      showIndex: false,
      showStatSliderResult: false,
      actionNamesList: [screenName === "search" ? "loadSaveToSearch" : "loadSaveToDisplay"],
      moreActionNamesList: undefined,
    },
  };

  const config = useMemo(() => {
    const currentConfig = situationConfig[situation] ?? {};

    // Gérer spécifiquement le `moreActionNamesList` pour la situation 'display'
    if (situation === "display") {
      const dynamicMoreActions = [];
      // Inclure "remove" SEULEMENT si hideRemoveSet est false
      if (!hideRemoveSet) {
        dynamicMoreActions.push("remove");
      }
      dynamicMoreActions.push("export"); // "export" est toujours inclus pour display

      return {
        ...currentConfig,
        moreActionNamesList: dynamicMoreActions,
      };
    }

    // Pour les autres situations, retourner la configuration telle quelle
    return { ...currentConfig };
  }, [situation, hideRemoveSet, screenName]);

  const setPressedClassIdsObjByScreen = usePressableElementsStore((state) => state.setPressedClassIdsObjByScreen);
  const updatePressableElementsList = usePressableElementsStore((state) => state.updatePressableElementsList);
  const setSetCardEdittedIndex = useSetsStore((state) => state.setSetCardEdittedIndex);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);

  function handleEditPress() {
    setSetCardEdittedIndex(setCardIndex);
    setPressedClassIdsObjByScreen(screenName, setToShowClassIds);
    setIsEditModalVisible(true);
    updatePressableElementsList(screenName, setToShowClassIds);
  }

  const width = 220;

  return (
    <View>
      <BoxContainer contentBackgroundColor={theme.surface} margin={0} widthContainer={width} gap={0}>
        {config.showIndex && (
          <Text
            style={{
              color: theme.on_surface,
              fontSize: 30,
              fontWeight: "bold",
              position: "absolute",
              top: 4,
              right: 15,
            }}
          >
            {setCardIndex + 1}
          </Text>
        )}
        <FlexContainer flexDirection={"row"} minHeight={30}>
          {/* le FlexContainer a une hauteur fixe */}

          {config.showTextInput && (
            <View>
              <SetNameInput setToShowName={setToShowName} setCardIndex={setCardIndex} editable={!isInLoadSetModal} />
            </View>
          )}
          {config.moreActionNamesList && (
            <SetCardMoreActionsButton
              moreActionNamesList={config.moreActionNamesList}
              setCardIndex={setCardIndex}
              situation={situation}
            />
          )}
        </FlexContainer>
        <SetImagesModal setToShowClassIds={setToShowClassIds} />

        <SetCardActionButtons
          actionNamesList={config.actionNamesList}
          setCardIndex={setCardIndex}
          situation={situation}
          handleEditPress={handleEditPress}
        />
      </BoxContainer>

      {config.showStatSliderResult && (
        <BoxContainer contentBackgroundColor={theme.surface} margin={0} marginTop={8} widthContainer={width}>
          <StatSliderResultContainer setsToShowMultipleStatsLists={[setToShowStats]} />
        </BoxContainer>
      )}
    </View>
  );
};

export default SetCard;
