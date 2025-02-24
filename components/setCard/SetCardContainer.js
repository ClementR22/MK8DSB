import { View, ScrollView, StyleSheet } from "react-native";
import { useTheme, vh } from "../styles/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SetCard from "./SetCard";

const SetCardContainer = ({
  setsToShow,
  chosenStats = null,
  isFoundStatsVisible = null,
  displayCase = false,
  handlePresentModalPress = null,
  removeSet = null,
}) => {
  const th = useTheme();

  return (
    <View key="cardsContainer">
      <ScrollView
        contentContainerStyle={[
          styles.setCardContainer,
          { backgroundColor: th.surface_container_high },
          setsToShow.length == 0
            ? {
                flex: 1,
                paddingBottom: 0.282 * vh,
                justifyContent: "center",
              }
            : {},
        ]}
        horizontal={true}
      >
        {setsToShow.length == 0 ? (
          <MaterialCommunityIcons
            name="chat-question"
            size={72}
            color={th.on_surface}
          />
        ) : null}

        {setsToShow.map(({ name, classIds, stats }, index) => {
          return (
            <SetCard
              key={"card" + index}
              setToShowName={name}
              setToShowClassIds={classIds}
              setToShowStats={stats}
              isFoundStatsVisible={isFoundStatsVisible}
              chosenStats={chosenStats}
              displayCase={displayCase}
              handlePresentModalPressWithArg={() =>
                handlePresentModalPress(index)
              }
              setCardIndex={index}
              removeSet={() => removeSet(index)}
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
    padding: 20,
    alignItems: "stretch",
    //backgroundColor: th.surface_container_high,
    borderRadius: 24,
    columnGap: 16,
  },
});
