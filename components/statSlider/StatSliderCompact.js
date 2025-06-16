import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";
import { translate } from "@/translations/translations";

const StatSliderCompact = ({ name = "Ground speed", value = 1, statFilterNumber }) => {
  const theme = useThemeStore((state) => state.theme);

  const percentage = (value * 100) / 6;
  const isValueInside = value >= 1;

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
    bar: {
      width: "78%",
      backgroundColor: theme.secondary_container,
      flexDirection: "row",
      borderRadius: 12,
      position: "relative", // au cas où
      alignItems: "flex-start",
    },
    fill: {
      // position: "absolute",
      height: "100%",
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
      top: 0,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.nameLabelContainer}>
        <Text style={styles.nameLabel}>{translate(name)}</Text>
      </View>

      <View style={styles.bar}>
        {/* Barre de remplissage en fond */}
        <View
          style={[
            styles.fill,
            {
              width: `${percentage}%`,
            },
          ]}
        >
          {isValueInside && (
            <Text
              style={[
                styles.valueLabel,
                {
                  position: "absolute",
                  right: 7,
                  color: theme.on_primary,
                }, // décalé à gauche par rapport au bord droit dans fill
              ]}
            >
              {value}
            </Text>
          )}
        </View>

        {/* Texte positionné par rapport à fill */}
        {!isValueInside && (
          <Text
            style={[
              styles.valueLabel,
              { marginLeft: 7, color: theme.on_surface }, // à droite de fill
            ]}
          >
            {value}
          </Text>
        )}
      </View>
    </View>
  );
};

export default StatSliderCompact;
