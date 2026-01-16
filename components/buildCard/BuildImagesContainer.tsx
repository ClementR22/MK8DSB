import React, { useMemo } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useActionIconPropsList } from "@/hooks/useActionIconPropsList";
import { useScreen } from "@/contexts/ScreenContext";
import {
  GAP_BUILD_IMAGES_CONTAINER,
  MAX_WIDTH_IN_BUILD_CARD,
  PADDING_VERTICAL_BUILD_IMAGES_CONTAINER,
} from "@/utils/designTokens";
import Tooltip from "../Tooltip";
import { useGameData } from "@/hooks/useGameData";
import { elementsNamespaceByGame } from "@/translations/namespaces";
import useGameStore from "@/stores/useGameStore";
import { useBuildImages } from "@/hooks/useBuildImages";

interface BuildImagesContainerProps {
  classIds: number[];
  isCollapsed: boolean;
  isInLoadBuildModal: boolean;
  buildDataId: string;
}

const BuildImagesContainer: React.FC<BuildImagesContainerProps> = ({
  classIds,
  isCollapsed,
  isInLoadBuildModal,
  buildDataId,
}) => {
  const game = useGameStore((state) => state.game);

  const { maxNumberOfImages } = useGameData();
  const screenName = useScreen();

  const buildImages = useBuildImages(classIds);

  // inutile de donner isSaved à useActionIconPropsList donc on donne false
  const [editActionProps] = useActionIconPropsList(["edit"], screenName, isInLoadBuildModal, buildDataId, false);
  const onImagesPress = !isInLoadBuildModal && screenName !== "search" ? editActionProps.onPress : () => {};

  const imageStyle = useMemo(
    () => ({
      width: MAX_WIDTH_IN_BUILD_CARD / maxNumberOfImages,
      height: MAX_WIDTH_IN_BUILD_CARD / maxNumberOfImages,
    }),
    [maxNumberOfImages]
  );

  return (
    <Pressable onPress={onImagesPress} style={styles.pressable}>
      <View style={[styles.container, isCollapsed && styles.containerCollapsed]}>
        {buildImages.map((item, indexCat) => (
          <View key={indexCat} style={styles.category}>
            {item.map(
              ({ name, imageUrl }, indexEl) =>
                (!isCollapsed || indexEl === 0) && (
                  <Tooltip
                    key={`${indexCat}-${indexEl}`}
                    tooltipText={name}
                    namespace={elementsNamespaceByGame[game]}
                    onPress={onImagesPress}
                  >
                    <Image source={imageUrl} style={imageStyle} resizeMode="contain" />
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
    paddingVertical: PADDING_VERTICAL_BUILD_IMAGES_CONTAINER,
    gap: GAP_BUILD_IMAGES_CONTAINER,
  },
  containerCollapsed: { gap: 0, flexDirection: "row", justifyContent: "space-around" },
  category: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default React.memo(BuildImagesContainer);
