// StatSelector.tsx
import React, { useMemo, useState, useCallback } from "react";
import { View } from "react-native";
import ButtonAndModal from "../modal/ButtonAndModal";
import DoubleEntryTable, { ColumnName, StatToggleMap } from "./DoubleEntryTable";
import useStatsStore, { ChosenStat } from "@/stores/useStatsStore";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import useResultStatsDefaultStore from "@/stores/useResultStatsDefaultStore";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import useThemeStore from "@/stores/useThemeStore";
import ResultStatsSyncSwitch from "./ResultStatsSyncSwitch";
import { ScreenName, useScreen } from "@/contexts/ScreenContext";
import { statNames } from "@/data/stats/statsData";

interface StatSelectorProps {
  triggerButtonText?: string;
  tooltipText: string;
  children?: React.ReactNode;
}

const getColumnsConfig = (screenName: string): ColumnName[] =>
  screenName === "search" ? ["chosenStats", "resultStats"] : ["resultStats"];

const getTriggerConfig = (screenName: ScreenName) => {
  const customTrigger =
    screenName === "search" || screenName === "save" ? (
      <ButtonIcon
        tooltipText={screenName === "search" ? "desiredStatsAndStatsInBuilds" : "displayedStatsInBuilds"}
        iconName="checkbox-multiple-marked"
        iconType={IconType.MaterialCommunityIcons}
      />
    ) : null;

  const modalTitle =
    screenName === "search"
      ? "desiredStatsAndStatsInBuilds"
      : screenName === "display"
      ? "statsToCompare"
      : screenName === "save"
      ? "displayedStatsInBuilds"
      : "defaultDisplayedStats";

  return { customTrigger, modalTitle };
};

const StatSelector: React.FC<StatSelectorProps> = ({ triggerButtonText, tooltipText, children }) => {
  const theme = useThemeStore((state) => state.theme);
  const screenName = useScreen();

  const { chosenStats, setChosenStats } = useStatsStore();
  const { resultStats, setResultStats } = useResultStats();
  const { resultStatsDefault, setResultStatsDefault, isResultStatsSync } = useResultStatsDefaultStore();

  const columns = useMemo(() => getColumnsConfig(screenName), [screenName]);
  const { customTrigger, modalTitle } = useMemo(() => getTriggerConfig(screenName), [screenName]);

  // 🔹 Fusion de tous les stats dans un map par statName
  const [statMap, setStatMap] = useState<StatToggleMap>(() => {
    const map: StatToggleMap = {};
    statNames.forEach((name) => {
      map[name] = {
        chosenStats: chosenStats.find((s) => s.name === name)?.checked ?? false,
        resultStats:
          screenName === "settings"
            ? resultStatsDefault.find((s) => s.name === name)?.checked ?? false
            : resultStats.find((s) => s.name === name)?.checked ?? false,
      };
    });
    return map;
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resultStatsBeforeSync, setResultStatsBeforeSync] = useState(resultStats);

  const toggleStat = useCallback(
    (statName: string, columnName: ColumnName) => {
      setStatMap((prev) => {
        const current = prev[statName][columnName];
        const newChecked = !current;

        // keep at least one selected for chosenStats in search
        if (columnName === "chosenStats" && columns.includes("chosenStats") && !newChecked) {
          const othersChecked = Object.entries(prev)
            .filter(([key]) => key !== statName)
            .some(([, val]) => val.chosenStats);
          if (!othersChecked) return prev;
        }

        const updated: StatToggleMap = { ...prev, [statName]: { ...prev[statName], [columnName]: newChecked } };

        // sync chosenStats -> resultStats if needed
        if (isResultStatsSync && columnName === "chosenStats" && screenName === "search") {
          updated[statName].resultStats = newChecked;
        }

        return updated;
      });
    },
    [columns, isResultStatsSync, screenName]
  );

  const handleModalClose = useCallback(() => {
    // Mise à jour des stores
    const chosenUpdated: ChosenStat[] = [];
    const resultUpdated: ResultStat[] = [];
    const resultDefaultUpdated: ResultStat[] = [];

    Object.entries(statMap).forEach(([name, vals], statIndex) => {
      if (columns.includes("chosenStats")) {
        const prev = chosenStats[statIndex];
        chosenUpdated.push({ ...prev, name, checked: vals.chosenStats } as ChosenStat);
      }

      if (columns.includes("resultStats")) {
        if (screenName === "settings") resultDefaultUpdated.push({ name, checked: vals.resultStats } as ResultStat);
        else resultUpdated.push({ name, checked: vals.resultStats } as ResultStat);
      }
    });

    if (columns.includes("chosenStats")) setChosenStats(chosenUpdated);
    if (screenName === "settings") setResultStatsDefault(resultDefaultUpdated);
    else setResultStats(resultUpdated);
  }, [statMap, columns, screenName, setChosenStats, setResultStats, setResultStatsDefault]);

  return (
    <ButtonAndModal
      customTrigger={customTrigger}
      triggerButtonText={triggerButtonText}
      tooltipText={tooltipText}
      modalTitle={modalTitle}
      isModalVisibleProp={isModalVisible}
      setIsModalVisibleProp={setIsModalVisible}
      onModalClose={handleModalClose}
    >
      <View style={{ backgroundColor: theme.surface, padding: 16 }}>
        {children}
        {screenName === "search" && (
          <ResultStatsSyncSwitch
            resultStats={Object.entries(statMap).map(
              ([name, val]) => ({ name, checked: val.resultStats } as ResultStat)
            )}
            setResultStats={(newList) =>
              setStatMap((prev) => {
                const updated = { ...prev };
                newList.forEach((s) => {
                  if (updated[s.name]) updated[s.name].resultStats = s.checked;
                });
                return updated;
              })
            }
            resultStatsBeforeSync={resultStatsBeforeSync}
            setResultStatsBeforeSync={setResultStatsBeforeSync}
            chosenStats={Object.entries(statMap).map(
              ([name, val]) => ({ name, checked: val.chosenStats } as ChosenStat)
            )}
          />
        )}
        <DoubleEntryTable
          statMap={statMap}
          columns={columns}
          onToggleStat={toggleStat}
          disabled={isResultStatsSync && screenName === "search"}
        />
      </View>
    </ButtonAndModal>
  );
};

export default React.memo(StatSelector);
