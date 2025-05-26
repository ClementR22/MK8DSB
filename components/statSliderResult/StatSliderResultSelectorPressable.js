import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import { button } from "../styles/button";
import { shadow_12dp } from "@/components/styles/theme";
import StatSelector from "../statSelector/StatSelector";
import { useStatsVisibleList } from "@/contexts/StatsVisibleListContext";
import { translate } from "@/translations/translations";
import { modal } from "@/components/styles/modal";
import useSetsStore from "@/stores/useSetsStore";
import Modal from "../Modal";
import { useThemeStore } from "@/stores/useThemeStore";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonIcon from "../ButtonIcon";
import { useScreen } from "@/contexts/ScreenContext";
import { useStatsVisibleListConfigStore } from "@/stores/useStatsVisibleListConfigStore";
import ButtonAndModal from "../modal/ButtonAndModal";

const StatSliderResultSelectorPressable = () => {
  const { statsVisibleList, setStatsVisibleList, toggleCheckListStatsVisibleList } = useStatsVisibleList();

  const theme = useThemeStore((state) => state.theme);
  const screenName = useScreen();
  const isInSearchScreen = screenName === "search";

  const [filterModalButtonHover, setFilterModalButtonHover] = useState(false);

  const syncWithChosenStats = useSetsStore((state) => state.syncWithChosenStats);
  const statsVisibleConfig = useStatsVisibleListConfigStore((state) => state.statsVisibleConfig);
  const disabled = statsVisibleConfig !== "no";

  const leftButton = isInSearchScreen ? (
    <Pressable
      style={[button(theme).container, modal(theme).close_button_center, filterModalButtonHover && shadow_12dp]}
      onHoverIn={() => setFilterModalButtonHover(true)}
      onHoverOut={() => setFilterModalButtonHover(false)}
      onPress={() => syncWithChosenStats(setStatsVisibleList)}
    >
      <Text>{translate("Sync")}</Text>
    </Pressable>
  ) : undefined;

  const tooltipText = disabled ? "ConfiguredByDefault" : "DisplayedStats";

  return (
    <ButtonAndModal
      customTrigger={
        <ButtonIcon
          tooltipText={tooltipText}
          iconName="checkbox-multiple-marked"
          iconType={IconType.MaterialCommunityIcons}
          disabled={disabled}
        />
      }
      modalTitle="StatsToDisplay"
      leftButton={leftButton}
    >
      <StatSelector
        statList={statsVisibleList}
        setStatList={setStatsVisibleList}
        toggleCheck={(name) => {
          toggleCheckListStatsVisibleList(name);
        }}
      />
    </ButtonAndModal>
  );
};

export default StatSliderResultSelectorPressable;
