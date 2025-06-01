import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { category4Names, elementsAllInfosList } from "@/data/data";
import TooltipWrapper from "../TooltipWrapper";
import { vh, vw } from "../styles/theme";

const SetImagesContainer = ({ setToShowClassIds, mode, onPress = undefined }) => {
  const data = category4Names.map((category, index) => {
    return {
      category: category,
      elements: elementsAllInfosList
        .filter(({ classId }) => classId === setToShowClassIds[index])
        .map((element) => ({ name: element.name, image: element.image })),
    };
  });

  const setCardWidth = 200;
  const modalWidth = vw * 0.9;
  const maxNumberOfImages = 5;

  const imageSizeInSetCard = setCardWidth / maxNumberOfImages;
  const imageSizeInModal = modalWidth / maxNumberOfImages;

  const imageSize = mode === "icon" ? imageSizeInSetCard : imageSizeInModal;

  const styles = StyleSheet.create({
    category: {
      flexDirection: "row",
      justifyContent: "center",
      marginVertical: 10,
    },
    image: {
      maxWidth: imageSize,
      maxHeight: imageSize,
    },
    tooltip: {
      //  height: "calc(100% /5)",
      //  width: "calc(100% / 5)",
      // flexGrow: 1,
      alignItems: "center",
    },
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
