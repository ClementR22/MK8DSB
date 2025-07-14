// components/common/Item.tsx (ou un dossier approprié)
import React, { memo } from "react";
import { Image, StyleSheet } from "react-native";
import TooltipWrapper from "../TooltipWrapper"; // Ajuste le chemin si besoin

interface ElementPickerProps {
  // Propriétés spécifiques à l'élément affiché
  imageUrl: any; // source de l'image (peut être un number pour require(), ou une URI)
  name: string; // Nom de l'élément pour le tooltip

  // Propriétés de sélection/interaction
  isSelected: boolean;
  onPress: () => void; // L'action à effectuer lors du clic

  // Styles dynamiques passés par le parent
  elementPickerDynamicStyle: any; // Styles du conteneur (ex: elementCardDynamicStyle, bodytypeCardDynamicStyle)
  activeBorderStyle: any; // Styles de la bordure active (quand isSelected est true)
}

const ElementPicker: React.FC<ElementPickerProps> = ({
  imageUrl,
  name,
  isSelected,
  onPress,
  elementPickerDynamicStyle,
  activeBorderStyle,
}) => {
  return (
    <TooltipWrapper
      tooltipText={name} // Utilise le nom générique
      onPress={onPress} // L'action de presse générique
      innerContainerStyle={[elementPickerDynamicStyle, isSelected && activeBorderStyle]}
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

export default memo(ElementPicker);
