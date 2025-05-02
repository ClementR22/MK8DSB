import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { category4Names, elementsAllInfosList } from "../../data/data";
import TooltipWrapper from "../TooltipWrapper";

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

  return (
    <View contentContainerStyle={styles.container}>
      {data.map((item) => (
        <View key={item.category} style={styles.row}>
          <View style={styles.imagesContainer}>
            {item.elements.map(({ name, image }, index) => (
              <TooltipWrapper
                key={index}
                tooltipText={name}
                onPress={mode === "icon" ? () => displaySetImages() : undefined}
              >
                <Image
                  source={image}
                  style={{ width: imageSize, height: imageSize }}
                  resizeMode="contain"
                />
              </TooltipWrapper>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default SetImagesContainer;

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  row: {
    alignItems: "center",
    padding: 10,
  },
  imagesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
