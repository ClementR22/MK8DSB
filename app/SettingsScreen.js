import React from "react";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { IsStatsVisibleListProvider } from "@/contexts/IsStatsVisibleListContext";
import LanguageSelector from "@/components/settingsComponent/LanguageSelector";
import ThemeSelector from "@/components/settingsComponent/ThemeSelector";
import AllwaysSyncSwitch from "@/components/settingsComponent/AllwaysSyncSwitch";
import IsStatsVisibleDefaultSwitch from "@/components/settingsComponent/IsStatsVisibleDefaultSwitch";
import { useSettings } from "@/contexts/SettingsContext";
import IsStatsVisibleListDefaultSelector from "@/components/settingsComponent/IsStatsVisibleListDefaultSelector";
import ButtonResetSettings from "@/components/ButtonResetSettings";
import ContactUsButton from "@/components/settingsComponent/ContactUsButton";
import LicensesButton from "@/components/settingsComponent/LicensesButton";
import BoxContainer from "@/components/BoxContainer";
import { ScrollView } from "react-native";

const SettingsScreen = () => {
  const { isStatsVisibleDefault } = useSettings();

  return (
    <ScreenProvider screenName="settings">
      <BoxContainer alignItems={"space-between"}>
        <IsStatsVisibleListProvider>
          <ScrollView>
            <LanguageSelector />
            <ThemeSelector />
            <AllwaysSyncSwitch />
            <IsStatsVisibleDefaultSwitch />
            {isStatsVisibleDefault && <IsStatsVisibleListDefaultSelector />}
            <ContactUsButton />
            <LicensesButton />
            <ButtonResetSettings />
          </ScrollView>
        </IsStatsVisibleListProvider>
      </BoxContainer>
    </ScreenProvider>
  );
};

export default SettingsScreen;
