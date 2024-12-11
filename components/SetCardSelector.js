import React from "react";
import { Pressable, Text, View, ScrollView, StyleSheet } from "react-native";
import SetCard from "./setCard/SetCard";

const SetCardSelector = ({ setsList, handleSetCardPress }) => {
  return (
    <ScrollView horizontal={true}>
      <View style={{ flexDirection: "row" }}>
        {setsList.map(({ id, isPressed, setElementIds }) => (
          <Pressable
            key={id}
            onPress={() => {
              return handleSetCardPress(id);
            }}
          >
            <SetCard
              setToShowElementsIds={setElementIds}
              isDisplayScreenCase={true}
              isPressed={isPressed}
            />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default SetCardSelector;

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
