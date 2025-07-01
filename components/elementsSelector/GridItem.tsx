import React, { memo, useCallback, useMemo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { BodyElement, CharacterElement, GliderElement, WheelElement } from "@/data/elementsTypes";
import TooltipWrapper from "../TooltipWrapper";
import Modal from "@/primitiveComponents/Modal";
import { classesStatsByCategory } from "@/data/elementsStats";
import { compactStatNames, statNames } from "@/data/data";

interface GridItemProps {
  element: CharacterElement | BodyElement | WheelElement | GliderElement;
  isSelected: boolean;
  onSelectElement: (classId: number) => void;
  elementCardDynamicStyle: any;
  activeBorderStyle: any;
  size?: number;
}

const GridItem: React.FC<GridItemProps> = ({
  element,
  isSelected,
  onSelectElement,
  elementCardDynamicStyle,
  activeBorderStyle,
  size,
}) => {
  const handlePress = useCallback(() => {
    onSelectElement(element.classId);
  }, [onSelectElement, element.classId]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const stats = useMemo(() => classesStatsByCategory[element.category].get(element.classId), [element]);

  return (
    <>
      <TooltipWrapper
        tooltipText={element.name}
        onPress={handlePress} // () => setIsModalVisible(true)
        innerContainerStyle={[
          elementCardDynamicStyle,
          isSelected && activeBorderStyle,
          size && { width: size, height: size * 1.2 },
        ]}
      >
        <Image source={element.imageUrl} style={styles.elementImage} resizeMode="contain" />
      </TooltipWrapper>
      <Modal modalTitle={element.name} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}>
        <View style={{ flexDirection: "row", gap: 60 }}>
          <View key={"names"}>
            {statNames.map((statName) => (
              <Text key={statName}>{compactStatNames[statName]}</Text>
            ))}
          </View>
          <View key={"values"}>
            {stats.map((statValue, index) => (
              <Text key={index}>{statValue}</Text>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  elementImage: {
    flex: 1,
    width: "90%",
  },
});

export default memo(GridItem);
