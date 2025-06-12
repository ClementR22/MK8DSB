import React from "react";
import StatSelectorVisibleStatsButtonAndModal from "../statSliderResult/StatSelectorVisibleStatsButtonAndModal";
import ButtonLoadSet from "../managingSetsPressable/ButtonLoadSet";
import ButtonAddSet from "../managingSetsPressable/ButtonAddSet";
import BoxContainer from "../../primitiveComponents/BoxContainer";

const DisplaySetScreenPressablesContainer = () => {
  return (
    <BoxContainer flexDirection="row" justifyContent="space-evenly">
      <ButtonAddSet />

      <ButtonLoadSet tooltipText="LoadASet" />

      <StatSelectorVisibleStatsButtonAndModal />
    </BoxContainer>
  );
};

export default DisplaySetScreenPressablesContainer;
