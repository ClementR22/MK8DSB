import React from "react";
import BodyTypeSelector, { BodyType } from "./BodyTypeSelector";
import { StyleSheet, View } from "react-native";
import ElementsDeselector from "../ElementsDeselector";
import { useThemeStore } from "@/stores/useThemeStore";

interface FiltersBoxProps {
  selectedBodyTypes: Set<BodyType>;
  setSelectedBodyTypes: React.Dispatch<React.SetStateAction<Set<BodyType>>>;
}

const FiltersBox = ({ selectedBodyTypes, setSelectedBodyTypes }: FiltersBoxProps) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <View style={[styles.container, { borderColor: theme.primary, backgroundColor: theme.surface }]}>
      <BodyTypeSelector selectedBodyTypes={selectedBodyTypes} setSelectedBodyTypes={setSelectedBodyTypes} />
      <ElementsDeselector />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 4,
    borderRadius: 10,
    overflow: "hidden",
  },
});

export default FiltersBox;
