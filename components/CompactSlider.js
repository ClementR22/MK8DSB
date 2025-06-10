import { useThemeStore } from "@/stores/useThemeStore";
import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getSliderBorderColor } from "@/utils/getSliderBorderColor";
import { translate } from "@/translations/translations";

const CompactSlider = ({ name = "Ground speed", value = 1, statFilterNumber }) => {
  const theme = useThemeStore((state) => state.theme);

  const percentage = (value * 100) / 6;
  const isValueInside = value >= 1.5;

  const styles = StyleSheet.create({
    container: {
      height: 34,
      width: "100%",
      backgroundColor: theme.surface,
      flexDirection: "row",
      borderRadius: 17,
      padding: 3,
      borderWidth: 2,
      borderColor: getSliderBorderColor(name, theme),
    },
    bar: {
      width: "78%",
      backgroundColor: theme.secondary_container,
      borderRadius: 12,
      alignItems: "flex-start",
    },
    fill: {
      height: "100%",
      width: `${percentage}%`,
      backgroundColor: theme.primary,
      borderRadius: 12,
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
    valueLabel: {
      fontSize: 16,
      fontWeight: "bold",
      position: "absolute",
      top: 1,
      color: theme.on_primary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.nameLabelContainer}>
        <Text style={styles.nameLabel}>{translate(name)}</Text>
      </View>

      <View style={styles.bar}>
        <View style={styles.fill}>
          <Text
            style={[
              styles.valueLabel,
              isValueInside ? { right: 10 } : { left: "100%", marginLeft: 10, color: theme.on_surface },
            ]}
          >
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CompactSlider;
