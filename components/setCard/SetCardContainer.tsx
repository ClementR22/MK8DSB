import React, { useRef, forwardRef, useImperativeHandle, useMemo, useState, useEffect, memo, useCallback } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View, DimensionValue, LayoutChangeEvent } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SetCard from "./SetCard";
import { useThemeStore } from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { translateToLanguage } from "@/translations/translations";
import { ScreenName, useScreen } from "@/contexts/ScreenContext";
import { useLanguageStore } from "@/stores/useLanguageStore";
import StatNamesFloatingContainer from "../statSliderSetCard/StatNamesFloatingContainer";
import { SetData } from "./SetCard";

interface SetCardContainerProps {
  setsToShow: SetData[];
  isInLoadSetModal?: boolean;
  screenNameFromProps?: ScreenName;
  hideRemoveSet?: boolean;
}

export interface SetCardContainerHandles {
  scrollToStart: () => void;
  scrollToEnd: () => void;
  scrollToSetCard: (index: number) => void;
}

const SetCardContainer = forwardRef<SetCardContainerHandles, SetCardContainerProps>(
  ({ setsToShow, isInLoadSetModal = false, screenNameFromProps, hideRemoveSet }, ref) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const setCardLayouts = useRef<Map<number, { x: number; width: number }>>(new Map());

    const onSetCardLayout = useCallback((index: number, event: LayoutChangeEvent) => {
      const { x, width } = event.nativeEvent.layout;
      setCardLayouts.current.set(index, { x, width });
    }, []);

    const scrollToSetCardHandler = useCallback((index: number) => {
      const layout = setCardLayouts.current.get(index);
      if (scrollViewRef.current && layout) {
        scrollViewRef.current.scrollTo({ x: layout.x, animated: true });
      } else {
        console.warn(`SetCard layout for index ${index} not found.`);
      }
    }, []);

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

    const { isInSearchScreen, isInSaveScreen } = useMemo(() => {
      const isSearch = screenName === "search";
      const isSave = screenName === "save";
      return {
        isInSearchScreen: isSearch,
        isInSaveScreen: isSave,
      };
    }, [screenName]);

    const noSetToShow = useMemo(() => setsToShow.length === 0, [setsToShow]);

    const calculatedContentWidth: DimensionValue | undefined = useMemo(
      () => (noSetToShow ? "100%" : undefined),
      [noSetToShow]
    );

    const isFloatingContainer = useMemo(
      () => (isInSearchScreen || isInSaveScreen) && !isInLoadSetModal && !noSetToShow,
      [isInSearchScreen, isInSaveScreen, isInLoadSetModal, noSetToShow]
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
    }, [noSetToShow, isInSearchScreen, language, theme.on_surface]);

    const memoizedSetCards = useMemo(() => {
      if (noSetToShow) {
        return null;
      }

      return setsToShow.map((set: SetData, index: number) => (
        <SetCard
          key={JSON.stringify(set)}
          setToShowName={set.name}
          setToShowClassIds={set.classIds}
          setToShowStats={set.stats}
          setCardIndex={index}
          isInLoadSetModal={isInLoadSetModal}
          screenNameFromProps={screenNameFromProps}
          hideRemoveSet={hideRemoveSet}
          setToShowPercentage={set.percentage}
          onLayout={(event) => onSetCardLayout(index, event)}
        />
      ));
    }, [setsToShow, noSetToShow, isInLoadSetModal, screenNameFromProps, hideRemoveSet]);

    const pressableDynamicBg = useMemo(
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
          <Pressable style={[styles.setCardContainer, pressableDynamicBg]}>
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
