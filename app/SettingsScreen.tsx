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
import Separator from "@/components/Separator";
import { vw } from "@/components/styles/theme";
import { View } from "react-native";
import { MARGIN_CONTAINER_LOWEST } from "@/utils/designTokens";

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
        <View style={{ padding: MARGIN_CONTAINER_LOWEST }}>
          <Text role="title" size="large" namespace="text" textAlign="center">
            general
          </Text>

          <LanguageSelector />

          <ThemeSelector />

          <GameSelector />
        </View>
        <Text role="title" size="large" namespace="text">
          displaying
        </Text>
        <View>
          <ResultsNumberSelector />
          <Separator direction="horizontal" length={vw - 60} lineWidth={1} alignSelf="flex-end" />

          <ResultStatsProvider>
            <StatSelector>
              <Text role="title" size="small" namespace="text">
                appliedForBuildFinderAndComparator
              </Text>
            </StatSelector>
          </ResultStatsProvider>

          <Text role="title" size="large" namespace="text">
            community
          </Text>

          <ButtonSendFeedback />
          <Separator direction="horizontal" length={vw - 60} lineWidth={1} alignSelf="flex-end" />

          <ButtonMakeADonation />

          <Text role="title" size="large" namespace="text">
            developer
          </Text>

          <ButtonSourceCode />

          <ButtonLicenses />

          <Text role="title" size="large" namespace="text">
            maintenance
          </Text>

          <ButtonUpdate isInModal={false} />

          <ButtonDeleteAllBuildsInMemory deleteAllSavedBuilds={handleDeleteAllSavedBuilds} />

          <ButtonResetSettings resetSettings={resetSettings} />
        </View>
      </ScrollViewScreen>
    </ScreenProvider>
  );
};

SettingsScreen.displayName = "SettingsScreen";

export default React.memo(SettingsScreen);
