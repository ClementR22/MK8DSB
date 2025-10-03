import { useLanguageStore } from "@/stores/useLanguageStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { translateToLanguage } from "@/translations/translations";
import { SHADOW_STYLE_A } from "@/utils/designTokens";
import React, { memo, useCallback, useMemo } from "react";
import { FlatList } from "react-native";
import ElementPicker from "./ElementPicker";
import { ElementData } from "@/data/elements/elementsTypes";

interface ElementPickerSelectorProps {
  categoryElementsSorted: ElementData[];
  selectedElementId: number;
  isLeftPannelExpanded: boolean;
  onElementPickerPress: (elementId: number) => void;
}

const ElementPickerSelector: React.FC<ElementPickerSelectorProps> = memo(
  ({ categoryElementsSorted, selectedElementId, isLeftPannelExpanded, onElementPickerPress }) => {
    const theme = useThemeStore((state) => state.theme);
    const language = useLanguageStore((state) => state.language);

    const { activeStyle, inactiveStyle } = useMemo(
      () => ({
        activeStyle: {
          containerDynamic: { backgroundColor: theme.primary, ...SHADOW_STYLE_A },
          textDynamic: { color: theme.on_primary },
        },
        inactiveStyle: {
          containerDynamic: { backgroundColor: theme.surface, ...SHADOW_STYLE_A },
          textDynamic: { color: theme.on_surface },
        },
      }),
      [theme]
    );

    const handleElementPress = useCallback(
      (elementId: number) => {
        onElementPickerPress(elementId);
      },
      [onElementPickerPress]
    );

    return (
      <FlatList
        data={categoryElementsSorted}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = item.id === selectedElementId;
          const elementPickerStyle = isSelected ? activeStyle : inactiveStyle;
          return (
            <ElementPicker // Use Memoized version
              name={translateToLanguage(item.name, language)}
              imageUrl={item.imageUrl}
              onPress={() => handleElementPress(item.id)}
              isSelected={isSelected}
              isCollapsed={!isLeftPannelExpanded}
              style={elementPickerStyle}
            />
          );
        }}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      />
    );
  }
);

ElementPickerSelector.displayName = "ElementPickerSelector";

export default ElementPickerSelector;
