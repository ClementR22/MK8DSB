import React, { useRef, useState, useEffect, useCallback } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../../utils/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useOrderNumber } from "../../utils/OrderNumberContext";
import ButtonMultiStateToggle from "../ButtonMultiStateToggle";
import CategorySelector from "./CategorySelector";
import { scrollToSection } from "../../utils/scrollToSection";
import SelectedCategoryElementsView from "./SelectedCategoryElementsView";
import ButtonScrollToTop from "../ButtonScrollToTop";

const ElementsSelector = ({ situation, galeryCase = false }) => {
  const th = useTheme();

  const { orderNumber, setOrderNumber } = useOrderNumber();

  // État pour suivre l'onglet sélectionné
  const [selectedTab, setSelectedTab] = useState("character");

  const scrollViewRef = useRef(null);

  const scrollToSectionWithScrollViewRef = useCallback(
    (sectionRef, animated = true) => {
      scrollToSection(scrollViewRef, sectionRef, animated);
    },
    []
  );

  const scrollToTopWithScrollViewRef = useCallback(() => {
    scrollToSection(scrollViewRef, sectionRefs.current[4], false);
  }, []);

  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowScrollTopButton(scrollY > 100); // Affiche le bouton après 100px de scroll
  };

  const sectionRefs = useRef([]);

  useEffect(() => {
    // Initialise les refs s'ils n'existent pas encore
    if (sectionRefs.current.length === 0) {
      sectionRefs.current = Array.from({ length: 5 }, () => React.createRef());
    }
  }, []);

  return (
    <View
      style={styles.outerContainer}
      key={"outerContainer"}
      ref={sectionRefs.current[4]}
    >
      <ButtonMultiStateToggle number={orderNumber} setNumber={setOrderNumber} />
      {/* Navigation par onglets */}

      <CategorySelector
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        scrollToTopWithScrollViewRef={scrollToTopWithScrollViewRef}
      />

      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={64}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SelectedCategoryElementsView
          selectedTab={selectedTab}
          situation={situation}
          galeryCase={galeryCase}
          scrollToSectionWithScrollViewRef={scrollToSectionWithScrollViewRef}
          sectionRefs={sectionRefs}
        />
      </ScrollView>

      {showScrollTopButton && (
        <ButtonScrollToTop
          scrollToTopWithScrollViewRef={scrollToTopWithScrollViewRef}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "blue",
    padding: 20,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default ElementsSelector;
