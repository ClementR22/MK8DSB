import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SetCard from "./SetCard";
import FlexContainer from "@/components/FlexContainer";

const getSetsLength = (sets) => {
  return sets.length === 0;
};

//@formatter:off
const SetCardContainer = ({ setsToShow, isInLoadSetModal = false }) => {
  const { theme } = useTheme();

  return (
    <FlexContainer alignItems={"stretch"}>
      <ScrollView
        contentContainerStyle={[
          styles.setCardContainer,
          {
            minWidth: 300,
            flexGrow: 1,
            backgroundColor: theme.surface_container_high,
            justifyContent: "center",
          },
          getSetsLength(setsToShow) ? { flex: 1 } : {},
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
            />
          );
        })}
      </ScrollView>
    </FlexContainer>
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
