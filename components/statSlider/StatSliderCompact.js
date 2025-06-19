import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";
import { translate } from "@/translations/translations";
import StatSliderCompactBar from "./StatSliderCompactBar";

const StatSliderCompact = ({ name, value, statFilterNumber = 0, chosenValue = undefined, isInSetCard = false }) => {
  const theme = useThemeStore((state) => state.theme);

  const styles = StyleSheet.create({
    container: {
      height: 34,
      width: "100%",
      backgroundColor: theme.surface,
      flexDirection: "row",
      borderRadius: 17,
      padding: 3,
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
    <View style={styles.container}>
      {!isInSetCard && (
        <View style={styles.nameLabelContainer}>
          <Text style={styles.nameLabel}>{translate(name)}</Text>
        </View>
      )}

      <StatSliderCompactBar value={value} chosenValue={chosenValue} isInSetCard={isInSetCard} />

      {isInSetCard && (
        <View style={styles.nameLabelContainer}>
          <Text style={styles.nameLabel}>{value}</Text>
        </View>
      )}
    </View>
  );
};

export default StatSliderCompact;
