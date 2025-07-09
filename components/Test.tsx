// GalleryScreenok.tsx
import React, { useState, useRef, useEffect, useMemo } from "react";
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
  elementsData,
  elementsDataBody,
  elementsDataCharacter,
  elementsDataGlider,
  elementsDataWheel,
} from "@/data/elements/elementsData";
import { sortElements } from "@/utils/sortElements";
import SortModeSelector from "./elementsSelector/SortModeSelector";
import { classesStatsByCategory } from "@/data/elements/elementsStats";
import { statNames, statNamesCompact } from "@/data/stats/statsData";
import StatSliderCompact from "./statSlider/StatSliderCompact";

// Obtenir les dimensions de l'écran pour la réactivité
const { width: screenWidth } = Dimensions.get("window");

// Largeurs définies pour la colonne de gauche
// La colonne étendue recouvre une grande partie de l'écran
const LEFT_COLUMN_WIDTH_EXPANDED = screenWidth * 0.7; // 70% de la largeur de l'écran
const LEFT_COLUMN_WIDTH_COLLAPSED = 80; // Largeur fixe quand réduite

// Composant ElementItem (no change needed here, assuming it's fine)
const ElementItem = ({ item, isSelected, onPress, isCollapsed }) => {
  return (
    <TouchableOpacity
      style={[
        styles.elementItemContainer,
        isSelected && styles.elementItemSelected,
        isCollapsed && styles.elementItemCollapsed,
      ]}
      onPress={() => onPress(item.id)}
    >
      <View style={styles.elementItemImagePlaceholder}>
        <Image
          style={{
            flex: 1,
            width: "90%",
          }}
          source={item.imageUrl}
          resizeMode="contain"
        />
      </View>
      {!isCollapsed && (
        <Text style={[styles.elementItemText, isSelected && styles.elementItemTextSelected]} numberOfLines={1}>
          {item.name}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const allCategoryElements: {
  [key in Category]: ElementData[];
} = {
  character: elementsDataCharacter,
  body: elementsDataBody,
  wheel: elementsDataWheel,
  glider: elementsDataGlider,
};

// Composant principal GalleryScreenok
const GalleryScreenok = () => {
  const [selectedElementId, setSelectedElementId] = useState(0);
  const [isLeftColumnExpanded, setIsLeftColumnExpanded] = useState(true);

  const language = useLanguageStore((state) => state.language);

  const [selectedCategory, setSelectedCategory] = useState<Category>("character");
  const [sortNumber, setSortNumber] = useState(0);

  const categoryElementsSorted = useMemo(
    () => sortElements(allCategoryElements[selectedCategory], sortNumber, language),
    [selectedCategory, sortNumber, language]
  );

  const animatedLeftColumnWidth = useRef(new Animated.Value(LEFT_COLUMN_WIDTH_EXPANDED)).current;
  const animatedRightColumnOverlayOpacity = useRef(new Animated.Value(0)).current;
  const animatedRightColumnMarginLeft = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLeftColumnExpanded) {
      Animated.parallel([
        Animated.timing(animatedLeftColumnWidth, {
          toValue: LEFT_COLUMN_WIDTH_EXPANDED,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedRightColumnOverlayOpacity, { toValue: 1, duration: 300, useNativeDriver: false }),
        Animated.timing(animatedRightColumnMarginLeft, { toValue: 0, duration: 300, useNativeDriver: false }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(animatedLeftColumnWidth, {
          toValue: LEFT_COLUMN_WIDTH_COLLAPSED,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(animatedRightColumnOverlayOpacity, { toValue: 0, duration: 300, useNativeDriver: false }),
        Animated.timing(animatedRightColumnMarginLeft, { toValue: 50, duration: 300, useNativeDriver: false }), // Changed to 50 to match column width
      ]).start();
    }
  }, [isLeftColumnExpanded]);

  const handleLeftColumnPress = (id) => {
    setSelectedElementId(id);
    if (isLeftColumnExpanded) {
      setIsLeftColumnExpanded(false);
    } else {
      if (id === selectedElementId) {
        // Toggle expansion only if the same item is selected again
        setIsLeftColumnExpanded(true);
      }
    }
  };

  const handleRightColumnPress = () => {
    setIsLeftColumnExpanded(false); // Expand left column on right column press
  };

  const handleCategoryPress = () => {
    setIsLeftColumnExpanded(true); // This will be called by CategorySelectorCollapsed
  };

  const { selectedElementName, selectedElementStats } = useMemo(() => {
    const selectedElementData = elementsData.find((element: ElementData) => element.id === selectedElementId);

    const selectedElementName = selectedElementData.name;
    const selectedElementClassId = selectedElementData.classId;

    const selectedElementStats = [];

    const selectedElementStatsArray = classesStatsByCategory[selectedCategory].get(selectedElementClassId);
    statNames.map((statName, index) => {
      const statNameCompact = statNamesCompact[statName];
      selectedElementStats.push({ name: statNameCompact, value: selectedElementStatsArray[index] });
    });
    return { selectedElementName, selectedElementStats };
  }, [selectedElementId]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Colonne de droite - StatSliderList */}
        <View style={[styles.rightColumn, { marginLeft: LEFT_COLUMN_WIDTH_COLLAPSED }]}>
          <Text>{selectedElementName}</Text>
          <FlatList
            data={selectedElementStats}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <StatSliderCompact name={item.name} value={item.value} />}
            contentContainerStyle={styles.flatListContent}
          />
          <Animated.View style={[styles.rightColumnOverlay, { opacity: animatedRightColumnOverlayOpacity }]}>
            <Pressable style={{ flex: 1 }} onPress={handleRightColumnPress} />
          </Animated.View>
        </View>

        {/* Colonne de gauche - ElementList */}
        <Animated.View style={[styles.leftColumn, { width: animatedLeftColumnWidth }]}>
          <View style={styles.controlsContainer}>
            <SortModeSelector sortNumber={4} setSortNumber={setSortNumber} sortCase="element" />
          </View>
          {/* Conditional rendering based on expansion state */}
          {isLeftColumnExpanded ? (
            <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          ) : (
            <CategorySelectorCollapsed
              selectedCategory={selectedCategory}
              onPress={handleCategoryPress} // Pass the expand function
            />
          )}

          <FlatList
            data={categoryElementsSorted}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ElementItem
                item={item}
                isSelected={item.id === selectedElementId}
                onPress={handleLeftColumnPress}
                isCollapsed={!isLeftColumnExpanded}
              />
            )}
            contentContainerStyle={styles.flatListContent}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F2F5",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    position: "relative",
  },
  leftColumn: {
    backgroundColor: "#FFFFFF",
    borderTopEndRadius: 10,
    borderEndEndRadius: 10,
    marginVertical: 10,
    overflow: "hidden",
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
  },
  controlsContainer: { justifyContent: "center", flexGrow: 1, height: 50 },
  elementItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#E0E0E0",
  },
  elementItemSelected: {
    backgroundColor: "#6200EE",
  },
  elementItemCollapsed: {
    justifyContent: "center",
    marginHorizontal: 5,
    padding: 5,
  },
  elementItemImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#CCCCCC",
    justifyContent: "center",
    alignItems: "center",
  },
  elementItemImageText: {
    color: "#333333",
    fontWeight: "bold",
  },
  elementItemText: {
    marginLeft: 10,
    flex: 1,
    color: "#333333",
  },
  elementItemTextSelected: {
    color: "#FFFFFF",
  },
  rightColumn: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginVertical: 10,
    marginRight: 10,
    position: "relative",
    zIndex: 5,
  },
  rightColumnOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  statSliderContainer: {
    backgroundColor: "#D1C4E9",
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 80,
  },
  statSliderDimmed: {
    opacity: 0.5,
  },
  statSliderText: {
    color: "#333333",
    fontWeight: "bold",
  },
  flatListContent: {
    paddingVertical: 10,
  },
});

export default GalleryScreenok;
