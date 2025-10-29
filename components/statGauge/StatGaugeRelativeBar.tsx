import { useThemeStore } from "@/stores/useThemeStore";
import React from "react";
import { StyleSheet, View } from "react-native";
import { getBonusColor } from "@/utils/getBonusColor";
import { useStatGaugeStyles } from "@/hooks/useStatGaugeStyles";
import { useGaugeMetrics } from "@/hooks/useGaugeMetrics";
import Text from "@/primitiveComponents/Text";

interface StatGaugeRelativeBarProps {
  value: number;
  maxValue?: number;
}

const StatGaugeRelativeBar = ({ value, maxValue = 6 }: StatGaugeRelativeBarProps) => {
  const theme = useThemeStore((state) => state.theme);

  const { gaugeWidth, handleGaugeLayout } = useGaugeMetrics("stat-gauge-gallery");

  const fillWidth = (gaugeWidth * Math.abs(value)) / (maxValue * 2);

  const showValueInside = Math.abs(value) > maxValue / 2;

  const { emptyContainer, thick } = useStatGaugeStyles();

  return (
    <View style={emptyContainer} onLayout={handleGaugeLayout}>
      {/* Ligne noire centrale */}
      <View style={[styles.zeroLine, { left: gaugeWidth / 2 - 1 }]} />
      {/* Fill principal */}
      <View
        style={[
          thick,
          {
            backgroundColor: getBonusColor(value) ?? theme.primary,
            width: fillWidth,
            position: "absolute",
          },
          value > 0
            ? { left: gaugeWidth / 2, borderTopRightRadius: 12, borderBottomRightRadius: 12 }
            : {
                right: gaugeWidth / 2,
                borderTopLeftRadius: 12,
                borderBottomLeftRadius: 12,
              },
        ]}
      >
        {/* Valeur à l'intérieur de la barre */}
        {showValueInside && (
          <Text role="label" size="large" style={value > 0 ? { right: -5 } : { left: 5 }} namespace="not">
            {value > 0 ? `+${value}` : value}
          </Text>
        )}
      </View>

      {/* Valeur en dehors de la barre */}
      {!showValueInside && (
        <Text
          role="label"
          size="large"
          style={
            value > 0
              ? { left: gaugeWidth / 2 + fillWidth + 2 }
              : value < 0
              ? { position: "absolute", right: gaugeWidth / 2 + fillWidth + 4 }
              : { left: gaugeWidth / 2 + fillWidth + 6 }
          }
          namespace="not"
        >
          {value > 0 ? `+${value}` : value}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  zeroLine: {
    position: "absolute",
    width: 2,
    height: "100%",
    backgroundColor: "black",
    zIndex: 1,
  },
  valueLabelInsidePosition: {
    position: "absolute",
    right: 7,
  },
});

export default React.memo(StatGaugeRelativeBar);
