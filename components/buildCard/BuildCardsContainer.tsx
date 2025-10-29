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
import BuildCard from "./BuildCard";
import { useThemeStore } from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { ScreenName, useScreen } from "@/contexts/ScreenContext";
import { Build } from "@/stores/useBuildsListStore";
import Placeholder from "./Placeholder";
import { BORDER_RADIUS_CONTAINER_LOWEST, MARGIN_CONTAINER_LOWEST, PADDING_STANDARD } from "@/utils/designTokens";
import { box_shadow_z1 } from "../styles/shadow";
import BoxContainer from "@/primitiveComponents/BoxContainer";

interface SetWithColor extends Build {
  color?: string;
}

interface BuildCardsContainerProps {
  buildsToShow: SetWithColor[];
  isInLoadSetModal?: boolean;
  screenNameFromProps?: ScreenName;
  hideRemoveBuild?: boolean;
}

export interface BuildCardsContainerHandles {
  scrollToStart: () => void;
  scrollToEnd: () => void;
  scrollToBuildCard: (id: string) => void; // Scroll par ID
}

const BuildCardsContainer = forwardRef<BuildCardsContainerHandles, BuildCardsContainerProps>(
  ({ buildsToShow, isInLoadSetModal = false, screenNameFromProps, hideRemoveBuild }, ref) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const setCardLayouts = useRef<Map<string, { x: number; width: number }>>(new Map());

    // La logique d'availableColorsRef et son useEffect ont été déplacés dans DisplayBuildScreen

    const onBuildCardLayout = useCallback((id: string, event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout;
      setCardLayouts.current.set(id, { x, width }); // Utilisez l'ID build comme clé
    }, []);

    const scrollToBuildCardHandler = useCallback(
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
      scrollToBuildCard: scrollToBuildCardHandler,
    }));

    const theme = useThemeStore((state) => state.theme);
    const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);
    const screenName = useScreen();
    const isLoading = useGeneralStore((state) => state.isLoading);

    const [hasShownSearchQuestionIcon, setHasShownSearchQuestionIcon] = useState(false);

    const noSetToShow = buildsToShow.length === 0;

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
          return <Placeholder type="searchEmpty" />;
        }
        return <Placeholder type="searchNotFound" />;
      }
      return <Placeholder type="savedEmpty" />;
    }, [noSetToShow, screenName, theme.on_surface, hasShownSearchQuestionIcon]);

    const memoizedBuildCards = useMemo(() => {
      if (noSetToShow) {
        return null;
      }

      return buildsToShow.map((build: SetWithColor) => (
        <BuildCard
          key={build.id}
          name={build.name}
          classIds={build.classIds}
          stats={build.stats}
          id={build.id}
          isInLoadSetModal={isInLoadSetModal}
          screenNameFromProps={screenNameFromProps}
          hideRemoveBuild={hideRemoveBuild}
          setToShowPercentage={(build as any).percentage ?? undefined}
          onLayout={(event) => onBuildCardLayout(build.id, event)}
          borderColor={build.color}
        />
      ));
    }, [buildsToShow, isInLoadSetModal, screenNameFromProps, hideRemoveBuild, onBuildCardLayout]);

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
            memoizedBuildCards
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

export default memo(BuildCardsContainer);
