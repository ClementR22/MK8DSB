import React from "react";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import LanguageSelector from "@/components/settingsComponent/LanguageSelector";
import ThemeSelector from "@/components/settingsComponent/ThemeSelector";
import ButtonResetSettings from "@/components/settingsComponent/ButtonResetSettings";
import ButtonSendFeedback from "@/components/settingsComponent/ButtonSendFeedbackButton";
import ButtonLicenses from "@/components/settingsComponent/ButtonLicenses";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import FlexScrollView from "@/primitiveComponents/FlexScrollView";
import Button from "@/primitiveComponents/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Text from "@/primitiveComponents/Text";
import useSetsStore from "@/stores/useSetsStore";
import { useResetSettings } from "@/hooks/useResetSettings";
import { deleteAllTheMemory } from "@/utils/asyncStorageOperations";
import ButtonDeleteAllSetsInMemory from "@/components/settingsComponent/ButtonDeleteAllSetsInMemory";
import ButtonAndModalStatSelectorResultStatsDefault from "@/components/settingsComponent/ButtonAndModalStatSelectorResultStatsDefault";

const SettingsScreen = () => {
  const resetSettings = useResetSettings();
  const deleteAllSavedSets = useSetsStore((state) => state.deleteAllSavedSets);

  return (
    <ScreenProvider screenName="settings">
      <ResultStatsProvider>
        <FlexScrollView>
          {/* peut etre remplacer FlexScrollView par une view dans le futur */}
          <BoxContainer alignItems={"stretch"}>
            {/*<BoxContainer alignItems={null}>*/}
            {/* alignItems={null} permet au contenu de pourvoir prendre toute la largeur */}
            <LanguageSelector />

            <ThemeSelector />

            <ButtonAndModalStatSelectorResultStatsDefault />

            <ButtonSendFeedback />

            <ButtonLicenses />

            <ButtonResetSettings resetSettings={resetSettings} />

            <ButtonDeleteAllSetsInMemory deleteAllSavedSets={deleteAllSavedSets} />

            <Text>DEBUG</Text>
            <Button
              onPress={async () => {
                console.log("show async");
                const keys = await AsyncStorage.getAllKeys();
                console.log("keys", keys);
                console.log("items", await AsyncStorage.multiGet(keys));
              }}
            >
              show memory
            </Button>

            <Button
              onPress={async () => {
                console.log("remove all the memory");
                deleteAllTheMemory();
              }}
            >
              remvove memory
            </Button>
          </BoxContainer>
        </FlexScrollView>
      </ResultStatsProvider>
    </ScreenProvider>
  );
};

export default SettingsScreen;
