import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";
import { translate } from "@/translations/translations";
import StatSliderCompactBar from "./StatSliderCompactBar";
import { getBonusColor } from "@/utils/getBonusColor";

const StatSliderCompact = ({ name, value, statFilterNumber = 0, chosenValue = false, isInSetCard = false }) => {
  const bonusEnabled = !!chosenValue;
  chosenValue = chosenValue ? chosenValue : value;

  const theme = useThemeStore((state) => state.theme);

  const [showBonusDefault, setShowBonusDefault] = useState(false);
  const [showBonus, setShowBonus] = useState(false);

  const lastPress = useRef(0);
  const isDoubleTapPending = useRef(false);

  const DOUBLE_PRESS_DELAY = 500;

  const bonusFound = value - chosenValue;
  const bonusColor = getBonusColor(bonusFound);

  const handlePressIn = () => {
    const now = Date.now();
    const isDoubleTap = now - lastPress.current < DOUBLE_PRESS_DELAY;

    if (isDoubleTap) {
      isDoubleTapPending.current = true;
      setShowBonusDefault(!showBonusDefault);
      setShowBonus(!showBonusDefault);
    } else {
      setShowBonus(!showBonusDefault);
    }

    lastPress.current = now;
  };

  const handlePressOut = () => {
    setShowBonus(showBonusDefault);

    /* setTimeout(() => {
      if (!isDoubleTapPending.current) {
        setShowBonus(showBonusDefault);
      } else {
        isDoubleTapPending.current = false;
      }
    }, DOUBLE_PRESS_DELAY); */
  };

  const styles = StyleSheet.create({
    container: {
      height: 34,
      width: "100%",
      flexDirection: "row",
      backgroundColor: theme.surface,
      padding: 3,
      borderRadius: 17,
      borderWidth: 2,
      borderColor: getStatSliderBorderColor(statFilterNumber, theme),
    },
    nameLabelContainer: {
      width: "22%",
      alignItems: "center",
    },
    nameLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.on_surface,
    },
  });

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

      <StatSliderCompactBar value={value} chosenValue={chosenValue} isInSetCard={isInSetCard} />

      {isInSetCard && (
        <View style={styles.nameLabelContainer}>
          <Text style={[styles.nameLabel, showBonus && { color: bonusColor }]}>{showBonus ? bonusFound : value}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default StatSliderCompact;
