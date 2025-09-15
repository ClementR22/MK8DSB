import { useThemeStore } from "@/stores/useThemeStore";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useStatGaugeStyles = () => {
  const theme = useThemeStore((state) => state.theme);

  const emptyContainer = [styles.emptyContainer, { backgroundColor: theme.secondary_container }];
  const thick = styles.thick;

  return useMemo(
    () => ({
      emptyContainer,
      thick,
    }),
    [theme]
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    height: "100%",
    flexDirection: "row",
    borderRadius: 12,
    alignItems: "center",
    overflow: "hidden",
  },
  thick: {
    position: "absolute",
    height: "100%",
  },
});
