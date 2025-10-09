import React, { useMemo, useCallback } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Checkbox, DataTable } from "react-native-paper";
import { ResultStat } from "@/contexts/ResultStatsContext";
import { ChosenStat } from "@/stores/useSetsStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { translateToLanguage } from "@/translations/translations";
import { useThemeStore } from "@/stores/useThemeStore";
import Text from "@/primitiveComponents/Text";

type CheckList = ChosenStat[] | ResultStat[];
export type ColumnName = "chosenStats" | "resultStats";

export type Column = {
  columnName: ColumnName;
  checkList: CheckList;
};

interface DoubleEntryTableProps {
  columns: Column[];
  onToggleStat: (statName: string, columnName: ColumnName) => void;
  disabled: boolean;
}

// Composant Row mémorisé séparément
const TableRow = React.memo<{
  statName: string;
  columns: Column[];
  labelFlex: number;
  language: string;
  disabled: boolean;
  onToggleStat: (statName: string, columnName: ColumnName) => void;
  statsMap: Map<string, Map<string, boolean>>;
}>(({ statName, columns, labelFlex, language, disabled, onToggleStat, statsMap }) => {
  return (
    <Pressable>
      <DataTable.Row style={styles.row}>
        <DataTable.Cell style={{ flex: labelFlex }}>
          <Text role="title" size="small">
            {translateToLanguage(statName, language)}
          </Text>
        </DataTable.Cell>

        {columns.map(({ columnName }) => {
          const isChecked = statsMap.get(columnName)?.get(statName) ?? false;
          const isDisabled = columnName === "resultStats" && disabled;

          return (
            <DataTable.Cell key={columnName} style={styles.checkboxCell}>
              <Checkbox
                status={isChecked ? "checked" : "unchecked"}
                onPress={() => onToggleStat(statName, columnName)}
                disabled={isDisabled}
              />
            </DataTable.Cell>
          );
        })}
      </DataTable.Row>
    </Pressable>
  );
});

TableRow.displayName = "TableRow";

const DoubleEntryTable: React.FC<DoubleEntryTableProps> = ({ columns, onToggleStat, disabled }) => {
  const language = useLanguageStore((state) => state.language);
  const theme = useThemeStore((state) => state.theme);

  // Extraire les noms des stats une seule fois
  const rowNames = useMemo(() => columns[0]?.checkList.map((stat) => stat.name) || [], [columns]);
  const labelFlex = 5 - columns.length;

  // Créer une Map pour lookup O(1)
  const statsMap = useMemo(() => {
    const map = new Map<string, Map<string, boolean>>();

    columns.forEach(({ columnName, checkList }) => {
      const columnMap = new Map<string, boolean>();
      checkList.forEach((stat) => {
        columnMap.set(stat.name, stat.checked);
      });
      map.set(columnName, columnMap);
    });

    return map;
  }, [columns]);

  //  Callback stable pour le rendu des lignes
  const renderRow = useCallback(
    (statName: string) => (
      <TableRow
        key={statName}
        statName={statName}
        columns={columns}
        labelFlex={labelFlex}
        language={language}
        disabled={disabled}
        onToggleStat={onToggleStat}
        statsMap={statsMap}
      />
    ),
    [columns, labelFlex, language, disabled, onToggleStat, statsMap]
  );

  return (
    <DataTable>
      <DataTable.Header style={styles.header}>
        <DataTable.Title style={{ flex: labelFlex }}>
          <Text role="title" size="small">
            {""}
          </Text>
        </DataTable.Title>
        {columns.map(({ columnName }) => (
          <DataTable.Title key={columnName} style={styles.headerCell}>
            <Text role="title" size="small">
              {translateToLanguage(columnName, language)}
            </Text>
          </DataTable.Title>
        ))}
      </DataTable.Header>

      <View style={[styles.scrollViewWrapper, { borderColor: theme.outline_variant }]}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {rowNames.map(renderRow)}
        </ScrollView>
      </View>
    </DataTable>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 30,
    paddingRight: 0,
    paddingLeft: 12,
    borderBottomWidth: 0,
  },
  row: {
    paddingRight: 0,
    paddingLeft: 12,
  },
  headerCell: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 0,
  },
  scrollViewWrapper: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  scrollView: {
    maxHeight: 300,
  },
  checkboxCell: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default React.memo(DoubleEntryTable);
