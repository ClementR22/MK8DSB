import React from "react";
import { Pressable, Text } from "react-native";
import { button_icon } from "../styles/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useSetsList } from "@/contexts/SetsListContext";

const ButtonSortSet = () => {
  const { theme } = useTheme();
  const { sortSetsSavedKeys } = useSetsList();

  return (
    <Pressable
      style={button_icon(theme).container}
      onPress={() => sortSetsSavedKeys()}
    >
      <Text>Sort</Text>
    </Pressable>
  );
};

export default ButtonSortSet;
