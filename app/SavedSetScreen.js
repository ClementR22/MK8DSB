import React from "react";
import { ScrollView } from "react-native";
import SetCardContainer from "../components/setCard/SetCardContainer";
import { useSetsList } from "@/contexts/SetsListContext";
import SavedSetScreenPressablesContainer from "@/components/screenPressablesContainer/SavedSetScreenPressablesContainer";
import { ScreenProvider } from "../contexts/ScreenContext";
import { StatsVisibleListProvider } from "@/contexts/StatsVisibleListContext";
import { PressableImagesProvider } from "@/contexts/PressableImagesContext";

const SavedSetScreen = () => {
  const { setsListSaved } = useSetsList();

  return (
    <ScreenProvider screenName="save">
      <StatsVisibleListProvider>
        <PressableImagesProvider>
          <ScrollView>
            <SavedSetScreenPressablesContainer />
            <SetCardContainer setsToShow={setsListSaved} />
          </ScrollView>
        </PressableImagesProvider>
      </StatsVisibleListProvider>
    </ScreenProvider>
  );
};

export default SavedSetScreen;
