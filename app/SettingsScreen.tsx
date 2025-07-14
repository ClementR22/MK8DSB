import React, { useCallback } from "react";
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
import useSetsStore from "@/stores/useSetsStore";
import { useResetSettings } from "@/hooks/useResetSettings";
import { deleteAllTheMemory } from "@/utils/asyncStorageOperations";
import ButtonDeleteAllSetsInMemory from "@/components/settingsComponent/ButtonDeleteAllSetsInMemory";
import ButtonAndModalStatSelectorResultStatsDefault from "@/components/settingsComponent/ButtonAndModalStatSelectorResultStatsDefault";
import { Text } from "react-native";

const SettingsScreen: React.FC = () => {
  const resetSettings = useResetSettings();
  const deleteAllSavedSets = useSetsStore((state) => state.deleteAllSavedSets);

  // Mémoïsation des handlers DEBUG
  const handleShowMemory = useCallback(async () => {
    const keys = await AsyncStorage.getAllKeys();
    // eslint-disable-next-line no-console
    console.log("keys", keys);
    // eslint-disable-next-line no-console
    console.log("items", await AsyncStorage.multiGet(keys));
  }, []);

  const handleRemoveMemory = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log("remove all the memory");
    deleteAllTheMemory();
  }, []);

  return (
    <ResultStatsProvider>
      <FlexScrollView>
        <BoxContainer alignItems={"stretch"}>
          <LanguageSelector />

          <ThemeSelector />

          <ButtonAndModalStatSelectorResultStatsDefault />

          <ButtonSendFeedback />

          <ButtonLicenses />

          <ButtonResetSettings resetSettings={resetSettings} />

          <ButtonDeleteAllSetsInMemory deleteAllSavedSets={deleteAllSavedSets} />

          <Text>DEBUG</Text>
          <Button onPress={handleShowMemory}>show memory</Button>

          <Button onPress={handleRemoveMemory}>remvove memory</Button>
        </BoxContainer>
      </FlexScrollView>
    </ResultStatsProvider>
  );
};

SettingsScreen.displayName = "SettingsScreen";

export default React.memo(SettingsScreen);
