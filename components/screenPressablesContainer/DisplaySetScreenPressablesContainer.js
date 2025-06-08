import React from "react";
import StatSliderResultSelectorPressable from "../statSliderResult/StatSliderResultSelectorPressable";
import ButtonLoadSet from "../managingSetsPressable/ButtonLoadSet";
import ButtonAddSet from "../managingSetsPressable/ButtonAddSet";
import BoxContainer from "../../primitiveComponents/BoxContainer";

const DisplaySetScreenPressablesContainer = () => {
  return (
    <BoxContainer flexDirection="row" justifyContent="space-evenly">
      <StatSliderResultSelectorPressable />

      <ButtonAddSet />

      <ButtonLoadSet tooltipText="LoadASet" />
    </BoxContainer>
  );
};

export default DisplaySetScreenPressablesContainer;
