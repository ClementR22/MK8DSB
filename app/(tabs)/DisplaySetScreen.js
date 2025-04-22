import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Dimensions,
} from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

import {
  PressableImagesProvider,
  usePressableImages,
} from "../../utils/PressableImagesContext";
import { useTheme } from "../../utils/ThemeContext";
import StatSliderResultContainer from "../../components/statSliderResult/StatSliderResultContainer";
import SetCardContainer from "../../components/setCard/SetCardContainer";

import { useSetsList } from "../../utils/SetsListContext";
import { useSavedSetModal } from "../../utils/SavedSetModalContext";
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
