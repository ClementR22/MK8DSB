import React from "react";
import { button_icon } from "../styles/button";
import { shadow_3dp } from "@/components/styles/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TooltipWrapper from "../TooltipWrapper";
import useSetsStore from "@/stores/useSetsStore";
import { useThemeStore } from "@/stores/useThemeStore";

const ButtonAddSet = () => {
  const theme = useThemeStore((state) => state.theme);
  const addNewSetInDisplay = useSetsStore((state) => state.addNewSetInDisplay);

  return (
    <TooltipWrapper
      tooltipText="AddASet"
      style={[button_icon(theme).container, shadow_3dp]}
      onPress={addNewSetInDisplay}
    >
      <MaterialCommunityIcons name="plus" size={24} color={theme.on_primary} />
    </TooltipWrapper>
  );
};

export default ButtonAddSet;
