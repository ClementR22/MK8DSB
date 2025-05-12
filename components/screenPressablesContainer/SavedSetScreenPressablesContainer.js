import React from "react";
import { View } from "react-native";
import StatSliderResultSelectorPressable from "../statSliderResult/StatSliderResultSelectorPressable";
import ButtonSortSet from "../managingSetsPressable/ButtonSortSet";
import ButtonImportSet from "../managingSetsPressable/ButtonImportSet";

const SavedSetScreenPressablesContainer = () => {
  return (
    <View>
      <ButtonSortSet />
      <ButtonImportSet />
      <StatSliderResultSelectorPressable />
    </View>
  );
};

export default SavedSetScreenPressablesContainer;
