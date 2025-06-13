import React from "react";
import StatSelectorResultStatsButtonAndModal from "../statSliderResult/StatSelectorResultStatsButtonAndModal";
import ButtonLoadSet from "../managingSetsPressable/ButtonLoadSet";
import ButtonAddSet from "../managingSetsPressable/ButtonAddSet";
import BoxContainer from "../../primitiveComponents/BoxContainer";

const DisplaySetScreenPressablesContainer = () => {
  return (
    <BoxContainer flexDirection="row" justifyContent="space-evenly">
      <ButtonAddSet />

      <ButtonLoadSet tooltipText="LoadASet" />

      <StatSelectorResultStatsButtonAndModal />
    </BoxContainer>
  );
};

export default DisplaySetScreenPressablesContainer;
