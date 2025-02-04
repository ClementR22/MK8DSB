import React from "react";
import { Pressable, Text, View, ScrollView, StyleSheet } from "react-native";
import SetCardFound from "./setCard/SetCardFound";

const SetCardChosenSelector = ({
  setsList,
  handleSetCardFoundPress,
  removeSet,
}) => {
  return (
    <ScrollView horizontal={true}>
      <View style={{ flexDirection: "row" }}>
        {setsList.map(({ id, isPressed, setClassIds }) => (
          <Pressable
            key={id}
            onPress={() => {
              return handleSetCardFoundPress(id);
            }}
          >
            <SetCardFound
              setToShowClassIds={setClassIds}
              isPressed={isPressed}
              removeSet={() => removeSet(id)}
            />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default SetCardChosenSelector;

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: "#2196F3",
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  pressableText: {
    color: "#fff",
    fontSize: 16,
  },
});
