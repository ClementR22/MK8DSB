import { ResultStat } from "@/contexts/ResultStatsContext";
import { statNames } from "@/data/stats/statsData";
import { useLanguageStore } from "@/stores/useLanguageStore";
import useSetsStore, { ChosenStat } from "@/stores/useSetsStore";
import { translateToLanguage } from "@/translations/translations";
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Checkbox, DataTable } from "react-native-paper";

type CheckList = ChosenStat[] | ResultStat[];

type Column = { columnName: string; checkList: CheckList; setCheckList: (newCheckList: CheckList) => void };

interface DoubleEntryTableProps {
  columns: Column[];
}

const DoubleEntryTable: React.FC<DoubleEntryTableProps> = ({ columns }) => {
  const language = useLanguageStore((state) => state.language);

  const rowLabels = columns[0].checkList.map((stat) => stat.name);

  // Fonction pour gérer la sélection
  const toggleSelection = (statName, colIndex) => {
    console.log(statName);
    const { checkList, setCheckList } = columns[colIndex];
    const newCheckList = checkList.map((stat, index) =>
      stat.name === statName ? { ...stat, checked: !stat.checked } : stat
    );
    setCheckList(newCheckList);
  };

  return (
    <View style={styles.container}>
      <DataTable>
        {/* En-tête des colonnes */}
        <DataTable.Header>
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

        {/* Corps du tableau */}
        {rowLabels.map((statName, statIndex) => (
          <DataTable.Row key={statName}>
            {/* Label de la ligne */}
            <DataTable.Cell style={styles.rowLabelCell}>
              <Text style={styles.rowLabelText}>{translateToLanguage(statName, language)}</Text>
            </DataTable.Cell>

            {/* Checkboxes pour chaque colonne */}
            {columns.map((_, colIndex) => (
              <DataTable.Cell key={colIndex} style={styles.checkboxCell}>
                <Checkbox
                  status={columns[colIndex].checkList[statIndex].checked ? "checked" : "unchecked"}
                  onPress={() => toggleSelection(statName, colIndex)}
                  color="#6200ee"
                />
              </DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}
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
  cornerCell: {
    flex: 1,
    justifyContent: "center",
  },
  headerCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rowLabelCell: {
    flex: 1,
    justifyContent: "flex-start",
  },
  checkboxCell: {
    flex: 1,
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
  selectionTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  selectionText: {
    fontSize: 12,
    color: "#333",
  },
});

export default DoubleEntryTable;
