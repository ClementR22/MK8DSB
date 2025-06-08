import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import SetCardContainer from "@/components/setCard/SetCardContainer";
import SavedSetScreenPressablesContainer from "@/components/screenPressablesContainer/SavedSetScreenPressablesContainer";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { StatsVisibleListProvider } from "@/contexts/StatsVisibleListContext";
import useSetsStore from "@/stores/useSetsStore";
import useGeneralStore from "@/stores/useGeneralStore";

const SavedSetScreen = () => {
  const setsListSaved = useSetsStore((state) => state.setsListSaved);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  return (
    <ScreenProvider screenName="save">
      <StatsVisibleListProvider>
        <ScrollView scrollEnabled={isScrollEnable}>
          <SavedSetScreenPressablesContainer />
          <SetCardContainer setsToShow={setsListSaved} />
        </ScrollView>
      </StatsVisibleListProvider>
    </ScreenProvider>
  );
};

export default SavedSetScreen;
