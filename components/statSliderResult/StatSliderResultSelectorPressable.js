import React from "react";
import { View } from "react-native";
import { button_icon } from "../styles/button";
import { shadow_3dp } from "../styles/theme";
import { useTheme } from "../../utils/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MyModal from "../modal/MyModal";
import { useState } from "react";
import StatSelector from "../statSelector/StatSelector";
import { toggleCheckList } from "../../utils/toggleCheck";
import TooltipWrapper from "../TooltipWrapper";

const StatSliderResultSelectorPressable = ({
  isStatsVisible,
  setIsStatsVisible,
  isSyncWithChosenStatsPressable = false,
}) => {
  const th = useTheme();

  const [foundStatsModalVisible, setFoundStatsModalVisible] = useState(false);

  return (
    <View>
      <TooltipWrapper
        tooltipText="DisplayedStats"
        style={[button_icon(th).container, shadow_3dp]}
        onPress={() => setFoundStatsModalVisible(true)}
      >
        <MaterialCommunityIcons
          name="checkbox-multiple-marked"
          size={24}
          color={th.on_primary}
        />
      </TooltipWrapper>

      <MyModal
        modalTitle="StatsToDisplay"
        isModalVisible={foundStatsModalVisible}
        setIsModalVisible={setFoundStatsModalVisible}
        ModalContentsList={[StatSelector]}
        contentPropsList={[
          {
            statList: isStatsVisible,
            setStatList: setIsStatsVisible,
            toggleCheck: (name) => {
              toggleCheckList(setIsStatsVisible, name);
            },
            isSyncWithChosenStatsPressable: isSyncWithChosenStatsPressable,
          },
        ]}
      />
    </View>
  );
};

export default StatSliderResultSelectorPressable;
