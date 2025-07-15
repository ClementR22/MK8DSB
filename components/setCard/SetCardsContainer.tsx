import React, { forwardRef, memo, useCallback, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Dimensions, DimensionValue, LayoutChangeEvent, Pressable, ScrollView, StyleSheet, View } from "react-native";
import SetCard from "./SetCard";
import { useThemeStore } from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { ScreenName, useScreen } from "@/contexts/ScreenContext";
import { useLanguageStore } from "@/stores/useLanguageStore";
import StatNamesFloatingContainer from "../statSliderSetCard/StatNamesFloatingContainer";
import { SetObject } from "@/stores/useSetsStore";
import { Placeholder } from "@/components/Placeholder";
import HorizontalScrollContainer from "./HorizontalScrollContainer";
import { SET_CARD_CONTAINER_PADDING } from "@/utils/designTokens";

interface SetWithColor extends SetObject {
  color?: string;
}

interface SetCardsContainerProps {
  setsToShow: SetWithColor[];
  isInLoadSetModal?: boolean;
  screenNameFromProps?: ScreenName;
  hideRemoveSet?: boolean;
}

export interface SetCardsContainerHandles {
  scrollToStart: () => void;
  scrollToEnd: () => void;
  scrollToSetCard: (id: string) => void; // Scroll par ID (ou nom de set)
}

const SetCardsContainer = forwardRef<SetCardsContainerHandles, SetCardsContainerProps>(
  ({ setsToShow, isInLoadSetModal = false, screenNameFromProps, hideRemoveSet }, ref) => {
    const scrollViewRef = useRef<ScrollView>(null);
    // Utilisez set.name comme clé pour la map des layouts, cohérent avec setsColorsMap
    const setCardLayouts = useRef<Map<string, { x: number; width: number }>>(new Map());

    // La logique d'availableColorsRef et son useEffect ont été déplacés dans DisplaySetScreen

    const onSetCardLayout = useCallback((id: string, event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout;
      setCardLayouts.current.set(id, { x, width }); // Utilisez l'ID/Nom du set comme clé
    }, []);

    const scrollToSetCardHandler = useCallback(
      (id: string) => {
        const layout = setCardLayouts.current.get(id);
        if (scrollViewRef.current && layout) {
          const screenWidth = Dimensions.get("window").width;
          const scrollX = layout.x - screenWidth / 2 + layout.width / 2;
          scrollViewRef.current.scrollTo({ x: scrollX, animated: true });
        } else {
          // Optionnel : garder le warn si besoin de debug
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
          return <Placeholder type={"SearchEmpty"} />;
        }
        return <Placeholder type={"SearchNotFound"} />;
      }
      return <Placeholder type={"SavedEmpty"} />;
    }, [noSetToShow, isInSearchScreen, language, theme.on_surface, hasShownSearchQuestionIcon, placeholderTextStyle]);

    const memoizedSetCards = useMemo(() => {
      if (noSetToShow) {
        return null;
      }

      return setsToShow.map((set: SetWithColor) => {
        const effectiveColor = set.color || theme.surface_container_high;
        return (
          <SetCard
            key={set.id}
            setToShowName={set.name}
            setToShowClassIds={set.classIds}
            setToShowStats={set.stats}
            setToShowId={set.id}
            isInLoadSetModal={isInLoadSetModal}
            screenNameFromProps={screenNameFromProps}
            hideRemoveSet={hideRemoveSet}
            setToShowPercentage={(set as any).percentage ?? undefined}
            onLayout={(event) => onSetCardLayout(set.id, event)}
            borderColor={effectiveColor}
          />
        );
      });
    }, [
      setsToShow,
      noSetToShow,
      isInLoadSetModal,
      screenNameFromProps,
      hideRemoveSet,
      onSetCardLayout,
      theme.surface_container_high,
    ]);

    return (
      <View>
        {isFloatingContainer && <StatNamesFloatingContainer />}

        <HorizontalScrollContainer
          ref={scrollViewRef}
          scrollEnabled={isScrollEnable}
          outerContainerStyle={{ marginBottom: 10 }}
          innerContainerStyle={{ marginHorizontal: 18, padding: SET_CARD_CONTAINER_PADDING, gap: 12, borderRadius: 22 }}
          defaultStyle={{ width: calculatedContentWidth }}
        >
          {noSetToShow ? placeHolder : memoizedSetCards}
        </HorizontalScrollContainer>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  placeholderText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default memo(SetCardsContainer);
