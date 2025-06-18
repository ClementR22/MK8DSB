import React from "react";
import { useResultStats } from "@/contexts/ResultStatsContext";
import { StyleSheet, Text, View } from "react-native";
import { compactStatNames } from "@/data/data";
import { translateToLanguage } from "@/translations/translations";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { useThemeStore } from "@/stores/useThemeStore";

const StatNamesFloatingContainer = () => {
  const language = useLanguageStore((state) => state.language);
  const theme = useThemeStore((state) => state.theme);
  const { resultStats } = useResultStats();
  const resultStatsChecked = resultStats?.filter((stat) => stat.checked) ?? [];

  const nbSlider = resultStatsChecked.length;
  const padding = 10;
  const tailleStatSliderResult = 34;
  const gap = 10;
  const borderWidth = 2;
  const height = 2 * padding + tailleStatSliderResult * nbSlider + (nbSlider - 1) * gap + 2 * borderWidth;

  const tailleSetCard = 360;
  const paddingAvantSetCard = 20;
  const gapTopStatSliderResultContainer = 8;

  const styles = StyleSheet.create({
    setCardContainer: {
      margin: 16,
      marginTop: 0,
      padding: 20,
      alignItems: "stretch",
      //backgroundColor: theme.surface_container_high,
      borderRadius: 24,
      columnGap: 16,
      flexDirection: "row",
      flexGrow: 1,
      justifyContent: "center", // utile pour l'icon chat-question
    },
    floatingLabelContainer: {
      backgroundColor: theme.surface,
      borderWidth: borderWidth,
      borderColor: theme.outline_variant,
      position: "absolute",
      left: 0,
      top: tailleSetCard + paddingAvantSetCard + gapTopStatSliderResultContainer - 2, // ajuste selon la position des sliders
      height: height,
      borderTopRightRadius: 12,
      borderBottomRightRadius: 12,
      paddingVertical: 8,
      zIndex: 10, // au-dessus de la ScrollView
      gap: 10,
    },
    nameLabelContainer: {
      height: tailleStatSliderResult,
      justifyContent: "center",
      alignItems: "center",
      width: 50,
    },
    nameLabel: {
      fontSize: 12,
      fontWeight: "bold",
      color: theme.on_surface,
    },
  });

  return (
    <View style={styles.floatingLabelContainer}>
      {resultStatsChecked.map((stat, index) => {
        const compactName = compactStatNames[stat.name];
        return (
          <View key={index} style={styles.nameLabelContainer}>
            <Text style={styles.nameLabel}>{translateToLanguage(compactName, language)}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default StatNamesFloatingContainer;
