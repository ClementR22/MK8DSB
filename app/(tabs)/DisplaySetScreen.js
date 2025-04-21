import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";

import showToast from "../../utils/toast";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

import {
  statNames,
  bodyTypeNames,
  bodyTypeNamesDisplay,
  images,
} from "../../data/data";

import {
  PressableImagesProvider,
  usePressableImages,
} from "../../utils/PressableImagesContext";
import { useTheme } from "../../utils/ThemeContext";
import { translate } from "../../i18n/translations";
import StatSliderResultContainer from "../../components/statSliderResult/StatSliderResultContainer";
import StatSliderResultSelectorPressable from "../../components/statSliderResult/StatSliderResultSelectorPressable";
import MyModal from "../../components/modal/MyModal";
import StatSelector from "../../components/StatSelector";
import { button_icon } from "../../components/styles/button";
import { shadow_3dp } from "../../components/styles/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import SetCardContainer from "../../components/setCard/SetCardContainer";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSetsList } from "../../utils/SetsListContext";
import { useMemo } from "react";
import { Portal, Provider } from "react-native-paper";
import { useSavedSetModal } from "../../utils/SavedSetModalContext";
import SavedSetModal from "../../components/modal/SavedSetModal";
import { useOrderNumber } from "../../utils/OrderNumberContext";
import { searchSetStatsFromElementsIds } from "../../utils/searchSetStatsFromElementsIds";
import {
  DisplaySetScreenProvider,
  useDisplaySetScreen,
} from "../../utils/DisplaySetScreenContext";
import DisplaySetScreenPressablesContainer from "../../components/DisplaySetScreenPressablesContainer";

const DisplaySetScreenContent = () => {
  const th = useTheme();

  const { setsListDisplayed } = useSetsList();

  const { savedSetModalVisible } = useSavedSetModal();

  const setsToShowMultipleStatsLists = setsListDisplayed.map((setToShow) => {
    const setToShowStatsList = searchSetStatsFromElementsIds(
      setToShow.classIds
    );
    return setToShowStatsList;
  });

  return (
    <DisplaySetScreenProvider>
      <PressableImagesProvider
        isDefaultSelectedImages={true}
        situation="display"
      >
        <ScrollView scrollEnabled={!savedSetModalVisible}>
          <DisplaySetScreenPressablesContainer />

          <SetCardContainer
            setsToShow={setsListDisplayed}
            situation="display"
          />

          <StatSliderResultContainer
            setsToShowMultipleStatsLists={setsToShowMultipleStatsLists}
            chosenStats={[null] * 12}
            situation="display"
          />
        </ScrollView>
      </PressableImagesProvider>
    </DisplaySetScreenProvider>
  );
};

export default DisplaySetScreenContent;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardsContainer: {
    width: "100%",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "pink",
  },
  statContainer: {
    width: screenWidth * 0.9,
    marginVertical: 4,
    alignItems: "flex-start",
    backgroundColor: "gray",
    paddingHorizontal: 0,
    borderColor: "green",
    borderWidth: 3,
  },
  sliderContainer: {
    width: "100%",
    backgroundColor: "green",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    padding: 12,
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  pressable: {
    backgroundColor: "#2196F3",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  pressableText: {
    color: "#fff",
    fontSize: 16,
  },
});
