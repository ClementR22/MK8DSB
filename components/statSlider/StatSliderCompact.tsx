import React, { useState, useRef, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, Pressable, ViewStyle, TextStyle } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";
import { translate } from "@/translations/translations";
import StatSliderCompactBar from "./StatSliderCompactBar";
import { getBonusColor } from "@/utils/getBonusColor";

interface StatSliderCompactProps {
  name: string;
  value: number;
  statFilterNumber?: number;
  chosenValue?: number | undefined;
  isInSetCard?: boolean;
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

  const containerStyle = useMemo(() => {
    const borderColor = getStatSliderBorderColor(statFilterNumber, theme);
    return StyleSheet.flatten([styles.container, { backgroundColor: theme.surface, borderColor: borderColor }]);
  }, [theme, statFilterNumber]);

  const dynamicTextColor = useMemo(
    () => ({
      color: theme.on_surface,
    }),
    [theme.on_surface]
  );

  const nameStyle = useMemo(() => {
    return StyleSheet.flatten([styles.text, dynamicTextColor]);
  }, [dynamicTextColor]);

  const valueStyle = useMemo(() => {
    return StyleSheet.flatten([styles.text, showBonus && { color: bonusColor }]);
  }, [dynamicTextColor, showBonus, bonusColor]);

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
      style={containerStyle}
      onPressIn={bonusEnabled ? handlePressIn : undefined}
      onPressOut={bonusEnabled ? handlePressOut : undefined}
    >
      {!isInSetCard && (
        <View style={styles.nameContainer}>
          <Text style={nameStyle}>{translate(name)}</Text>
        </View>
      )}

      <StatSliderCompactBar value={value} chosenValue={actualChosenValue} isInSetCard={isInSetCard} />

      {isInSetCard && (
        <View style={styles.nameContainer}>
          <Text style={valueStyle}>{showBonus ? bonusFound : value}</Text>
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
    alignItems: "center",
  },
  nameContainer: {
    width: "22%",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
});

export default React.memo(StatSliderCompact);
