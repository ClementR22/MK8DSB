import React, { useMemo } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useActionIconPropsList } from "@/hooks/useActionIconPropsList";
import { useScreen } from "@/contexts/ScreenContext";
import { BUILD_CARD_WIDTH, PADDING_BUILD_CARD } from "@/utils/designTokens";
import { Category } from "@/data/elements/elementsTypes";
import { categories, elementsData } from "@/data/elements/elementsData";
import Tooltip from "../Tooltip";

const MAX_WIDTH_IN_BUILD_CARD = BUILD_CARD_WIDTH - PADDING_BUILD_CARD * 2; // 200
const MAX_NUMBER_OF_IMAGE = 5;

const IMAGE_SIZE = MAX_WIDTH_IN_BUILD_CARD / MAX_NUMBER_OF_IMAGE; // 40

const PADDING_VERTICAL_CONTAINER = 7;
const GAP_CONTAINER = 14;
interface BuildImagesContainerProps {
  classIds: number[];
  isCollapsed: boolean;
  isInLoadBuildModal: boolean;
  buildDataId: string;
}

interface BuildImageCategoryData {
  category: string;
  elements: Array<{ name: string; image: any }>;
}

const BuildImagesContainer: React.FC<BuildImagesContainerProps> = ({
  classIds,
  isCollapsed,
  isInLoadBuildModal,
  buildDataId,
}) => {
  const screenName = useScreen();

  const data = useMemo<BuildImageCategoryData[]>(() => {
    return categories.map((category: Category, index: number) => {
      const matchedElements = elementsData.filter((element) => element.classId === classIds[index]);

      return {
        category: category,
        elements: matchedElements.map((element) => ({
          name: element.name,
          image: element.imageUrl,
        })),
      };
    });
  }, [classIds]);

  // inutile de donner isSaved à useActionIconPropsList donc on donne false
  const [editActionProps] = useActionIconPropsList(["edit"], screenName, isInLoadBuildModal, buildDataId, false);
  const onImagesPress = !isInLoadBuildModal && screenName !== "search" ? editActionProps.onPress : () => {};

  return (
    <Pressable onPress={onImagesPress} style={styles.pressable}>
      <View style={[styles.container, isCollapsed && styles.containerCollapsed]}>
        {data.map((item) => (
          <View key={item.category} style={styles.category}>
            {item.elements.map(
              ({ name, image }, index) =>
                (!isCollapsed || index === 0) && (
                  <Tooltip
                    key={`${item.category}-${index}`}
                    tooltipText={name}
                    namespace="elements"
                    onPress={onImagesPress}
                    style={styles.tooltip}
                  >
                    <Image source={image} style={styles.image} resizeMode="contain" />
                  </Tooltip>
                )
            )}
          </View>
        ))}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: "100%",
  },
  container: {
    paddingVertical: PADDING_VERTICAL_CONTAINER,
    gap: GAP_CONTAINER,
  },
  containerCollapsed: { gap: 0, flexDirection: "row", justifyContent: "space-around" },
  category: {
    flexDirection: "row",
    justifyContent: "center",
  },
  tooltip: {
    alignItems: "center",
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
});

export default React.memo(BuildImagesContainer);
