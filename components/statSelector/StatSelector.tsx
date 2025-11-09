import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import ButtonAndModal from "../modal/ButtonAndModal";
import DoubleEntryTable, { ColumnName } from "./DoubleEntryTable";
import useStatsStore, { ChosenStat } from "@/stores/useStatsStore";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import { ScreenName, useScreen } from "@/contexts/ScreenContext";
import useResultStatsDefaultStore from "@/stores/useResultStatsDefaultStore";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import { View } from "react-native";
import ResultStatsSyncSwitch from "./ResultStatsSyncSwitch";
import useThemeStore from "@/stores/useThemeStore";

export type StatList = ChosenStat[] | ResultStat[];

type StatListColumn = {
  columnName: ColumnName;
  checkList: StatList;
  setCheckList: (newCheckList: StatList) => void;
  keepOneSelected: boolean;
};

interface StatSelectorProps {
  triggerButtonText?: string;
  tooltipText: string;
  children?: React.ReactNode;
}

const getColumnsConfig = (screenName: string): Omit<StatListColumn, "checkList" | "setCheckList">[] => {
  if (screenName === "search") {
    return [
      { columnName: "chosenStats", keepOneSelected: true },
      { columnName: "resultStats", keepOneSelected: false },
    ];
  }

  if (screenName === "display" || screenName === "save") {
    return [{ columnName: "resultStats", keepOneSelected: false }];
  }

  return [{ columnName: "resultStats", keepOneSelected: false }];
};

const getTriggerConfig = (screenName: ScreenName) => {
  const isSearchOrSave = screenName === "search" || screenName === "save";

  const customTrigger = isSearchOrSave ? (
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

  const { resultStats, setResultStats } = useResultStats();
  const { resultStatsDefault, setResultStatsDefault, isResultStatsSync } = useResultStatsDefaultStore();
  const { chosenStats, setChosenStats } = useStatsStore();

  const [statListsInModal, setStatListsInModal] = useState<Record<string, StatList>>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resultStatsBeforeSync, setResultStatsBeforeSync] = useState(resultStats);

  const screenConfig = useMemo(() => {
    const config = getColumnsConfig(screenName);
    const triggerConfig = getTriggerConfig(screenName);
    return { config, triggerConfig };
  }, [screenName]);

  const columns = useMemo(() => {
    return screenConfig.config.map((config) => {
      let checkList: StatList;
      let setCheckList: (list: StatList) => void;

      if (config.columnName === "chosenStats") {
        checkList = chosenStats;
        setCheckList = setChosenStats;
      } else if (config.columnName === "resultStats" && screenName !== "settings") {
        checkList = resultStats;
        setCheckList = setResultStats;
      } else {
        checkList = resultStatsDefault;
        setCheckList = setResultStatsDefault;
      }

      return { ...config, checkList, setCheckList };
    });
  }, [
    screenConfig.config,
    screenName,
    chosenStats,
    resultStats,
    resultStatsDefault,
    setChosenStats,
    setResultStats,
    setResultStatsDefault,
  ]);

  const columnsInModal = useMemo(() => {
    return screenConfig.config.map(({ columnName }) => ({
      columnName,
      checkList: statListsInModal[columnName] || [],
    }));
  }, [screenConfig.config, statListsInModal]);

  useEffect(() => {
    if (isModalVisible && Object.keys(statListsInModal).length === 0) {
      const initialStatLists: Record<string, StatList> = {};
      columns.forEach(({ columnName, checkList }) => {
        initialStatLists[columnName] = checkList.map((stat) => ({ ...stat }));
      });
      setStatListsInModal(initialStatLists);
    }
  }, [isModalVisible]);

  const handleStatToggle = useCallback(
    (statName: string, columnName: ColumnName) => {
      setStatListsInModal((prev) => {
        const statList = prev[columnName];
        if (!statList) return prev;

        const statIndex = statList.findIndex((stat) => stat.name === statName);
        if (statIndex === -1) return prev;

        const currentStat = statList[statIndex];
        const newCheckedState = !currentStat.checked;

        const columnConfig = screenConfig.config.find((col) => col.columnName === columnName);
        if (columnConfig?.keepOneSelected && !newCheckedState) {
          const hasOtherChecked = statList.some((stat, idx) => idx !== statIndex && stat.checked);
          if (!hasOtherChecked) return prev;
        }

        const updatedStatList = [...statList];
        updatedStatList[statIndex] = { ...currentStat, checked: newCheckedState };

        return { ...prev, [columnName]: updatedStatList };
      });
    },
    [screenConfig.config]
  );

  const handleResultStatsUpdate = useCallback((newStatList: StatList) => {
    setStatListsInModal((prev) => ({ ...prev, resultStats: newStatList }));
  }, []);

  const handleModalClose = useCallback(() => {
    // Utiliser la forme fonction de setState pour récupérer la valeur actuelle
    setStatListsInModal((currentStatLists) => {
      columns.forEach(({ columnName, setCheckList }) => {
        const modalData = currentStatLists[columnName];
        if (modalData) {
          setCheckList(modalData);
        }
      });
      return {}; // Nettoyage
    });
  }, [columns]);

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
          columns={columnsInModal}
          onToggleStat={handleStatToggle}
          disabled={isResultStatsSync && screenName === "search"}
        />
      </View>
    </ButtonAndModal>
  );
};

export default React.memo(StatSelector);
