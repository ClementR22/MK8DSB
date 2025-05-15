import React from "react";
import StatSliderResultSelectorPressable from "../statSliderResult/StatSliderResultSelectorPressable";
import ButtonSortSet from "../managingSetsPressable/ButtonSortSet";
import ButtonImportSet from "../managingSetsPressable/ButtonImportSet";
import BoxContainer from "@/components/BoxContainer";

const SavedSetScreenPressablesContainer = () => {
  return (
    <BoxContainer flexDirection="row" justifyContent="space-evenly">
      <ButtonSortSet />
      <ButtonImportSet />
      <StatSliderResultSelectorPressable />
    </BoxContainer>
  );
};

export default SavedSetScreenPressablesContainer;
