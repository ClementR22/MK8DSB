import React from "react";
import StatSliderResultSelectorPressable from "../statSliderResult/StatSliderResultSelectorPressable";
import { useTheme } from "@/contexts/ThemeContext";
import { useDisplaySetScreen } from "@/contexts/screenContexts/DisplaySetScreenContext";
import ButtonLoadSet from "../managingSetsPressable/ButtonLoadSet";
import ButtonAddSet from "../managingSetsPressable/ButtonAddSet";
import Container from "../Container";

const DisplaySetScreenPressablesContainer = () => {
  const { theme } = useTheme();

  const { isStatsVisible, setIsStatsVisible } = useDisplaySetScreen();

  return (
    <Container theme={theme} flexDirection="row" justifyContent="space-evenly">
      <StatSliderResultSelectorPressable
        isStatsVisible={isStatsVisible}
        setIsStatsVisible={setIsStatsVisible}
      />

      <ButtonAddSet />

      <ButtonLoadSet tooltip_text="LoadASet" screenSituation="display" />
    </Container>
  );
};

export default DisplaySetScreenPressablesContainer;
