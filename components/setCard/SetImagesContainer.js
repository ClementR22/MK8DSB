import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { category4Names, elementsAllInfosList } from "../../data/data";
import TooltipWrapper from "../TooltipWrapper";
import useModalsStore from "@/stores/useModalsStore";

const SetImagesContainer = ({ setToShowClassIds, mode, onPress = undefined }) => {
  const data = category4Names.map((category, index) => {
    return {
      category: category,
      elements: elementsAllInfosList
        .filter(({ classId }) => classId === setToShowClassIds[index])
        .map((element) => ({ name: element.name, image: element.image })),
    };
  });

  const imageSize = mode === "icon" ? 40 : 80;

  return (
    <>
      {data.map((item) => (
        <View key={item.category} style={{ flexDirection: "row", justifyContent: "center", margin: 20 }}>
          {item.elements.map(({ name, image }, index) => (
            <TooltipWrapper key={index} tooltipText={name} onPress={onPress}>
              <Image source={image} style={{ width: imageSize, height: imageSize }} resizeMode="contain" />
            </TooltipWrapper>
          ))}
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    padding: 10,
  },
  imagesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  scrollview: {
    alignSelf: "center", // 👈 centre la ScrollView elle-même quand elle est petite
    maxWidth: "100%",
    margin: 10,
  },
});

export default React.memo(SetImagesContainer);
