import React, { useCallback } from "react";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import LanguageSelector from "@/components/settingsComponents/LanguageSelector";
import ThemeSelector from "@/components/settingsComponents/ThemeSelector";
import ButtonResetSettings from "@/components/settingsComponents/ButtonResetSettings";
import ButtonSendFeedback from "@/components/settingsComponents/ButtonSendFeedback";
import ButtonLicenses from "@/components/settingsComponents/ButtonLicenses";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useResetSettings } from "@/hooks/useResetSettings";
import { deleteAllTheMemory } from "@/utils/asyncStorageOperations";
import ButtonDeleteAllBuildsInMemory from "@/components/settingsComponents/ButtonDeleteAllBuildsInMemory";
import StatSelector from "@/components/statSelector/StatSelector";
import { ScreenProvider } from "@/contexts/ScreenContext";
import ScrollViewScreen from "@/components/ScrollViewScreen";
import ResultsNumberSelector from "@/components/settingsComponents/ResultsNumberSelector";
import { box_shadow_z1 } from "@/components/styles/shadow";
import Text from "@/primitiveComponents/Text";
import showToast from "@/utils/showToast";
import useBuildsListStore from "@/stores/useBuildsListStore";
import GameSelector from "@/components/settingsComponents/GameSelector";
import useGameStore from "@/stores/useGameStore";
import ButtonMakeADonation from "@/components/settingsComponents/ButtonMakeADonation";
import ButtonSourceCode from "@/components/settingsComponents/ButtonSourceCode";
import ButtonUpdate from "@/components/settingsComponents/ButtonUpdate";

const SettingsScreen: React.FC = () => {
  const game = useGameStore((state) => state.game);
  const resetSettings = useResetSettings();
  const deleteAllSavedBuilds = useBuildsListStore((state) => state.deleteAllSavedBuilds);

  const handleDeleteAllSavedBuilds = () => {
    deleteAllSavedBuilds(game);
    showToast("toast:allSavedBuildsHaveBeenDeleted", "success");
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
      <ScrollViewScreen scrollEnabled={true}>
        <BoxContainer alignItems={"stretch"} boxShadow={box_shadow_z1}>
          <Text role="title" size="large" namespace="text" textAlign="center">
            general
          </Text>

          <LanguageSelector />

          <ThemeSelector />

          <GameSelector />
        </BoxContainer>

        <BoxContainer>
          <Text role="title" size="large" namespace="text">
            displaying
          </Text>

          <ResultsNumberSelector />

          <ResultStatsProvider>
            <StatSelector>
              <Text role="title" size="small" namespace="text">
                appliedForBuildFinderAndComparator
              </Text>
            </StatSelector>
          </ResultStatsProvider>
        </BoxContainer>

        <BoxContainer>
          <Text role="title" size="large" namespace="text">
            community
          </Text>

          <ButtonSendFeedback />

          <ButtonMakeADonation />
        </BoxContainer>

        <BoxContainer>
          <Text role="title" size="large" namespace="text">
            developer
          </Text>

          <ButtonSourceCode />

          <ButtonLicenses />
        </BoxContainer>

        <BoxContainer>
          <Text role="title" size="large" namespace="text">
            maintenance
          </Text>

          <ButtonUpdate isInModal={false} />

          <ButtonDeleteAllBuildsInMemory deleteAllSavedBuilds={handleDeleteAllSavedBuilds} />

          <ButtonResetSettings resetSettings={resetSettings} />
        </BoxContainer>
      </ScrollViewScreen>
    </ScreenProvider>
  );
};

SettingsScreen.displayName = "SettingsScreen";

export default React.memo(SettingsScreen);
