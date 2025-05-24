import React from "react";
import { View } from "react-native";
import ElementChip from "./ElementChip";
import useModalsStore from "@/stores/useModalsStore";
import { usePressableElements } from "@/hooks/usePressableElements";

const ElementsDeselector = () => {
  const screenName = useModalsStore((state) => state.screenNameForEditModal);
  const { pressableElementsList, handlePressImage } = usePressableElements(screenName);

  return (
    <View
      style={{
        backgroundColor: "green",
        rowGap: 8,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {pressableElementsList
        .filter((element) => element.pressed)
        .map(({ id, name, image, pressed }) => (
          <ElementChip key={id} name={name} pressed={pressed} onPress={() => handlePressImage(id)} source={image} />
        ))}
    </View>
  );
};

export default ElementsDeselector;
