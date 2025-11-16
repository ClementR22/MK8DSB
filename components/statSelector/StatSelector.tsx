import React, { useEffect, useMemo, useState, useCallback } from "react";
import { View } from "react-native";
import ButtonAndModal from "../modal/ButtonAndModal";
import DoubleEntryTable, { ColumnName, StatList } from "./DoubleEntryTable";
import useStatsStore, { ChosenStat } from "@/stores/useStatsStore";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import useResultStatsDefaultStore from "@/stores/useResultStatsDefaultStore";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import useThemeStore from "@/stores/useThemeStore";
import ResultStatsSyncSwitch from "./ResultStatsSyncSwitch";
import { ScreenName, useScreen } from "@/contexts/ScreenContext";

type StatListColumn = {
  columnName: ColumnName;
  statList: StatList;
  setStatList: (newStatList: StatList) => void;
  keepOneSelected: boolean;
};

interface StatSelectorProps {
  triggerButtonText?: string;
  tooltipText: string;
  children?: React.ReactNode;
}

const getColumnsConfig = (screenName: string): Omit<StatListColumn, "statList" | "setStatList">[] => {
  if (screenName === "search")
    return [
      { columnName: "chosenStats", keepOneSelected: true },
      { columnName: "resultStats", keepOneSelected: false },
    ];
  return [{ columnName: "resultStats", keepOneSelected: false }];
};

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

  const screenConfig = useMemo(() => {
    return { config: getColumnsConfig(screenName), triggerConfig: getTriggerConfig(screenName) };
  }, [screenName]);

  const columns = useMemo(() => {
    return screenConfig.config.map((config) => {
      const statList: StatList =
        config.columnName === "chosenStats"
          ? chosenStats
          : screenName !== "settings"
          ? resultStats
          : resultStatsDefault;
      const setStatList: (newList: StatList) => void =
        config.columnName === "chosenStats"
          ? setChosenStats
          : screenName !== "settings"
          ? setResultStats
          : setResultStatsDefault;

      return { ...config, statList, setStatList };
    });
  }, [screenConfig.config, screenName, chosenStats, resultStats, resultStatsDefault]);

  const [statListsInModal, setStatListsInModal] = useState<Record<ColumnName, StatList>>(() => {
    console.log("reset");
    return columns.reduce((acc, { columnName, statList }) => {
      acc[columnName] = statList;
      return acc;
    }, {} as Record<ColumnName, StatList>);
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resultStatsBeforeSync, setResultStatsBeforeSync] = useState(resultStats);

  const handleStatToggle = useCallback(
    (statName: string, columnName: ColumnName, statIndex: number) => {
      setStatListsInModal((prev) => {
        const list = prev[columnName];
        if (!list) return prev;

        const currentStat = list[statIndex];
        const newChecked = !currentStat.checked;

        // Garder au moins un coché si nécessaire
        const keepOne = screenConfig.config.find((c) => c.columnName === columnName)?.keepOneSelected;
        if (keepOne && !newChecked && !list.some((s, i) => i !== statIndex && s.checked)) return prev;

        const updatedList = [...list];
        updatedList[statIndex] = { ...currentStat, checked: newChecked };

        // Si sync actif et qu'on modifie chosenStats, synchroniser resultStats
        if (isResultStatsSync && screenName === "search" && columnName === "chosenStats") {
          const resultStatsList = prev.resultStats as StatList;
          const resultStatsUpdated = resultStatsList.map((stat) => {
            if (stat.name === statName) {
              return { ...stat, checked: newChecked };
            }
            return stat;
          });
          return {
            ...prev,
            [columnName]: updatedList,
            resultStats: resultStatsUpdated,
          };
        }

        console.log("columnname", columnName, "upd", updatedList);
        return { ...prev, [columnName]: updatedList };
      });
    },
    [screenConfig.config, isResultStatsSync, screenName]
  );

  const handleResultStatsUpdate = useCallback((newStatList: StatList) => {
    setStatListsInModal((prev) => ({ ...prev, resultStats: newStatList }));
  }, []);

  const handleModalClose = useCallback(() => {
    console.log("statListsInModal", statListsInModal);
    columns.forEach(({ columnName, setStatList }) => {
      const modalData = statListsInModal[columnName];
      console.log("modalData", modalData);

      if (modalData) setStatList(modalData);
    });
  }, [columns, statListsInModal]);

  useEffect(() => console.log("statListsInModal", statListsInModal), [statListsInModal]);

  return (
    <ButtonAndModal
      customTrigger={screenConfig.triggerConfig.customTrigger}
      triggerButtonText={triggerButtonText}
      tooltipText={tooltipText}
      modalTitle={screenConfig.triggerConfig.modalTitle}
      isModalVisibleProp={isModalVisible}
      setIsModalVisibleProp={setIsModalVisible}
      onModalClose={handleModalClose}
    >
      <View style={{ backgroundColor: theme.surface, padding: 16 }}>
        {children}
        {screenName === "search" && (
          <ResultStatsSyncSwitch
            resultStats={statListsInModal.resultStats || []}
            setResultStats={handleResultStatsUpdate}
            resultStatsBeforeSync={resultStatsBeforeSync}
            setResultStatsBeforeSync={setResultStatsBeforeSync}
            chosenStats={(statListsInModal.chosenStats || []) as ChosenStat[]}
          />
        )}
        <DoubleEntryTable
          statLists={statListsInModal}
          onToggleStat={handleStatToggle}
          disabled={isResultStatsSync && screenName === "search"}
        />
      </View>
    </ButtonAndModal>
  );
};

export default React.memo(StatSelector);
