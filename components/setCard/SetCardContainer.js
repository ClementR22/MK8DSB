import React, { useRef } from "react";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SetCard from "./SetCard";
import { useThemeStore } from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { translate } from "@/translations/translations";
import { useScreen } from "@/contexts/ScreenContext";

const SetCardContainer = ({
  setsToShow,
  isInLoadSetModal = false,
  screenNameFromProps = undefined,
  hideRemoveSet = undefined,
}) => {
  const theme = useThemeStore((state) => state.theme);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);
  const screenName = useScreen();
  const isInSearchScreen = screenName === "search";

  const noSetToShow = setsToShow.length === 0;
  const contentWidth = noSetToShow ? "100%" : undefined;

  const translatedPlaceHolderText = translate(isInSearchScreen ? "NoSetFound..." : "YourFavoriteSetsWillAppearHere");

  const isFirstRender = useRef(true);
  let placeHolder = null;

  if (noSetToShow) {
    if (isFirstRender.current && isInSearchScreen) {
      isFirstRender.current = false;
      placeHolder = <MaterialCommunityIcons name="chat-question" size={72} color={theme.on_surface} />;
    } else {
      placeHolder = <Text>{translatedPlaceHolderText}</Text>;
    }
  }

  return (
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
  );
};

export default SetCardContainer;

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
