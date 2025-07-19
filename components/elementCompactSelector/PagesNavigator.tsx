import { sortButtonsConfig } from "@/config/sortButtonsConfig";
import { ResultStat, useResultStats } from "@/contexts/ResultStatsContext";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { useThemeStore } from "@/stores/useThemeStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useCallback, useMemo, memo } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

interface PagesNavigatorProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  // permet de personnaliser les dots avec des icons de stat
  dotsList?: ResultStat[];
  // numberOfPages (= dotsList.length) est obligatoire même si dotsList est déjà fournit
  numberOfPages: number;
}

const PagesNavigator: React.FC<PagesNavigatorProps> = ({ currentPage, setCurrentPage, dotsList, numberOfPages }) => {
  const theme = useThemeStore((state) => state.theme);

  // Navigation handlers
  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, numberOfPages - 1));
  }, [numberOfPages]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  }, []);

  // Memoized styles and colors
  const { paginationControlsStyle, navButtonColor, activeDotColor, inactiveDotColor, activeDotIconColor } = useMemo(
    () => ({
      paginationControlsStyle: [styles.paginationControls],
      navButtonColor: theme.primary,
      activeDotColor: theme.primary,
      inactiveDotColor: theme.inactive_dot || theme.on_surface_variant,
      activeDotIconColor: "black",
    }),
    [theme]
  );

  // Navigation buttons disabled state
  const { isLeftButtonDisabled, isRightButtonDisabled } = useMemo(
    () => ({
      isLeftButtonDisabled: currentPage === 0,
      isRightButtonDisabled: currentPage === numberOfPages - 1,
    }),
    [currentPage, numberOfPages]
  );

  // Memoized dots rendering
  const renderDots = useMemo(() => {
    if (dotsList) {
      return dotsList
        .map((stat, index) => {
          if (!stat.checked) return null;

          const { name } = stat;
          const isActive = index === currentPage;
          const { iconName, iconType, iconBackgroundColor } = sortButtonsConfig[name];

          return (
            <Pressable key={name} onPress={() => setCurrentPage(index)} style={styles.dotPressable}>
              <ButtonIcon
                onPress={() => setCurrentPage(index)}
                tooltipText={name}
                iconName={iconName}
                iconType={iconType}
                iconSize={16}
                style={{
                  backgroundColor: isActive ? activeDotIconColor : iconBackgroundColor ?? theme.primary,
                }}
              />
            </Pressable>
          );
        })
        .filter(Boolean);
    }

    return Array.from({ length: numberOfPages }).map((_, index) => (
      <Pressable key={index} onPress={() => setCurrentPage(index)} style={styles.dotPressable}>
        <View style={[styles.dot, { backgroundColor: index === currentPage ? activeDotColor : inactiveDotColor }]} />
      </Pressable>
    ));
  }, [dotsList, currentPage, numberOfPages, activeDotColor, inactiveDotColor, activeDotIconColor]);

  if (numberOfPages <= 1) return null;

  return (
    <View style={paginationControlsStyle}>
      <NavButton
        icon="chevron-left"
        onPress={goToPrevPage}
        disabled={isLeftButtonDisabled}
        color={isLeftButtonDisabled ? theme.on_surface_variant : navButtonColor}
      />

      <ScrollView horizontal contentContainerStyle={styles.dotsContainer}>
        {renderDots}
      </ScrollView>

      <NavButton
        icon="chevron-right"
        onPress={goToNextPage}
        disabled={isRightButtonDisabled}
        color={isRightButtonDisabled ? theme.on_surface_variant : navButtonColor}
      />
    </View>
  );
};

// Extracted NavButton component for better readability and reusability
const NavButton = memo(
  ({
    icon,
    onPress,
    disabled,
    color,
  }: {
    icon: "chevron-left" | "chevron-right";
    onPress: () => void;
    disabled: boolean;
    color: string;
  }) => (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.navButton, disabled && styles.navButtonDisabled]}>
      <MaterialCommunityIcons name={icon} size={30} color={color} />
    </Pressable>
  )
);

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
    flex: 1,
    justifyContent: "center",
  },
  dotPressable: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  dot: {
    width: 30,
    height: 10,
    borderRadius: 5,
  },
});

export default memo(PagesNavigator);
