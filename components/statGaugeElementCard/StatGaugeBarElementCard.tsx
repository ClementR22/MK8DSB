import { MAX_STAT_VALUE } from "@/constants/constants";
import { useGaugeMetrics } from "@/hooks/useGaugeMetrics";
import { useStatGaugeStyles } from "@/hooks/useStatGaugeStyles";
import Text from "@/primitiveComponents/Text";
import useThemeStore from "@/stores/useThemeStore";
import React from "react";
import { StyleSheet, View } from "react-native";

interface StatGaugeBarElementCardProps {
  value: number;
}

const StatGaugeBarElementCard = ({ value }: StatGaugeBarElementCardProps) => {
  const theme = useThemeStore((state) => state.theme);

  const { getWidth, handleGaugeLayout } = useGaugeMetrics("stat-gauge-gallery");

  const showValueInside = value >= MAX_STAT_VALUE / 4;

  const stylesDynamic = useStatGaugeStyles("100%");

  return (
    <View style={stylesDynamic.emptyContainer} onLayout={handleGaugeLayout}>
      {/* Fill principal */}
      <View
        style={[
          stylesDynamic.thick,
          {
            backgroundColor: theme.primary,
            width: getWidth(value),
          },
        ]}
      >
        {showValueInside && (
          <Text role="label" size="large" inverse style={styles.valueLabelInsidePosition} namespace="not">
            {value}
          </Text>
        )}
      </View>

      {/* Valeur en dehors de la barre */}
      {!showValueInside && (
        <Text role="label" size="large" style={styles.valueLabelOutsidePosition} namespace="not">
          {value}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  valueLabelInsidePosition: {
    position: "absolute",
    right: 7,
  },
  valueLabelOutsidePosition: {
    marginLeft: 7,
  },
});

export default React.memo(StatGaugeBarElementCard);
