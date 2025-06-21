import React, { useRef, forwardRef, useImperativeHandle, useMemo, useState, useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View, ViewStyle, TextStyle, DimensionValue } from "react-native";
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
  scrollToEnd: () => void;
}

const SetCardContainer = forwardRef<SetCardContainerHandles, SetCardContainerProps>(
  ({ setsToShow, isInLoadSetModal = false, screenNameFromProps = undefined, hideRemoveSet = undefined }, ref) => {
    const scrollViewRef = useRef<ScrollView>(null);
    useImperativeHandle(ref, () => ({
      scrollToStart: () => {
        scrollViewRef.current?.scrollTo({ x: 0, animated: true });
      },
      scrollToEnd: () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      },
    }));

    const theme = useThemeStore((state) => state.theme);
    const language = useLanguageStore((state) => state.language);
    const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);
    const screenName = useScreen();

    const [hasShownSearchQuestionIcon, setHasShownSearchQuestionIcon] = useState(false);

    const { isInSearchScreen, inInSaveScreen } = useMemo(() => {
      const isSearch = screenName === "search";
      const isSave = screenName === "save";
      return {
        isInSearchScreen: isSearch,
        inInSaveScreen: isSave,
      };
    }, [screenName]);

    const noSetToShow = useMemo(() => setsToShow.length === 0, [setsToShow]);

    const calculatedContentWidth: DimensionValue | undefined = useMemo(
      () => (noSetToShow ? "100%" : undefined),
      [noSetToShow]
    );

    const isFloatingContainer = useMemo(
      () => (isInSearchScreen || inInSaveScreen) && !isInLoadSetModal && !noSetToShow,
      [isInSearchScreen, inInSaveScreen, isInLoadSetModal, noSetToShow]
    );

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
          return <Text style={styles.placeholderText}>{translateToLanguage("NoSetFound...", language)}</Text>;
        }
      } else {
        return (
          <Text style={styles.placeholderText}>{translateToLanguage("YourFavoriteSetsWillAppearHere", language)}</Text>
        );
      }
    }, [noSetToShow, isInSearchScreen, language, theme.on_surface, hasShownSearchQuestionIcon]);

    const memoizedSetCards = useMemo(() => {
      if (noSetToShow) {
        return null;
      }

      return setsToShow.map((set: SetData, index: number) => (
        <SetCard
          key={index}
          setToShowName={set.name}
          setToShowClassIds={set.classIds}
          setToShowStats={set.stats}
          setCardIndex={index}
          isInLoadSetModal={isInLoadSetModal}
          screenNameFromProps={screenNameFromProps}
          hideRemoveSet={hideRemoveSet}
          setToShowPercentage={set.percentage}
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
        >
          <Pressable style={[styles.innerPressableContainer, pressableDynamicBg]}>
            {noSetToShow ? placeHolder : memoizedSetCards}
          </Pressable>
        </ScrollView>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  innerPressableContainer: {
    margin: 16,
    marginTop: 0,
    padding: 20,
    alignItems: "stretch",
    borderRadius: 24,
    columnGap: 16,
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "center",
  },
  placeholderText: {},
});

export default React.memo(SetCardContainer);
