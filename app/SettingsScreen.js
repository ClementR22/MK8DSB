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
import StatsVisibleListDefaultSelector from "@/components/settingsComponent/StatsVisibleListDefaultSelector";
import Button from "@/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Text from "@/components/Text";
import { deleteAllTheMemory } from "@/utils/asyncStorageOperations";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSettingsStore } from "@/stores/useSettingsStore";
import Modal from "@/components/Modal";
import { translate, translateToLanguage } from "@/translations/translations";
import { useLanguageStore } from "@/stores/useLanguageStore";

const SettingsScreen = () => {
  const language = useLanguageStore((state) => state.language);
  const statsVisibleConfig = useStatsVisibleListConfigStore((state) => state.statsVisibleConfig);
  const isDefault = statsVisibleConfig === "yes";
  const resetSettings = useSettingsStore((state) => state.resetSettings);

  const [isStatsSelectorModalVisible, setIsStatsSelectorModalVisible] = useState(false);

  return (
    <ScreenProvider screenName="settings">
      <BoxContainer alignItems={"space-between"}>
        <StatsVisibleListProvider>
          <FlexScrollView alignItems={"space-between"}>
            <LanguageSelector />
            <ThemeSelector />
            <StatsVisibleConfigSelector />
            {isDefault && (
              <Button onPress={() => setIsStatsSelectorModalVisible(true)}>
                {translateToLanguage("DefaultVisibleStats", language)}
              </Button>
            )}
            <Modal
              modalTitle="DefaultVisibleStats"
              isModalVisible={isStatsSelectorModalVisible}
              setIsModalVisible={setIsStatsSelectorModalVisible}
            >
              <StatsVisibleListDefaultSelector />
            </Modal>
            <ContactUsButton />
            <LicensesButton />
            <ButtonResetSettings resetSettings={resetSettings} />
          </FlexScrollView>
        </StatsVisibleListProvider>
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

        {/* DEBUG */}
        <Button onPress={deleteAllTheMemory}>removeMemory</Button>
      </BoxContainer>
    </ScreenProvider>
  );
};

export default SettingsScreen;
