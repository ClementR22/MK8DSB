import React from "react";
import StatSliderResultSelectorPressable from "../statSliderResult/StatSliderResultSelectorPressable";
import { useTheme } from "@/contexts/ThemeContext";
import ButtonLoadSet from "../managingSetsPressable/ButtonLoadSet";
import ButtonAddSet from "../managingSetsPressable/ButtonAddSet";
import BoxContainer from "components/BoxContainer";

const DisplaySetScreenPressablesContainer = () => {
  const { theme } = useTheme();

  return (
    <BoxContainer theme={theme} flexDirection="row" justifyContent="space-evenly">
      <StatSliderResultSelectorPressable />

      <ButtonAddSet />

      <ButtonLoadSet tooltip_text="LoadASet" />
    </BoxContainer>
  );
};

export default DisplaySetScreenPressablesContainer;
