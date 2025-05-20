import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { button, button_icon } from "../styles/button";
import { shadow_12dp, shadow_3dp } from "@/components/styles/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import StatSelector from "../statSelector/StatSelector";
import TooltipWrapper from "../TooltipWrapper";
import { useStatsVisibleList } from "@/contexts/StatsVisibleListContext";
import { translate } from "@/translations/translations";
import { modal } from "@/components/styles/modal";
import useSetsStore from "@/stores/useSetsStore";
import Modal from "../Modal";

const StatSliderResultSelectorPressable = () => {
  const { statsVisibleList, setStatsVisibleList, toggleCheckListStatsVisibleList } = useStatsVisibleList();

  const { theme } = useTheme();

  const [foundStatsModalVisible, setFoundStatsModalVisible] = useState(false);
  const [filterModalButtonHover, setFilterModalButtonHover] = useState(false);

  const syncWithChosenStats = useSetsStore((state) => state.syncWithChosenStats);

  return (
    <View>
      <TooltipWrapper
        tooltipText="DisplayedStats"
        style={[button_icon(theme).container, shadow_3dp]}
        onPress={() => setFoundStatsModalVisible(true)}
      >
        <MaterialCommunityIcons name="checkbox-multiple-marked" size={24} color={theme.on_primary} />
      </TooltipWrapper>

      <Modal
        modalTitle="StatsToDisplay"
        isModalVisible={foundStatsModalVisible}
        setIsModalVisible={setFoundStatsModalVisible}
        leftButton={
          <Pressable
            style={[button(theme).container, modal(theme).close_button_center, filterModalButtonHover && shadow_12dp]}
            onHoverIn={() => setFilterModalButtonHover(true)}
            onHoverOut={() => setFilterModalButtonHover(false)}
            onPress={() => syncWithChosenStats(setStatsVisibleList)}
          >
            <Text>{translate("Sync")}</Text>
          </Pressable>
        }
      >
        <StatSelector
          statList={statsVisibleList}
          setStatList={setStatsVisibleList}
          toggleCheck={(name) => {
            toggleCheckListStatsVisibleList(name);
          }}
          isVisibleStatsNotInSettingsScreen={true}
        />
      </Modal>
    </View>
  );
};

export default StatSliderResultSelectorPressable;
