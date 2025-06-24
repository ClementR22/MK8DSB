import React, { useState, useMemo, useCallback, memo } from "react";
import { StyleSheet, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import { ResultStats } from "@/contexts/ResultStatsContext";

const reducedStatNames = ["speed", "acceleration", "weight", "handling", "traction", "miniTurbo"];
const speedStatNames = ["close", "speedGround", "speedAntiGravity", "speedWater", "speedAir"];
const handlingStatNames = ["close", "handlingGround", "handlingAntiGravity", "handlingWater", "handlingAir"];

const BUTTON_SIZE = 40; // égal à ButtonIcon
const NUMBER_OF_SLOTS = 6;

interface StatSliderCompareSelectorProps {
  compareStats: ResultStats;
  handleSelectCompareStat: (name: string) => void;
}

const StatSliderCompareSelector = ({ compareStats, handleSelectCompareStat }: StatSliderCompareSelectorProps) => {
  const theme = useThemeStore((state) => state.theme);

  const statIconsList = useMemo(
    () => ({
      // ground :         tan         peru          goldenrod
      // anti -grav :     indigo      blueviolet
      // water :          steelblue   deepskyblue   dodgerblue
      // air :            skyblue     lightblue     powderblue
      close: { iconName: "close", iconType: IconType.AntDesign, iconBackgroundColor: theme.primary },
      speed: { iconName: "speedometer", iconType: IconType.SimpleLineIcons, iconBackgroundColor: theme.primary },
      speedGround: { iconName: "speedometer", iconType: IconType.SimpleLineIcons, iconBackgroundColor: "tan" },
      speedAntiGravity: {
        iconName: "speedometer",
        iconType: IconType.SimpleLineIcons,
        iconBackgroundColor: "blueviolet",
      },
      speedWater: { iconName: "speedometer", iconType: IconType.SimpleLineIcons, iconBackgroundColor: "dodgerblue" },
      speedAir: { iconName: "speedometer", iconType: IconType.SimpleLineIcons, iconBackgroundColor: "powderblue" },
      acceleration: {
        iconName: "keyboard-double-arrow-up",
        iconType: IconType.MaterialIcons,
        iconBackgroundColor: theme.primary,
      },
      weight: {
        iconName: "weight-gram",
        iconType: IconType.MaterialCommunityIcons,
        iconBackgroundColor: theme.primary,
      },
      handling: { iconName: "steering", iconType: IconType.MaterialCommunityIcons, iconBackgroundColor: theme.primary },
      handlingGround: {
        iconName: "steering",
        iconType: IconType.MaterialCommunityIcons,
        iconBackgroundColor: "tan",
      },
      handlingAntiGravity: {
        iconName: "steering",
        iconType: IconType.MaterialCommunityIcons,
        iconBackgroundColor: "blueviolet",
      },
      handlingWater: {
        iconName: "steering",
        iconType: IconType.MaterialCommunityIcons,
        iconBackgroundColor: "dodgerblue",
      },
      handlingAir: {
        iconName: "steering",
        iconType: IconType.MaterialCommunityIcons,
        iconBackgroundColor: "powderblue",
      },
      traction: {
        iconName: "car-traction-control",
        iconType: IconType.MaterialCommunityIcons,
        iconBackgroundColor: theme.primary,
      },
      miniTurbo: {
        iconName: "rocket-launch-outline",
        iconType: IconType.MaterialCommunityIcons,
        iconBackgroundColor: theme.primary,
      },
    }),
    [theme.primary]
  );

  const [displayedNames, setDisplayedNames] = useState(reducedStatNames);

  const handlePress = useCallback(
    (name: string) => {
      switch (name) {
        case "speed":
          setDisplayedNames(speedStatNames);
          break;
        case "handling":
          setDisplayedNames(handlingStatNames);
          break;
        case "close":
          setDisplayedNames(reducedStatNames);
          break;
        default:
          handleSelectCompareStat(name);
          break;
      }
    },
    [handleSelectCompareStat]
  );

  const displayedButtons = useMemo(() => {
    const slots = Array.from({ length: NUMBER_OF_SLOTS });

    return slots.map((_, index) => {
      const name = displayedNames[index];

      if (name) {
        const { iconName, iconType, iconBackgroundColor } = statIconsList[name];
        return (
          <ButtonIcon
            key={name}
            onPress={() => handlePress(name)}
            tooltipText={name}
            iconName={iconName}
            iconType={iconType}
            style={{ backgroundColor: iconBackgroundColor }}
          />
        );
      } else {
        return <View key={`empty-${index}`} style={styles.buttonMissing} />;
      }
    });
  }, [displayedNames, statIconsList, handlePress]);

  return <View style={styles.buttonRowContainer}>{displayedButtons}</View>;
};

const styles = StyleSheet.create({
  buttonRowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonMissing: {
    width: BUTTON_SIZE,
  },
});

export default memo(StatSliderCompareSelector);
