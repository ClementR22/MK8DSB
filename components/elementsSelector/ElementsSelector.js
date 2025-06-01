import React, { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import ButtonMultiStateToggle from "../ButtonMultiStateToggle";
import CategorySelector from "./CategorySelector";
import SelectedCategoryElementsView from "./SelectedCategoryElementsView";
import ButtonScrollToTop from "../ButtonScrollToTop";
import { useSortedElements } from "@/hooks/useSortedElements";
import { useLanguageStore } from "@/stores/useLanguageStore";
import useModalsStore from "@/stores/useModalsStore";
import { computePressableElementsByCategory } from "@/utils/computePressableElementsByCategory";
import usePressableElementsStore from "@/stores/usePressableElementsStore";

const ElementsSelector = React.memo(() => {
  // Gardez ElementsSelector mémoïsé
  const [orderNumber, setOrderNumber] = useState(0);
  const language = useLanguageStore((state) => state.language);
  const screenName = useModalsStore((state) => state.screenNameForEditModal);

  const pressableElementsList = usePressableElementsStore((state) => state.pressableElementsListByScreen[screenName]);
  const handlePressImage = usePressableElementsStore((state) => state.handlePressImage);
  const handlePressImageByClass = usePressableElementsStore((state) => state.handlePressImageByClass);

  const pressableElementsByCategory = useMemo(() => {
    return computePressableElementsByCategory(pressableElementsList);
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
        <Pressable>
          {/*  pour capturer l'événement du doigt qui scroll, nécéssaire quand un ScrollView est dans un Modal
           */}
          <SelectedCategoryElementsView
            selectedTab={selectedTab}
            orderNumber={orderNumber}
            pressableElementsByCategory={pressableElementsByCategory}
            selectedCategoryElementsSorted={selectedCategoryElementsSorted}
            screenName={screenName}
            scrollToSection={scrollToSection}
            handlePressImage={handlePressImage}
            handlePressImageByClass={handlePressImageByClass}
          />
        </Pressable>
      </ScrollView>

      {showScrollTopButton && <ButtonScrollToTop scrollToTop={scrollToTop} />}
    </>
  );
});

export default ElementsSelector;
