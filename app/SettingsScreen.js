import React, { useEffect, useState } from "react";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { StatsVisibleListProvider } from "@/contexts/StatsVisibleListContext";
import LanguageSelector from "@/components/settingsComponent/LanguageSelector";
import ThemeSelector from "@/components/settingsComponent/ThemeSelector";
import ButtonResetSettings from "@/components/ButtonResetSettings";
import ContactUsButton from "@/components/settingsComponent/ContactUsButton";
import LicensesButton from "@/components/settingsComponent/LicensesButton";
import BoxContainer from "@/components/BoxContainer";
import FlexScrollView from "@/components/FlexScrollView";
import StatsVisibleConfigSelector from "@/components/settingsComponent/StatsVisibleConfigSelector";
import { statsVisibleListDefaultInit, useStatsVisibleListConfig } from "../contexts/StatsVisibleListConfigContext";
import StatsVisibleListDefaultSelector from "@/components/settingsComponent/StatsVisibleListDefaultSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { loadThingFromMemory } from "@/utils/asyncStorageOperations";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { translateToLanguage } from "@/translations/translations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native";
import { Pressable } from "react-native";
import { deleteAllTheMemory } from "@/utils/asyncStorageOperations";

const SettingsScreen = () => {
  const { isDefault, setStatsVisibleConfig, setStatsVisibleListDefault } = useStatsVisibleListConfig();
  const { language, setLanguage } = useLanguage();
  const { setTheme } = useTheme();

  useEffect(() => {
    loadSettings();
  }, []);

  const [isStatsVisibleDefaultModalVisible, setIsStatsVisibleDefaultModalVisible] = useState(false);

  const settingsByDefaultKeysAndValues = {
    language: { setState: setLanguage, value: "en" },
    statsVisibleConfig: { setState: setStatsVisibleConfig, value: "no" },
    statsVisibleListDefault: {
      setState: setStatsVisibleListDefault,
      value: statsVisibleListDefaultInit,
    },
    theme: { setState: setTheme, value: "light" },
  };

  const loadSettings = () => {
    Object.entries(settingsByDefaultKeysAndValues).map(([settingKey, { setState }]) => {
      loadThingFromMemory(settingKey, setState);
    });
  };

  const resetSettings = async () => {
    Object.values(settingsByDefaultKeysAndValues).forEach(({ setState, value }) => {
      setState(value);
    });
  };

  return (
    <ScreenProvider screenName="settings">
      <BoxContainer alignItems={"space-between"}>
        <StatsVisibleListProvider>
          <FlexScrollView alignItems={"space-between"}>
            <LanguageSelector />
            <ThemeSelector />
            <StatsVisibleConfigSelector />
            {isDefault && (
              <Button onPress={() => setIsStatsVisibleDefaultModalVisible(true)}>
                {translateToLanguage("ConfigureTheStats", language)}
              </Button>
            )}
            <Modal
              modalTitle="DefaultVisibleStats"
              isModalVisible={isStatsVisibleDefaultModalVisible}
              setIsModalVisible={setIsStatsVisibleDefaultModalVisible}
            >
              <StatsVisibleListDefaultSelector />
            </Modal>
            <ContactUsButton />
            <LicensesButton />
            <ButtonResetSettings resetSettings={resetSettings} />
          </FlexScrollView>
        </StatsVisibleListProvider>
        <Text>DEBUG</Text>
        <Pressable
          onPress={async () => {
            console.log("show async");
            const keys = await AsyncStorage.getAllKeys();
            console.log("keys", keys);
            console.log("items", await AsyncStorage.multiGet(keys));
          }}
        >
          <Text>show memory</Text>
        </Pressable>

        {/* DEBUG */}
        <Pressable onPress={() => deleteAllTheMemory()}>
          <Text>removeMemory</Text>
        </Pressable>
      </BoxContainer>
    </ScreenProvider>
  );
};

export default SettingsScreen;
