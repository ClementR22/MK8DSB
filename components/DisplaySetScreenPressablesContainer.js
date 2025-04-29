import { useEffect, useState } from "react";
import { usePressableImages } from "../utils/PressableImagesContext";
import { useSetsList } from "../utils/SetsListContext";
import { Pressable, Text, View } from "react-native";
import StatSliderResultSelectorPressable from "./statSliderResult/StatSliderResultSelectorPressable";
import { useTheme } from "../utils/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSavedSetModal } from "../utils/SavedSetModalContext";
import { useDisplaySetScreen } from "../utils/DisplaySetScreenContext";
import ButtonLoad from "./ButtonLoad";
import ButtonAddSet from "./ButtonAddSet";
import { translate } from "../i18n/translations";

const DisplaySetScreenPressablesContainer = () => {
  const th = useTheme();

  const { isStatsVisible, setIsStatsVisible } = useDisplaySetScreen();

  return (
    <View>
      <StatSliderResultSelectorPressable
        isStatsVisible={isStatsVisible}
        setIsStatsVisible={setIsStatsVisible}
      />

      <ButtonAddSet />

      <Pressable
        onPress={() => {
          console.log("remove");
          AsyncStorage.clear();
          console.log("fin remove");
        }}
      >
        <Text>remove</Text>
      </Pressable>

      <ButtonLoad text={translate("LoadASet")} screenSituation="display" />
    </View>
  );
};

export default DisplaySetScreenPressablesContainer;
