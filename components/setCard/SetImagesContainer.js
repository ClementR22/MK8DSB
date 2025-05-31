import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { category4Names, elementsAllInfosList } from "@/data/data";
import TooltipWrapper from "../TooltipWrapper";

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

  const styles = StyleSheet.create({
    category: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      margin: 20,
      width: "calc(100% - 40)",
    },
    image: {
      maxWidth: imageSize,
      maxHeight: imageSize,
    },
    tooltip: {
      height: "calc(100% /5)",
      width: "calc(100% / 5)",
      flexGrow: 1,
      alignItems: "center",
    }
  });

  return (
    <>
      {data.map((item) => (
        <View key={item.category} style={styles.category}>
          {item.elements.map(({ name, image }, index) => (
            <TooltipWrapper key={index} tooltipText={name} onPress={onPress} style={styles.tooltip}>
              <Image source={image} style={styles.image} resizeMode="contain" />
            </TooltipWrapper>
          ))}
        </View>
      ))}
    </>
  );
};

export default React.memo(SetImagesContainer);
