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
import useThemeStore from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { ScreenName, useScreen } from "@/contexts/ScreenContext";
import { Build } from "@/types";
import Placeholder from "./Placeholder";
import { BORDER_RADIUS_CONTAINER_LOWEST, MARGIN_CONTAINER_LOWEST, PADDING_STANDARD } from "@/utils/designTokens";
import { box_shadow_z1 } from "../styles/shadow";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import PlaceholderBuildCard from "./PlaceholderBuildCard";
import useBuildsListStore from "@/stores/useBuildsListStore";

interface BuildWithColor extends Build {
  color: string;
}

interface BuildCardsContainerProps {
  builds: BuildWithColor[] | Build[];
  isInLoadBuildModal?: boolean;
  screenNameFromProps?: ScreenName;
}

export interface BuildCardsContainerHandles {
  scrollToStart: () => void;
  scrollToEnd: () => void;
  scrollToBuildCard: (id: string) => void; // Scroll par ID
}

const BuildCardsContainer = forwardRef<BuildCardsContainerHandles, BuildCardsContainerProps>(
  ({ builds, isInLoadBuildModal = false, screenNameFromProps }, ref) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const buildCardLayouts = useRef<Map<string, { x: number; width: number }>>(new Map());

    // La logique d'availableColorsRef et son useEffect ont été déplacés dans DisplayBuildScreen

    const onBuildCardLayout = useCallback((id: string, event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout;
      buildCardLayouts.current.set(id, { x, width }); // Utilisez l'ID build comme clé
    }, []);

    const scrollToBuildCardHandler = useCallback(
      (id: string) => {
        const layout = buildCardLayouts.current.get(id);
        if (scrollViewRef.current && layout) {
          const screenWidth = Dimensions.get("window").width;
          const scrollX = layout.x - screenWidth / 2 + layout.width / 2;
          scrollViewRef.current.scrollTo({ x: scrollX, animated: true });
        } else {
          // Optionnel : garder le warn si besoin de debug
        }
      },
      [] // Dépendances vides car buildCardLayouts.current est une ref stable
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
    const scrollRequest = useBuildsListStore((state) => state.scrollRequest);
    const clearScrollRequest = useBuildsListStore((state) => state.clearScrollRequest);

    const [hasShownSearchQuestionIcon, setHasShownSearchQuestionIcon] = useState(false);

    const noBuildToShow = builds.length === 0;

    const calculatedContentWidth: DimensionValue | undefined = noBuildToShow || isLoading ? "100%" : undefined;

    useEffect(() => {
      if (!scrollRequest) return;
      const { source, buildDataId } = scrollRequest;
      // Ce container est-il concerné ?
      if (source !== screenName) return;
      scrollToBuildCardHandler(buildDataId);
      // Puis reset pour éviter de scanner inutilement
      clearScrollRequest();
    }, [scrollRequest]);

    useEffect(() => {
      if (!noBuildToShow && !hasShownSearchQuestionIcon) {
        setHasShownSearchQuestionIcon(true);
      }
    }, [noBuildToShow, hasShownSearchQuestionIcon]);

    const placeHolder = useMemo(() => {
      if (!noBuildToShow) return null;

      if (screenName === "search") {
        if (!hasShownSearchQuestionIcon) {
          return <Placeholder text="searchEmpty" />;
        }
        return <Placeholder text="searchNotFound" />;
      }
      if (screenName === "display") {
        return <PlaceholderBuildCard />;
      }
      return <Placeholder text="savedEmpty" />;
    }, [noBuildToShow, screenName, theme.on_surface, hasShownSearchQuestionIcon]);

    const memoizedBuildCards = useMemo(() => {
      if (noBuildToShow) {
        return null;
      }

      return builds.map((build: BuildWithColor) => (
        <BuildCard
          key={build.buildDataId}
          buildDataId={build.buildDataId}
          isInLoadBuildModal={isInLoadBuildModal}
          screenNameFromProps={screenNameFromProps}
          percentage={build.percentage ?? undefined}
          onLayout={(event) => onBuildCardLayout(build.buildDataId, event)}
          borderColor={build.color}
        />
      ));
    }, [builds, isInLoadBuildModal, screenNameFromProps, onBuildCardLayout]);

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
          ) : noBuildToShow ? (
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
