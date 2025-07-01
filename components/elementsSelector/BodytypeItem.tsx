import React, { memo, useCallback, useMemo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Bodytype, BodytypeItemImage } from "@/data/bodytypes/bodytypeTypes";
import TooltipWrapper from "../TooltipWrapper";

interface BodytypeItemProps {
  bodytype: BodytypeItemImage;
  isSelected: boolean;
  onSelectBodytype: (name: Bodytype) => void;
  bodytypeCardDynamicStyle: any;
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
  const handlePress = useCallback(() => {
    onSelectBodytype(bodytype.name);
  }, [onSelectBodytype, bodytype.name]);

  return (
    <>
      <TooltipWrapper
        tooltipText={bodytype.name}
        onPress={handlePress} // () => setIsModalVisible(true)
        innerContainerStyle={[
          bodytypeCardDynamicStyle,
          isSelected && activeBorderStyle,
          size && { width: size, height: size * 1.2 },
        ]}
      >
        <Image source={bodytype.imageUrl} style={styles.bodytypeImage} resizeMode="contain" />
      </TooltipWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  bodytypeImage: {
    flex: 1,
    width: "90%",
  },
});

export default memo(BodytypeItem);
