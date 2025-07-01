import React from "react";
import ButtonLoadSet from "../managingSetsButton/ButtonLoadSet";
import ButtonAddSet from "../managingSetsButton/ButtonAddSet";
import BoxContainer from "../../primitiveComponents/BoxContainer";

const DisplaySetScreenPressablesContainer = ({ scrollRef }) => {
  return (
    <BoxContainer flexDirection="row" justifyContent="space-evenly">
      <ButtonAddSet scrollRef={scrollRef} />

      <ButtonLoadSet tooltipText="LoadASet" />
    </BoxContainer>
  );
};

export default DisplaySetScreenPressablesContainer;
