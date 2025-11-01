import React, { useCallback, useEffect, useMemo } from "react";
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

  // Gestion du toggle du switch
  const handleToggleSwitch = useCallback(
    (newIsResultStatsSync: boolean) => {
      setIsResultStatsSync(newIsResultStatsSync);

      if (newIsResultStatsSync) {
        // Activation du mode synchronisé
        setResultStatsBeforeSync(resultStats);
        setResultStats(chosenStats);
      } else {
        // Désactivation du mode synchronisé
        setResultStats(resultStatsBeforeSync);
      }
    },
    [resultStats, resultStatsBeforeSync, chosenStats, setResultStatsBeforeSync, setResultStats, setIsResultStatsSync]
  );

  // Auto-sync quand les chosenStats changent et que le mode sync est actif
  useEffect(() => {
    if (isResultStatsSync) {
      setResultStats(chosenStats);
    }
  }, [chosenStats, setResultStats]);

  return (
    <View style={styles.container}>
      <ToggleSwitch
        isOn={isResultStatsSync}
        onColor={theme.primary}
        offColor={theme.outline_variant}
        size="medium"
        onToggle={handleToggleSwitch}
      />
      <Text role="title" size="small" namespace="text">
        matchDesiredStats
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 5 },
});
export default React.memo(ResultStatsSyncSwitch);
