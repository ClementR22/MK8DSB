import React, { memo, useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import ButtonIcon, { ButtonIconProps } from "@/primitiveComponents/ButtonIcon";
import useGeneralStore from "@/stores/useGeneralStore";
import { sortButtonsConfig } from "@/config/sortButtonsConfig";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { StatNameHandling, StatNameSort, StatNameSpeed } from "@/data/stats/statsTypes";
import {
  statNamesHandling,
  statNamesSortElementDefault,
  statNamesSortSetCardDefault,
  statNamesSpeed,
} from "@/data/stats/statsData";
import TooltipMenu from "../TooltipMenu";

// Constants
export const HALF_GAP = 7;

const sortNameMap: { [key: string]: { asc: number; desc: number } } = {
  id: { asc: 0, desc: 1 },
  name: { asc: 2, desc: 3 },
  speedGround: { asc: 4, desc: 5 },
  speedAntiGravity: { asc: 6, desc: 7 },
  speedWater: { asc: 8, desc: 9 },
  speedAir: { asc: 10, desc: 11 },
  handlingGround: { asc: 12, desc: 13 },
  handlingAntiGravity: { asc: 14, desc: 15 },
  handlingWater: { asc: 16, desc: 17 },
  handlingAir: { asc: 18, desc: 19 },
  acceleration: { asc: 20, desc: 21 },
  weight: { asc: 22, desc: 23 },
  traction: { asc: 24, desc: 25 },
  miniTurbo: { asc: 26, desc: 27 },
};

function getSortNameFromSortNumber(sortNumber: number): StatNameSort | undefined {
  for (const sortName in sortNameMap) {
    if (sortNameMap.hasOwnProperty(sortName)) {
      const { asc, desc } = sortNameMap[sortName];
      if (sortNumber === asc || sortNumber === desc) {
        return sortName as StatNameSort;
      }
    }
  }
  return undefined;
}

interface ButtonIconSortProps extends ButtonIconProps {
  iconBackgroundColor?: string;
  direction?: "asc" | "desc";
  isBadge?: boolean;
}

const ButtonIconSort: React.FC<ButtonIconSortProps> = memo(
  ({ onPress, tooltipText, iconName, iconType, iconBackgroundColor, direction = "asc", isBadge = false }) => {
    const theme = useThemeStore((state) => state.theme);

    const badgeIconName = direction === "asc" ? "arrow-up" : "arrow-down";
    const badgeBackgroundColor = theme.primary_container;
    const badgeIconColor = theme.primary;
    const badgeIconInnerSize = 20;

    return (
      <View>
        <ButtonIcon
          onPress={onPress}
          tooltipText={tooltipText}
          iconName={iconName}
          iconType={iconType}
          style={{ backgroundColor: iconBackgroundColor ?? theme.primary }}
        />
        {isBadge && (
          <View style={[styles.badgeContainer, { backgroundColor: badgeBackgroundColor }]}>
            <Icon
              name={badgeIconName}
              type={IconType.MaterialCommunityIcons}
              size={badgeIconInnerSize}
              color={badgeIconColor}
            />
          </View>
        )}
      </View>
    );
  }
);

interface SortModeSelectorProps {
  sortNumber: number;
  setSortNumber: (number: number) => void;
  sortCase: "element" | "set";
}

const SortModeSelector = memo(({ sortNumber, setSortNumber, sortCase }: SortModeSelectorProps) => {
  const theme = useThemeStore((state) => state.theme);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const statNamesSortDefault = useMemo(
    () => (sortCase === "element" ? statNamesSortElementDefault : statNamesSortSetCardDefault),
    [sortCase]
  );

  const getCurrentDirection = (sortNum: number) => {
    return sortNum % 2 === 0 ? "asc" : "desc";
  };

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
        const newSortNumber = newDirection === "asc" ? newOrderInfo.asc : newOrderInfo.desc;
        setSortNumber(newSortNumber);
      }
    },
    [activeSort, currentDirection, setSortNumber]
  );

  const renderSpeedMenu = useMemo(
    () => (
      <TooltipMenu
        key="speed"
        trigger={
          <ButtonIconSort
            tooltipText="Speed"
            iconName={sortButtonsConfig.speed.iconName}
            iconType={sortButtonsConfig.speed.iconType}
            direction={statNamesSpeed.includes(activeSort as StatNameSpeed) ? currentDirection : undefined}
            isBadge={statNamesSpeed.includes(activeSort as StatNameSpeed)}
          />
        }
      >
        {statNamesSpeed.map((speedName) => {
          const isActive = speedName === activeSort;
          return (
            <ButtonIconSort
              key={speedName}
              onPress={() => handlePress(speedName)}
              tooltipText={speedName}
              iconName={sortButtonsConfig[speedName].iconName}
              iconType={sortButtonsConfig[speedName].iconType}
              iconBackgroundColor={sortButtonsConfig[speedName].iconBackgroundColor}
              direction={isActive ? currentDirection : undefined}
              isBadge={isActive}
            />
          );
        })}
      </TooltipMenu>
    ),
    [activeSort, currentDirection, handlePress]
  );

  const renderHandlingMenu = useMemo(
    () => (
      <TooltipMenu
        key="handling"
        trigger={
          <ButtonIconSort
            tooltipText="Handling"
            iconName={sortButtonsConfig.handling.iconName}
            iconType={sortButtonsConfig.handling.iconType}
            direction={statNamesHandling.includes(activeSort as StatNameHandling) ? currentDirection : undefined}
            isBadge={statNamesHandling.includes(activeSort as StatNameHandling)}
          />
        }
      >
        {statNamesHandling.map((handlingName) => {
          const isActive = handlingName === activeSort;
          return (
            <ButtonIconSort
              key={handlingName}
              onPress={() => handlePress(handlingName)}
              tooltipText={handlingName}
              iconName={sortButtonsConfig[handlingName].iconName}
              iconType={sortButtonsConfig[handlingName].iconType}
              iconBackgroundColor={sortButtonsConfig[handlingName].iconBackgroundColor}
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

      if (name === "speed") return renderSpeedMenu;
      if (name === "handling") return renderHandlingMenu;

      const isActive = name === activeSort;
      return (
        <ButtonIconSort
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
  }, [statNamesSortDefault, activeSort, currentDirection, handlePress, renderSpeedMenu, renderHandlingMenu]);

  return (
    <ScrollView horizontal scrollEnabled={isScrollEnable}>
      <Pressable style={styles.container}>{mainButtons}</Pressable>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    marginHorizontal: HALF_GAP,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  badgeContainer: {
    position: "absolute",
    top: -2,
    right: -5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    borderRadius: 10,
    width: 20,
    height: 20,
  },
});

export default SortModeSelector;
