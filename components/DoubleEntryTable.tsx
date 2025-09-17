import { ResultStat } from "@/contexts/ResultStatsContext";
import { statNames } from "@/data/stats/statsData";
import { useLanguageStore } from "@/stores/useLanguageStore";
import useSetsStore, { ChosenStat } from "@/stores/useSetsStore";
import { translateToLanguage } from "@/translations/translations";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Checkbox, DataTable } from "react-native-paper";

type CheckList = ChosenStat[] | ResultStat[];
export type ColumnName = "chosenStats" | "resultStats";

export type Column = {
  columnName: ColumnName;
  checkList: CheckList;
};

interface DoubleEntryTableProps {
  columns: Column[];
  onToggleStat: (statName: string, columnName: ColumnName) => void;
}

const DoubleEntryTable: React.FC<DoubleEntryTableProps> = ({ columns, onToggleStat }) => {
  const language = useLanguageStore((state) => state.language);

  const rowLabels = columns[0].checkList.map((stat) => stat.name);

  return (
    <View style={styles.container}>
      <DataTable style={{ padding: 0, margin: 0 }}>
        {/* En-tête des colonnes */}
        <DataTable.Header style={{ padding: 0 }}>
          <DataTable.Title style={styles.cornerCell}>
            <Text style={styles.headerText}></Text>
          </DataTable.Title>
          {columns.map(({ columnName }) => {
            return (
              <DataTable.Title key={columnName} style={styles.headerCell}>
                <Text style={styles.headerText}>{columnName}</Text>
              </DataTable.Title>
            );
          })}
        </DataTable.Header>

        <ScrollView contentContainerStyle={{ height: 300 }}>
          {/* Corps du tableau */}
          {rowLabels.map((statName, statIndex) => (
            <DataTable.Row key={statName}>
              {/* Label de la ligne */}
              <DataTable.Cell style={styles.rowLabelCell}>
                <Text style={styles.rowLabelText}>{translateToLanguage(statName, language)}</Text>
              </DataTable.Cell>

              {/* Checkboxes pour chaque colonne */}
              {columns.map(({ columnName, checkList }) => {
                const stat = checkList.find((s) => s.name === statName);
                return (
                  <DataTable.Cell key={columnName} style={styles.checkboxCell}>
                    <Checkbox
                      status={stat?.checked ? "checked" : "unchecked"}
                      onPress={() => onToggleStat(statName, columnName)}
                      color="#6200ee"
                    />
                  </DataTable.Cell>
                );
              })}
            </DataTable.Row>
          ))}
        </ScrollView>
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  cornerCell: {},
  headerCell: {
    justifyContent: "center",
    alignItems: "center",
  },
  rowLabelCell: {
    justifyContent: "flex-start",
  },
  checkboxCell: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  rowLabelText: {
    fontSize: 14,
    color: "#666",
  },
});

export default DoubleEntryTable;
