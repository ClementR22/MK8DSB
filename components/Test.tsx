// GalleryScreenok.tsx
import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated, Dimensions, Pressable } from "react-native";
import CategorySelector from "./elementsSelector/selector/CategorySelector"; // The expanded version
import CategorySelectorCollapsed from "./elementsSelector/selector/CategorySelectorCollapsed"; // The collapsed version
import { Category } from "@/data/elements/elementsTypes";

// Obtenir les dimensions de l'écran pour la réactivité
const { width: screenWidth } = Dimensions.get("window");

// Données fictives pour les ElementItem
const ELEMENT_DATA = [
  { id: "1", name: "Mario", image: "https://placehold.co/40x40/cccccc/333333?text=M" },
  { id: "2", name: "Luigi", image: "https://placehold.co/40x40/cccccc/333333?text=L" },
  { id: "3", name: "Peach", image: "https://placehold.co/40x40/cccccc/333333?text=P" },
  { id: "4", name: "Yoshi", image: "https://placehold.co/40x40/cccccc/333333?text=Y" },
  { id: "5", name: "Toad", image: "https://placehold.co/40x40/cccccc/333333?text=T" },
  { id: "6", name: "Bowser", image: "https://placehold.co/40x40/cccccc/333333?text=B" },
  { id: "7", name: "Donkey Kong", image: "https://placehold.co/40x40/cccccc/333333?text=DK" },
  { id: "8", name: "Link", image: "https://placehold.co/40x40/cccccc/333333?text=Li" },
  { id: "9", name: "Zelda", image: "https://placehold.co/40x40/cccccc/333333?text=Z" },
  { id: "10", name: "Samus", image: "https://placehold.co/40x40/cccccc/333333?text=S" },
];

// Données fictives pour les StatSlider (représentés comme de simples vues)
const STAT_SLIDER_DATA = [
  { id: "s1", value: "5.5" },
  { id: "s2", value: "7.2" },
  { id: "s3", value: "3.1" },
  { id: "s4", value: "9.0" },
  { id: "s5", value: "4.8" },
  { id: "s6", value: "6.5" },
  { id: "s7", value: "2.9" },
  { id: "s8", value: "8.1" },
  { id: "s9", value: "1.7" },
  { id: "s10", value: "9.9" },
];

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
        <Text style={styles.elementItemImageText}>{item.image.slice(-1)}</Text>
      </View>
      {!isCollapsed && (
        <Text style={[styles.elementItemText, isSelected && styles.elementItemTextSelected]} numberOfLines={1}>
          {item.name}
        </Text>
      )}
    </TouchableOpacity>
  );
};

// Composant StatSlider (no change needed here, assuming it's fine)
const StatSlider = ({ value, isDimmed }) => {
  return (
    <View style={[styles.statSliderContainer, isDimmed && styles.statSliderDimmed]}>
      <Text style={styles.statSliderText}>{value}</Text>
    </View>
  );
};

// Composant principal GalleryScreenok
const GalleryScreenok = () => {
  const [selectedElementId, setSelectedElementId] = useState(ELEMENT_DATA[0].id);
  const [isLeftColumnExpanded, setIsLeftColumnExpanded] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>("character");

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
    if (id === selectedElementId) {
      // Toggle expansion only if the same item is selected again
      setIsLeftColumnExpanded(!isLeftColumnExpanded);
    }
  };

  const handleRightColumnPress = () => {
    setIsLeftColumnExpanded(false); // Expand left column on right column press
  };

  const handleCategoryPress = () => {
    setIsLeftColumnExpanded(true); // This will be called by CategorySelectorCollapsed
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Colonne de droite - StatSliderList */}
        <View style={[styles.rightColumn, { marginLeft: LEFT_COLUMN_WIDTH_COLLAPSED }]}>
          <FlatList
            data={STAT_SLIDER_DATA}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <StatSlider value={item.value} isDimmed={isLeftColumnExpanded} />}
            contentContainerStyle={styles.flatListContent}
          />
          <Animated.View style={[styles.rightColumnOverlay, { opacity: animatedRightColumnOverlayOpacity }]}>
            <Pressable style={{ flex: 1 }} onPress={handleRightColumnPress} />
          </Animated.View>
        </View>

        {/* Colonne de gauche - ElementList */}
        <Animated.View style={[styles.leftColumn, { width: animatedLeftColumnWidth }]}>
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
            data={ELEMENT_DATA}
            keyExtractor={(item) => item.id}
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
