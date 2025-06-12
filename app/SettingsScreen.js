import React from "react";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { StatsVisibleListProvider } from "@/contexts/StatsVisibleListContext";
import LanguageSelector from "@/components/settingsComponent/LanguageSelector";
import ThemeSelector from "@/components/settingsComponent/ThemeSelector";
import ButtonResetSettings from "@/components/settingsComponent/ButtonResetSettings";
import SendFeedbackButton from "@/components/settingsComponent/SendFeedbackButton";
import LicensesButton from "@/components/settingsComponent/LicensesButton";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import FlexScrollView from "@/primitiveComponents/FlexScrollView";
import Button from "@/primitiveComponents/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Text from "@/primitiveComponents/Text";
import useSetsStore from "@/stores/useSetsStore";
import { useResetSettings } from "@/hooks/useResetSettings";
import { deleteAllTheMemory } from "@/utils/asyncStorageOperations";
import ButtonDeleteAllSetsInMemory from "@/components/settingsComponent/ButtonDeleteAllSetsInMemory";
import StatSliderResultDefaultSelectorButtonAndModal from "@/components/settingsComponent/StatSliderResultDefaultSelectorButtonAndModal";

const SettingsScreen = () => {
  const resetSettings = useResetSettings();
  const deleteAllSavedSets = useSetsStore((state) => state.deleteAllSavedSets);

  return (
    <ScreenProvider screenName="settings">
      <StatsVisibleListProvider>
        <FlexScrollView>
          {/* peut etre remplacer FlexScrollView par une view dans le futur */}
          <BoxContainer alignItems={"stretch"}>
            {/*<BoxContainer alignItems={null}>*/}
            {/* alignItems={null} permet au contenu de pourvoir prendre toute la largeur */}
            <LanguageSelector />

            <ThemeSelector />

            <StatSliderResultDefaultSelectorButtonAndModal />

            <SendFeedbackButton />

            <LicensesButton />

            <ButtonResetSettings resetSettings={resetSettings} />

            <ButtonDeleteAllSetsInMemory deleteAllSavedSets={deleteAllSavedSets} />

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

            <Button
              onPress={async () => {
                console.log("remove all the memory");
                deleteAllTheMemory();
              }}
            >
              remvove memory
            </Button>
          </BoxContainer>
        </FlexScrollView>
      </StatsVisibleListProvider>
    </ScreenProvider>
  );
};

export default SettingsScreen;
