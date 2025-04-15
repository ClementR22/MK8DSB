import React, {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import {
  elementsImages,
  closeImage,
  category4Names,
  elementsAllClassName,
  elementsAllInfosList,
  bodyTypeNames,
} from "../../data/data";
import { usePressableImages } from "../../utils/PressableImagesContext";
import { translate } from "../../i18n/translations";
import { button } from "../styles/button";
import { useTheme } from "../../utils/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { useSetsList } from "../../utils/SetsListContext";
import { useOrderNumber } from "../../utils/OrderNumberContext";
import MultiStateToggleButton from "../MultiStateToggleButton";
import CategorySelector from "./CategorySelector";
import { scrollToSection } from "../../utils/scrollToSection";
import SelectedCategoryElementsView from "./SelectedCategoryElementsView";

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
      <MultiStateToggleButton number={orderNumber} setNumber={setOrderNumber} />
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
        <Pressable
          style={styles.floatingButton}
          onPress={() => scrollToTopWithScrollViewRef()}
        >
          <MaterialCommunityIcons
            name="chevron-up"
            size={24}
            color={th.on_primary}
          />
        </Pressable>
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
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 15,
    borderRadius: 50,
    elevation: 5, // Pour l'effet d'ombre sur Android
  },
});

export default ElementsSelector;
