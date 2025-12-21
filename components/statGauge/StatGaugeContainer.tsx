import React, { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import Text from "@/primitiveComponents/Text";
import { StatName } from "@/types";
import Tooltip from "../Tooltip";
import useThemeStore from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { getBonusColor } from "@/utils/getBonusColor";
import { useGameData } from "@/hooks/useGameData";
import { statsNamespaceByGame } from "@/translations/namespaces";
import useGameStore from "@/stores/useGameStore";
import { useScreen } from "@/contexts/ScreenContext";

interface StatGaugeContainerProps {
  name?: StatName;
  value: number;
  chosenValue?: number;
  isInBuildCard?: boolean;
  onPress?: () => void;
  children: React.ReactElement;
}

const StatGaugeContainer = ({
  name,
  value,
  chosenValue,
  isInBuildCard = false,
  onPress,
  children,
}: StatGaugeContainerProps) => {
  const game = useGameStore((state) => state.game);
  const { statNamesCompact } = useGameData();
  const theme = useThemeStore((state) => state.theme);
  const screenName = useScreen();

  const showAllStatGaugeBonuses = useGeneralStore((state) => state.showAllStatGaugeBonuses);
  const toggleAllStatGaugeBonuses = useGeneralStore((state) => state.toggleAllStatGaugeBonuses);

  // Bonus trouvé
  const { displayedValue, bonusColor } = useMemo(() => {
    let bonusFound = undefined;

    if (chosenValue !== undefined) {
      bonusFound = Math.round((value - chosenValue) * 100) / 100;
    }

    let displayedValue: number | string;
    if (!isInBuildCard || !showAllStatGaugeBonuses) {
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
    if (isInBuildCard && chosenValue !== undefined) {
      toggleAllStatGaugeBonuses();
    }
  }, [isInBuildCard, chosenValue, toggleAllStatGaugeBonuses]);

  const tooltipText = screenName === "display" ? "clickToScrollToTheCorrespondingBuild" : name;
  const namespace = screenName === "display" ? undefined : statsNamespaceByGame[game];

  return (
    <Tooltip
      tooltipText={tooltipText}
      childStyleOuter={styles.containerOuter}
      childStyleInner={styles.containerInner}
      onPress={handlePress}
      namespace={namespace}
    >
      {name && (
        <Text
          role="label"
          size="large"
          style={styles[isInBuildCard ? "nameBuildCard" : "name"]}
          namespace={statsNamespaceByGame[game]}
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
        textAlign={isInBuildCard ? "center" : "left"}
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
  value: { width: 45, marginLeft: 8 },
  nameBuildCard: { width: 43, marginRight: 4 },
  valueBuildCard: { width: 48, marginLeft: 0 },
});

export default React.memo(StatGaugeContainer);
