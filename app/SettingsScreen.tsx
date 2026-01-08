import React, { useCallback } from "react";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import LanguageSelector from "@/components/settingsComponents/LanguageSelector";
import ThemeSelector from "@/components/settingsComponents/ThemeSelector";
import ButtonResetSettings from "@/components/settingsComponents/ButtonResetSettings";
import ButtonSendFeedback from "@/components/settingsComponents/ButtonSendFeedback";
import ButtonLicenses from "@/components/settingsComponents/ButtonLicenses";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteAllTheMemory } from "@/utils/asyncStorageOperations";
import ButtonDeleteAllBuildsInMemory from "@/components/settingsComponents/ButtonDeleteAllBuildsInMemory";
import StatSelector from "@/components/statSelector/StatSelector";
import { ScreenProvider } from "@/contexts/ScreenContext";
import ScrollViewScreen from "@/components/ScrollViewScreen";
import ResultsNumberSelector from "@/components/settingsComponents/ResultsNumberSelector";
import Text from "@/primitiveComponents/Text";
import GameSelector from "@/components/settingsComponents/GameSelector";
import ButtonMakeADonation from "@/components/settingsComponents/ButtonMakeADonation";
import ButtonSourceCode from "@/components/settingsComponents/ButtonSourceCode";
import ButtonUpdate from "@/components/settingsComponents/ButtonUpdate";
import { StyleSheet, View } from "react-native";
import packageJSON from "@/package.json";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import useGeneralStore from "@/stores/useGeneralStore";

const SettingsScreen: React.FC = () => {
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

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

            <ButtonUpdate />

            <ButtonDeleteAllBuildsInMemory />

            <ButtonResetSettings />
          </View>

          <Text role="body" size="medium" namespace={"not"}>
            Version {packageJSON.version}
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
