import React, { useState, useMemo, useCallback, memo } from "react";
import { StyleSheet, ScrollView, Pressable } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import useGeneralStore from "@/stores/useGeneralStore";
// If you need to translate tooltipText or other UI strings, import translateToLanguage
// import { translateToLanguage } from "@/translations/translations";
// import { useLanguageStore } from "@/stores/useLanguageStore"; // and use the language store

// Constants for layout consistency
const BUTTON_SIZE = 40; // Assumed to match ButtonIcon's default size

// Define the names for different sorting options.
// These strings will be used as keys for `sortIconsList` and `sortNameMap`.
const defaultSortNames = [
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

const speedSortNames = [
  "close", // Button to go back to the defaultSortNames view
  "speedGround", // Corresponds to orderNumber 4
  "speedAntiGravity", // Corresponds to orderNumber 5
  "speedWater", // Corresponds to orderNumber 6
  "speedAir", // Corresponds to orderNumber 7
];

const handlingSortNames = [
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
  const [displayedSortNames, setDisplayedSortNames] = useState<string[]>(defaultSortNames);

  // State to track the currently active sort (e.g., 'id', 'name', 'speedGround')
  const [activeSort, setActiveSort] = useState<string | null>("id");

  // State to keep track of the current sort direction for the active sort.
  const [currentDirection, setCurrentDirection] = useState<"asc" | "desc">("asc");

  // Memoized object containing icon configurations for each sort mode.
  const sortIconsList = useMemo(
    () => ({
      // Icons for main sorting categories
      id: { iconName: "sort-numeric-ascending", iconType: IconType.MaterialCommunityIcons },
      name: {
        iconName: "sort-alphabetical",
        iconType: IconType.MaterialCommunityIcons,
      },
      classId: {
        iconName: "view-gallery-outline",
        iconType: IconType.MaterialCommunityIcons,
      }, // Example icon for "by classId"

      // Icons for category buttons that open sub-menus
      speed: {
        iconName: "speedometer",
        iconType: IconType.SimpleLineIcons,
      },
      handling: {
        iconName: "steering",
        iconType: IconType.MaterialCommunityIcons,
      },

      // Icon for going back from sub-menus
      close: { iconName: "close", iconType: IconType.AntDesign },

      // Icons for specific speed stats (using distinct colors like in StatSliderCompareSelector)
      speedGround: {
        iconName: "speedometer",
        iconType: IconType.SimpleLineIcons,
        iconBackgroundColor: "tan",
      },
      speedAntiGravity: {
        iconName: "speedometer",
        iconType: IconType.SimpleLineIcons,
        iconBackgroundColor: "blueviolet",
      },
      speedWater: {
        iconName: "speedometer",
        iconType: IconType.SimpleLineIcons,
        iconBackgroundColor: "dodgerblue",
      },
      speedAir: {
        iconName: "speedometer",
        iconType: IconType.SimpleLineIcons,
        iconBackgroundColor: "powderblue",
      },

      // Icons for specific handling stats
      handlingGround: {
        iconName: "steering",
        iconType: IconType.MaterialCommunityIcons,
        iconBackgroundColor: "tan",
      },
      handlingAntiGravity: {
        iconName: "steering",
        iconType: IconType.MaterialCommunityIcons,
        iconBackgroundColor: "blueviolet",
      },
      handlingWater: {
        iconName: "steering",
        iconType: IconType.MaterialCommunityIcons,
        iconBackgroundColor: "dodgerblue",
      },
      handlingAir: {
        iconName: "steering",
        iconType: IconType.MaterialCommunityIcons,
        iconBackgroundColor: "powderblue",
      },

      // Icons for other direct stat sorts (if you want buttons for them on the main menu)
      acceleration: {
        iconName: "keyboard-double-arrow-up",
        iconType: IconType.MaterialIcons,
      },
      weight: {
        iconName: "weight-gram",
        iconType: IconType.MaterialCommunityIcons,
      },
      traction: {
        iconName: "car-traction-control",
        iconType: IconType.MaterialCommunityIcons,
      },
      miniTurbo: {
        iconName: "rocket-launch-outline",
        iconType: IconType.MaterialCommunityIcons,
      },
    }),
    [] // Dependencies: no theme dependency here, as colors are handled separately
  );

  const getIconNameForDirection = useCallback(
    (name: string, direction: "asc" | "desc") => {
      if (name === "id") {
        return direction === "asc" ? "sort-numeric-ascending" : "sort-numeric-descending";
      } else if (name === "name") {
        return direction === "asc" ? "sort-alphabetical-ascending" : "sort-alphabetical-descending";
      } else return sortIconsList[name]?.iconName;
    },
    [sortIconsList]
  );

  // Callback to handle button presses for sorting.
  // It manages the displayed buttons (menu navigation) and updates the `orderNumber`.
  const handlePress = useCallback(
    (name: string) => {
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
      const iconConfig = sortIconsList[name];
      if (!iconConfig) {
        return null;
      }

      const { iconType } = iconConfig;
      let iconName = iconConfig.iconName;
      let iconBackgroundColor = iconConfig.iconBackgroundColor || theme.primary; // Default to theme.primary

      // Determine if this button is the currently active sort
      const isActive = activeSort === name;

      // Apply direction-specific icon and tooltip for sortable items IF they are the active sort
      if (isActive && sortNameMap[name]) {
        iconName = getIconNameForDirection(name, currentDirection);
      } else if (sortNameMap[name]) {
        // For non-active sortable items, show the generic ascending icon and tooltip
        iconName = getIconNameForDirection(name, "asc");
      }

      return (
        <ButtonIcon
          key={name} // Unique key for React list rendering
          onPress={() => handlePress(name)} // Attach the handler
          tooltipText={name} // Display the name as a tooltip (consider translation)
          iconName={iconName}
          iconType={iconType}
          size={BUTTON_SIZE} // Ensure consistent button size
          // Dynamically set background color based on active sort and direction
          style={{
            backgroundColor: isActive
              ? currentDirection === "asc"
                ? "red" // Active and Ascending
                : "blue" // Active and Descending
              : iconBackgroundColor, // Default background for inactive buttons
          }}
        />
      );
    });
  }, [
    displayedSortNames,
    sortIconsList,
    handlePress,
    activeSort, // Dependency for active sort detection
    currentDirection, // Dependency for icon/tooltip of active sort
    getIconNameForDirection,
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
});

export default memo(SortModeSelector);
