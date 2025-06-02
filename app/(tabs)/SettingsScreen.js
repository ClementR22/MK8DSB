import React, { useState } from "react";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { StatsVisibleListProvider } from "@/contexts/StatsVisibleListContext";
import LanguageSelector from "@/components/settingsComponent/LanguageSelector";
import ThemeSelector from "@/components/settingsComponent/ThemeSelector";
import ButtonResetSettings from "@/components/ButtonResetSettings";
import SendFeedbackButton from "@/components/settingsComponent/SendFeedbackButton";
import LicensesButton from "@/components/settingsComponent/LicensesButton";
import BoxContainer from "@/components/BoxContainer";
import FlexScrollView from "@/components/FlexScrollView";
import StatsVisibleConfigSelector from "@/components/settingsComponent/StatsVisibleConfigSelector";
import Button from "@/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Text from "@/components/Text";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";
import ButtonAndModal from "@/components/modal/ButtonAndModal";
import { translate } from "@/translations/translations";
import StatsVisibleListDefaultSelector from "@/components/settingsComponent/StatsVisibleListDefaultSelector";
import useSetsStore from "@/stores/useSetsStore";
import { useResetSettings } from "@/hooks/useResetSettings";

const SettingsScreen = () => {
  const statsVisibleConfig = useStatsVisibleListConfigStore((state) => state.statsVisibleConfig);
  const isDefault = statsVisibleConfig === "yes";
  const deleteAllSavedSets = useSetsStore((state) => state.deleteAllSavedSets);
  const resetSettings = useResetSettings();

  return (
    <ScreenProvider screenName="settings">
      <StatsVisibleListProvider>
        <FlexScrollView>
          {/* peut etre remplacer FlexScrollView par une view dans le futur */}
          <BoxContainer alignItems={null}>
            {/* alignItems={null} permet au contenu de pourvoir prendre toute la largeur */}
            <LanguageSelector />
            <ThemeSelector />
            <StatsVisibleConfigSelector />
            {isDefault && (
              <ButtonAndModal triggerButtonText="DefaultDisplayedStats" modalTitle="DefaultDisplayedStats">
                <StatsVisibleListDefaultSelector />
              </ButtonAndModal>
            )}

            <SendFeedbackButton />
            <LicensesButton />
            <ButtonResetSettings resetSettings={resetSettings} />

            <ButtonAndModal
              triggerButtonText="DeleteAllSetsInMemory"
              onConfirm={deleteAllSavedSets}
              confirmButtonText="Confirm"
              closeButtonText="Cancel"
            >
              <Text>{translate("DeleteAllSetsInMemoryText")}</Text>
            </ButtonAndModal>

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
          </BoxContainer>
        </FlexScrollView>
      </StatsVisibleListProvider>
    </ScreenProvider>
  );
};

export default SettingsScreen;
