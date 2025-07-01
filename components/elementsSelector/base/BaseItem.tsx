// components/common/BaseItem.tsx (ou un dossier approprié)
import React, { memo, useCallback } from "react";
import { Image, StyleSheet, View, PressableProps } from "react-native";
import TooltipWrapper from "../../TooltipWrapper"; // Ajuste le chemin si besoin

interface BaseItemProps {
  // Propriétés spécifiques à l'élément affiché
  imageUrl: any; // source de l'image (peut être un number pour require(), ou une URI)
  name: string; // Nom de l'élément pour le tooltip

  // Propriétés de sélection/interaction
  isSelected: boolean;
  onPress: () => void; // L'action à effectuer lors du clic

  // Styles dynamiques passés par le parent
  cardDynamicStyle: any; // Styles du conteneur (ex: elementCardDynamicStyle, bodytypeCardDynamicStyle)
  activeBorderStyle: any; // Styles de la bordure active (quand isSelected est true)
  size?: number; // Taille facultative pour ajuster width/height
}

const BaseItem: React.FC<BaseItemProps> = ({
  imageUrl,
  name,
  isSelected,
  onPress,
  cardDynamicStyle,
  activeBorderStyle,
  size,
}) => {
  return (
    <TooltipWrapper
      tooltipText={name} // Utilise le nom générique
      onPress={onPress} // L'action de presse générique
      innerContainerStyle={[
        cardDynamicStyle,
        isSelected && activeBorderStyle,
        size && { width: size, height: size * 1.2 }, // Applique la taille si fournie
      ]}
    >
      <Image source={imageUrl} style={styles.image} resizeMode="contain" />
    </TooltipWrapper>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "90%",
  },
});

export default memo(BaseItem);
