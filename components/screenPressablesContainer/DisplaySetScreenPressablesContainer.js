import React from "react";
import StatSliderResultSelectorPressable from "../statSliderResult/StatSliderResultSelectorPressable";
import { useTheme } from "@/contexts/ThemeContext";
import ButtonLoadSet from "../managingSetsPressable/ButtonLoadSet";
import ButtonAddSet from "../managingSetsPressable/ButtonAddSet";
import Container from "../Container";

const DisplaySetScreenPressablesContainer = () => {
  const { theme } = useTheme();

  return (
    <Container theme={theme} flexDirection="row" justifyContent="space-evenly">
      <StatSliderResultSelectorPressable />

      <ButtonAddSet />

      <ButtonLoadSet tooltip_text="LoadASet" />
    </Container>
  );
};

export default DisplaySetScreenPressablesContainer;
