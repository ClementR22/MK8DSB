import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import LanguageSelector from "@/components/settingsComponents/LanguageSelector";
import ThemeSelector from "@/components/settingsComponents/ThemeSelector";
import ButtonResetSettings from "@/components/settingsComponents/ButtonResetSettings";
import ButtonSendFeedback from "@/components/settingsComponents/ButtonSendFeedback";
import ButtonLicenses from "@/components/settingsComponents/ButtonLicenses";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useResetSettings } from "@/hooks/useResetSettings";
import { deleteAllTheMemory } from "@/utils/asyncStorageOperations";
import ButtonDeleteAllBuildsInMemory from "@/components/settingsComponents/ButtonDeleteAllBuildsInMemory";
import StatSelector from "@/components/statSelector/StatSelector";
import { ScreenProvider } from "@/contexts/ScreenContext";
import ScrollViewScreen from "@/components/ScrollViewScreen";
import ResultsNumberSelector from "@/components/settingsComponents/ResultsNumberSelector";
import Text from "@/primitiveComponents/Text";
import showToast from "@/utils/showToast";
import useBuildsListStore from "@/stores/useBuildsListStore";
import GameSelector from "@/components/settingsComponents/GameSelector";
import useGameStore from "@/stores/useGameStore";
import ButtonMakeADonation from "@/components/settingsComponents/ButtonMakeADonation";
import ButtonSourceCode from "@/components/settingsComponents/ButtonSourceCode";
import ButtonUpdate from "@/components/settingsComponents/ButtonUpdate";
import { StyleSheet, View } from "react-native";
import packageJSON from "@/package.json";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import useGeneralStore from "@/stores/useGeneralStore";
import { fetchLatestVersion } from "@/hooks/useCheckUpdate";

const SettingsScreen: React.FC = () => {
  const game = useGameStore((state) => state.game);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

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

  const current = packageJSON.version;

  const [latest, setLatest] = useState("v");

  useEffect(() => {
    (async () => {
      const latest = await fetchLatestVersion();
      setLatest(latest);
    })();
  }, []);

  const test = current !== latest.replace(/^v/, "");
  console.log({ current, latest, test });

  return (
    <ScreenProvider screenName="settings">
      <ScrollViewScreen scrollEnabled={isScrollEnable}>
        <BoxContainer>
          <LanguageSelector />

          <ThemeSelector />

          <GameSelector />

          <View style={styles.buttonsContainer}>
            <ResultsNumberSelector />

            <ResultStatsProvider>
              <StatSelector>
                <Text role="title" size="small" namespace="text">
                  appliedForBuildFinderAndComparator
                </Text>
              </StatSelector>
            </ResultStatsProvider>

            <ButtonSendFeedback />

            <ButtonMakeADonation />

            <ButtonSourceCode />

            <ButtonLicenses />

            <ButtonUpdate isInModal={false} />

            <ButtonDeleteAllBuildsInMemory deleteAllSavedBuilds={handleDeleteAllSavedBuilds} />

            <ButtonResetSettings resetSettings={resetSettings} />
          </View>

          <Text role="body" size="medium" namespace={"not"}>
            package {current}
          </Text>

          <Text role="body" size="medium" namespace={"not"}>
            github {latest}
          </Text>

          <Text role="body" size="medium" namespace={"not"}>
            test {test ? "diff" : "egal"}
          </Text>
        </BoxContainer>
      </ScrollViewScreen>
    </ScreenProvider>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    borderRadius: 12,
    width: "100%",
    gap: 1,
    overflow: "hidden",
  },
});

SettingsScreen.displayName = "SettingsScreen";

export default React.memo(SettingsScreen);
