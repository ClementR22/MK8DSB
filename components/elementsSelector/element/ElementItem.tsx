// components/elements/ElementItem.tsx
import React, { memo, useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BodyElement, CharacterElement, GliderElement, WheelElement } from "@/data/elements/elementsTypes";
import Modal from "@/primitiveComponents/Modal";
import { classesStatsByCategory } from "@/data/elements/elementsStats";
import { compactStatNames, statNames } from "@/data/data";
import BaseItem from "../base/BaseItem"; // Ajuste le chemin d'importation

interface ElementItemProps {
  element: CharacterElement | BodyElement | WheelElement | GliderElement;
  isSelected: boolean;
  onSelectElement: (classId: number) => void;
  elementCardDynamicStyle: any;
  activeBorderStyle: any;
  size?: number;
}

const ElementItem: React.FC<ElementItemProps> = ({
  element,
  isSelected,
  onSelectElement,
  elementCardDynamicStyle,
  activeBorderStyle,
  size,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // L'action principale de sélection via onPress du BaseItem
  const handleSelectPress = useCallback(() => {
    onSelectElement(element.classId);
  }, [onSelectElement, element.classId]);

  // Optionnel: Gérer l'ouverture de la modal avec un autre type de pression (ex: long press)
  // Ou si tu veux que le clic sélectionne ET ouvre la modal:
  // const handlePress = useCallback(() => {
  //   onSelectElement(element.classId);
  //   setIsModalVisible(true);
  // }, [onSelectElement, element.classId]);

  // Récupération des stats (spécifique à ElementItem)
  const stats = useMemo(() => classesStatsByCategory[element.category].get(element.classId), [element]);

  // Vérification si les stats existent pour éviter les erreurs si un élément n'a pas de stats
  const displayStats = stats || [];

  return (
    <>
      <BaseItem
        imageUrl={element.imageUrl}
        name={element.name}
        isSelected={isSelected}
        onPress={handleSelectPress} // Utilise la fonction de sélection
        cardDynamicStyle={elementCardDynamicStyle}
        activeBorderStyle={activeBorderStyle}
        size={size}
      />
      {/* La modal est spécifique à ElementItem */}
      <Modal modalTitle={element.name} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}>
        {/* Assure-toi que stats est défini avant de le mapper */}
        {displayStats.length > 0 ? (
          <View style={styles.statsContainer}>
            <View key={"names"}>
              {statNames.map((statName) => (
                <Text key={statName} style={styles.statText}>
                  {compactStatNames[statName]}
                </Text>
              ))}
            </View>
            <View key={"values"}>
              {displayStats.map((statValue, index) => (
                <Text key={index} style={styles.statText}>
                  {statValue}
                </Text>
              ))}
            </View>
          </View>
        ) : (
          <Text style={styles.noStatsText}>No stats available for this element.</Text>
        )}
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  // styles.elementImage n'est plus nécessaire ici, il est dans BaseItem
  statsContainer: {
    flexDirection: "row",
    gap: 60,
    justifyContent: "center", // Centrer le contenu de la modal
    padding: 20, // Ajouter un peu de padding
  },
  statText: {
    fontSize: 16,
    // Tu pourrais ajouter des styles de thème ici pour la couleur du texte si tu veux
  },
  noStatsText: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    padding: 20,
  },
});

export default memo(ElementItem);
