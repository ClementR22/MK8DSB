import React, { useMemo, useCallback, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { ResultStat } from "@/contexts/ResultStatsContext";
import { ChosenStat } from "@/stores/useStatsStore";
import useThemeStore from "@/stores/useThemeStore";
import Text from "@/primitiveComponents/Text";
import { BORDER_RADIUS_MODAL_CHILDREN_CONTAINER } from "@/utils/designTokens";
import Checkbox from "expo-checkbox";
import { StatName } from "@/data/stats/statsTypes";
import { statNames } from "@/data/stats/statsData";

export type StatList = ChosenStat[] | ResultStat[];
export type ColumnName = "chosenStats" | "resultStats";

interface DoubleEntryTableProps {
  statLists: Record<ColumnName, StatList>;
  onToggleStat: (statName: StatName, columnName: ColumnName, statIndex: number) => void;
  disabled: boolean;
}

interface TableRowProps {
  statName: StatName;
  columnNames: ColumnName[];
  stats_i: (ChosenStat | ResultStat)[];
  statIndex: number;
  labelFlex: number;
  disabled: boolean;
  onToggleStat: (statName: StatName, columnName: ColumnName, statIndex: number) => void;
}

const TableRow = React.memo(
  ({ statName, columnNames, stats_i, statIndex, labelFlex, disabled, onToggleStat }: TableRowProps) => {
    const theme = useThemeStore((state) => state.theme);

    return (
      <Pressable style={styles.row}>
        <View style={[styles.cell, { flex: labelFlex }]}>
          <Text role="title" size="small" namespace="stats">
            {statName}
          </Text>
        </View>
        {stats_i.map((stat, index) => {
          const isChecked = stat?.checked ?? false;
          const isDisabled = index === 1 && disabled; // index === 1 <=> columnName === "resultStats"
          const columnName = columnNames[index];
          return (
            <View key={`${statName}-${index}`} style={[styles.cell, styles.checkboxCell]}>
              <Checkbox
                value={isChecked}
                disabled={isDisabled}
                onValueChange={() => onToggleStat(statName, columnName as ColumnName, statIndex)}
                color={theme.primary}
              />
            </View>
          );
        })}
      </Pressable>
    );
  },
  (prev, next) => {
    if (prev.disabled !== next.disabled) return false;
    for (let i = 0; i < prev.stats_i.length; i++) {
      if (prev.stats_i[i].checked !== next.stats_i[i].checked) return false;
    }
    return true;
  }
);

TableRow.displayName = "TableRow";

const DoubleEntryTable: React.FC<DoubleEntryTableProps> = ({ statLists, onToggleStat, disabled }) => {
  const theme = useThemeStore((state) => state.theme);

  const columnNames = Object.keys(statLists) as ColumnName[];
  const rowNames = statNames;

  const labelFlex = 5 - columnNames.length;

  useEffect(() => console.log("statLists", statLists), [statLists]);

  const renderRow = useCallback(
    (statName: StatName, index: number) => {
      const stats_i = columnNames.map((columnName) => statLists[columnName][index]);

      return (
        <TableRow
          key={statName}
          statName={statName}
          columnNames={columnNames}
          stats_i={stats_i}
          statIndex={index}
          labelFlex={labelFlex}
          disabled={disabled}
          onToggleStat={onToggleStat}
        />
      );
    },
    [statLists, labelFlex, disabled, onToggleStat]
  );

  return (
    <View style={[styles.tableWrapper, { borderColor: theme.outline_variant }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { borderColor: theme.outline_variant, backgroundColor: theme.surface_container_highest },
        ]}
      >
        <View style={[styles.headerCell, { flex: labelFlex }]}>
          <Text role="title" size="small" namespace="not">
            {" "}
          </Text>
        </View>
        {columnNames.map((columnName) => (
          <View key={columnName} style={styles.headerCell}>
            <Text role="title" size="small" namespace="text">
              {columnName}
            </Text>
          </View>
        ))}
      </View>

      {/* Body */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {rowNames.map(renderRow)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tableWrapper: {
    borderBottomWidth: 2,
    borderRadius: BORDER_RADIUS_MODAL_CHILDREN_CONTAINER,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    height: 32,
    alignItems: "center",
    paddingLeft: 12,
  },
  headerCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingLeft: 12,
  },
  cell: {
    flex: 1,
    justifyContent: "center",
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
