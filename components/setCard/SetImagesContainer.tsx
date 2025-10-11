import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import { categories } from "@/data/elements/elementsData";
import { elementsData } from "@/data/elements/elementsData";
import { vw } from "../styles/theme";
import { Category } from "@/data/elements/elementsTypes";
import { PADDING_SET_CARD, SET_CARD_WIDTH } from "@/utils/designTokens";
import Tooltip from "../Tooltip";

const MODAL_WIDTH = vw * 0.9;
const MAX_WIDTH_IN_MODAL = MODAL_WIDTH - 20;
const MAX_WIDTH_IN_SET_CARD = SET_CARD_WIDTH - PADDING_SET_CARD * 2; // 200
const MAX_NUMBER_OF_IMAGE = 5;

const IMAGE_SIZE_IN_SET_CARD = MAX_WIDTH_IN_SET_CARD / MAX_NUMBER_OF_IMAGE; // 40
const IMAGE_SIZE_IN_MODAL = MAX_WIDTH_IN_MODAL / MAX_NUMBER_OF_IMAGE;

const PADDING_VERTICAL_CONTAINER = 7;
const GAP_CONTAINER = 14;
const HEIGHT_CONTAINER_ICON_MODE = IMAGE_SIZE_IN_SET_CARD * 4 + PADDING_VERTICAL_CONTAINER * 2 + GAP_CONTAINER * 3;

interface SetImageCategoryData {
  category: string;
  elements: Array<{ name: string; image: any }>;
}

type ModeType = "icon" | "modal";

interface SetImagesContainerProps {
  setToShowClassIds: number[];
  mode: ModeType;
  isCollapsed?: boolean;
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

  const imageSize = mode === "icon" ? IMAGE_SIZE_IN_SET_CARD : IMAGE_SIZE_IN_MODAL;

  return (
    <View style={[styles.container, mode === "icon" && { height: HEIGHT_CONTAINER_ICON_MODE }]}>
      {data.map((item) => (
        <View key={item.category} style={styles.category}>
          {item.elements.map(({ name, image }, index) => (
            <Tooltip key={`${item.category}-${index}`} tooltipText={name} onPress={onPress} style={styles.tooltip}>
              <Image
                source={image}
                style={{
                  width: imageSize,
                  height: imageSize,
                }}
                resizeMode="contain"
              />
            </Tooltip>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: PADDING_VERTICAL_CONTAINER,
    gap: GAP_CONTAINER,
  },
  category: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tooltip: {
    alignItems: "center",
  },
});

export default React.memo(SetImagesContainer);
