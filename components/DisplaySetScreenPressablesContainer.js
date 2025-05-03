import React from "react";
import StatSliderResultSelectorPressable from "./statSliderResult/StatSliderResultSelectorPressable";
import { useTheme } from "../utils/ThemeContext";
import { useDisplaySetScreen } from "../utils/DisplaySetScreenContext";
import ButtonLoad from "./ButtonLoad";
import ButtonAddSet from "./ButtonAddSet";
import Container from "./Container";

const DisplaySetScreenPressablesContainer = () => {
  const { theme } = useTheme();

  const { isStatsVisible, setIsStatsVisible } = useDisplaySetScreen();

  console.log("dans press", theme);

  return (
    <Container theme={theme} flexDirection="row" justifyContent="space-evenly">
      <StatSliderResultSelectorPressable
        isStatsVisible={isStatsVisible}
        setIsStatsVisible={setIsStatsVisible}
      />

      <ButtonAddSet />

      <ButtonLoad tooltip_text="LoadASet" screenSituation="display" />
    </Container>
  );
};

export default DisplaySetScreenPressablesContainer;
