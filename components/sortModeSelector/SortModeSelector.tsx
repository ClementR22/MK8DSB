import React, { memo, useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import useGeneralStore from "@/stores/useGeneralStore";
import { sortButtonsConfig } from "@/config/sortButtonsConfig";
import { StatNameSort } from "@/data/stats/statsTypes";
import {
  statNamesHandling,
  statNamesSortElementDefault,
  statNamesSortSetCardDefault,
  statNamesSpeed,
} from "@/data/stats/statsData";
import TooltipMenu from "../TooltipMenu";
import ButtonIconWithBadge from "./ButtonIconWithBadge";
import {
  BORDER_RADIUS_INF,
  BUTTON_SIZE,
  GAP_SORT_MODE_SELECTOR,
  MARGIN_CONTAINER_LOWEST,
  PADDING_BOX_CONTAINER,
} from "@/utils/designTokens";
import { useScreen } from "@/contexts/ScreenContext";
import { getCurrentDirection, getSortNameFromSortNumber, sortNameMap } from "@/utils/getSortNameFromSortNumber";
import { vw } from "../styles/theme";
import { IconType } from "react-native-dynamic-vector-icons";
import showToast from "@/utils/showToast";

// Constants
const NUMBER_OF_BUTTONS = 8;
const CONTENT_WIDTH =
  BUTTON_SIZE * NUMBER_OF_BUTTONS + GAP_SORT_MODE_SELECTOR * (NUMBER_OF_BUTTONS - 1) + 2 * PADDING_BOX_CONTAINER;
const NEEDS_SCROLL = CONTENT_WIDTH > vw - 2 * MARGIN_CONTAINER_LOWEST;

interface SortModeSelectorProps {
  sortNumber: number;
  setSortNumber: (number: number) => void;
  sortCase: "element" | "set";
  containerStyle?: ViewStyle;
}

const SortModeSelector: React.FC<SortModeSelectorProps> = ({ sortNumber, setSortNumber, sortCase, containerStyle }) => {
  const screenName = useScreen();
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const statNamesSortDefault = useMemo(
    () => (sortCase === "element" ? statNamesSortElementDefault : statNamesSortSetCardDefault),
    [sortCase]
  );

  const [currentDirection, setCurrentDirection] = useState<"asc" | "desc">(getCurrentDirection(sortNumber));
  const [activeSort, setActiveSort] = useState<StatNameSort>(
    getSortNameFromSortNumber(sortNumber) || statNamesSortDefault[0]
  );

  const handlePress = useCallback(
    (name: StatNameSort) => {
      const isActive = activeSort === name;
      const newDirection = isActive ? (currentDirection === "asc" ? "desc" : "asc") : "asc";

      setActiveSort(name);
      setCurrentDirection(newDirection);

      const newOrderInfo = sortNameMap[name];
      if (newOrderInfo) {
        setSortNumber(newDirection === "asc" ? newOrderInfo.asc : newOrderInfo.desc);
      }

      showToast(`stats:${name} sort:${newDirection}`);
    },
    [activeSort, currentDirection, setSortNumber]
  );

  // Fonction générique pour créer un menu tooltip
  const createTooltipMenu = useCallback(
    (
      key: string,
      statNames: readonly StatNameSort[],
      tooltipText: string,
      triggerIconName: string,
      triggerIconType: IconType
    ) => (
      <TooltipMenu
        key={key}
        trigger={
          <ButtonIconWithBadge
            tooltipText={tooltipText}
            iconName={triggerIconName}
            iconType={triggerIconType}
            direction={statNames.includes(activeSort) ? currentDirection : undefined}
            isBadge={statNames.includes(activeSort)}
          />
        }
      >
        {statNames.map((name) => {
          const config = sortButtonsConfig[name];
          const isActive = name === activeSort;
          return (
            <ButtonIconWithBadge
              key={name}
              onPress={() => handlePress(name)}
              tooltipText={name}
              iconName={config.iconName}
              iconType={config.iconType}
              iconBackgroundColor={config.iconBackgroundColor}
              direction={isActive ? currentDirection : undefined}
              isBadge={isActive}
            />
          );
        })}
      </TooltipMenu>
    ),
    [activeSort, currentDirection, handlePress]
  );

  const mainButtons = useMemo(() => {
    return statNamesSortDefault.map((name) => {
      const iconConfig = sortButtonsConfig[name];
      if (!iconConfig) return null;

      // Menus spéciaux
      if (name === "speed") {
        return createTooltipMenu("speed", statNamesSpeed, "speed", iconConfig.iconName, iconConfig.iconType);
      }
      if (name === "handling") {
        return createTooltipMenu("handling", statNamesHandling, "handling", iconConfig.iconName, iconConfig.iconType);
      }

      // Boutons normaux
      const isActive = name === activeSort;
      return (
        <ButtonIconWithBadge
          key={name}
          onPress={() => handlePress(name)}
          tooltipText={name}
          iconName={iconConfig.iconName}
          iconType={iconConfig.iconType}
          direction={isActive ? currentDirection : undefined}
          isBadge={isActive}
        />
      );
    });
  }, [statNamesSortDefault, activeSort, currentDirection, handlePress, createTooltipMenu]);

  const Wrapper = NEEDS_SCROLL ? ScrollView : View;
  const wrapperProps = NEEDS_SCROLL
    ? {
        horizontal: true,
        scrollEnabled: isScrollEnable,
        contentContainerStyle: containerStyle,
      }
    : { style: containerStyle };

  return (
    <Wrapper {...wrapperProps}>
      <Pressable
        style={[
          styles.container,
          { paddingHorizontal: screenName === "search" ? GAP_SORT_MODE_SELECTOR : PADDING_BOX_CONTAINER },
          !NEEDS_SCROLL && styles.spaceAround,
        ]}
      >
        {mainButtons}
      </Pressable>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: GAP_SORT_MODE_SELECTOR,
  },
  spaceAround: {
    justifyContent: "space-around",
    flex: 1,
  },
});

export default memo(SortModeSelector);
