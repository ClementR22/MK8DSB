// components/bodytypes/BodytypeItem.tsx
import React, { memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Bodytype, BodytypeItemImage } from "@/data/bodytypes/bodytypeTypes";
import BaseItem from "../base/BaseItem"; // Ajuste le chemin d'importation

interface BodytypeItemProps {
  bodytype: BodytypeItemImage;
  isSelected: boolean;
  onSelectBodytype: (name: Bodytype) => void;
  bodytypeCardDynamicStyle: any; // Nom de prop mis à jour
  activeBorderStyle: any;
  size?: number;
}

const BodytypeItem: React.FC<BodytypeItemProps> = ({
  bodytype,
  isSelected,
  onSelectBodytype,
  bodytypeCardDynamicStyle,
  activeBorderStyle,
  size,
}) => {
  const handleSelectPress = useCallback(() => {
    onSelectBodytype(bodytype.name);
  }, [onSelectBodytype, bodytype.name]);

  return (
    <BaseItem
      imageUrl={bodytype.imageUrl}
      name={bodytype.name}
      isSelected={isSelected}
      onPress={handleSelectPress} // Utilise la fonction de sélection
      cardDynamicStyle={bodytypeCardDynamicStyle} // Passe le style de la carte
      activeBorderStyle={activeBorderStyle}
      size={size}
    />
  );
};

// styles.bodytypeImage n'est plus nécessaire ici, il est dans BaseItem
// Donc, si tu n'as pas d'autres styles spécifiques à BodytypeItem, tu peux supprimer ce bloc StyleSheet.
const styles = StyleSheet.create({});

export default memo(BodytypeItem);
