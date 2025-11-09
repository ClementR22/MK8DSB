import React, { useMemo, useCallback } from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { ResultStat } from "@/contexts/ResultStatsContext";
import { ChosenStat } from "@/stores/useStatsStore";
import useThemeStore from "@/stores/useThemeStore";
import Text from "@/primitiveComponents/Text";
import { BORDER_RADIUS_MODAL_CHILDREN_CONTAINER } from "@/utils/designTokens";
import Checkbox from "expo-checkbox";

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

interface TableRowProps {
  statName: string;
  columns: Column[];
  labelFlex: number;
  disabled: boolean;
  onToggleStat: (statName: string, columnName: ColumnName) => void;
  statsMap: Map<string, Map<string, boolean>>;
  color: string;
}

const TableRow: React.FC<TableRowProps> = ({
  statName,
  columns,
  labelFlex,
  disabled,
  onToggleStat,
  statsMap,
  color,
}) => {
  return (
    <View style={styles.row}>
      <View style={[styles.cell, { flex: labelFlex }]}>
        <Text role="title" size="small" namespace="stats">
          {statName}
        </Text>
      </View>

      {columns.map(({ columnName }) => {
        const isChecked = statsMap.get(columnName)?.get(statName) ?? false;
        const isDisabled = columnName === "resultStats" && disabled;

        console.log({ statName, columnName, isChecked, isDisabled });

        return (
          <View key={columnName + statName} style={[styles.cell, styles.checkboxCell]}>
            <Checkbox
              value={isChecked}
              disabled={isDisabled}
              onValueChange={() => onToggleStat(statName, columnName)}
              color={color}
            />
          </View>
        );
      })}
    </View>
  );
};

TableRow.displayName = "TableRow";

const DoubleEntryTable: React.FC<DoubleEntryTableProps> = ({ columns, onToggleStat, disabled }) => {
  const theme = useThemeStore((state) => state.theme);

  const rowNames = useMemo(() => columns[0]?.checkList.map((stat) => stat.name) || [], [columns]);
  const labelFlex = 5 - columns.length;

  const statsMap = useMemo(() => {
    const map = new Map<string, Map<string, boolean>>();
    columns.forEach(({ columnName, checkList }) => {
      const columnMap = new Map<string, boolean>();
      checkList.forEach((stat) => columnMap.set(stat.name, stat.checked));
      map.set(columnName, columnMap);
    });
    return map;
  }, [columns]);

  const renderRow = useCallback(
    (statName: string) => (
      <TableRow
        key={statName}
        statName={statName}
        columns={columns}
        labelFlex={labelFlex}
        disabled={disabled}
        onToggleStat={onToggleStat}
        statsMap={statsMap}
        color={theme.primary}
      />
    ),
    [columns, labelFlex, disabled, onToggleStat, statsMap]
  );

  return (
    <View style={[styles.tableWrapper, { borderColor: theme.outline_variant }]}>
      {/* Header */}
      <View style={[styles.header, { borderColor: theme.outline_variant }]}>
        <View style={[styles.headerCell, { flex: labelFlex }]}>
          <Text role="title" size="small" namespace="not">
            {" "}
          </Text>
        </View>
        {columns.map(({ columnName }) => (
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
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRadius: BORDER_RADIUS_MODAL_CHILDREN_CONTAINER,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    borderBottomWidth: 1,
    height: 32,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
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
