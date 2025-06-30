import React from "react";
import ElementsSelector from "./ElementsSelector";

interface ElementsSelectorPannelProps {
  children?: React.ReactNode;
  selectionMode?: "single" | "multiple";
}

const ElementsSelectorPannel = ({ children = null, selectionMode = "single" }: ElementsSelectorPannelProps) => {
  return (
    <>
      {children}
      <ElementsSelector selectionMode={selectionMode} />
    </>
  );
};

export default ElementsSelectorPannel;
