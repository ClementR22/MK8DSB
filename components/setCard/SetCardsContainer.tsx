import React, { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  DimensionValue,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import SetCard from "./SetCard";
import { useThemeStore } from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { ScreenName, useScreen } from "@/contexts/ScreenContext";
import { useLanguageStore } from "@/stores/useLanguageStore";
import { SetObject } from "@/stores/useSetsStore";
import Placeholder from "./Placeholder";
import { BORDER_RADIUS_CONTAINER_LOWEST, MARGIN_CONTAINER_LOWEST, PADDING_STANDARD } from "@/utils/designTokens";
import { box_shadow_z1 } from "../styles/shadow";
import BoxContainer from "@/primitiveComponents/BoxContainer";

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
    const isLoading = useGeneralStore((state) => state.isLoading);

    const [hasShownSearchQuestionIcon, setHasShownSearchQuestionIcon] = useState(false);

    const noSetToShow = setsToShow.length === 0;

    const calculatedContentWidth: DimensionValue | undefined = noSetToShow || isLoading ? "100%" : undefined;

    useEffect(() => {
      if (!noSetToShow && !hasShownSearchQuestionIcon) {
        setHasShownSearchQuestionIcon(true);
      }
    }, [noSetToShow, hasShownSearchQuestionIcon]);

    const placeHolder = useMemo(() => {
      if (!noSetToShow) return null;

      if (screenName === "search") {
        if (!hasShownSearchQuestionIcon) {
          return <Placeholder type={"SearchEmpty"} />;
        }
        return <Placeholder type={"SearchNotFound"} />;
      }
      return <Placeholder type={"SavedEmpty"} />;
    }, [noSetToShow, screenName, language, theme.on_surface, hasShownSearchQuestionIcon]);

    const memoizedSetCards = useMemo(() => {
      if (noSetToShow) {
        return null;
      }

      return setsToShow.map((set: SetWithColor) => (
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
          borderColor={set.color}
        />
      ));
    }, [setsToShow, isInLoadSetModal, screenNameFromProps, hideRemoveSet, onSetCardLayout]);

    return (
      <ScrollView
        ref={scrollViewRef}
        horizontal
        scrollEnabled={isScrollEnable}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: calculatedContentWidth }}
      >
        <Pressable
          style={[
            styles.container,
            {
              backgroundColor: theme.surface_container,
            },
          ]}
        >
          {isLoading ? (
            <BoxContainer height={200}>
              <ActivityIndicator size={50} color={theme.primary} />
            </BoxContainer>
          ) : noSetToShow ? (
            placeHolder
          ) : (
            memoizedSetCards
          )}
        </Pressable>
      </ScrollView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: MARGIN_CONTAINER_LOWEST,
    flexDirection: "row",
    padding: PADDING_STANDARD,
    gap: PADDING_STANDARD / 1.5,
    borderRadius: BORDER_RADIUS_CONTAINER_LOWEST,
    boxShadow: box_shadow_z1,
    marginBottom: 2, // so the shadow is visible
  },
});

export default memo(SetCardsContainer);
