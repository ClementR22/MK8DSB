import React, { useEffect, useMemo, useState } from "react";
import ButtonAndModal from "../modal/ButtonAndModal";
import DoubleEntryTable, { ColumnName } from "./DoubleEntryTable";
import useSetsStore, { ChosenStat } from "@/stores/useSetsStore";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import { useScreen } from "@/contexts/ScreenContext";
import { useResultStatsDefaultStore } from "@/stores/useResultStatsDefaultStore";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import { View } from "react-native";
import ResultStatsSyncSwitch from "./ResultStatsSyncSwitch";
import { useThemeStore } from "@/stores/useThemeStore";

export type StatList = ChosenStat[] | ResultStat[];
export type SetStatList = React.Dispatch<React.SetStateAction<StatList>>;
type StatListColumn = {
  columnName: ColumnName;
  checkList: StatList;
  setCheckList: (newCheckList: StatList) => void;
  keepOneSelected: boolean;
};

interface StatSelectorProps {
  triggerButtonText?: string;
  secondButtonProps?: { text: string; onPress: () => void; tooltipText: string };
}

const StatSelector: React.FC<StatSelectorProps> = ({ triggerButtonText, secondButtonProps }) => {
  const theme = useThemeStore((state) => state.theme);

  const screenName = useScreen();
  const isInSearchScreen = screenName === "search";

  const { resultStats, setResultStats } = useResultStats();
  const resultStatsDefault = useResultStatsDefaultStore((state) => state.resultStatsDefault);
  const setResultStatsDefault = useResultStatsDefaultStore((state) => state.setResultStatsDefault);

  const chosenStats = useSetsStore((state) => state.chosenStats);
  const setChosenStats = useSetsStore((state) => state.setChosenStats);

  const [resultStatsBeforeSync, setResultStatsBeforeSync] = useState(resultStats);

  const isResultStatsSync = useResultStatsDefaultStore((state) => state.isResultStatsSync);

  const { columns, customTrigger, modalTitle } = useMemo(() => {
    let columns: StatListColumn[] = [];
    let customTrigger: React.ReactElement;
    let modalTitle: string;

    columns = isInSearchScreen
      ? [
          {
            columnName: "chosenStats",
            checkList: chosenStats,
            setCheckList: setChosenStats,
            keepOneSelected: true,
          },
          {
            columnName: "resultStats",
            checkList: resultStats,
            setCheckList: setResultStats,
            keepOneSelected: false,
          },
        ]
      : screenName === "display" || screenName === "save"
      ? [
          {
            columnName: "resultStats",
            checkList: resultStats,
            setCheckList: setResultStats,
            keepOneSelected: false,
          },
        ]
      : [
          {
            columnName: "resultStats",
            checkList: resultStatsDefault,
            setCheckList: setResultStatsDefault,
            keepOneSelected: false,
          },
        ];
    customTrigger = isInSearchScreen ? (
      <ButtonIcon
        tooltipText={"DisplayedStatsInSets"}
        iconName={"checkbox-multiple-marked"}
        iconType={IconType.MaterialCommunityIcons}
      />
    ) : screenName === "save" ? (
      <ButtonIcon
        tooltipText={"DisplayedStatsInSets"}
        iconName={"checkbox-multiple-marked"}
        iconType={IconType.MaterialCommunityIcons}
      />
    ) : null;

    modalTitle =
      isInSearchScreen || screenName === "save"
        ? "DisplayedStatsInSets"
        : screenName === "display"
        ? "DisplayedStats"
        : "DefaultDisplayedStats";

    return { columns, customTrigger, modalTitle };
  }, [screenName, chosenStats, resultStats, setChosenStats, setResultStats]);

  const [statListsInModal, setStatListsInModal] = useState<Record<string, StatList>>({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Initialiser les statListsInModal quand la modal s'ouvre
  useEffect(() => {
    if (isModalVisible) {
      const initialStatLists: Record<string, StatList> = {};
      columns.forEach(({ columnName, checkList }) => {
        initialStatLists[columnName] = checkList.map((stat) => ({ ...stat }));
      });
      setStatListsInModal(initialStatLists);
    }
  }, [isModalVisible, columns]);

  const columnsInModal = useMemo(() => {
    return columns.map(({ columnName }) => ({
      columnName,
      checkList: statListsInModal[columnName] || [],
    }));
  }, [columns, statListsInModal]);

  useEffect(() => {
    if (!isModalVisible && Object.keys(statListsInModal).length > 0) {
      // À la fermeture, on met à jour les states globaux avec les valeurs modifiées
      columns.forEach(({ columnName, setCheckList }) => {
        if (statListsInModal[columnName]) {
          setCheckList(statListsInModal[columnName]);
        }
      });
    }
  }, [isModalVisible]);

  const handleStatToggle = (statName: string, columnName: ColumnName) => {
    setStatListsInModal((prev) => {
      if (!prev[columnName]) return prev;

      const statList = [...prev[columnName]];
      const statIndex = statList.findIndex((stat) => stat.name === statName);

      if (statIndex === -1) return prev;

      // Créer une nouvelle copie de l'objet stat
      const newStat = {
        ...statList[statIndex],
        checked: !statList[statIndex].checked,
      };

      // Vérifier si on doit garder au moins un élément sélectionné
      const columnConfig = columns.find((col) => col.columnName === columnName);
      if (columnConfig?.keepOneSelected && !newStat.checked) {
        const hasOtherChecked = statList.some((stat, idx) => idx !== statIndex && stat.checked);
        if (!hasOtherChecked) return prev;
      }

      // Mettre à jour la colonne
      const updatedStatList = [...statList];
      updatedStatList[statIndex] = newStat;

      return { ...prev, [columnName]: updatedStatList };
    });
  };

  const disabled = useMemo(() => isResultStatsSync && isInSearchScreen, [isResultStatsSync, isInSearchScreen]);

  return (
    <ButtonAndModal
      customTrigger={customTrigger}
      triggerButtonText={triggerButtonText}
      modalTitle={modalTitle}
      secondButtonProps={secondButtonProps}
      closeAfterSecondButton={false}
      isModalVisibleProp={isModalVisible}
      setIsModalVisibleProp={setIsModalVisible}
    >
      <View style={{ backgroundColor: theme.surface, padding: 16 }}>
        {isInSearchScreen && (
          <ResultStatsSyncSwitch
            resultStats={statListsInModal.resultStats || []}
            setResultStats={(newStatList) => setStatListsInModal({ ...statListsInModal, resultStats: newStatList })}
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
