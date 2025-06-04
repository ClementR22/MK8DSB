import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import StatSliderResultContainer from "@/components/statSliderResult/StatSliderResultContainer";
import SetCardContainer from "@/components/setCard/SetCardContainer";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { StatsVisibleListProvider } from "@/contexts/StatsVisibleListContext";
import DisplaySetScreenPressablesContainer from "@/components/screenPressablesContainer/DisplaySetScreenPressablesContainer";
import useSetsStore from "@/stores/useSetsStore";
import useModalsStore from "@/stores/useModalsStore";

const DisplaySetScreen = () => {
  const setsListDisplayed = useSetsStore((state) => state.setsListDisplayed);
  const setsToShowMultipleStatsLists = setsListDisplayed.map((setToShow) => {
    const setToShowStatsList = setToShow.stats;
    return setToShowStatsList;
  });

  const isTooltipVisible = useModalsStore((state) => state.isTooltipVisible);

  const hideRemoveSet = setsListDisplayed.length === 1;

  return (
    <ScreenProvider screenName="display">
      <StatsVisibleListProvider>
        <ScrollView scrollEnabled={!isTooltipVisible}>
          <DisplaySetScreenPressablesContainer />
          <SetCardContainer setsToShow={setsListDisplayed} hideRemoveSet={hideRemoveSet} />
          <StatSliderResultContainer setsToShowMultipleStatsLists={setsToShowMultipleStatsLists} />
        </ScrollView>
      </StatsVisibleListProvider>
    </ScreenProvider>
  );
};

export default DisplaySetScreen;
