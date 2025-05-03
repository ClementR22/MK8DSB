import React from "react";
import { button_icon } from "./styles/button";
import { useTheme } from "../utils/ThemeContext";
import { shadow_3dp } from "./styles/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSetsList } from "../utils/SetsListContext";
import TooltipWrapper from "./TooltipWrapper";

const ButtonAddSet = () => {
  const { theme } = useTheme();

  const { addNewSetInDisplay } = useSetsList();

  return (
    <TooltipWrapper
      tooltipText="AddASet"
      style={[button_icon(theme).container, shadow_3dp]}
      onPress={() => addNewSetInDisplay()}
    >
      <MaterialCommunityIcons name="plus" size={24} color={theme.on_primary} />
    </TooltipWrapper>
  );
};

export default ButtonAddSet;
