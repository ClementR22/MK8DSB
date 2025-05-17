import React from "react";
import { ScrollView } from "react-native";
import SetCardContainer from "../components/setCard/SetCardContainer";
import SavedSetScreenPressablesContainer from "@/components/screenPressablesContainer/SavedSetScreenPressablesContainer";
import { ScreenProvider } from "../contexts/ScreenContext";
import { StatsVisibleListProvider } from "@/contexts/StatsVisibleListContext";
import { PressableImagesProvider } from "@/contexts/PressableImagesContext";
import useSetsStore from "@/stores/useSetsStore";
import EditSetModal from "@/components/modal/EditSetModal";

const SavedSetScreen = () => {
  const setsListSaved = useSetsStore((state) => state.setsListSaved);

  return (
    <ScreenProvider screenName="save">
      <StatsVisibleListProvider>
        <PressableImagesProvider>
          <ScrollView>
            <SavedSetScreenPressablesContainer />
            <SetCardContainer setsToShow={setsListSaved} />
          </ScrollView>
          <EditSetModal />
        </PressableImagesProvider>
      </StatsVisibleListProvider>
    </ScreenProvider>
  );
};

export default SavedSetScreen;
