import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useOrderNumber } from "@/contexts/OrderNumberContext";
import ButtonMultiStateToggle from "../ButtonMultiStateToggle";
import CategorySelector from "./CategorySelector";
import SelectedCategoryElementsView from "./SelectedCategoryElementsView";
import ButtonScrollToTop from "../ButtonScrollToTop";

const ElementsSelector = ({ galleryCase = false }) => {
  const { orderNumber, setOrderNumber } = useOrderNumber();

  // État pour suivre l'onglet sélectionné
  const [selectedTab, setSelectedTab] = useState("character");

  const scrollViewRef = useRef(null);

  const scrollToSection = (sectionRef, animated) => {
    sectionRef.current?.measureLayout(
      scrollViewRef.current, // Mesurer par rapport à la ScrollView
      (x, y) => {
        scrollViewRef.current?.scrollTo({ y, animated: animated });
      },
      (error) => {
        console.error("Erreur de mesure :", error);
      }
    );
  };

  const scrollToSectionWithScrollViewRef = useCallback((sectionRef, animated = true) => {
    scrollToSection(sectionRef, animated);
  }, []);

  const scrollToTopWithScrollViewRef = useCallback(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
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
    <View style={styles.outerContainer} key="outerContainer">
      <ButtonMultiStateToggle number={orderNumber} setNumber={setOrderNumber} tooltipText="Sort" />
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
          scrollToSectionWithScrollViewRef={scrollToSectionWithScrollViewRef}
          sectionRefs={sectionRefs}
          galleryCase={galleryCase}
        />
      </ScrollView>

      {showScrollTopButton && <ButtonScrollToTop scrollToTopWithScrollViewRef={scrollToTopWithScrollViewRef} />}
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
