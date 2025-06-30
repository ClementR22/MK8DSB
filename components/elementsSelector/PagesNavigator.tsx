import { useThemeStore } from "@/stores/useThemeStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useCallback, useMemo, memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface PagesNavigatorProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const PagesNavigator: React.FC<PagesNavigatorProps> = ({ currentPage, setCurrentPage, totalPages }) => {
  const theme = useThemeStore((state) => state.theme);

  const goToNextPage = useCallback(() => {
    // No change needed, already optimal.
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  }, [totalPages, setCurrentPage]); // totalPages dependency is correct.

  const goToPrevPage = useCallback(() => {
    // No change needed, already optimal.
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  }, [setCurrentPage]); // setCurrentPage dependency is correct.

  const goToPage = useCallback(
    // No change needed, already optimal.
    (pageIndex: number) => {
      setCurrentPage(pageIndex);
    },
    [setCurrentPage]
  );

  // Memoize paginationControlsStyle.
  const paginationControlsStyle = useMemo(
    () => [styles.paginationControls, {}],
    [theme.surface_container_high, theme.outline]
  );

  // Memoize navButtonColor.
  const navButtonColor = useMemo(() => theme.primary, [theme.primary]);

  // Memoize dot colors.
  const activeDotColor = useMemo(() => theme.primary, [theme.primary]);
  const inactiveDotColorResolved = useMemo(
    () => theme.inactive_dot || theme.on_surface_variant, // Use the destructured values
    [theme.inactive_dot, theme.on_surface_variant]
  );

  // OPTIMIZATION: Memoize the array of dots if totalPages changes, not on every render.
  // This prevents the map from running if only currentPage changes (though React's diffing is good).
  // More useful if dot components were themselves complex or memoized.
  const dots = useMemo(() => {
    if (totalPages <= 1) return null; // Don't render dots if only one page or less

    return Array.from({ length: totalPages }).map((_, index) => (
      <Pressable
        key={index}
        onPress={() => goToPage(index)}
        style={{ height: 40, justifyContent: "center", paddingHorizontal: 3 }}
      >
        <View
          style={[styles.dot, { backgroundColor: index === currentPage ? activeDotColor : inactiveDotColorResolved }]}
        />
      </Pressable>
    ));
  }, [totalPages, currentPage, goToPage, activeDotColor, inactiveDotColorResolved]);

  return (
    <View style={paginationControlsStyle}>
      <Pressable
        onPress={goToPrevPage}
        disabled={currentPage === 0}
        style={[styles.navButton, currentPage === 0 && styles.navButtonDisabled]}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          size={30}
          color={currentPage === 0 ? theme.on_surface_variant : navButtonColor}
        />
      </Pressable>

      <View style={styles.dotsContainer}>{dots}</View>

      <Pressable
        onPress={goToNextPage}
        disabled={currentPage === totalPages - 1}
        style={[styles.navButton, currentPage === totalPages - 1 && styles.navButtonDisabled]}
      >
        <MaterialCommunityIcons
          name="chevron-right"
          size={30}
          color={currentPage === totalPages - 1 ? theme.on_surface_variant : navButtonColor}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navButton: {
    paddingHorizontal: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 30,
    height: 10,
    borderRadius: 5,
  },
});

export default memo(PagesNavigator);
