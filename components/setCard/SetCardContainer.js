import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SetCard from "./SetCard";
import useModalsStore from "@/stores/useModalsStore";
import { useThemeStore } from "@/stores/useThemeStore";

const SetCardContainer = ({ setsToShow, isInLoadSetModal = false, screenNameFromProps }) => {
  const theme = useThemeStore((state) => state.theme);
  const isTooltipVisible = useModalsStore((state) => state.isTooltipVisible);

  return (
    <ScrollView
      scrollEnabled={!isTooltipVisible}
      contentContainerStyle={[
        styles.setCardContainer,
        {
          minWidth: 300,
          flexGrow: 1,
          backgroundColor: theme.surface_container_high,
          justifyContent: "center",
        },
      ]}
      horizontal={true}
    >
      {setsToShow.length === 0 ? (
        <MaterialCommunityIcons name="chat-question" size={72} color={theme.on_surface} />
      ) : null}

      {setsToShow.map(({ name, classIds, stats }, index) => {
        return (
          <SetCard
            key={"card" + index}
            setToShowName={name}
            setToShowClassIds={classIds}
            setToShowStats={stats}
            setCardIndex={index}
            isInLoadSetModal={isInLoadSetModal}
            screenNameFromProps={screenNameFromProps}
          />
        );
      })}
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
  },
});
