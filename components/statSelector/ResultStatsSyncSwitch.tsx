import React, { useCallback } from "react";
import useResultStatsDefaultStore from "@/stores/useResultStatsDefaultStore";
import { ResultStat } from "@/types";
import { ChosenStat } from "@/types";
import ToggleSwitch from "toggle-switch-react-native";
import useThemeStore from "@/stores/useThemeStore";
import { StyleSheet, View } from "react-native";
import Text from "@/primitiveComponents/Text";

interface ResultStatsSyncSwitchProps {
  resultStats: ResultStat[];
  setResultStats: (newStatList: ResultStat[]) => void;
  resultStatsBeforeSync: ResultStat[];
  setResultStatsBeforeSync: (newStatList: ResultStat[]) => void;
  chosenStats: ChosenStat[];
}

const ResultStatsSyncSwitch: React.FC<ResultStatsSyncSwitchProps> = ({
  resultStats,
  setResultStats,
  resultStatsBeforeSync,
  setResultStatsBeforeSync,
  chosenStats,
}) => {
  const theme = useThemeStore((state) => state.theme);
  const isResultStatsSync = useResultStatsDefaultStore((state) => state.isResultStatsSync);
  const setIsResultStatsSync = useResultStatsDefaultStore((state) => state.setIsResultStatsSync);

  const handleToggleSwitch = useCallback(
    (newIsResultStatsSync: boolean) => {
      setIsResultStatsSync(newIsResultStatsSync);

      if (newIsResultStatsSync) {
        // Sauvegarder l'état actuel avant la synchronisation
        setResultStatsBeforeSync([...resultStats]);

        // Synchroniser resultStats avec chosenStats
        const updated = resultStats.map((stat) => {
          const match = chosenStats.find((c) => c.name === stat.name);
          if (!match) return stat;
          if (stat.checked === match.checked) return stat;
          return { ...stat, checked: match.checked };
        });
        setResultStats(updated);
      } else {
        // Restaurer l'état sauvegardé
        setResultStats([...resultStatsBeforeSync]);
      }
    },
    [resultStats, resultStatsBeforeSync, chosenStats, setResultStatsBeforeSync, setResultStats, setIsResultStatsSync]
  );

  return (
    <View style={styles.container}>
      <ToggleSwitch
        isOn={isResultStatsSync}
        onColor={theme.primary}
        thumbOnStyle={{ backgroundColor: theme.on_primary }}
        offColor={theme.outline_variant}
        thumbOffStyle={{ backgroundColor: theme.outline }}
        size="medium"
        onToggle={handleToggleSwitch}
      />
      <View style={{ flex: 1 }}>
        <Text role="title" size="small" namespace="text">
          {isResultStatsSync ? "matchDesiredStats" : "unmatchDesiredStats"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
});

export default React.memo(ResultStatsSyncSwitch);
