import React from "react";
import { button_icon } from "../styles/button";
import { shadow_3dp } from "@/components/styles/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TooltipWrapper from "../TooltipWrapper";
import LoadSetModal from "../modal/LoadSetModal";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLoadSetModalStore } from "@/stores/useLoadSetModalStore";

const ButtonLoadSet = ({ tooltip_text }) => {
  const theme = useThemeStore((state) => state.theme);
  const setIsLoadSetModalVisible = useLoadSetModalStore((state) => state.setIsLoadSetModalVisible);

  return (
    <TooltipWrapper
      tooltipText={tooltip_text}
      style={[button_icon(theme).container, shadow_3dp]}
      onPress={() => setIsLoadSetModalVisible(true)}
    >
      <MaterialCommunityIcons name="cards-outline" size={24} color={theme.on_primary} />
      <LoadSetModal />
    </TooltipWrapper>
  );
};

export default ButtonLoadSet;
