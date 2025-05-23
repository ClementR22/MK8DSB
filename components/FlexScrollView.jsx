import useModalsStore from "@/stores/useModalsStore";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";

function FlexScrollView({ children, flexDirection, alignItems, justifyContent, gap, style }) {
  const isTooltipVisible = useModalsStore((state) => state.isTooltipVisible);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "transparent",
      display: "flex",
      flexDirection: flexDirection ? flexDirection : "column",
      alignItems: alignItems || "center",
      justifyContent: justifyContent || "center",
      gap: gap ? gap : 10,
    },
  });

  return (
    <ScrollView scrollEnabled={!isTooltipVisible} contentContainerStyle={[styles.container, style]}>
      {children}
    </ScrollView>
  );
}

export default FlexScrollView;
