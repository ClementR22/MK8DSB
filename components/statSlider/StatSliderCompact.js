import React, { useState, useRef, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";
import { translate } from "@/translations/translations";
import StatSliderCompactBar from "./StatSliderCompactBar";
import { getBonusColor } from "@/utils/getBonusColor";

const StatSliderCompact = ({ name, value, statFilterNumber = 0, chosenValue = false, isInSetCard = false }) => {
  const bonusEnabled = useMemo(() => !!chosenValue, [chosenValue]);
  const actualChosenValue = useMemo(() => chosenValue ?? value, [chosenValue, value]);

  const theme = useThemeStore((state) => state.theme);

  const [showBonusDefault, setShowBonusDefault] = useState(false);
  const [showBonus, setShowBonus] = useState(false);

  const lastPress = useRef(0);
  const isDoubleTapPending = useRef(false);

  const DOUBLE_PRESS_DELAY = 500;

  const bonusFound = useMemo(() => value - actualChosenValue, [value, actualChosenValue]);
  const bonusColor = useMemo(() => getBonusColor(bonusFound), [bonusFound]);

  const handlePressIn = useCallback(() => {
    const now = Date.now();
    const isDoubleTap = now - lastPress.current < DOUBLE_PRESS_DELAY;

    if (isDoubleTap) {
      isDoubleTapPending.current = true;
      setShowBonusDefault((prev) => !prev);
      // We need to base setShowBonus on the *new* showBonusDefault, so use the callback form
      setShowBonus((prev) => !prev);
    } else {
      // If not double tap, toggle setShowBonus based on showBonusDefault
      setShowBonus(!showBonusDefault);
    }

    lastPress.current = now;
  }, [showBonusDefault]);

  const handlePressOut = useCallback(() => {
    setShowBonus(showBonusDefault);
  }, [showBonusDefault]);

  const memoizedBorderColor = useMemo(
    () => getStatSliderBorderColor(statFilterNumber, theme),
    [statFilterNumber, theme]
  );

  /* setTimeout(() => {
      if (!isDoubleTapPending.current) {
        setShowBonus(showBonusDefault);
      } else {
        isDoubleTapPending.current = false;
      }
    }, DOUBLE_PRESS_DELAY); */

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          height: 34,
          width: "100%",
          flexDirection: "row",
          backgroundColor: theme.surface,
          padding: 3,
          borderRadius: 17,
          borderWidth: 2,
          borderColor: memoizedBorderColor, // Use the memoized border color
        },
        nameLabelContainer: {
          width: "22%",
          alignItems: "center",
          justifyContent: "center", // Added for better vertical alignment
        },
        nameLabel: {
          fontSize: 16,
          fontWeight: "bold",
          color: theme.on_surface,
        },
      }),
    [theme, memoizedBorderColor]
  );

  const bonusTextStyle = useMemo(() => {
    return [styles.nameLabel, showBonus && { color: bonusColor }];
  }, [styles.nameLabel, showBonus, bonusColor]);

  return (
    <Pressable
      style={styles.container}
      onPressIn={bonusEnabled ? handlePressIn : undefined}
      onPressOut={bonusEnabled ? handlePressOut : undefined}
    >
      {!isInSetCard && (
        <View style={styles.nameLabelContainer}>
          <Text style={styles.nameLabel}>{translate(name)}</Text>
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

export default React.memo(StatSliderCompact);
