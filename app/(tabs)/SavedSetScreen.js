import React from "react";
import { ScrollView } from "react-native";
import SetCardContainer from "../../components/setCard/SetCardContainer";
import { useSetsList } from "../../utils/SetsListContext";
import { SavedSetScreenProvider } from "../../utils/SavedSetScreenContext";
import { PressableImagesProvider } from "../../utils/PressableImagesContext";
import SavedSetScreenPressablesContainer from "../../components/SavedSetScreenPressablesContainer";

const SavedSetScreen = () => {
  const { setsListSaved } = useSetsList();

  return (
    <SavedSetScreenProvider>
      <PressableImagesProvider situation="save">
        <ScrollView>
          <SavedSetScreenPressablesContainer />
          <SetCardContainer setsToShow={setsListSaved} situation="save" />
        </ScrollView>
      </PressableImagesProvider>
    </SavedSetScreenProvider>
  );
};

export default SavedSetScreen;
