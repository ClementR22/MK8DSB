import React from "react";
import StatSliderResultSelectorPressable from "./statSliderResult/StatSliderResultSelectorPressable";
import { useTheme } from "../utils/ThemeContext";
import { useDisplaySetScreen } from "../utils/DisplaySetScreenContext";
import ButtonLoad from "./ButtonLoad";
import ButtonAddSet from "./ButtonAddSet";
import { translate } from "../i18n/translations";
import Container from "./Container";

const DisplaySetScreenPressablesContainer = () => {
  const th = useTheme();

  const { isStatsVisible, setIsStatsVisible } = useDisplaySetScreen();

  return (
    <Container theme={th} flexDirection={"row"} justifyContent={"space-evenly"}>
      <StatSliderResultSelectorPressable
        isStatsVisible={isStatsVisible}
        setIsStatsVisible={setIsStatsVisible}
      />

      <ButtonAddSet />

      <ButtonLoad text={translate("LoadASet")} screenSituation="display" />
    </Container>
  );
};

export default DisplaySetScreenPressablesContainer;
