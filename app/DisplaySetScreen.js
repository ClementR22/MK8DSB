import React from "react";
import { ScrollView } from "react-native";
import StatSliderResultContainer from "@/components/statSliderResult/StatSliderResultContainer";
import SetCardContainer from "@/components/setCard/SetCardContainer";
import { PressableImagesProvider } from "@/contexts/PressableImagesContext";
import { useSetsList } from "@/contexts/SetsListContext";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { IsStatsVisibleListProvider } from "@/contexts/IsStatsVisibleListContext";
import DisplaySetScreenPressablesContainer from "@/components/screenPressablesContainer/DisplaySetScreenPressablesContainer";
import { LoadSetModalProvider } from "../contexts/LoadSetModalContext";

const DisplaySetScreen = () => {
  const { setsListDisplayed } = useSetsList();

  const setsToShowMultipleStatsLists = setsListDisplayed.map((setToShow) => {
    const setToShowStatsList = setToShow.stats;
    return setToShowStatsList;
  });

  return (
    <ScreenProvider screenName="display">
      <LoadSetModalProvider>
        <IsStatsVisibleListProvider>
          <PressableImagesProvider>
            <ScrollView>
              <DisplaySetScreenPressablesContainer />

              <SetCardContainer setsToShow={setsListDisplayed} />

              <StatSliderResultContainer setsToShowMultipleStatsLists={setsToShowMultipleStatsLists} />
            </ScrollView>
          </PressableImagesProvider>
        </IsStatsVisibleListProvider>
      </LoadSetModalProvider>
    </ScreenProvider>
  );
};

export default DisplaySetScreen;
