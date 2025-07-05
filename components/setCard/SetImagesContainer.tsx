import React, { useMemo } from "react";
import { Image, StyleSheet, View, ImageStyle, ImageSourcePropType } from "react-native";
import { category4Names } from "@/data/data";
import { elementsData } from "@/data/elements/elementsData";
import TooltipWrapper from "../TooltipWrapper";
import { vw } from "../styles/theme";
import { Category } from "@/data/elements/elementsTypes";

const MODAL_WIDTH = vw * 0.9;
const MAX_WIDTH_IN_MODAL = MODAL_WIDTH - 20;
const SET_CARD_WIDTH = 220;
const MAX_WIDTH_IN_SET_CARD = SET_CARD_WIDTH - 20;
const MAX_NUMBER_OF_IMAGE = 5;

interface SetImageCategoryData {
  category: string;
  elements: Array<{ name: string; image: any }>;
}

type ModeType = "icon" | "modal";

interface SetImagesContainerProps {
  setToShowClassIds: number[];
  mode: ModeType;
  onPress?: () => void;
}

const SetImagesContainer: React.FC<SetImagesContainerProps> = ({ setToShowClassIds, mode, onPress = undefined }) => {
  const data: SetImageCategoryData[] = useMemo(() => {
    return category4Names.map((category: Category, index: number) => {
      const matchedElements = elementsData.filter((element) => element.classId === setToShowClassIds[index]);

      return {
        category: category,
        elements: matchedElements.map((element) => ({
          name: element.name,
          image: element.imageUrl,
        })),
      };
    });
  }, [setToShowClassIds]);

  const imageSize = useMemo(() => {
    const imageSizeInSetCard = MAX_WIDTH_IN_SET_CARD / MAX_NUMBER_OF_IMAGE;
    const imageSizeInModal = MAX_WIDTH_IN_MODAL / MAX_NUMBER_OF_IMAGE;

    return mode === "icon" ? imageSizeInSetCard : imageSizeInModal;
  }, [mode]);

  const dynamicImageStyle: ImageStyle = useMemo(() => {
    return {
      maxWidth: imageSize,
      maxHeight: imageSize,
    };
  }, [imageSize]);

  return (
    <>
      {data.map((item) => (
        <View key={item.category} style={styles.category}>
          {item.elements.map(({ name, image }, index) => (
            <TooltipWrapper
              key={`${item.category}-${index}`}
              tooltipText={name}
              onPress={onPress}
              style={styles.tooltip}
            >
              <Image source={image} style={dynamicImageStyle} resizeMode="contain" />
            </TooltipWrapper>
          ))}
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  category: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 7,
  },
  tooltip: {
    alignItems: "center",
  },
});

export default React.memo(SetImagesContainer);
