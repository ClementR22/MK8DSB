import React, { useRef, forwardRef, useImperativeHandle, useMemo, useState, useEffect, memo, useCallback } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  DimensionValue,
  LayoutChangeEvent,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SetCard from "./SetCard";
import { useThemeStore } from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { translateToLanguage } from "@/translations/translations";
import { ScreenName, useScreen } from "@/contexts/ScreenContext";
import { useLanguageStore } from "@/stores/useLanguageStore";
import StatNamesFloatingContainer from "../statSliderSetCard/StatNamesFloatingContainer";
import { SetData } from "./SetCard"; // Assurez-vous que SetData contient 'id: string' (ou 'name: string' si c'est votre ID stable)
import { SetObject } from "@/stores/useSetsStore";

interface SetCardContainerProps {
  setsToShow: SetObject[] | SetData[];
  isInLoadSetModal?: boolean;
  screenNameFromProps?: ScreenName;
  hideRemoveSet?: boolean;
  setsColorsMap: Map<string, string>; // Reçoit la map de couleurs du parent
  // setSetsColorsMap n'est plus nécessaire ici
}

export interface SetCardContainerHandles {
  scrollToStart: () => void;
  scrollToEnd: () => void;
  scrollToSetCard: (id: string) => void; // Scroll par ID (ou nom de set)
}

const SetCardContainer = forwardRef<SetCardContainerHandles, SetCardContainerProps>(
  (
    { setsToShow, isInLoadSetModal = false, screenNameFromProps, hideRemoveSet, setsColorsMap }, // Retire setSetsColorsMap
    ref
  ) => {
    const scrollViewRef = useRef<ScrollView>(null);
    // Utilisez set.name comme clé pour la map des layouts, cohérent avec setsColorsMap
    const setCardLayouts = useRef<Map<string, { x: number; width: number }>>(new Map());

    // La logique d'availableColorsRef et son useEffect ont été déplacés dans DisplaySetScreen

    const onSetCardLayout = useCallback((setId: string, event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout;
      setCardLayouts.current.set(setId, { x, width }); // Utilisez l'ID/Nom du set comme clé
    }, []);

    const scrollToSetCardHandler = useCallback(
      (id: string) => {
        const layout = setCardLayouts.current.get(id); // Utilisez l'ID/Nom du set
        if (scrollViewRef.current && layout) {
          const screenWidth = Dimensions.get("window").width;
          const scrollX = layout.x - screenWidth / 2 + layout.width / 2;
          scrollViewRef.current.scrollTo({ x: scrollX, animated: true });
        } else {
          console.warn(`SetCard layout for ID ${id} not found.`);
        }
      },
      [] // Dépendances vides car setCardLayouts.current est une ref stable
    );

    useImperativeHandle(ref, () => ({
      scrollToStart: () => {
        scrollViewRef.current?.scrollTo({ x: 0, animated: true });
      },
      scrollToEnd: () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      },
      scrollToSetCard: scrollToSetCardHandler,
    }));

    const theme = useThemeStore((state) => state.theme);
    const language = useLanguageStore((state) => state.language);
    const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);
    const screenName = useScreen();

    const [hasShownSearchQuestionIcon, setHasShownSearchQuestionIcon] = useState(false);

    const { isInSearchScreen, isInDisplayScreen } = useMemo(() => {
      const isSearch = screenName === "search";
      const isDisplay = screenName === "display";
      return {
        isInSearchScreen: isSearch,
        isInDisplayScreen: isDisplay,
      };
    }, [screenName]);

    // Détermine si le StatNamesFloatingContainer doit être affiché
    // Note : Votre condition était `(isInSearchScreen || isInSaveScreen) && !isInLoadSetModal && !noSetToShow`
    // Maintenant, elle est `!isInDisplayScreen && !noSetToShow`
    // Assurez-vous que cette logique correspond à votre intention.
    const noSetToShow = useMemo(() => setsToShow.length === 0, [setsToShow]);

    const isFloatingContainer = useMemo(
      () => !isInDisplayScreen && !isInLoadSetModal && !noSetToShow, // La logique de couleur s'applique sur "display", donc le floating container ne doit pas être là.
      [isInDisplayScreen, noSetToShow]
    );

    const calculatedContentWidth: DimensionValue | undefined = useMemo(
      () => (noSetToShow ? "100%" : undefined),
      [noSetToShow]
    );

    const placeholderTextStyle = useMemo(() => {
      return [styles.placeholderText, { color: theme.on_surface }];
    }, [theme.on_surface]);

    const placeHolder = useMemo(() => {
      if (!noSetToShow) {
        if (!hasShownSearchQuestionIcon) {
          setHasShownSearchQuestionIcon(true);
        }
        return null;
      }

      if (isInSearchScreen) {
        if (!hasShownSearchQuestionIcon) {
          return <MaterialCommunityIcons name="chat-question" size={72} color={theme.on_surface} />;
        } else {
          return <Text style={placeholderTextStyle}>{translateToLanguage("NoSetFound...", language)}</Text>;
        }
      } else {
        return (
          <Text style={placeholderTextStyle}>{translateToLanguage("YourFavoriteSetsWillAppearHere", language)}</Text>
        );
      }
    }, [noSetToShow, isInSearchScreen, language, theme.on_surface, hasShownSearchQuestionIcon, placeholderTextStyle]);

    const memoizedSetCards = useMemo(() => {
      if (noSetToShow) {
        return null;
      }

      return setsToShow.map((set, index) => {
        // La couleur est récupérée directement de setsColorsMap reçue en prop
        const assignedColor = setsColorsMap?.get(set.name) || theme.surface_variant; // Utilisez set.name comme clé
        const effectiveColor = assignedColor || theme.surface_container_high; // Fallback par défaut

        return (
          <SetCard
            // Utilisez set.name comme clé pour une stabilité maximale si le nom est unique et stable
            // Si vos sets ont un `id` unique, utilisez `set.id` ici !
            key={set.name}
            setToShowName={set.name}
            setToShowClassIds={set.classIds}
            setToShowStats={set.stats}
            setCardIndex={index} // L'index est toujours utile pour l'ordre d'affichage ou d'autres logiques
            isInLoadSetModal={isInLoadSetModal}
            screenNameFromProps={screenNameFromProps}
            hideRemoveSet={hideRemoveSet}
            setToShowPercentage={set.percentage}
            // Passe l'ID/Nom du set pour la fonction onSetCardLayout
            onLayout={(event) => onSetCardLayout(set.name, event)}
            // Passe la couleur attribuée au SetCard via la prop `setCardColor` (renommée pour clarté)
            borderColor={effectiveColor} // Utilisez le nom de prop setCardColor
          />
        );
      });
    }, [
      noSetToShow,
      isInLoadSetModal,
      screenNameFromProps,
      hideRemoveSet,
      onSetCardLayout,
      setsColorsMap, // Ajoutez setsColorsMap comme dépendance ici
      theme.surface_container_high,
    ]);

    const setCardContainerDynamicStyle = useMemo(
      () => ({
        backgroundColor: theme.surface_container_high,
      }),
      [theme.surface_container_high]
    );

    return (
      <View>
        {isFloatingContainer && <StatNamesFloatingContainer />}

        <ScrollView
          ref={scrollViewRef}
          scrollEnabled={isScrollEnable}
          horizontal={true}
          contentContainerStyle={{ width: calculatedContentWidth }}
          showsHorizontalScrollIndicator={false}
        >
          <Pressable style={[styles.setCardContainer, setCardContainerDynamicStyle]}>
            {noSetToShow ? placeHolder : memoizedSetCards}
          </Pressable>
        </ScrollView>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  setCardContainer: {
    margin: 16,
    marginTop: 0,
    padding: 20,
    alignItems: "stretch",
    borderRadius: 22,
    columnGap: 16,
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "center",
  },
  placeholderText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default memo(SetCardContainer);
