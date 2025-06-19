import React, { useRef } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SetCard from "./SetCard";
import { useThemeStore } from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { translateToLanguage } from "@/translations/translations";
import { useScreen } from "@/contexts/ScreenContext";
import { useResultStats } from "@/contexts/ResultStatsContext";
import { compactStatNames } from "@/data/data";
import { useLanguageStore } from "@/stores/useLanguageStore";
import StatNamesFloatingContainer from "../statSliderSetCard/StatNamesFloatingContainer";

const SetCardContainer = ({
  setsToShow,
  isInLoadSetModal = false,
  screenNameFromProps = undefined,
  hideRemoveSet = undefined,
}) => {
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);
  const screenName = useScreen();
  const isInSearchScreen = screenName === "search";
  const inInSaveScreen = screenName === "save";

  const noSetToShow = setsToShow.length === 0;
  const contentWidth = noSetToShow ? "100%" : undefined;

  const isFirstRender = useRef(true);
  let placeHolder = null;

  if (noSetToShow) {
    if (isFirstRender.current && isInSearchScreen) {
      isFirstRender.current = false;
      placeHolder = <MaterialCommunityIcons name="chat-question" size={72} color={theme.on_surface} />;
    } else {
      placeHolder = (
        <Text>
          {translateToLanguage(isInSearchScreen ? "NoSetFound..." : "YourFavoriteSetsWillAppearHere", language)}
        </Text>
      );
    }
  }

  const styles = StyleSheet.create({
    setCardContainer: {
      margin: 16,
      marginTop: 0,
      padding: 20,
      alignItems: "stretch",
      //backgroundColor: theme.surface_container_high,
      borderRadius: 24,
      columnGap: 16,
      flexDirection: "row",
      flexGrow: 1,
      justifyContent: "center", // utile pour l'icon chat-question
    },
  });

  const isFloatingContainer = (isInSearchScreen || inInSaveScreen) && !isInLoadSetModal && !noSetToShow;

  return (
    <View>
      {/* Zone rouge flottante */}
      {isFloatingContainer && <StatNamesFloatingContainer />}

      <ScrollView scrollEnabled={isScrollEnable} horizontal={true} contentContainerStyle={{ width: contentWidth }}>
        <Pressable
          style={[
            styles.setCardContainer,
            {
              backgroundColor: theme.surface_container_high,
            },
          ]}
        >
          {placeHolder}

          {setsToShow.map(({ name, classIds, stats, percentage }, index) => {
            return (
              <SetCard
                key={"card" + index}
                setToShowName={name}
                setToShowClassIds={classIds}
                setToShowStats={stats}
                setCardIndex={index}
                isInLoadSetModal={isInLoadSetModal}
                screenNameFromProps={screenNameFromProps}
                hideRemoveSet={hideRemoveSet}
                setToShowPercentage={percentage}
              />
            );
          })}
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default SetCardContainer;
