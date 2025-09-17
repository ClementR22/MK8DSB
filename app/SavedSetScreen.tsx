import React, { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import SetCardsContainer from "@/components/setCard/SetCardsContainer";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import useSetsStore from "@/stores/useSetsStore";
import useGeneralStore from "@/stores/useGeneralStore";
import ButtonImportSet from "@/components/managingSetsButton/ButtonImportSet";
import ScreenPressablesContainer from "@/components/screenPressablesContainer/ScreenPressablesContainer";
import ScrollViewScreen from "@/components/ScrollViewScreen";
import StatSelector from "@/components/statSelector/StatSelector";

const SavedSetScreen: React.FC = () => {
  const setsListSaved = useSetsStore((state) => state.setsListSaved);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const sortNumberSavedSets = useSetsStore((state) => state.sortNumberSavedSets);
  const setSortNumberSavedSets = useSetsStore((state) => state.setSortNumberSavedSets);

  return (
    <ScreenProvider screenName="save">
      <ResultStatsProvider>
        <ScrollViewScreen scrollEnabled={isScrollEnable}>
          <ScreenPressablesContainer sortNumber={sortNumberSavedSets} setSortNumber={setSortNumberSavedSets}>
            <ButtonImportSet screenName="save" />
            <StatSelector />
          </ScreenPressablesContainer>

          <SetCardsContainer setsToShow={setsListSaved} />
        </ScrollViewScreen>
      </ResultStatsProvider>
    </ScreenProvider>
  );
};

SavedSetScreen.displayName = "SavedSetScreen";

export default React.memo(SavedSetScreen);
