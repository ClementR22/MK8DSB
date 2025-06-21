import React, { useState, useRef, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, Pressable, ViewStyle, TextStyle } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";
import { translate } from "@/translations/translations";
import StatSliderCompactBar from "./StatSliderCompactBar";
import { getBonusColor } from "@/utils/getBonusColor";

interface StatSliderCompactProps {
  name: string;
  value: number; // Assuming value is a number
  statFilterNumber?: number; // Assuming number, default is 0
  chosenValue?: number | undefined; // Can be a number or undefined
  isInSetCard?: boolean; // Default is false
}

const DOUBLE_PRESS_DELAY = 500;

const StatSliderCompact = ({
  name,
  value,
  statFilterNumber = 0,
  chosenValue = undefined,
  isInSetCard = false,
}: StatSliderCompactProps) => {
  const theme = useThemeStore((state) => state.theme);

  const bonusEnabled = useMemo(() => chosenValue !== undefined, [chosenValue]);
  const actualChosenValue = useMemo(() => chosenValue ?? value, [chosenValue, value]);
  const bonusFound = useMemo(() => value - actualChosenValue, [value, actualChosenValue]);
  const bonusColor = useMemo(() => getBonusColor(bonusFound), [bonusFound]);

  const [showBonusDefault, setShowBonusDefault] = useState(false);
  const [showBonus, setShowBonus] = useState(false);

  const lastPress = useRef(0);

  const dynamicContainerStyles = useMemo(
    () => ({
      backgroundColor: theme.surface,
      borderColor: getStatSliderBorderColor(statFilterNumber, theme),
    }),
    [theme, statFilterNumber]
  );

  const nameLabelColorStyle = useMemo(
    () => ({
      color: theme.on_surface,
    }),
    [theme.on_surface]
  );

  const bonusTextStyle = useMemo(() => {
    return StyleSheet.flatten([styles.nameLabel, showBonus && { color: bonusColor }]);
  }, [nameLabelColorStyle, showBonus, bonusColor]);

  const handlePressIn = useCallback(() => {
    if (!bonusEnabled) return;

    const now = Date.now();
    const isDoubleTap = now - lastPress.current < DOUBLE_PRESS_DELAY;

    if (isDoubleTap) {
      setShowBonusDefault((prev) => {
        const newDefault = !prev;
        setShowBonus(newDefault);
        return newDefault;
      });
    } else {
      setShowBonus(!showBonusDefault);
    }
    lastPress.current = now;
  }, [bonusEnabled, showBonusDefault]);

  const handlePressOut = useCallback(() => {
    if (!bonusEnabled) return;
    setShowBonus(showBonusDefault);
  }, [bonusEnabled, showBonusDefault]);

  return (
    <Pressable
      style={StyleSheet.flatten([styles.container, dynamicContainerStyles])}
      onPressIn={bonusEnabled ? handlePressIn : undefined}
      onPressOut={bonusEnabled ? handlePressOut : undefined}
    >
      {!isInSetCard && (
        <View style={styles.nameLabelContainer}>
          <Text style={StyleSheet.flatten([styles.nameLabel, nameLabelColorStyle])}>{translate(name)}</Text>
        </View>
      )}

      <StatSliderCompactBar value={value} chosenValue={actualChosenValue} isInSetCard={isInSetCard} />

      {isInSetCard && (
        <View style={styles.nameLabelContainer}>
          <Text style={bonusTextStyle}>{showBonus ? bonusFound : value}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 34,
    width: "100%",
    flexDirection: "row",
    padding: 3,
    borderRadius: 17,
    borderWidth: 2,
  },
  nameLabelContainer: {
    width: "22%",
    alignItems: "center",
    justifyContent: "center",
  },
  nameLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default React.memo(StatSliderCompact);
