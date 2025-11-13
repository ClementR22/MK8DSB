import React, { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import Text from "@/primitiveComponents/Text";
import { StatName } from "@/data/stats/statsTypes";
import { statNamesCompact } from "@/data/stats/statsData";
import Tooltip from "../Tooltip";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";
import useThemeStore from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { getBonusColor } from "@/utils/getBonusColor";

interface StatGaugeContainerProps {
  name?: StatName;
  value: number;
  chosenValue?: number;
  statFilterNumber?: number;
  isInBuildCard?: boolean;
  onPress?: () => void;
  children: React.ReactElement;
}

const StatGaugeContainer = ({
  name,
  value,
  chosenValue,
  statFilterNumber,
  isInBuildCard = false,
  onPress,
  children,
}: StatGaugeContainerProps) => {
  const theme = useThemeStore((state) => state.theme);

  const bonusEnabled = chosenValue != undefined;

  const showAllStatGaugeBonuses = bonusEnabled ? useGeneralStore((state) => state.showAllStatGaugeBonuses) : false;
  const toggleAllStatGaugeBonuses = useGeneralStore((state) => state.toggleAllStatGaugeBonuses);

  // Bonus trouvé
  const { displayedValue, bonusColor } = useMemo(() => {
    let bonusFound = undefined;

    if (chosenValue !== undefined) {
      bonusFound = value - chosenValue;
    }

    let displayedValue: number | string;
    if (!showAllStatGaugeBonuses) {
      displayedValue = value;
    } else {
      if (bonusFound === undefined) {
        displayedValue = "?";
      } else if (bonusFound === 0) {
        displayedValue = "=";
      } else if (bonusFound > 0) {
        displayedValue = `+${bonusFound}`;
      } else {
        displayedValue = bonusFound;
      }
    }

    const bonusColor = getBonusColor(bonusFound);

    return { displayedValue, bonusColor };
  }, [value, chosenValue, showAllStatGaugeBonuses]);

  // Handler mémoïsé pour le press
  const handlePress = useCallback(() => {
    if (onPress) {
      onPress();
      return;
    }
    if (!bonusEnabled) return;
    toggleAllStatGaugeBonuses();
  }, [bonusEnabled, toggleAllStatGaugeBonuses]);

  return (
    <Tooltip
      tooltipText={name}
      childStyleOuter={styles.containerOuter}
      childStyleInner={[styles.containerInner, { borderColor: getStatSliderBorderColor(statFilterNumber, theme) }]}
      onPress={handlePress}
    >
      {name && (
        <Text
          role="label"
          size="large"
          style={styles[isInBuildCard ? "nameBuildCard" : "name"]}
          namespace="stats"
          textAlign="center"
        >
          {statNamesCompact[name]}
        </Text>
      )}
      {children}
      <Text
        role="label"
        size="large"
        style={styles[isInBuildCard ? "valueBuildCard" : "value"]}
        namespace="not"
        textAlign="center"
        color={showAllStatGaugeBonuses ? bonusColor : theme.on_surface}
      >
        {displayedValue}
      </Text>
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  containerOuter: {
    width: "100%",
  },
  containerInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: { width: 45, marginLeft: 3, marginRight: 8 },
  value: { width: 45, marginLeft: 13 },
  nameBuildCard: { width: 43, marginRight: 4 },
  valueBuildCard: { width: 48, marginLeft: 0 },
});

export default React.memo(StatGaugeContainer);
