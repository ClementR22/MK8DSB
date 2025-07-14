// GalleryScreenok.tsx
import React, { useState, useRef, useEffect, useMemo, memo } from "react"; // Add memo
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import CategorySelector from "./elementsSelector/selector/CategorySelector"; // The expanded version
import CategorySelectorCollapsed from "./elementsSelector/selector/CategorySelectorCollapsed"; // The collapsed version
import { Category, ElementData } from "@/data/elements/elementsTypes";
import { useLanguageStore } from "@/stores/useLanguageStore";
import {
  elementsDataBody,
  elementsDataCharacter,
  elementsDataGlider,
  elementsDataWheel,
} from "@/data/elements/elementsData";
import { sortElements } from "@/utils/sortElements";
import SortModeSelector from "./elementsSelector/SortModeSelector";
import { classesStatsByCategory } from "@/data/elements/elementsStats";
import { statNames, statNamesCompact } from "@/data/stats/statsData";
import StatSliderCompact from "./statSlider/StatSliderCompact"; // Ensure this component also looks good
import { useThemeStore } from "@/stores/useThemeStore"; // Import theme store for main component styling
import {
  PADDING_HORIZONTAL,
  BORDER_RADIUS_18,
  BORDER_RADIUS_12,
  CARD_SPACING,
  LIST_ITEM_SPACING,
  SHADOW_STYLE,
  SHADOW_STYLE_LIGHT,
  BORDER_RADIUS_15,
} from "@/utils/designTokens"; // Import design tokens
import { SET_CARD_CONTAINER_PADDING } from "./statSliderSetCard/StatNamesFloatingContainer";
import { maxValues } from "@/data/classStats";

const ELEMENT_ITEM_PADDING = 3;
const IMAGE_SIZE = 50;
const LEFT_COLUMN_PADDING_HORIZONTAL = 10;

// Obtenir les dimensions de l'écran pour la réactivité
const { width: screenWidth } = Dimensions.get("window");

// Largeurs définies pour la colonne de gauche
const LEFT_COLUMN_WIDTH_EXPANDED = screenWidth * 0.7; // 70% de la largeur de l'écran
const LEFT_COLUMN_WIDTH_COLLAPSED = IMAGE_SIZE + 2 * ELEMENT_ITEM_PADDING + 2 * LEFT_COLUMN_PADDING_HORIZONTAL; // Slightly wider for the new design

// --- Memoized ElementItem Component ---
// This helps prevent unnecessary re-renders of list items
const MemoizedElementItem = memo(({ item, isSelected, onPress, isCollapsed, theme }) => {
  // Pass theme to element item for consistent styling
  return (
    <TouchableOpacity
      style={[
        elementItemStyles.container,
        isSelected && { backgroundColor: theme.primary, ...SHADOW_STYLE_LIGHT }, // Active state with primary color and subtle shadow
        !isSelected && { backgroundColor: theme.surface, ...SHADOW_STYLE_LIGHT }, // Inactive state with surface color and subtle shadow
      ]}
      onPress={() => onPress(item.id)}
      activeOpacity={0.7} // Add a visual feedback for press
    >
      <View style={elementItemStyles.imagePlaceholder}>
        {/* Placeholder background */}
        <Image style={elementItemStyles.image} source={item.imageUrl} resizeMode="contain" />
      </View>
      {!isCollapsed && (
        <Text
          style={[
            elementItemStyles.text,
            isSelected ? { color: theme.on_primary } : { color: theme.on_surface }, // Text color based on selection
          ]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
      )}
    </TouchableOpacity>
  );
});

const elementItemStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: LIST_ITEM_SPACING / 2, // Half spacing for vertical rhythm
    paddingHorizontal: ELEMENT_ITEM_PADDING,
    borderRadius: BORDER_RADIUS_12, // Medium rounded corners
    overflow: "hidden", // Ensures shadow works nicely
  },
  imagePlaceholder: {
    width: IMAGE_SIZE, // Slightly larger image placeholder
    height: IMAGE_SIZE * 1.25,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "90%",
  },
  text: {
    marginLeft: LIST_ITEM_SPACING,
    flex: 1,
    fontSize: 16, // Slightly larger font
    fontWeight: "500", // Medium font weight
  },
});

const allCategoryElements: {
  [key in Category]: ElementData[];
} = {
  character: elementsDataCharacter,
  body: elementsDataBody,
  wheel: elementsDataWheel,
  glider: elementsDataGlider,
};

// --- Main GalleryScreenok Component ---
const GalleryScreenok = () => {
  const [selectedElementId, setSelectedElementId] = useState(0); // Initialize with a default ID if possible
  const [isLeftColumnExpanded, setIsLeftColumnExpanded] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>("character");
  const [sortNumber, setSortNumber] = useState(0);

  const theme = useThemeStore((state) => state.theme); // Get theme for main component
  const language = useLanguageStore((state) => state.language); // Moved up to be a dependency

  const categoryElementsSorted = useMemo(
    () => sortElements(allCategoryElements[selectedCategory], sortNumber, language),
    [selectedCategory, sortNumber, language]
  );

  // Initialize selectedElementId to the first element of the initial category
  useEffect(() => {
    setSelectedElementId(categoryElementsSorted[0].id);
  }, [categoryElementsSorted]);

  const animatedLeftColumnWidth = useRef(new Animated.Value(LEFT_COLUMN_WIDTH_EXPANDED)).current;
  const animatedRightColumnOverlayOpacity = useRef(new Animated.Value(0)).current;

  const maxValue = useMemo(() => maxValues[selectedCategory], [selectedCategory]);

  useEffect(() => {
    if (isLeftColumnExpanded) {
      Animated.parallel([
        Animated.timing(animatedLeftColumnWidth, {
          toValue: LEFT_COLUMN_WIDTH_EXPANDED,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedRightColumnOverlayOpacity, { toValue: 1, duration: 300, useNativeDriver: false }), // Overlay fades OUT when expanded
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animatedLeftColumnWidth, {
          toValue: LEFT_COLUMN_WIDTH_COLLAPSED,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedRightColumnOverlayOpacity, { toValue: 0, duration: 300, useNativeDriver: false }), // Overlay fades IN when collapsed
      ]).start();
    }
  }, [isLeftColumnExpanded, animatedLeftColumnWidth, animatedRightColumnOverlayOpacity]); // Add dependencies

  // Handle left column item press
  const handleLeftColumnPress = (id: number) => {
    if (id === selectedElementId) {
      setIsLeftColumnExpanded(!isLeftColumnExpanded);
    } else {
      setSelectedElementId(id); // Select the new item
      setIsLeftColumnExpanded(false);
    }
  };

  // Handle right column press (to expand left column)
  const handleRightColumnPress = () => {
    setIsLeftColumnExpanded(false);
  };

  // Handle category selector press (when collapsed, to expand left column)
  const handleCategoryPress = () => {
    setIsLeftColumnExpanded(true);
  };

  const { selectedElementName, selectedElementStats } = useMemo(() => {
    // Find the currently selected element data
    const currentElement = categoryElementsSorted.find((element: ElementData) => element.id === selectedElementId);

    // Provide a default or handle case where currentElement is undefined (e.g., initial state before data loads)
    if (!currentElement) {
      return { selectedElementName: "N/A", selectedElementStats: [] };
    }

    const name = currentElement.name;
    const classId = currentElement.classId;

    const statsArray = classesStatsByCategory[selectedCategory].get(classId);

    // Ensure statsArray exists before mapping
    const stats = statsArray
      ? statNames.map((statName, index) => {
          const statNameCompact = statNamesCompact[statName];
          return { name: statNameCompact, value: statsArray[index] };
        })
      : [];

    return { selectedElementName: name, selectedElementStats: stats };
  }, [selectedElementId, selectedCategory, categoryElementsSorted]); // Add selectedCategory and categoryElementsSorted as dependencies

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      {/* Apply background theme color */}
      {/* Right Column - StatSliderList */}
      <View style={[styles.galleryCard, { borderColor: theme.surface_container, backgroundColor: theme.surface }]}>
        <View style={styles.galleryCardHeader}>
          <Text style={[styles.selectedElementName, { color: theme.on_surface }]}>{selectedElementName}</Text>
        </View>
        <FlatList
          data={selectedElementStats}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <StatSliderCompact
              name={item.name}
              value={item.value}
              isRelativeValue={selectedCategory !== "character"}
              maxValue={maxValue}
            />
          )}
          contentContainerStyle={styles.flatListContent}
        />
      </View>

      <Animated.View style={[styles.rightColumnOverlay, { opacity: animatedRightColumnOverlayOpacity }]}>
        {/* Themed overlay */}
        <Pressable style={styles.container} onPress={handleRightColumnPress} />
      </Animated.View>

      {/* Left Column - ElementList */}
      <Animated.View style={[styles.leftColumn, { width: animatedLeftColumnWidth, backgroundColor: theme.surface }]}>
        {/* Themed background */}
        <View style={styles.controlsAndCategoryContainer}>
          {/* New container for controls and category */}
          <View style={styles.sortSelectorContainer}>
            <SortModeSelector sortNumber={sortNumber} setSortNumber={setSortNumber} sortCase="element" />
          </View>
          {isLeftColumnExpanded ? (
            <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          ) : (
            <CategorySelectorCollapsed selectedCategory={selectedCategory} onPress={handleCategoryPress} />
          )}
        </View>
        <FlatList
          data={categoryElementsSorted}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MemoizedElementItem // Use Memoized version
              item={item}
              isSelected={item.id === selectedElementId}
              onPress={handleLeftColumnPress}
              isCollapsed={!isLeftColumnExpanded}
              theme={theme} // Pass theme
            />
          )}
          contentContainerStyle={{ paddingHorizontal: LEFT_COLUMN_PADDING_HORIZONTAL }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // Background color from theme applied in JSX
  },
  leftColumn: {
    borderTopEndRadius: BORDER_RADIUS_18, // Consistent radius
    borderEndEndRadius: BORDER_RADIUS_18,
    overflow: "hidden",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    marginVertical: CARD_SPACING / 2,
    ...SHADOW_STYLE, // Apply shadow to the column
  },
  controlsAndCategoryContainer: {
    paddingVertical: CARD_SPACING / 2, // Small internal padding
    marginBottom: CARD_SPACING / 2, // Space before the list
  },
  sortSelectorContainer: {
    marginHorizontal: CARD_SPACING, // Match padding of CategorySelector
    marginBottom: CARD_SPACING, // Space between sort selector and category selector
  },
  galleryCard: {
    marginLeft: LEFT_COLUMN_WIDTH_COLLAPSED + CARD_SPACING,
    marginRight: CARD_SPACING,
    borderRadius: BORDER_RADIUS_18,
    borderWidth: 5,
  },
  galleryCardHeader: {
    padding: PADDING_HORIZONTAL,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE", // Light separator line
  },
  selectedElementName: {
    fontSize: 24, // Larger, more prominent name
    fontWeight: "bold",
    // color: theme.on_surface, // Color applied in JSX
  },
  rightColumnOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  flatListContent: {
    paddingVertical: LIST_ITEM_SPACING, // Padding for lists
    paddingHorizontal: LIST_ITEM_SPACING, // Consistent padding
    gap: 1,
  },
});

export default GalleryScreenok;
