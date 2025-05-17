import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import SetCardContainer from "../components/setCard/SetCardContainer";
import SavedSetScreenPressablesContainer from "@/components/screenPressablesContainer/SavedSetScreenPressablesContainer";
import { ScreenProvider } from "../contexts/ScreenContext";
import { StatsVisibleListProvider } from "@/contexts/StatsVisibleListContext";
import useSetsStore from "@/stores/useSetsStore";

const SavedSetScreen = () => {
  const setsListSaved = useSetsStore((state) => state.setsListSaved);

  return (
    <ScreenProvider screenName="save">
      <StatsVisibleListProvider>
        <ScrollView>
          <SavedSetScreenPressablesContainer />
          <SetCardContainer setsToShow={setsListSaved} />
        </ScrollView>
      </StatsVisibleListProvider>
    </ScreenProvider>
  );
};

export default SavedSetScreen;
