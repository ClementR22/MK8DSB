import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import StatSliderResultsContainer from "@/components/statSliderResult/StatSliderResultsContainer";
import SetCardContainer from "@/components/setCard/SetCardContainer";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import DisplaySetScreenPressablesContainer from "@/components/screenPressablesContainer/DisplaySetScreenPressablesContainer";
import useSetsStore from "@/stores/useSetsStore";
import useGeneralStore from "@/stores/useGeneralStore";

const DisplaySetScreen = () => {
  const setsListDisplayed = useSetsStore((state) => state.setsListDisplayed);
  const setsToShowMultipleStatsLists = setsListDisplayed.map((setToShow) => {
    const setToShowStatsList = setToShow.stats;
    return setToShowStatsList;
  });

  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const hideRemoveSet = setsListDisplayed.length === 1;

  return (
    <ScreenProvider screenName="display">
      <ResultStatsProvider>
        <ScrollView scrollEnabled={isScrollEnable}>
          <DisplaySetScreenPressablesContainer />
          <SetCardContainer setsToShow={setsListDisplayed} hideRemoveSet={hideRemoveSet} />
          <StatSliderResultsContainer setsToShowMultipleStatsLists={setsToShowMultipleStatsLists} />
        </ScrollView>
      </ResultStatsProvider>
    </ScreenProvider>
  );
};

export default DisplaySetScreen;
