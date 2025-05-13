import React from "react";
import StatSliderResultSelectorPressable from "../statSliderResult/StatSliderResultSelectorPressable";
import ButtonLoadSet from "../managingSetsPressable/ButtonLoadSet";
import ButtonAddSet from "../managingSetsPressable/ButtonAddSet";
import BoxContainer from "../BoxContainer";

const DisplaySetScreenPressablesContainer = () => {
  return (
    <BoxContainer flexDirection="row" justifyContent="space-evenly">
      <StatSliderResultSelectorPressable />

      <ButtonAddSet />

      <ButtonLoadSet tooltip_text="LoadASet" />
    </BoxContainer>
  );
};

export default DisplaySetScreenPressablesContainer;
