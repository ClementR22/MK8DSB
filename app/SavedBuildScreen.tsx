import React, { useRef } from "react";
import BuildCardsContainer from "@/components/setCard/BuildCardsContainer";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import useGeneralStore from "@/stores/useGeneralStore";
import ButtonImportSet from "@/components/managingSetsButton/ButtonImportSet";
import ScreenPressablesContainer from "@/components/screenPressablesContainer/ScreenPressablesContainer";
import ScrollViewScreen from "@/components/ScrollViewScreen";
import StatSelector from "@/components/statSelector/StatSelector";
import { BuildCardsScrollProvider } from "@/contexts/BuildCardsScrollContext";
import useBuildsListStore from "@/stores/useBuildsListStore";
import useBuildsPersistenceStore from "@/stores/useBuildsPersistenceStore";

const SavedBuildScreen: React.FC = () => {
  const setsListSaved = useBuildsListStore((state) => state.setsListSaved);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const sortNumberSavedSets = useBuildsPersistenceStore((state) => state.sortNumberSavedSets);
  const setSortNumberSavedSets = useBuildsPersistenceStore((state) => state.setSortNumberSavedSets);

  const scrollRef = useRef(null); // Ref pour BuildCardsContainer

  return (
    <ScreenProvider screenName="save">
      <ResultStatsProvider>
        <ScrollViewScreen scrollEnabled={isScrollEnable}>
          <ScreenPressablesContainer sortNumber={sortNumberSavedSets} setSortNumber={setSortNumberSavedSets}>
            <ButtonImportSet screenName="save" />
            <StatSelector />
          </ScreenPressablesContainer>

          <BuildCardsScrollProvider scrollRef={scrollRef}>
            <BuildCardsContainer ref={scrollRef} setsToShow={setsListSaved} />
          </BuildCardsScrollProvider>
        </ScrollViewScreen>
      </ResultStatsProvider>
    </ScreenProvider>
  );
};

SavedBuildScreen.displayName = "SavedBuildScreen";

export default React.memo(SavedBuildScreen);
