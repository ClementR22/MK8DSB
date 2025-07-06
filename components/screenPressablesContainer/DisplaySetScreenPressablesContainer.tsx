import React from "react";
import ButtonLoadSet from "../managingSetsButton/ButtonLoadSet";
import ButtonAddSet from "../managingSetsButton/ButtonAddSet";
import BoxContainer from "../../primitiveComponents/BoxContainer";

interface DisplaySetScreenPressablesContainerProps {
  scrollRef: React.RefObject<any>;
}

const DisplaySetScreenPressablesContainer: React.FC<DisplaySetScreenPressablesContainerProps> = ({ scrollRef }) => {
  return (
    <BoxContainer flexDirection="row" justifyContent="space-evenly">
      <ButtonAddSet scrollRef={scrollRef} />
      <ButtonLoadSet tooltipText="LoadASet" />
    </BoxContainer>
  );
};

DisplaySetScreenPressablesContainer.displayName = "DisplaySetScreenPressablesContainer";

export default React.memo(DisplaySetScreenPressablesContainer);
