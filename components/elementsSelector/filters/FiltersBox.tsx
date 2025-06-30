import React from "react";
import BodyTypeSelector, { BodyType } from "./BodyTypeSelector";
import { View } from "react-native";
import ElementsDeselector from "../ElementsDeselector";

interface FiltersBoxProps {
  selectedBodyTypes: Set<BodyType>;
  setSelectedBodyTypes: React.Dispatch<React.SetStateAction<Set<BodyType>>>;
}

const FiltersBox = ({ selectedBodyTypes, setSelectedBodyTypes }: FiltersBoxProps) => {
  return (
    <View>
      <BodyTypeSelector selectedBodyTypes={selectedBodyTypes} setSelectedBodyTypes={setSelectedBodyTypes} />
      <ElementsDeselector />
    </View>
  );
};

export default FiltersBox;
