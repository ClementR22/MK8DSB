import React, { useCallback, useMemo, useRef, useState } from "react";
import { ScrollView } from "react-native";
import ButtonMultiStateToggle from "../ButtonMultiStateToggle";
import CategorySelector from "./CategorySelector";
import SelectedCategoryElementsView from "./SelectedCategoryElementsView";
import ButtonScrollToTop from "../ButtonScrollToTop";
import { useSortedElements } from "@/hooks/useSortedElements";
import { useLanguageStore } from "@/stores/useLanguageStore";
import useModalsStore from "@/stores/useModalsStore";
import { computePressableElementsByCategory } from "@/utils/computePressableElementsByCategory";
import { usePressableElements } from "@/hooks/usePressableElements";

const ElementsSelector = () => {
  const [orderNumber, setOrderNumber] = useState(0);
  const language = useLanguageStore((state) => state.language);
  const screenName = useModalsStore((state) => state.screenNameForEditModal);
  const { pressableElementsList } = usePressableElements();
  const pressableElementsByCategory = useMemo(() => {
    console.log("usememeo");
    const ok = computePressableElementsByCategory(pressableElementsList);
    console.log("ok", ok);
    return ok;
  }, [pressableElementsList]);
  const [selectedTab, setSelectedTab] = useState("character");

  const selectedCategoryElementsSorted = useSortedElements(
    pressableElementsByCategory,
    selectedTab,
    orderNumber,
    language
  );

  const scrollViewRef = useRef(null);

  const scrollToSection = useCallback((sectionRef, animated = true) => {
    sectionRef.measureLayout(
      scrollViewRef.current,
      (x, y) => scrollViewRef.current?.scrollTo({ y, animated }),
      (err) => console.error("Erreur de mesure :", err)
    );
  }, []);

  const scrollToTop = useCallback(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  const [showScrollTopButton, setShowScrollTopButton] = useState(false);

  const handleScroll = useCallback((event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowScrollTopButton(scrollY > 100);
  }, []);

  return (
    <>
      <ButtonMultiStateToggle number={orderNumber} setNumber={setOrderNumber} tooltipText="Sort" />
      <CategorySelector selectedTab={selectedTab} setSelectedTab={setSelectedTab} scrollToTop={scrollToTop} />

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <SelectedCategoryElementsView
          selectedTab={selectedTab}
          orderNumber={orderNumber}
          pressableElementsByCategory={pressableElementsByCategory}
          selectedCategoryElementsSorted={selectedCategoryElementsSorted}
          screenName={screenName}
          scrollToSection={scrollToSection}
        />
      </ScrollView>

      {showScrollTopButton && <ButtonScrollToTop scrollToTop={scrollToTop} />}
    </>
  );
};

export default ElementsSelector;
