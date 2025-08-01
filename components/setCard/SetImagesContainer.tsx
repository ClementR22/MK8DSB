import React, { useMemo } from "react";
import { Image, StyleSheet, View, ImageStyle } from "react-native";
import { categories } from "@/data/elements/elementsData";
import { elementsData } from "@/data/elements/elementsData";
import { vw } from "../styles/theme";
import { Category } from "@/data/elements/elementsTypes";
import { SET_CARD_WIDTH } from "@/utils/designTokens";
import Tooltip from "../Tooltip";

const MODAL_WIDTH = vw * 0.9;
const MAX_WIDTH_IN_MODAL = MODAL_WIDTH - 20;
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
    return categories.map((category: Category, index: number) => {
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
            <Tooltip key={`${item.category}-${index}`} tooltipText={name} onPress={onPress} style={styles.tooltip}>
              <View>
                <Image source={image} style={dynamicImageStyle} resizeMode="contain" />
              </View>
            </Tooltip>
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
