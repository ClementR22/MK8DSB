import React from "react";
import { Pressable, ScrollView, Text } from "react-native";
import SetCardContainer from "../../components/setCard/SetCardContainer";
import { useSetsList } from "@/contexts/SetsListContext";
import SavedSetScreenPressablesContainer from "@/components/screenPressablesContainer/SavedSetScreenPressablesContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenProvider } from "../../contexts/ScreenContext";
import { IsStatsVisibleListProvider } from "@/contexts/IsStatsVisibleListContext";
import { PressableImagesProvider } from "@/contexts/PressableImagesContext";

const SavedSetScreen = () => {
  const { setsListSaved } = useSetsList();

  return (
    <ScreenProvider screenName="save">
      <IsStatsVisibleListProvider>
        <PressableImagesProvider>
          <ScrollView>
            <SavedSetScreenPressablesContainer />
            <SetCardContainer setsToShow={setsListSaved} />
          </ScrollView>

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
        </PressableImagesProvider>
      </IsStatsVisibleListProvider>
    </ScreenProvider>
  );
};

export default SavedSetScreen;
