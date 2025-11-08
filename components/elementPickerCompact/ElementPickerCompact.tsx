import React, { memo } from "react";
import { Image, ImageSourcePropType, StyleSheet, ViewStyle } from "react-native";
import Tooltip from "../Tooltip";

interface ElementPickerCompactProps {
  // Propriétés spécifiques à l'élément affiché
  imageUrl: ImageSourcePropType; // source de l'image (peut être un number pour require(), ou une URI)
  name: string; // Nom de l'élément pour le tooltip

  // Propriétés de sélection/interaction
  isSelected: boolean;
  onPress: () => void; // L'action à effectuer lors du clic

  // Styles dynamiques passés par le parent
  elementPickerDynamicStyle: ViewStyle; // Styles du conteneur (ex: elementCardDynamicStyle, bodytypeCardDynamicStyle)
  activeBorderStyle: ViewStyle; // Styles de la bordure active (quand isSelected est true)
}

const ElementPickerCompact: React.FC<ElementPickerCompactProps> = ({
  imageUrl,
  name,
  isSelected,
  onPress,
  elementPickerDynamicStyle,
  activeBorderStyle,
}) => {
  return (
    <Tooltip
      tooltipText={name}
      namespace="elements"
      onPress={onPress}
      childStyleInner={StyleSheet.flatten([elementPickerDynamicStyle, isSelected && activeBorderStyle])}
    >
      <Image source={imageUrl} style={styles.image} resizeMode="contain" />
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "90%",
  },
});

export default memo(ElementPickerCompact);
