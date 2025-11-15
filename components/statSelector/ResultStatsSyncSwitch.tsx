import React, { useCallback, useEffect } from "react";
import useResultStatsDefaultStore from "@/stores/useResultStatsDefaultStore";
import { ResultStats } from "@/contexts/ResultStatsContext";
import { ChosenStat } from "@/stores/useStatsStore";
import ToggleSwitch from "toggle-switch-react-native";
import useThemeStore from "@/stores/useThemeStore";
import { StyleSheet, View } from "react-native";
import Text from "@/primitiveComponents/Text";

interface ResultStatsSyncSwitchProps {
  resultStats: ResultStats;
  setResultStats: (newStatList: ResultStats) => void;
  resultStatsBeforeSync: ResultStats;
  setResultStatsBeforeSync: (newStatList: ResultStats) => void;
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

  // toggle switch
  const handleToggleSwitch = useCallback(
    (newIsResultStatsSync: boolean) => {
      setIsResultStatsSync(newIsResultStatsSync);

      if (newIsResultStatsSync) {
        setResultStatsBeforeSync(resultStats);

        const updated = resultStats.map((stat, i) => {
          const match = chosenStats.find((c) => c.name === stat.name);
          if (!match) return stat; // pas trouvé, pas de changement
          if (stat.checked === match.checked) return stat; // inchangé
          return { ...stat, checked: match.checked }; // seulement si checked change
        });
        setResultStats(updated);
      } else {
        setResultStats(resultStatsBeforeSync);
      }
    },
    [resultStats, resultStatsBeforeSync, chosenStats, setResultStatsBeforeSync, setResultStats, setIsResultStatsSync]
  );

  // auto-sync quand chosenStats change et que le mode sync est actif
  useEffect(() => {
    if (!isResultStatsSync) return;

    const updated = resultStats.map((stat, i) => {
      const match = chosenStats.find((c) => c.name === stat.name);
      if (!match) return stat; // pas trouvé, pas de changement
      if (stat.checked === match.checked) return stat; // inchangé
      return { ...stat, checked: match.checked }; // seulement si checked change
    });
    setResultStats(updated);
  }, [chosenStats, setResultStats]);

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
  container: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 5 },
});

export default React.memo(ResultStatsSyncSwitch);
