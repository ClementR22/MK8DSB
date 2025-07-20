import React, { useCallback, useMemo, memo } from "react";
import { Pressable, ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { useThemeStore } from "@/stores/useThemeStore";
import { sortButtonsConfig } from "@/config/sortButtonsConfig";
import { STAT_SLIDER_COMPARE_WIDTH } from "../statSliderCompare/StatSliderCompare";
import { HALF_GAP } from "./SortModeSelector";

// Constants
const HEIGHT = 30;
export const PAGES_NAVIGATOR_DOTS_ICONS_SIZE = HEIGHT * 0.8;
const NAV_BUTTON_WIDTH = 46;
const DOTS_CONTAINER_MAX_WIDTH = STAT_SLIDER_COMPARE_WIDTH - 2 * NAV_BUTTON_WIDTH;

export type ButtonName = string;

interface PagesNavigatorProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  dotsNamesList?: ButtonName[];
  moreDots?: React.ReactElement[];
  numberOfPages: number;
}

const PagesNavigator: React.FC<PagesNavigatorProps> = ({
  currentPage,
  setCurrentPage,
  dotsNamesList,
  moreDots,
  numberOfPages,
}) => {
  const theme = useThemeStore((state) => state.theme);

  // Navigation handlers
  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, numberOfPages - 1));
  }, [numberOfPages, setCurrentPage]);

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  }, [setCurrentPage]);

  // Theme colors
  const { navButtonColor, activeDotColor, inactiveDotColor, activeDotIconColor } = useMemo(
    () => ({
      navButtonColor: theme.primary,
      activeDotColor: theme.primary,
      inactiveDotColor: theme.inactive_dot || theme.on_surface_variant,
      activeDotIconColor: "black",
    }),
    [theme]
  );

  const separatorDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.outline_variant,
    }),
    [theme.outline_variant]
  );

  const scrollViewStyle = useMemo(
    () => ({ height: "100%", paddingRight: moreDots && HALF_GAP } as ViewStyle),
    [moreDots]
  );

  // Navigation state
  const { isLeftButtonDisabled, isRightButtonDisabled } = useMemo(
    () => ({
      isLeftButtonDisabled: currentPage === 0,
      isRightButtonDisabled: currentPage === numberOfPages - 1,
    }),
    [currentPage, numberOfPages]
  );

  // Dots rendering
  const renderDots = useMemo(() => {
    if (dotsNamesList) {
      return dotsNamesList.map((buttonName, index) => {
        const isActive = index === currentPage;
        const { iconName, iconType, iconBackgroundColor } = sortButtonsConfig[buttonName];

        return (
          <ButtonIcon
            key={buttonName}
            onPress={() => setCurrentPage(index)}
            tooltipText={buttonName}
            iconName={iconName}
            iconType={iconType}
            buttonSize={PAGES_NAVIGATOR_DOTS_ICONS_SIZE}
            style={{
              backgroundColor: isActive ? activeDotIconColor : iconBackgroundColor ?? theme.primary,
            }}
          />
        );
      });
    }

    return Array.from({ length: numberOfPages }).map((_, index) => (
      <Pressable key={`dot-${index}`} onPress={() => setCurrentPage(index)} style={styles.dotPressable}>
        <View style={[styles.dot, { backgroundColor: index === currentPage ? activeDotColor : inactiveDotColor }]} />
      </Pressable>
    ));
  }, [
    dotsNamesList,
    currentPage,
    numberOfPages,
    activeDotColor,
    inactiveDotColor,
    activeDotIconColor,
    theme.primary,
    setCurrentPage,
  ]);

  return (
    <View style={styles.paginationControls}>
      <NavButton
        icon="chevron-left"
        onPress={goToPrevPage}
        disabled={isLeftButtonDisabled}
        color={isLeftButtonDisabled ? theme.on_surface_variant : navButtonColor}
      />

      <View style={styles.dotsContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollViewContent}
          showsHorizontalScrollIndicator={false}
          style={scrollViewStyle}
        >
          {renderDots}
        </ScrollView>

        {moreDots && (
          <>
            <View style={[styles.separator, separatorDynamicStyle]} />
            <View style={styles.moreDotsContainer}>{moreDots}</View>
          </>
        )}
      </View>

      <NavButton
        icon="chevron-right"
        onPress={goToNextPage}
        disabled={isRightButtonDisabled}
        color={isRightButtonDisabled ? theme.on_surface_variant : navButtonColor}
      />
    </View>
  );
};

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
    width: "100%",
    height: HEIGHT,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    maxWidth: DOTS_CONTAINER_MAX_WIDTH,
    height: "100%",
  },
  scrollViewContent: {
    alignItems: "center",
    gap: HALF_GAP,
  },
  navButton: {
    width: NAV_BUTTON_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  separator: {
    width: 2,
    height: PAGES_NAVIGATOR_DOTS_ICONS_SIZE,
  },
  moreDotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: HALF_GAP,
  },
  dotPressable: {
    height: "100%",
    justifyContent: "center",
  },
  dot: {
    width: 30,
    height: 10,
    borderRadius: 5,
  },
});

export default memo(PagesNavigator);
