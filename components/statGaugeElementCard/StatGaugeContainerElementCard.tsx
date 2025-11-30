import React from "react";
import { View, StyleSheet } from "react-native";
import useThemeStore from "@/stores/useThemeStore";
import { BORDER_RADIUS_STAT_GAUGE_CONTAINER, HEIGHT_STAT_GAUGE_CONTAINER } from "@/utils/designTokens";
import Text from "@/primitiveComponents/Text";
import Tooltip from "../Tooltip";
import { StatName } from "@/types";
import { useGameData } from "@/hooks/useGameData";
import { statsNamespaceByGame } from "@/translations/namespaces";
import useGameStore from "@/stores/useGameStore";

interface StatGaugeContainerElementCardProps {
  name: StatName;
  children: React.ReactElement;
}

const WIDTH_TEXT = 46;

const StatGaugeContainerElementCard = ({ name, children }: StatGaugeContainerElementCardProps) => {
  const game = useGameStore((state) => state.game);

  const { statNamesCompact } = useGameData();
  const theme = useThemeStore((state) => state.theme);

  return (
    <Tooltip
      tooltipText={name}
      namespace={statsNamespaceByGame[game]}
      childStyleInner={[
        styles.container,
        {
          backgroundColor: theme.surface,
          borderColor: theme.outline_variant,
        },
      ]}
    >
      <View
        style={[
          styles.textWrapper,
          {
            width: WIDTH_TEXT,
          },
        ]}
      >
        <Text role="label" size="large" namespace={statsNamespaceByGame[game]}>
          {statNamesCompact[name]}
        </Text>
      </View>

      {children}
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEIGHT_STAT_GAUGE_CONTAINER,
    width: "100%",
    flexDirection: "row",
    padding: 3,
    borderRadius: BORDER_RADIUS_STAT_GAUGE_CONTAINER,
    borderWidth: 2,
    alignItems: "center",
  },
  textWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});

export default React.memo(StatGaugeContainerElementCard);
