import React, { useMemo, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Checkbox, DataTable } from "react-native-paper";
import { ResultStat } from "@/contexts/ResultStatsContext";
import { ChosenStat } from "@/stores/useSetsStore";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { translateToLanguage } from "@/translations/translations";
import { useThemeStore } from "@/stores/useThemeStore";

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

const DoubleEntryTable: React.FC<DoubleEntryTableProps> = ({ columns, onToggleStat, disabled }) => {
  const language = useLanguageStore((state) => state.language);
  const theme = useThemeStore((state) => state.theme);

  // Mémoisation des calculs
  const { rowNames, labelFlex } = useMemo(
    () => ({
      rowNames: columns[0]?.checkList.map((stat) => stat.name) || [],
      labelFlex: 5 - columns.length,
    }),
    [columns]
  );

  const { rowLabelTextStyle, headerTextStyle } = useMemo(
    () => ({
      rowLabelTextStyle: { ...styles.rowLabelText, color: theme.on_surface },
      headerTextStyle: { ...styles.headerText, color: theme.on_surface },
    }),
    []
  );

  // Mémoisation du rendu des headers
  const renderHeaders = useMemo(
    () => (
      <DataTable.Header style={styles.header}>
        <DataTable.Title style={{ flex: labelFlex }}>
          <Text style={headerTextStyle} />
        </DataTable.Title>
        {columns.map(({ columnName }) => (
          <DataTable.Title key={columnName} style={styles.headerCell}>
            <Text style={headerTextStyle}>{translateToLanguage(columnName, language)}</Text>
          </DataTable.Title>
        ))}
      </DataTable.Header>
    ),
    [columns, labelFlex, language]
  );

  // Rendu optimisé des lignes
  const renderRow = useCallback(
    (statName: string) => (
      <Pressable key={statName}>
        {/* pressable pour permettre le scroll */}
        <DataTable.Row style={styles.row}>
          {/* Label de la ligne */}
          <DataTable.Cell style={{ flex: labelFlex }}>
            <Text style={rowLabelTextStyle}>{translateToLanguage(statName, language)}</Text>
          </DataTable.Cell>

          {/* Checkboxes pour chaque colonne */}
          {columns.map(({ columnName, checkList }) => {
            const stat = checkList.find((s) => s.name === statName);
            const isDisabled = columnName === "resultStats" && disabled;

            return (
              <DataTable.Cell key={columnName} style={styles.checkboxCell}>
                <Checkbox
                  status={stat?.checked ? "checked" : "unchecked"}
                  onPress={() => onToggleStat(statName, columnName)}
                  disabled={isDisabled}
                />
              </DataTable.Cell>
            );
          })}
        </DataTable.Row>
      </Pressable>
    ),
    [columns, labelFlex, language, disabled]
  );

  return (
    <View style={styles.container}>
      <DataTable>
        {renderHeaders}
        <ScrollView
          style={[styles.scrollView, { borderColor: theme.outline_variant }]}
          showsVerticalScrollIndicator={false}
        >
          {rowNames.map(renderRow)}
        </ScrollView>
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
  },
  scrollView: {
    maxHeight: 300,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  checkboxCell: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "600",
    fontSize: 14,
  },
  rowLabelText: {
    fontSize: 14,
  },
});

export default React.memo(DoubleEntryTable);
