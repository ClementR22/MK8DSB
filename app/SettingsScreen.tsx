import React, { useCallback } from "react";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import LanguageSelector from "@/components/settingsComponents/LanguageSelector";
import ThemeSelector from "@/components/settingsComponents/ThemeSelector";
import ButtonResetSettings from "@/components/settingsComponents/ButtonResetSettings";
import ButtonSendFeedback from "@/components/settingsComponents/ButtonSendFeedbackButton";
import ButtonLicenses from "@/components/settingsComponents/ButtonLicenses";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import Button from "@/primitiveComponents/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useResetSettings } from "@/hooks/useResetSettings";
import { deleteAllTheMemory } from "@/utils/asyncStorageOperations";
import ButtonDeleteAllSetsInMemory from "@/components/settingsComponents/ButtonDeleteAllSetsInMemory";
import StatSelector from "@/components/statSelector/StatSelector";
import { ScreenProvider } from "@/contexts/ScreenContext";
import ScrollViewScreen from "@/components/ScrollViewScreen";
import ResultsNumberSelector from "@/components/ResultsNumberSelector";
import { box_shadow_z1 } from "@/components/styles/shadow";
import Text from "@/primitiveComponents/Text";
import { useLanguageStore } from "@/stores/useLanguageStore";
import showToast from "@/utils/showToast";
import useSetsPersistenceStore from "@/stores/useSetsPersistenceStore";
import { useTranslation } from "react-i18next";

const SettingsScreen: React.FC = () => {
  const language = useLanguageStore((state) => state.language);
  const { t } = useTranslation("common");

  const resetSettings = useResetSettings();
  const deleteAllSavedSets = useSetsPersistenceStore((state) => state.deleteAllSavedSets);

  const handleDeleteAllSavedSets = () => {
    deleteAllSavedSets();
    showToast("Tous les sets sauvegardés ont été supprimés !");
  };

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
    <ScreenProvider screenName="settings">
      <ResultStatsProvider>
        <ScrollViewScreen scrollEnabled={true}>
          <BoxContainer alignItems={"stretch"} boxShadow={box_shadow_z1}>
            <Text role="body" size="medium" namespace="common">
              welcome
            </Text>

            <LanguageSelector />

            <ThemeSelector />

            <ResultsNumberSelector />

            <StatSelector triggerButtonText="ConfigureDefaultStats">
              <Text role="title" size="small" namespace="text">
                appliedOnMountForSetBuilderAndComparator
              </Text>
            </StatSelector>

            <ButtonSendFeedback />

            <ButtonLicenses />

            <ButtonResetSettings resetSettings={resetSettings} />

            <ButtonDeleteAllSetsInMemory deleteAllSavedSets={handleDeleteAllSavedSets} />

            <Button onPress={handleShowMemory}>show memory</Button>

            <Button onPress={handleRemoveMemory}>remvove memory</Button>
          </BoxContainer>
        </ScrollViewScreen>
      </ResultStatsProvider>
    </ScreenProvider>
  );
};

SettingsScreen.displayName = "SettingsScreen";

export default React.memo(SettingsScreen);
