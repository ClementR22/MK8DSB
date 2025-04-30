import React from "react";
import { Pressable } from "react-native";
import StatSliderResultSelectorPressable from "./statSliderResult/StatSliderResultSelectorPressable";
import { useTheme } from "../utils/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDisplaySetScreen } from "../utils/DisplaySetScreenContext";
import ButtonLoad from "./ButtonLoad";
import ButtonAddSet from "./ButtonAddSet";
import { translate } from "../i18n/translations";
import Container from "./Container";
import { button_icon } from "./styles/button";
import { shadow_3dp } from "./styles/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DisplaySetScreenPressablesContainer = () => {
  const th = useTheme();

  const { isStatsVisible, setIsStatsVisible } = useDisplaySetScreen();

  return (
    <Container theme={th} flexDirection={"row"} justifyContent={"space-evenly"}>
      <StatSliderResultSelectorPressable
        isStatsVisible={isStatsVisible}
        setIsStatsVisible={setIsStatsVisible}
      />

      <ButtonAddSet />

      <Pressable
        style={[button_icon(th).container, shadow_3dp]}
        onPress={() => {
          console.log("remove");
          AsyncStorage.clear();
          console.log("fin remove");
        }}
      >
        <MaterialCommunityIcons
          name="trash-can"
          size={24}
          color={th.on_primary}
        />
      </Pressable>

      <ButtonLoad text={translate("LoadASet")} screenSituation="display" />
    </Container>
  );
};

export default DisplaySetScreenPressablesContainer;
