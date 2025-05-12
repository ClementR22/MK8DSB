import React from "react";
import { View } from "react-native";
import { button_icon } from "../styles/button";
import { shadow_3dp } from "../styles/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MyModal from "../modal/MyModal";
import { useState } from "react";
import StatSelector from "../statSelector/StatSelector";
import { toggleCheckList } from "../../utils/toggleCheck";
import TooltipWrapper from "../TooltipWrapper";
import { useIsStatsVisibleList } from "../../contexts/IsStatsVisibleListContext";

const StatSliderResultSelectorPressable = ({ visibleStatsInSearchScreenCase = false }) => {
  const { isStatsVisibleList, setIsStatsVisibleList } = useIsStatsVisibleList();

  const { theme } = useTheme();

  const [foundStatsModalVisible, setFoundStatsModalVisible] = useState(false);

  return (
    <View>
      <TooltipWrapper
        tooltipText="DisplayedStats"
        style={[button_icon(theme).container, shadow_3dp]}
        onPress={() => setFoundStatsModalVisible(true)}
      >
        <MaterialCommunityIcons name="checkbox-multiple-marked" size={24} color={theme.on_primary} />
      </TooltipWrapper>

      <MyModal
        modalTitle="StatsToDisplay"
        isModalVisible={foundStatsModalVisible}
        setIsModalVisible={setFoundStatsModalVisible}
      >
        <StatSelector
          statList={isStatsVisibleList}
          setStatList={setIsStatsVisibleList}
          toggleCheck={(name) => {
            toggleCheckList(setIsStatsVisibleList, name);
          }}
          visibleStatsInSearchScreenCase={visibleStatsInSearchScreenCase}
        />
      </MyModal>
    </View>
  );
};

export default StatSliderResultSelectorPressable;
