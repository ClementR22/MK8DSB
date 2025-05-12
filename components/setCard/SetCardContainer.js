import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SetCard from "./SetCard";

const getSetsLength = (sets) => {
  return sets.length === 0;
};

//@formatter:off
const SetCardContainer = ({ setsToShow, chosenStats = null, isInLoadSetModal }) => {
  const { theme } = useTheme();

  return (
    <View
      theme={theme}
      key="cardsContainer"
      style={{
        display: "flex",
        // padding: 10,
        backgroundColor: theme.surface,
        flexDirection: "column",
      }}
    >
      <ScrollView
        contentContainerStyle={[
          styles.setCardContainer,
          {
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
              chosenStats={chosenStats}
              setCardIndex={index}
              isInLoadSetModal={isInLoadSetModal}
            />
          );
        })}
      </ScrollView>
    </View>
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
