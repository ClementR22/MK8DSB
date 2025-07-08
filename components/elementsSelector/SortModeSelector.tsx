import React, { useState, useMemo, useCallback, memo } from "react";
import { StyleSheet, ScrollView, Pressable, View } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import useGeneralStore from "@/stores/useGeneralStore";
import { sortButtonsConfig, SortButtonName } from "@/config/sortButtonsConfig"; // Import merged config
import Icon, { IconType } from "react-native-dynamic-vector-icons";

// Constants for layout consistency
const BUTTON_SIZE = 40; // Assumed to match ButtonIcon's default size
export const HALF_GAP = 7;

// Define the names for different sorting options.
const defaultSortNames: SortButtonName[] = [
  "id", // Corresponds to sortNumber 0: Sort by ID
  "name", // Combined for A-Z and Z-A
  "speed", // A special button to open the speed-specific sorting sub-menu
  "acceleration",
  "weight",
  "handling", // A special button to open the handling-specific sorting sub-menu
  "traction",
  "miniTurbo",
];

const speedSortNames: SortButtonName[] = [
  "close", // Button to go back to the defaultSortNames view
  "speedGround", // Corresponds to sortNumber 4
  "speedAntiGravity", // Corresponds to sortNumber 5
  "speedWater", // Corresponds to sortNumber 6
  "speedAir", // Corresponds to sortNumber 7
];

const handlingSortNames: SortButtonName[] = [
  "close", // Button to go back to the defaultSortNames view
  "handlingGround", // Corresponds to sortNumber 8
  "handlingAntiGravity", // Corresponds to sortNumber 9
  "handlingWater", // Corresponds to sortNumber 10
  "handlingAir", // Corresponds to sortNumber 11
];

// Mapping string names to the numerical `sortNumber` expected by `sortElements`.
// We'll use even numbers for ascending and odd numbers for descending.
const sortNameMap: { [key: string]: { asc: number; desc: number } } = {
  id: { asc: 0, desc: 1 },
  name: { asc: 2, desc: 3 }, // Combined name_az and name_za
  speedGround: { asc: 4, desc: 5 },
  speedAntiGravity: { asc: 6, desc: 7 },
  speedWater: { asc: 8, desc: 9 },
  speedAir: { asc: 10, desc: 11 },
  handlingGround: { asc: 12, desc: 13 },
  handlingAntiGravity: { asc: 14, desc: 15 },
  handlingWater: { asc: 16, desc: 17 },
  handlingAir: { asc: 18, desc: 19 },
  acceleration: { asc: 20, desc: 21 },
  weight: { asc: 22, desc: 23 },
  traction: { asc: 24, desc: 25 },
  miniTurbo: { asc: 26, desc: 27 },
};

function getSortNameFromSortNumber(sortNumber: number): SortButtonName | undefined {
  // Itère sur chaque clé (sortName) de la map sortNameMap
  for (const sortName in sortNameMap) {
    // Vérifie que la propriété appartient bien à l'objet (bonne pratique TypeScript/JavaScript)
    if (sortNameMap.hasOwnProperty(sortName)) {
      const { asc, desc } = sortNameMap[sortName]; // Destructure pour obtenir les valeurs asc et desc

      // Vérifie si le sortNumber donné correspond à la valeur asc ou desc
      if (sortNumber === asc || sortNumber === desc) {
        return sortName as SortButtonName; // Retourne le sortName correspondant
      }
    }
  }
  return undefined; // Si aucun sortName correspondant n'est trouvé après avoir parcouru toute la map
}

interface SortModeSelectorProps {
  defaultSortNumber: number;
  setSortNumber: (number: number) => void; // Callback to update the sorting order
}

const SortModeSelector = ({ defaultSortNumber, setSortNumber }: SortModeSelectorProps) => {
  const theme = useThemeStore((state) => state.theme);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  // State to manage which set of sorting buttons is currently displayed (main menu or sub-menus).
  const [displayedSortNames, setDisplayedSortNames] = useState<SortButtonName[]>(defaultSortNames);

  // State to keep track of the current sort direction for the active sort.
  const [currentDirection, setCurrentDirection] = useState<"asc" | "desc">("asc");

  // State to track the currently active sort (e.g., 'id', 'name', 'speedGround')
  const [activeSort, setActiveSort] = useState<SortButtonName>(getSortNameFromSortNumber(defaultSortNumber));

  // Callback to handle button presses for sorting.
  const handlePress = useCallback(
    (name: SortButtonName) => {
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
            const newSortNumber = newDirection === "asc" ? newOrderInfo.asc : newOrderInfo.desc;
            setSortNumber(newSortNumber); // Update the sorting order in the parent component
          }
          break;
      }
    },
    [setSortNumber, activeSort, currentDirection] // Dependencies for handlePress
  );

  // Memoized array of ButtonIcon components to render.
  const displayedButtons = useMemo(() => {
    const isSpeedName = speedSortNames.includes(activeSort);
    const isHandlingName = handlingSortNames.includes(activeSort);

    return displayedSortNames.map((name) => {
      const iconConfig = sortButtonsConfig[name]; // Use sortButtonsConfig
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

      let isBadge = false;
      if (name === "speed" && isSpeedName) {
        isBadge = true;
      } else if (name === "handling" && isHandlingName) {
        isBadge = true;
      } else if (name === activeSort) {
        isBadge = true;
      }

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
          {isBadge && (
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
    <ScrollView horizontal scrollEnabled={isScrollEnable}>
      <Pressable style={styles.container}>{displayedButtons}</Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: HALF_GAP,
    flexDirection: "row", // Arrange buttons horizontally
    alignItems: "center",
    gap: 8, // Add some spacing between buttons (requires React Native 0.71+)
  },
  badgeContainer: {
    position: "absolute",
    top: -2,
    right: -5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    borderRadius: 10,
  },
});

export default memo(SortModeSelector);
