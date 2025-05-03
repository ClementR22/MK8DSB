import React from "react";
import { View } from "react-native";
import { button_icon } from "./styles/button";
import { useTheme } from "../utils/ThemeContext";
import { shadow_3dp } from "./styles/theme";
import { useSavedSetModal } from "../utils/SavedSetModalContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TooltipWrapper from "./TooltipWrapper";
import LoadSetModal from "./modal/LoadSetModal";

const ButtonLoad = ({ tooltip_text, screenSituation }) => {
  const { theme } = useTheme();

  const { toggleSavedSetModal } = useSavedSetModal();

  return (
    <TooltipWrapper
      tooltipText={tooltip_text}
      style={[button_icon(theme).container, shadow_3dp]}
      onPress={() => {
        toggleSavedSetModal(true);
      }}
    >
      <View>
        <MaterialCommunityIcons
          name="download"
          size={24}
          color={theme.on_primary}
        />
        <LoadSetModal screenSituation={screenSituation} />
      </View>
    </TooltipWrapper>
  );
};

export default ButtonLoad;
