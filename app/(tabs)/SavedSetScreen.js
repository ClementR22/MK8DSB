import React from "react";
import { Pressable, ScrollView, Text } from "react-native";
import SetCardContainer from "../../components/setCard/SetCardContainer";
import { useSetsList } from "../../utils/SetsListContext";
import { SavedSetScreenProvider } from "../../utils/SavedSetScreenContext";
import { PressableImagesProvider } from "../../utils/PressableImagesContext";
import SavedSetScreenPressablesContainer from "../../components/SavedSetScreenPressablesContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

      {/* DEBUG */}
      <Text>DEBUG</Text>
      <Pressable onPress={() => console.log("setsListSaved", setsListSaved)}>
        <Text>show saveds sets</Text>
      </Pressable>
      <Pressable
        onPress={async () => {
          console.log("show async");
          const keys = await AsyncStorage.getAllKeys();
          console.log("keys", keys);
          console.log("item", await AsyncStorage.multiGet(keys));
        }}
      >
        <Text>show saveds sets</Text>
      </Pressable>
    </SavedSetScreenProvider>
  );
};

export default SavedSetScreen;
