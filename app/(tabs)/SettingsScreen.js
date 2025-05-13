import React from "react";
import { StyleSheet } from "react-native";
import { ScreenProvider } from "../../contexts/ScreenContext";
import { IsStatsVisibleListProvider } from "@/contexts/IsStatsVisibleListContext";
import LanguageSelector from "@/components/settingsComponent/LanguageSelector";
import ThemeSelector from "@/components/settingsComponent/ThemeSelector";
import AllwaysSyncSwitch from "@/components/settingsComponent/AllwaysSyncSwitch";
import IsStatsVisibleDefaultSwitch from "@/components/settingsComponent/IsStatsVisibleDefaultSwitch";
import { useSettings } from "@/contexts/SettingsContext";
import IsStatsVisibleListDefaultSelector from "@/components/settingsComponent/IsStatsVisibleListDefaultSelector";
import ButtonRemoveMemory from "@/components/ButtonRemoveMemory";

const GalleryScreen = () => {
  const { isStatsVisibleDefault } = useSettings();

  return (
    <ScreenProvider screenName="settings">
      <IsStatsVisibleListProvider>
        <LanguageSelector />
        <ThemeSelector />
        <AllwaysSyncSwitch />
        <IsStatsVisibleDefaultSwitch />
        {isStatsVisibleDefault && <IsStatsVisibleListDefaultSelector />}
      </IsStatsVisibleListProvider>
      <ButtonRemoveMemory />
    </ScreenProvider>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    backgroundColor: "red",
    padding: 8,
    color: "white",
  },
  categoryContainer: {
    backgroundColor: "green",
  },
  classContainer: {
    flexDirection: "row",
    backgroundColor: "red",
    justifyContent: "center",
  },
  elementContainer: {
    backgroundColor: "blue",
    alignItems: "center",
  },
});
