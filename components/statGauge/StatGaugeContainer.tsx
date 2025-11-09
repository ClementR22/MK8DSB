import React from "react";
import { StyleSheet } from "react-native";
import Text from "@/primitiveComponents/Text";
import { StatName } from "@/data/stats/statsTypes";
import { statNamesCompact } from "@/data/stats/statsData";
import Tooltip from "../Tooltip";

interface StatGaugeContainerProps {
  value: number;
  name?: StatName;
  isInBuildCard?: boolean;
  scrollToThisBuildCard?: () => void;
  children: React.ReactElement;
}

const StatGaugeContainer = ({
  value,
  name,
  isInBuildCard = false,
  scrollToThisBuildCard,
  children,
}: StatGaugeContainerProps) => {
  return (
    <Tooltip
      tooltipText={name}
      childStyleOuter={styles.containerOuter}
      childStyleInner={styles.containerInner}
      onPress={scrollToThisBuildCard}
    >
      {name && (
        <Text
          role="label"
          size="large"
          style={styles[isInBuildCard ? "nameBuildCard" : "name"]}
          namespace="stats"
          textAlign="center"
        >
          {statNamesCompact[name]}
        </Text>
      )}
      {children}
      <Text role="label" size="large" style={styles[isInBuildCard ? "valueBuildCard" : "value"]} namespace="not">
        {value}
      </Text>
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  containerOuter: {
    width: "100%",
  },
  containerInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: { width: 45, marginLeft: 3, marginRight: 8 },
  value: { width: 45, marginLeft: 13 },
  nameBuildCard: { width: 43, marginRight: 4 },
  valueBuildCard: { width: 43, marginLeft: 10 },
});

export default React.memo(StatGaugeContainer);
