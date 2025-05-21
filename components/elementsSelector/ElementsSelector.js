import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useOrderNumber } from "@/contexts/OrderNumberContext";
import ButtonMultiStateToggle from "../ButtonMultiStateToggle";
import CategorySelector from "./CategorySelector";
import SelectedCategoryElementsView from "./SelectedCategoryElementsView";
import ButtonScrollToTop from "../ButtonScrollToTop";
import { useTheme } from "@/contexts/ThemeContext";

const ElementsSelector = () => {
  const { theme } = useTheme();
  const { orderNumber, setOrderNumber } = useOrderNumber();

  // État pour suivre l'onglet sélectionné
  const [selectedTab, setSelectedTab] = useState("character");

  const scrollViewRef = useRef(null);

  function scrollToSection(sectionRef, animated) {
    sectionRef.current?.measureLayout(
      scrollViewRef.current, // Mesurer par rapport à la ScrollView
      (x, y) => {
        scrollViewRef.current?.scrollTo({ y, animated: animated });
      },
      (error) => {
        console.error("Erreur de mesure :", error);
      }
    );
  }

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
    <>
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
        />
      </ScrollView>

      {showScrollTopButton && <ButtonScrollToTop scrollToTopWithScrollViewRef={scrollToTopWithScrollViewRef} />}
    </>
  );
};

export default ElementsSelector;
