import { useEffect, useState } from "react";
import { usePressableImages } from "../utils/PressableImagesContext";
import { useSetsList } from "../utils/SetsListContext";
import { Pressable, Text, View } from "react-native";
import StatSliderResultSelectorPressable from "./statSliderResult/StatSliderResultSelectorPressable";
import { button_icon } from "./styles/button";
import { useTheme } from "../utils/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSavedSetModal } from "../utils/SavedSetModalContext";
import MyModal from "./modal/MyModal";
import { translate } from "../i18n/translations";
import StatSelector from "./StatSelector";
import { useDisplaySetScreen } from "../utils/DisplaySetScreenContext";
import SavedSetModal from "./modal/SavedSetModal";
import { shadow_3dp } from "./styles/theme";
import { toggleCheckList } from "../utils/toggleCheck";
import { useSavedSetScreen } from "../utils/SavedSetScreenContext";

const SavedSetScreenPressablesContainer = () => {
  const { isStatsVisible, setIsStatsVisible } = useSavedSetScreen();

  return (
    <View>
      <StatSliderResultSelectorPressable
        isStatsVisible={isStatsVisible}
        setIsStatsVisible={setIsStatsVisible}
      />
    </View>
  );
};

export default SavedSetScreenPressablesContainer;
