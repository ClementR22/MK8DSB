import React from "react";
import { View } from "react-native";
import StatSliderResultSelectorPressable from "../statSliderResult/StatSliderResultSelectorPressable";
import { useSavedSetScreen } from "@/contexts/screenContexts/SavedSetScreenContext";
import ButtonSortSet from "../managingSetsPressable/ButtonSortSet";

const SavedSetScreenPressablesContainer = () => {
  const { isStatsVisible, setIsStatsVisible } = useSavedSetScreen();

  return (
    <View>
      <ButtonSortSet />
      <StatSliderResultSelectorPressable
        isStatsVisible={isStatsVisible}
        setIsStatsVisible={setIsStatsVisible}
      />
    </View>
  );
};

export default SavedSetScreenPressablesContainer;
