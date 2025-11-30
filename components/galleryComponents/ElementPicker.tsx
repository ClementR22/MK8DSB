import {
  BORDER_RADIUS_STANDARD,
  ELEMENT_PICKER_LIST_IMAGE_RATIO,
  ELEMENT_PICKER_LIST_IMAGE_SIZE,
  LIST_ITEM_SPACING,
} from "@/utils/designTokens";
import React, { memo } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { box_shadow_z1 } from "../styles/shadow";
import Text from "@/primitiveComponents/Text";
import { elementsNamespaceByGame } from "@/translations/namespaces";
import useGameStore from "@/stores/useGameStore";

interface ElementPickerProps {
  name: string;
  imageUrl: ReturnType<typeof require>;
  onPress: () => void;
  isSelected: boolean;
  isCollapsed: boolean;
  style: any;
}

const ElementPicker: React.FC<ElementPickerProps> = ({ name, imageUrl, onPress, isCollapsed, style }) => {
  const game = useGameStore((state) => state.game);

  return (
    <Pressable style={[defaultStyles.container, style.containerDynamic]} onPress={onPress}>
      <View style={defaultStyles.imagePlaceholder}>
        {/* Placeholder background */}
        <Image style={defaultStyles.image} source={imageUrl} resizeMode="contain" />
      </View>
      {!isCollapsed && (
        <Text
          role="title"
          size="small"
          color={style.textColorDynamic}
          numberOfLines={1}
          style={{ marginLeft: 12 }}
          namespace={elementsNamespaceByGame[game]}
        >
          {name}
        </Text>
      )}
    </Pressable>
  );
};

ElementPicker.displayName = "ElementPicker";

const defaultStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: LIST_ITEM_SPACING / 2, // Half spacing for vertical rhythm
    borderRadius: BORDER_RADIUS_STANDARD, // Medium rounded corners
    boxShadow: box_shadow_z1,
    overflow: "hidden", // Ensures shadow works nicely
  },
  imagePlaceholder: {
    width: ELEMENT_PICKER_LIST_IMAGE_SIZE, // Slightly larger image placeholder
    height: ELEMENT_PICKER_LIST_IMAGE_SIZE * ELEMENT_PICKER_LIST_IMAGE_RATIO,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: "90%",
  },
});

export default memo(ElementPicker);
