import React from "react";
import { View, StyleSheet } from "react-native";
import StatGaugeContainer from "../statGauge/StatGaugeContainer";
import { StatName } from "@/types";
import { useBuildCardStyle } from "@/hooks/useBuildCardStyle";
import Text from "@/primitiveComponents/Text";
import StatGaugeBar from "../statGauge/StatGaugeBar";
import useBuildsListStore from "@/stores/useBuildsListStore";
import { useScreen } from "@/contexts/ScreenContext";
interface BuildIdAndStatValue {
  id: string;
  value: number;
  color: string;
}

interface StatGaugeContainerCompareProps {
  name: StatName;
  buildsIdAndValue: BuildIdAndStatValue[];
}

const StatGaugeContainerCompare: React.FC<StatGaugeContainerCompareProps> = ({ buildsIdAndValue, name }) => {
  const { buildCardStyle } = useBuildCardStyle("100%");
  const screenName = useScreen();

  const setScrollRequest = useBuildsListStore((state) => state.setScrollRequest);

  return (
    <View style={[buildCardStyle, styles.container]}>
      <Text role="title" size="medium" style={styles.textWrapper} namespace="stats">
        {name}
      </Text>

      <View style={styles.statBarsContainer}>
        {buildsIdAndValue.map(({ id, value, color }) => (
          <StatGaugeContainer key={id} value={value} onPress={() => setScrollRequest(screenName, id)}>
            <StatGaugeBar value={value} color={color}></StatGaugeBar>
          </StatGaugeContainer>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 7, paddingTop: 3, paddingRight: 0 },
  textWrapper: {
    marginBottom: 4, // Espacement entre le titre et les barres de stat
  },
  statBarsContainer: {
    width: "100%",
    gap: 0,
  },
});

export default React.memo(StatGaugeContainerCompare);
