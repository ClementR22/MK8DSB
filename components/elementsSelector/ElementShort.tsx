import React, { memo } from "react";
import { Image, ImageSourcePropType, StyleSheet, ViewStyle } from "react-native";
import Tooltip from "../Tooltip";
import { elementsNamespaceByGame } from "@/translations/namespaces";
import useGameStore from "@/stores/useGameStore";

interface ElementShortProps {
  // Propriétés spécifiques à l'élément affiché
  imageUrl: ImageSourcePropType; // source de l'image (peut être un number pour require(), ou une URI)
  name: string; // Nom de l'élément pour le tooltip

  // Propriétés de sélection/interaction
  isSelected: boolean;
  onPress: () => void; // L'action à effectuer lors du clic

  // Styles dynamiques passés par le parent
  elementDynamicStyle: ViewStyle; // Styles du conteneur (ex: elementCardDynamicStyle, bodytypeCardDynamicStyle)
  activeBorderStyle: ViewStyle; // Styles de la bordure active (quand isSelected est true)
}

const ElementShort: React.FC<ElementShortProps> = ({
  imageUrl,
  name,
  isSelected,
  onPress,
  elementDynamicStyle,
  activeBorderStyle,
}) => {
  const game = useGameStore((state) => state.game);

  return (
    <Tooltip
      tooltipText={name}
      namespace={elementsNamespaceByGame[game]}
      onPress={onPress}
      childStyleInner={StyleSheet.flatten([elementDynamicStyle, isSelected && activeBorderStyle])}
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

export default memo(ElementShort);
