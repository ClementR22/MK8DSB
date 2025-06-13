import React from "react";
import ButtonAndModalStatSelectorResultStats from "../statSelector/ButtonAndModalStatSelectorResultStats";
import ButtonLoadSet from "../managingSetsButton/ButtonLoadSet";
import ButtonAddSet from "../managingSetsButton/ButtonAddSet";
import BoxContainer from "../../primitiveComponents/BoxContainer";

const DisplaySetScreenPressablesContainer = () => {
  return (
    <BoxContainer flexDirection="row" justifyContent="space-evenly">
      <ButtonAddSet />

      <ButtonLoadSet tooltipText="LoadASet" />

      <ButtonAndModalStatSelectorResultStats />
    </BoxContainer>
  );
};

export default DisplaySetScreenPressablesContainer;
