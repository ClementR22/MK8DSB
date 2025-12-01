import useThemeStore from "@/stores/useThemeStore";
import React, { memo, useEffect, useMemo, useRef } from "react";
import { FlatList } from "react-native";
import ElementPicker from "./ElementPicker";
import { ElementData } from "@/types";
import { LIST_ITEM_SPACING } from "@/utils/designTokens";
import useGameStore from "@/stores/useGameStore";

interface ElementPickerSelectorProps {
  categoryElementsSorted: ElementData[];
  selectedElementId: number;
  isLeftPannelExpanded: boolean;
  onElementPickerPress: (elementId: number) => void;
}

const ElementsList: React.FC<ElementPickerSelectorProps> = memo(
  ({ categoryElementsSorted, selectedElementId, isLeftPannelExpanded, onElementPickerPress }) => {
    const theme = useThemeStore((state) => state.theme);
    const game = useGameStore((state) => state.game);

    const { activeStyle, inactiveStyle } = useMemo(
      () => ({
        activeStyle: {
          containerDynamic: { backgroundColor: theme.primary },
          textColorDynamic: theme.on_primary,
        },
        inactiveStyle: {
          containerDynamic: { backgroundColor: theme.surface },
        },
      }),
      [theme]
    );

    const flatListRef = useRef<FlatList<ElementData>>(null);

    // Auto scroll vers le haut quand la liste change
    useEffect(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({ offset: 0, animated: false });
      }
    }, [categoryElementsSorted]);

    return (
      <FlatList
        ref={flatListRef}
        data={categoryElementsSorted}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedElementId;
          const elementPickerStyle = isSelected ? activeStyle : inactiveStyle;
          return (
            <ElementPicker
              name={item.name}
              imageUrl={item.imageUrl}
              onPress={() => onElementPickerPress(item.id)}
              isSelected={isSelected}
              isCollapsed={!isLeftPannelExpanded}
              style={elementPickerStyle}
            />
          );
        }}
        contentContainerStyle={{ paddingHorizontal: LIST_ITEM_SPACING, paddingVertical: LIST_ITEM_SPACING / 2 }}
      />
    );
  }
);

ElementsList.displayName = "ElementsList";

export default ElementsList;
