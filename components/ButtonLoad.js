import { Pressable, View } from "react-native";
import { button_icon } from "./styles/button";
import { useTheme } from "../utils/ThemeContext";
import { shadow_3dp } from "./styles/theme";
import { useSavedSetModal } from "../utils/SavedSetModalContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TooltipWrapper from "./TooltipWrapper";
import LoadSetModal from "./modal/LoadSetModal";

const ButtonLoad = ({ text, screenSituation }) => {
  const th = useTheme();

  const { toggleSavedSetModal } = useSavedSetModal();

  return (
    <TooltipWrapper tooltipText={text}>
      <View>
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
        <LoadSetModal screenSituation={screenSituation} />
      </View>
    </TooltipWrapper>
  );
};

export default ButtonLoad;
