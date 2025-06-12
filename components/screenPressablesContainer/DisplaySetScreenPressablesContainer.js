import React from "react";
import StatSliderResultSelectorModalAndPressable from "../statSliderResult/StatSliderResultSelectorModalAndPressable";
import ButtonLoadSet from "../managingSetsPressable/ButtonLoadSet";
import ButtonAddSet from "../managingSetsPressable/ButtonAddSet";
import BoxContainer from "../../primitiveComponents/BoxContainer";

const DisplaySetScreenPressablesContainer = () => {
  return (
    <BoxContainer flexDirection="row" justifyContent="space-evenly">
      <ButtonAddSet />

      <ButtonLoadSet tooltipText="LoadASet" />

      <StatSliderResultSelectorModalAndPressable />
    </BoxContainer>
  );
};

export default DisplaySetScreenPressablesContainer;
