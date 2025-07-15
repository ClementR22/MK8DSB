import React, { useState } from "react";
import { ScrollView } from "react-native";
import SetCardsContainer from "@/components/setCard/SetCardsContainer";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import useSetsStore from "@/stores/useSetsStore";
import useGeneralStore from "@/stores/useGeneralStore";
import ButtonImportSet from "@/components/managingSetsButton/ButtonImportSet";
import ButtonAndModalStatSelectorResultStats from "@/components/statSelector/ButtonAndModalStatSelectorResultStats";
import ScreenPressablesContainer from "@/components/screenPressablesContainer/ScreenPressablesContainer";

const SavedSetScreen: React.FC = () => {
  const setsListSaved = useSetsStore((state) => state.setsListSaved);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const [sortNumber, setSortNumber] = useState(0);

  return (
    <ScreenProvider screenName="save">
      <ResultStatsProvider>
        <ScrollView scrollEnabled={isScrollEnable}>
          <ScreenPressablesContainer sortNumber={sortNumber} setSortNumber={setSortNumber}>
            <ButtonImportSet screenName="save" />
            <ButtonAndModalStatSelectorResultStats />
          </ScreenPressablesContainer>

          <SetCardsContainer setsToShow={setsListSaved} />
        </ScrollView>
      </ResultStatsProvider>
    </ScreenProvider>
  );
};

SavedSetScreen.displayName = "SavedSetScreen";

export default React.memo(SavedSetScreen);
