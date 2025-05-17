import React from "react";
import { ScrollView } from "react-native";
import StatSliderResultContainer from "@/components/statSliderResult/StatSliderResultContainer";
import SetCardContainer from "@/components/setCard/SetCardContainer";
import { PressableImagesProvider } from "@/contexts/PressableImagesContext";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { StatsVisibleListProvider } from "@/contexts/StatsVisibleListContext";
import DisplaySetScreenPressablesContainer from "@/components/screenPressablesContainer/DisplaySetScreenPressablesContainer";
import { LoadSetModalProvider } from "../contexts/LoadSetModalContext";
import EditSetModal from "@/components/modal/EditSetModal";
import useSetsStore from "@/stores/useSetsStore";

const DisplaySetScreen = () => {
  const setsListDisplayed = useSetsStore((state) => state.setsListDisplayed);

  const setsToShowMultipleStatsLists = setsListDisplayed.map((setToShow) => {
    const setToShowStatsList = setToShow.stats;
    return setToShowStatsList;
  });

  return (
    <ScreenProvider screenName="display">
      <LoadSetModalProvider>
        <StatsVisibleListProvider>
          <PressableImagesProvider>
            <ScrollView>
              <DisplaySetScreenPressablesContainer />

              <SetCardContainer setsToShow={setsListDisplayed} />

              <StatSliderResultContainer setsToShowMultipleStatsLists={setsToShowMultipleStatsLists} />
            </ScrollView>
            <EditSetModal />
          </PressableImagesProvider>
        </StatsVisibleListProvider>
      </LoadSetModalProvider>
    </ScreenProvider>
  );
};

export default DisplaySetScreen;
