import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";
import { translate } from "@/translations/translations";
import { getBonusColor } from "@/utils/getBonusColor";
import useGeneralStore from "@/stores/useGeneralStore";
import { BORDER_RADIUS_STAT_GAUGE_CONTAINER, HEIGHT_STAT_GAUGE_CONTAINER } from "@/utils/designTokens";
import Text from "@/primitiveComponents/Text";

interface StatGaugeContainerProps {
  name: string;
  value: number;
  statFilterNumber?: number;
  chosenValue?: number;
  isInSetCard?: boolean;
  bonusEnabled?: boolean;
  children: React.ReactElement;
}

const WIDTH_TEXT = 46;

const StatGaugeContainer = ({
  name,
  value,
  statFilterNumber = 0,
  chosenValue,
  isInSetCard = false,
  bonusEnabled = false,
  children,
}: StatGaugeContainerProps) => {
  const theme = useThemeStore((state) => state.theme);

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
    if (!bonusEnabled) return;
    toggleAllStatGaugeBonuses();
  }, [bonusEnabled, toggleAllStatGaugeBonuses]);

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: getStatSliderBorderColor(statFilterNumber, theme),
        },
      ]}
      onPress={handlePress}
    >
      <View
        style={[
          styles.textWrapper,
          {
            width: WIDTH_TEXT,
          },
        ]}
      >
        <Text role="label" size="large">
          {translate(name)}
        </Text>
      </View>

      {children}

      {isInSetCard && (
        <View
          style={[
            styles.textWrapper,
            {
              width: WIDTH_TEXT,
            },
          ]}
        >
          <Text role="label" size="large" color={showAllStatGaugeBonuses && bonusColor}>
            {displayedValue}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEIGHT_STAT_GAUGE_CONTAINER,
    width: "100%",
    flexDirection: "row",
    padding: 3,
    borderRadius: BORDER_RADIUS_STAT_GAUGE_CONTAINER,
    borderWidth: 2,
    alignItems: "center",
  },
  textWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default React.memo(StatGaugeContainer);
