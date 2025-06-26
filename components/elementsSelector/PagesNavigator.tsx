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
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  }, [totalPages, setCurrentPage]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  }, [setCurrentPage]);

  const goToPage = useCallback(
    (pageIndex: number) => {
      setCurrentPage(pageIndex);
    },
    [setCurrentPage]
  );

  const paginationControlsStyle = useMemo(
    () => [styles.paginationControls, { backgroundColor: theme.surface_container_high, borderColor: theme.outline }], // Ajout de la couleur de la bordure depuis le thème
    [theme.surface_container_high, theme.outline]
  );

  const pageInfoStyle = useMemo(() => [styles.pageInfo, { color: theme.on_surface }], [theme.on_surface]);

  const navButtonColor = useMemo(() => theme.primary, [theme.primary]);

  const activeDotColor = useMemo(() => theme.primary, [theme.primary]);
  const inactiveDotColor = useMemo(
    () => theme.inactive_dot || theme.on_surface_variant,
    [theme.inactive_dot, theme.on_surface_variant]
  );

  return (
    <View style={paginationControlsStyle}>
      <Pressable
        onPress={goToPrevPage}
        disabled={currentPage === 0}
        style={({ pressed }) => [
          styles.navButton,
          currentPage === 0 && styles.navButtonDisabled,
          pressed && styles.navButtonPressed,
        ]}
        accessibilityLabel="Previous page"
      >
        <MaterialCommunityIcons
          name="chevron-left"
          size={30}
          color={currentPage === 0 ? theme.on_surface_variant : navButtonColor}
        />
      </Pressable>

      <View style={styles.centerPagination}>
        <Text style={pageInfoStyle}>
          Page {currentPage + 1} / {totalPages}
        </Text>

        <View style={styles.dotsContainer}>
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pressable
              key={index}
              onPress={() => goToPage(index)}
              style={[styles.dot, { backgroundColor: index === currentPage ? activeDotColor : inactiveDotColor }]}
              accessibilityLabel={`Go to page ${index + 1}`}
            />
          ))}
        </View>
      </View>

      <Pressable
        onPress={goToNextPage}
        disabled={currentPage === totalPages - 1}
        style={({ pressed }) => [
          styles.navButton,
          currentPage === totalPages - 1 && styles.navButtonDisabled,
          pressed && styles.navButtonPressed,
        ]}
        accessibilityLabel="Next page"
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
  },
  centerPagination: {
    flex: 1,
    alignItems: "center",
  },
  navButton: {
    padding: 8,
    borderRadius: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonPressed: {
    opacity: 0.7,
  },
  pageInfo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
});

export default memo(PagesNavigator);
