import React, { useState, useMemo, useCallback, memo } from "react";
import { StyleSheet, ScrollView, Pressable, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import useGeneralStore from "@/stores/useGeneralStore";
import { appIconsConfig, AppButtonName } from "@/config/appIconsConfig"; // Import merged config
import Icon, { IconType } from "react-native-dynamic-vector-icons";

// Constants for layout consistency
const BUTTON_SIZE = 40; // Assumed to match ButtonIcon's default size

// Define the names for different sorting options.
const defaultSortNames: AppButtonName[] = [
  "id", // Corresponds to orderNumber 0: Sort by ID
  "name", // Combined for A-Z and Z-A
  "classId", // Corresponds to orderNumber 3: Sort by class ID
  "speed", // A special button to open the speed-specific sorting sub-menu
  "handling", // A special button to open the handling-specific sorting sub-menu
  "acceleration",
  "weight",
  "traction",
  "miniTurbo",
];

const speedSortNames: AppButtonName[] = [
  "close", // Button to go back to the defaultSortNames view
  "speedGround", // Corresponds to orderNumber 4
  "speedAntiGravity", // Corresponds to orderNumber 5
  "speedWater", // Corresponds to orderNumber 6
  "speedAir", // Corresponds to orderNumber 7
];

const handlingSortNames: AppButtonName[] = [
  "close", // Button to go back to the defaultSortNames view
  "handlingGround", // Corresponds to orderNumber 8
  "handlingAntiGravity", // Corresponds to orderNumber 9
  "handlingWater", // Corresponds to orderNumber 10
  "handlingAir", // Corresponds to orderNumber 11
];

// Mapping string names to the numerical `orderNumber` expected by `sortElements`.
// We'll use even numbers for ascending and odd numbers for descending.
const sortNameMap: { [key: string]: { asc: number; desc: number } } = {
  id: { asc: 0, desc: 1 },
  name: { asc: 2, desc: 3 }, // Combined name_az and name_za
  classId: { asc: 4, desc: 5 },
  speedGround: { asc: 6, desc: 7 },
  speedAntiGravity: { asc: 8, desc: 9 },
  speedWater: { asc: 10, desc: 11 },
  speedAir: { asc: 12, desc: 13 },
  handlingGround: { asc: 14, desc: 15 },
  handlingAntiGravity: { asc: 16, desc: 17 },
  handlingWater: { asc: 18, desc: 19 },
  handlingAir: { asc: 20, desc: 21 },
  acceleration: { asc: 22, desc: 23 },
  weight: { asc: 24, desc: 25 },
  traction: { asc: 26, desc: 27 },
  miniTurbo: { asc: 28, desc: 29 },
};

interface SortModeSelectorProps {
  setOrderNumber: (order: number) => void; // Callback to update the sorting order
}

const SortModeSelector = ({ setOrderNumber }: SortModeSelectorProps) => {
  const theme = useThemeStore((state) => state.theme);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  // State to manage which set of sorting buttons is currently displayed (main menu or sub-menus).
  const [displayedSortNames, setDisplayedSortNames] = useState<AppButtonName[]>(defaultSortNames);

  // State to track the currently active sort (e.g., 'id', 'name', 'speedGround')
  const [activeSort, setActiveSort] = useState<AppButtonName>("id");

  // State to keep track of the current sort direction for the active sort.
  const [currentDirection, setCurrentDirection] = useState<"asc" | "desc">("asc");

  // Callback to handle button presses for sorting.
  const handlePress = useCallback(
    (name: AppButtonName) => {
      switch (name) {
        case "speed":
          setDisplayedSortNames(speedSortNames); // Switch to speed sub-menu
          break;
        case "handling":
          setDisplayedSortNames(handlingSortNames); // Switch to handling sub-menu
          break;
        case "close":
          setDisplayedSortNames(defaultSortNames); // Go back to main menu
          break;
        default:
          // This is a specific sort button (e.g., "id", "speedGround")
          let newDirection: "asc" | "desc";

          if (activeSort === name) {
            // If the same sort button is clicked again, toggle its direction
            newDirection = currentDirection === "asc" ? "desc" : "asc";
          } else {
            // If a different sort button is clicked, reset to ascending
            newDirection = "asc";
          }

          setActiveSort(name); // Set this sort as the active one
          setCurrentDirection(newDirection); // Set its direction

          const newOrderInfo = sortNameMap[name];
          if (newOrderInfo) {
            const orderToSend = newDirection === "asc" ? newOrderInfo.asc : newOrderInfo.desc;
            setOrderNumber(orderToSend); // Update the sorting order in the parent component
          }
          break;
      }
    },
    [setOrderNumber, activeSort, currentDirection] // Dependencies for handlePress
  );

  // Memoized array of ButtonIcon components to render.
  const displayedButtons = useMemo(() => {
    return displayedSortNames.map((name) => {
      const iconConfig = appIconsConfig[name]; // Use appIconsConfig
      if (!iconConfig) {
        return null;
      }

      const { iconName, iconType } = iconConfig;
      const iconBackgroundColor = iconConfig.iconBackgroundColor || theme.primary;

      // Apply direction-specific icon and tooltip for sortable items IF they are the active sort
      // Determine the icon and colors for the badge
      const badgeIconName = currentDirection === "asc" ? "arrow-down" : "arrow-up";
      const badgeIconType = IconType.MaterialCommunityIcons;
      const badgeBackgroundColor = "blue"; // Default badge icon color (for contrast)
      const badgeIconColor = theme.surface; // Default badge icon color (for contrast)
      const badgeIconInnerSize = 20; // Arrow icon will be 70% of the badge's size

      return (
        <View
          key={name} // Unique key for React list rendering
        >
          <ButtonIcon
            onPress={() => handlePress(name)} // Attach the handler
            tooltipText={name} // Display the name as a tooltip (consider translation)
            iconName={iconName}
            iconType={iconType}
            size={BUTTON_SIZE} // Ensure consistent button size
            style={{ backgroundColor: iconBackgroundColor }}
          />
          {activeSort === name && (
            <View style={[styles.badgeContainer, { backgroundColor: badgeBackgroundColor }]}>
              <Icon name={badgeIconName} type={badgeIconType} size={badgeIconInnerSize} color={badgeIconColor} />
            </View>
          )}
        </View>
      );
    });
  }, [
    displayedSortNames,
    handlePress,
    activeSort, // Dependency for active sort detection
    currentDirection, // Dependency for icon/tooltip of active sort
    theme.primary,
  ]);

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.buttonsContainer}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={isScrollEnable}
    >
      <Pressable style={styles.container}>{displayedButtons}</Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange buttons horizontally
    gap: 8, // Add some spacing between buttons (requires React Native 0.71+)
    // If using older React Native, use margin for spacing:
    // margin: 4,
  },
  buttonsContainer: {
    alignItems: "center", // Vertically align items in the scroll view
    height: 54, // Fixed height for the scroll view containing buttons
  },
  badgeContainer: {
    position: "absolute",
    top: -5,
    right: -5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    borderRadius: 10,
  },
});

export default memo(SortModeSelector);
