import React, { useEffect, useMemo, useState, useCallback } from "react";
import ButtonAndModal from "../modal/ButtonAndModal";
import DoubleEntryTable, { ColumnName } from "./DoubleEntryTable";
import useSetsStore, { ChosenStat } from "@/stores/useSetsStore";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import { useScreen } from "@/contexts/ScreenContext";
import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import { Text, View } from "react-native";
import ResultStatsSyncSwitch from "./ResultStatsSyncSwitch";
import { useThemeStore } from "@/stores/useThemeStore";
import { translateToLanguage } from "@/translations/translations";
import { useLanguageStore } from "@/stores/useLanguageStore";

export type StatList = ChosenStat[] | ResultStat[];

type StatListColumn = {
  columnName: ColumnName;
  checkList: StatList;
  setCheckList: (newCheckList: StatList) => void;
  keepOneSelected: boolean;
};

interface StatSelectorProps {
  triggerButtonText?: string;
}

// Configuration des colonnes par écran (déplacé hors du composant pour éviter les re-créations)
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

// Configuration des triggers et titres (déplacé hors du composant)
const getTriggerConfig = (screenName: string) => {
  const isSearchOrSave = screenName === "search" || screenName === "save";

  const customTrigger = isSearchOrSave ? (
    <ButtonIcon
      tooltipText="DisplayedStatsInSets"
      iconName="checkbox-multiple-marked"
      iconType={IconType.MaterialCommunityIcons}
    />
  ) : null;

  const modalTitle =
    screenName === "search" || screenName === "save"
      ? "DisplayedStatsInSets"
      : screenName === "display"
      ? "DisplayedStats"
      : "DefaultDisplayedStats";

  return { customTrigger, modalTitle };
};

const StatSelector: React.FC<StatSelectorProps> = ({ triggerButtonText }) => {
  const language = useLanguageStore((state) => state.language);

  const theme = useThemeStore((state) => state.theme);
  const screenName = useScreen();

  // Hooks de stores
  const { resultStats, setResultStats } = useResultStats();
  const { resultStatsDefault, setResultStatsDefault, isResultStatsSync } = useResultStatsDefaultStore();
  const { chosenStats, setChosenStats } = useSetsStore();

  // États locaux
  const [statListsInModal, setStatListsInModal] = useState<Record<string, StatList>>({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resultStatsBeforeSync, setResultStatsBeforeSync] = useState(resultStats);

  // Mémoisation des colonnes avec leurs données
  const columns: StatListColumn[] = useMemo(() => {
    const configs = getColumnsConfig(screenName);

    return configs.map((config) => ({
      ...config,
      checkList:
        config.columnName === "chosenStats"
          ? chosenStats
          : config.columnName === "resultStats" && screenName !== "settings"
          ? resultStats
          : resultStatsDefault,
      setCheckList:
        config.columnName === "chosenStats"
          ? setChosenStats
          : config.columnName === "resultStats" && screenName !== "settings"
          ? setResultStats
          : setResultStatsDefault,
    }));
  }, [screenName, chosenStats, resultStats, resultStatsDefault, setChosenStats, setResultStats, setResultStatsDefault]);

  // Mémoisation du trigger et du titre
  const { customTrigger, modalTitle } = useMemo(() => getTriggerConfig(screenName), [screenName]);

  // Colonnes pour la modal (données locales)
  const columnsInModal = useMemo(() => {
    return columns.map(({ columnName }) => ({
      columnName,
      checkList: statListsInModal[columnName] || [],
    }));
  }, [columns, statListsInModal]);

  // État disabled mémorisé
  const disabled = useMemo(() => isResultStatsSync && screenName === "search", [isResultStatsSync, screenName]);

  // Initialisation des données de la modal
  useEffect(() => {
    if (isModalVisible) {
      const initialStatLists: Record<string, StatList> = {};
      columns.forEach(({ columnName, checkList }) => {
        initialStatLists[columnName] = checkList.map((stat) => ({ ...stat }));
      });
      setStatListsInModal(initialStatLists);
    }
  }, [isModalVisible, columns]);

  // Sauvegarde des modifications à la fermeture
  useEffect(() => {
    if (!isModalVisible && Object.keys(statListsInModal).length > 0) {
      columns.forEach(({ columnName, setCheckList }) => {
        const modalData = statListsInModal[columnName];
        if (modalData) {
          setCheckList(modalData);
        }
      });
      // Reset des données locales pour éviter les fuites mémoire
      setStatListsInModal({});
    }
  }, [isModalVisible, columns, statListsInModal]);

  // Handler pour le toggle des stats (avec useCallback pour éviter les re-renders)
  const handleStatToggle = useCallback(
    (statName: string, columnName: ColumnName) => {
      setStatListsInModal((prev) => {
        const statList = prev[columnName];
        if (!statList) return prev;

        const statIndex = statList.findIndex((stat) => stat.name === statName);
        if (statIndex === -1) return prev;

        const currentStat = statList[statIndex];
        const newCheckedState = !currentStat.checked;

        // Vérification de la contrainte keepOneSelected
        const columnConfig = columns.find((col) => col.columnName === columnName);
        if (columnConfig?.keepOneSelected && !newCheckedState) {
          const hasOtherChecked = statList.some((stat, idx) => idx !== statIndex && stat.checked);
          if (!hasOtherChecked) return prev;
        }

        // Mise à jour optimisée
        const updatedStatList = statList.map((stat, idx) =>
          idx === statIndex ? { ...stat, checked: newCheckedState } : stat
        );

        return { ...prev, [columnName]: updatedStatList };
      });
    },
    [columns]
  );

  // Handler pour la mise à jour des resultStats dans le switch
  const handleResultStatsUpdate = useCallback((newStatList: StatList) => {
    setStatListsInModal((prev) => ({ ...prev, resultStats: newStatList }));
  }, []);

  return (
    <ButtonAndModal
      customTrigger={customTrigger}
      triggerButtonText={triggerButtonText}
      modalTitle={modalTitle}
      isModalVisibleProp={isModalVisible}
      setIsModalVisibleProp={setIsModalVisible}
    >
      <View style={{ backgroundColor: theme.surface, padding: 16 }}>
        <Text>{translateToLanguage("AppliedOnMountForSetBuilderAndComparator", language)}</Text>
        {screenName === "search" && (
          <ResultStatsSyncSwitch
            resultStats={statListsInModal.resultStats || []}
            setResultStats={handleResultStatsUpdate}
            resultStatsBeforeSync={resultStatsBeforeSync}
            setResultStatsBeforeSync={setResultStatsBeforeSync}
            chosenStats={(statListsInModal.chosenStats || []) as ChosenStat[]}
          />
        )}
        <DoubleEntryTable columns={columnsInModal} onToggleStat={handleStatToggle} disabled={disabled} />
      </View>
    </ButtonAndModal>
  );
};

export default React.memo(StatSelector);
