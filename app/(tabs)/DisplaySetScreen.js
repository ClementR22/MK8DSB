import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { PressableImagesProvider } from "../../utils/PressableImagesContext";
import { useTheme } from "../../utils/ThemeContext";
import StatSliderResultContainer from "../../components/statSliderResult/StatSliderResultContainer";
import SetCardContainer from "../../components/setCard/SetCardContainer";

import { useSetsList } from "../../utils/SetsListContext";
import {
  SavedSetModalProvider,
  useSavedSetModal,
} from "../../utils/SavedSetModalContext";
import { DisplaySetScreenProvider } from "../../utils/DisplaySetScreenContext";
import DisplaySetScreenPressablesContainer from "../../components/DisplaySetScreenPressablesContainer";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const DisplaySetScreen = () => {
  const th = useTheme();

  const { setsListDisplayed } = useSetsList();

  const setsToShowMultipleStatsLists = setsListDisplayed.map((setToShow) => {
    const setToShowStatsList = setToShow.stats;
    return setToShowStatsList;
  });

  return (
    <DisplaySetScreenProvider>
      <PressableImagesProvider
        isDefaultSelectedImages={true}
        situation="display"
      >
        <SavedSetModalProvider>
          <ScrollView>
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
        </SavedSetModalProvider>
      </PressableImagesProvider>
    </DisplaySetScreenProvider>
  );
};

export default DisplaySetScreen;

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
