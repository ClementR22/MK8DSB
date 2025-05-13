import React from "react";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { IsStatsVisibleListProvider } from "@/contexts/IsStatsVisibleListContext";
import LanguageSelector from "@/components/settingsComponent/LanguageSelector";
import ThemeSelector from "@/components/settingsComponent/ThemeSelector";
import AllwaysSyncSwitch from "@/components/settingsComponent/AllwaysSyncSwitch";
import IsStatsVisibleDefaultSwitch from "@/components/settingsComponent/IsStatsVisibleDefaultSwitch";
import { useSettings } from "@/contexts/SettingsContext";
import IsStatsVisibleListDefaultSelector from "@/components/settingsComponent/IsStatsVisibleListDefaultSelector";
import ButtonRemoveMemory from "@/components/ButtonRemoveMemory";
import FlexContainer from "@/components/FlexContainer";

const SettingsScreen = () => {
  const { isStatsVisibleDefault } = useSettings();

  return (
    <ScreenProvider screenName="settings">
      <FlexContainer alignItems={"space-between"}>
        <IsStatsVisibleListProvider>
          <LanguageSelector />
          <ThemeSelector />
          <AllwaysSyncSwitch />
          <IsStatsVisibleDefaultSwitch />
          {isStatsVisibleDefault && <IsStatsVisibleListDefaultSelector />}
        </IsStatsVisibleListProvider>
        <ButtonRemoveMemory />
      </FlexContainer>
    </ScreenProvider>
  );
};

export default SettingsScreen;