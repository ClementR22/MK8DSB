import { Pressable } from "react-native";
import { button_icon } from "./styles/button";
import { useTheme } from "../utils/ThemeContext";
import { shadow_3dp } from "./styles/theme";
import { useSavedSetModal } from "../utils/SavedSetModalContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TooltipWrapper from "./TooltipWrapper";

const ButtonLoad = ({ text }) => {
  const th = useTheme();

  const { toggleSavedSetModal } = useSavedSetModal();

  return (
    <TooltipWrapper tooltipText={text}>
      <Pressable
        style={[button_icon(th).container, shadow_3dp]}
        onPress={() => {
          toggleSavedSetModal(true);
        }}
      >
        <MaterialCommunityIcons
          name="download"
          size={24}
          color={th.on_primary}
        />
      </Pressable>
    </TooltipWrapper>
  );
};

export default ButtonLoad;
