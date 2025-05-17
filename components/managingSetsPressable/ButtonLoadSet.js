import React from "react";
import { View } from "react-native";
import { button_icon } from "../styles/button";
import { useTheme } from "@/contexts/ThemeContext";
import { shadow_3dp } from "../styles/theme";
import { useLoadSetModal } from "@/contexts/LoadSetModalContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TooltipWrapper from "../TooltipWrapper";
import LoadSetModal from "../modal/LoadSetModal";

const ButtonLoadSet = ({ tooltip_text }) => {
  const { theme } = useTheme();

  const { toggleLoadSetModal } = useLoadSetModal();

  return (
    <TooltipWrapper
      tooltipText={tooltip_text}
      style={[button_icon(theme).container, shadow_3dp]}
      onPress={() => {
        toggleLoadSetModal(true);
      }}
    >
      <MaterialCommunityIcons name="cards-outline" size={24} color={theme.on_primary} />
      <LoadSetModal />
    </TooltipWrapper>
  );
};

export default ButtonLoadSet;
