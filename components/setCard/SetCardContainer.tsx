import React, { useRef, forwardRef, useImperativeHandle, useMemo, useState, memo, useCallback } from "react";
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
import { SetFoundObject, SetObject } from "@/stores/useSetsStore";

export const SET_CARD_CONTAINER_PADDING = 20;

interface SetWithColor extends SetObject {
  color?: string;
}

interface SetCardContainerProps {
  setsToShow: SetWithColor[];
  isInLoadSetModal?: boolean;
  screenNameFromProps?: ScreenName;
  hideRemoveSet?: boolean;
}

export interface SetCardContainerHandles {
  scrollToStart: () => void;
  scrollToEnd: () => void;
  scrollToSetCard: (id: string) => void; // Scroll par ID (ou nom de set)
}

const SetCardContainer = forwardRef<SetCardContainerHandles, SetCardContainerProps>(
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
        // Suppression du console.log pour la prod
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
    padding: SET_CARD_CONTAINER_PADDING,
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
