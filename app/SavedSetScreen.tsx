import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import SetCardContainer from "@/components/setCard/SetCardContainer";
import SavedSetScreenPressablesContainer from "@/components/screenPressablesContainer/SavedSetScreenPressablesContainer";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import useSetsStore from "@/stores/useSetsStore";
import useGeneralStore from "@/stores/useGeneralStore";

const SavedSetScreen: React.FC = () => {
  const setsListSaved = useSetsStore((state) => state.setsListSaved);
  const sortSetsList = useSetsStore((state) => state.sortSetsList);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const [sortNumber, setSortNumber] = useState(0);

  useEffect(() => sortSetsList("save", sortNumber), [sortNumber]);

  return (
    <ScreenProvider screenName="save">
      <ResultStatsProvider>
        <ScrollView scrollEnabled={isScrollEnable}>
          <SavedSetScreenPressablesContainer sortNumber={sortNumber} setSortNumber={setSortNumber} />
          <SetCardContainer setsToShow={setsListSaved} />
        </ScrollView>
      </ResultStatsProvider>
    </ScreenProvider>
  );
};

SavedSetScreen.displayName = "SavedSetScreen";

export default React.memo(SavedSetScreen);
