import React from "react";
import { ScrollView } from "react-native";
import { PressableImagesProvider } from "../../utils/PressableImagesContext";
import StatSliderResultContainer from "../../components/statSliderResult/StatSliderResultContainer";
import SetCardContainer from "../../components/setCard/SetCardContainer";

import { useSetsList } from "../../utils/SetsListContext";
import { SavedSetModalProvider } from "../../utils/SavedSetModalContext";
import { DisplaySetScreenProvider } from "../../utils/DisplaySetScreenContext";
import DisplaySetScreenPressablesContainer from "../../components/DisplaySetScreenPressablesContainer";

const DisplaySetScreen = () => {
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
