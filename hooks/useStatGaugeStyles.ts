import { useThemeStore } from "@/stores/useThemeStore";
import { BORDER_RADIUS_INF } from "@/utils/designTokens";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export const useStatGaugeStyles = () => {
  const theme = useThemeStore((state) => state.theme);

  const emptyContainer = [styles.emptyContainer, { backgroundColor: theme.surface_container_highest }];
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
    borderRadius: BORDER_RADIUS_INF,
    alignItems: "center",
    overflow: "hidden",
  },
  thick: {
    height: "100%",
    justifyContent: "center",
  },
});
