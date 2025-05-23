import React from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { category4Names, elementsAllInfosList } from "../../data/data";
import TooltipWrapper from "../TooltipWrapper";
import useModalsStore from "@/stores/useModalsStore";

const SetImagesContainer = ({ setToShowClassIds, mode, displaySetImages }) => {
  const data = category4Names.map((category, index) => {
    return {
      category: category,
      elements: elementsAllInfosList
        .filter(({ classId }) => classId === setToShowClassIds[index])
        .map((element) => ({ name: element.name, image: element.image })),
    };
  });

  const imageSize = mode === "icon" ? 40 : 80;

  const isTooltipVisible = useModalsStore((state) => state.isTooltipVisible);

  return (
    <>
      {data.map((item) => (
        <ScrollView key={item.category} scrollEnabled={!isTooltipVisible} horizontal style={styles.scrollview}>
          {item.elements.map(({ name, image }, index) => (
            <TooltipWrapper
              key={index}
              tooltipText={name}
              onPress={mode === "icon" ? () => displaySetImages() : undefined}
            >
              <Image source={image} style={{ width: imageSize, height: imageSize }} resizeMode="contain" />
            </TooltipWrapper>
          ))}
        </ScrollView>
      ))}
    </>
  );
};

export default SetImagesContainer;

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
