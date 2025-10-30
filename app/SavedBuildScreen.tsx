import React, { useRef } from "react";
import BuildCardsContainer from "@/components/buildCard/BuildCardsContainer";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import useGeneralStore from "@/stores/useGeneralStore";
import ButtonImportBuild from "@/components/managingBuildsButton/ButtonImportBuild";
import ScreenPressablesContainer from "@/components/screenPressablesContainer/ScreenPressablesContainer";
import ScrollViewScreen from "@/components/ScrollViewScreen";
import StatSelector from "@/components/statSelector/StatSelector";
import { BuildCardsScrollProvider } from "@/contexts/BuildCardsScrollContext";
import useBuildsListStore from "@/stores/useBuildsListStore";
import useBuildsPersistenceStore from "@/stores/useBuildsPersistenceStore";

const SavedBuildScreen: React.FC = () => {
  const buildsListSaved = useBuildsListStore((state) => state.buildsListSaved);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const sortNumberSavedBuilds = useBuildsPersistenceStore((state) => state.sortNumberSavedBuilds);
  const setSortNumberSavedBuilds = useBuildsPersistenceStore((state) => state.setSortNumberSavedBuilds);

  const scrollRef = useRef(null); // Ref pour BuildCardsContainer

  return (
    <ScreenProvider screenName="save">
      <ResultStatsProvider>
        <ScrollViewScreen scrollEnabled={isScrollEnable}>
          <ScreenPressablesContainer sortNumber={sortNumberSavedBuilds} setSortNumber={setSortNumberSavedBuilds}>
            <ButtonImportBuild screenName="save" />
            <StatSelector />
          </ScreenPressablesContainer>

          <BuildCardsScrollProvider scrollRef={scrollRef}>
            <BuildCardsContainer ref={scrollRef} builds={buildsListSaved} />
          </BuildCardsScrollProvider>
        </ScrollViewScreen>
      </ResultStatsProvider>
    </ScreenProvider>
  );
};

SavedBuildScreen.displayName = "SavedBuildScreen";

export default React.memo(SavedBuildScreen);
