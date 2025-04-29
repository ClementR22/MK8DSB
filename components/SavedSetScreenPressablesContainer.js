import { Pressable, Text, View } from "react-native";
import StatSliderResultSelectorPressable from "./statSliderResult/StatSliderResultSelectorPressable";
import { useSavedSetScreen } from "../utils/SavedSetScreenContext";
import { useSetsList } from "../utils/SetsListContext";
import { button_icon } from "./styles/button";
import { useTheme } from "../utils/ThemeContext";

const SavedSetScreenPressablesContainer = () => {
  const { isStatsVisible, setIsStatsVisible } = useSavedSetScreen();
  const { sortSetsSavedKeys } = useSetsList();
  const th = useTheme();

  return (
    <View>
      <Pressable
        style={button_icon(th).container}
        onPress={() => sortSetsSavedKeys()}
      >
        <Text>Sort</Text>
      </Pressable>
      <StatSliderResultSelectorPressable
        isStatsVisible={isStatsVisible}
        setIsStatsVisible={setIsStatsVisible}
      />
    </View>
  );
};

export default SavedSetScreenPressablesContainer;
