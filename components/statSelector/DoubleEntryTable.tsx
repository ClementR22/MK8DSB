// DoubleEntryTable.tsx
import React, { useCallback } from "react";
import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import useThemeStore from "@/stores/useThemeStore";
import Text from "@/primitiveComponents/Text";
import { BORDER_RADIUS_MODAL_CHILDREN_CONTAINER } from "@/utils/designTokens";

export type ColumnName = "chosenStats" | "resultStats";

export type StatToggleMap = Record<
  string, // on met string au lieu de StatName pour autoriser une initialisation non exhaustive
  {
    chosenStats: boolean;
    resultStats: boolean;
  }
>;

interface DoubleEntryTableProps {
  statMap: StatToggleMap;
  columnNames: ColumnName[];
  onToggleStat: (statName: string, columnName: ColumnName) => void;
  disabled: boolean;
}

const DoubleEntryTable: React.FC<DoubleEntryTableProps> = ({ statMap, columnNames, onToggleStat, disabled }) => {
  const theme = useThemeStore((state) => state.theme);

  const rowNames = Object.keys(statMap);
  const labelFlex = 5 - columnNames.length;

  const renderRow = useCallback(
    (statName: string) => {
      const vals = columnNames.map((col) => statMap[statName][col]);
      return (
        <Pressable key={statName} style={styles.row}>
          <View style={[styles.cell, { flex: labelFlex }]}>
            <Text role="title" size="small" namespace="stats">
              {statName}
            </Text>
          </View>
          {columnNames.map((col, i) => (
            <View key={col} style={[styles.cell, styles.checkboxCell]}>
              <Checkbox
                value={vals[i]}
                disabled={col === "resultStats" && disabled}
                onValueChange={() => onToggleStat(statName, col)}
                color={theme.primary}
              />
            </View>
          ))}
        </Pressable>
      );
    },
    [statMap, columnNames, labelFlex, disabled, onToggleStat, theme.primary]
  );

  return (
    <View style={[styles.tableWrapper, { borderColor: theme.outline_variant }]}>
      <View
        style={[
          styles.header,
          { borderColor: theme.outline_variant, backgroundColor: theme.surface_container_highest },
        ]}
      >
        <View style={[styles.headerCell, { flex: labelFlex }]} />
        {columnNames.map((col) => (
          <View key={col} style={styles.headerCell}>
            <Text role="title" size="small" namespace="text">
              {col}
            </Text>
          </View>
        ))}
      </View>
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
