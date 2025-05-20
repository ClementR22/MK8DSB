import React from "react";
import { View } from "react-native";
import ElementChip from "./ElementChip";
import useModalsStore from "@/stores/useModalsStore";
import usePressableElementsStore from "@/stores/usePressableElementsStore";

const ElementsDeselector = () => {
  const screenNameForEditModal = useModalsStore((state) => state.screenNameForEditModal);
  const pressableImagesList = usePressableElementsStore(
    (state) => state.statesByScreen[screenNameForEditModal].pressableImagesList
  );
  const handlePressImage = usePressableElementsStore((state) => state.handlePressImage);

  return (
    <View
      style={{
        backgroundColor: "green",
        rowGap: 8,
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {pressableImagesList
        .filter((element) => element.pressed)
        .map(({ id, name, image, pressed }) => (
          <ElementChip
            key={id}
            name={name}
            pressed={pressed}
            onPress={() => handlePressImage(screenNameForEditModal, id)}
            source={image}
          />
        ))}
    </View>
  );
};

export default ElementsDeselector;
