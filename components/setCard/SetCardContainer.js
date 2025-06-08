import React from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SetCard from "./SetCard";
import { useThemeStore } from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";

const SetCardContainer = ({
  setsToShow,
  isInLoadSetModal = false,
  screenNameFromProps = undefined,
  hideRemoveSet = undefined,
}) => {
  const theme = useThemeStore((state) => state.theme);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);

  const noSetToShow = setsToShow.length === 0;
  const contentWidth = noSetToShow ? "100%" : undefined;

  return (
    <ScrollView scrollEnabled={isScrollEnable} horizontal={true} contentContainerStyle={{ width: contentWidth }}>
      <Pressable
        style={[
          styles.setCardContainer,
          {
            flexDirection: "row",
            flexGrow: 1,
            backgroundColor: theme.surface_container_high,
            justifyContent: "center", // utile pour l'icon chat-question
          },
        ]}
      >
        {noSetToShow && <MaterialCommunityIcons name="chat-question" size={72} color={theme.on_surface} />}

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
              hideRemoveSet={hideRemoveSet}
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
  },
});
