// ImageButtonSelector.tsx
import React, { memo, useCallback, useMemo, useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View, Image, ViewStyle } from "react-native";
import { useThemeStore } from "@/stores/useThemeStore";
import TooltipWrapper from "../TooltipWrapper";
import { translate } from "@/translations/translations";

export interface ImageButtonOption {
  key: string;
  imageUrl: any; // `any` for require paths
  label: string;
}

export type SelectionMode = "single" | "multiple";
export type ActiveStyleProperty = "backgroundColor" | "borderColor"; // Renamed from ActiveStyleProp

interface ImageButtonSelectorProps {
  options: ImageButtonOption[];
  selectionMode: SelectionMode;
  onSelectionChange: (selectedKeys: string | Set<string>) => void;
  initialSelection: string | Set<string> | null;
  buttonSize?: { width: number; height: number };
  activeStyleProperty?: ActiveStyleProperty;
  activeColor?: string;
  // Optional prop for displaying text below image (if needed for some buttons)
  showTextLabel?: boolean;
}

const DEFAULT_BUTTON_SIZE = { width: 50, height: 50 };

const ImageButtonSelector: React.FC<ImageButtonSelectorProps> = ({
  options,
  selectionMode,
  onSelectionChange,
  initialSelection,
  buttonSize = DEFAULT_BUTTON_SIZE,
  activeStyleProperty = "backgroundColor",
  activeColor,
  showTextLabel = false, // Default to false
}) => {
  const theme = useThemeStore((state) => state.theme);

  const [currentSelection, setCurrentSelection] = useState<string | Set<string>>(() => {
    if (selectionMode === "multiple") {
      return initialSelection instanceof Set ? initialSelection : new Set<string>();
    }
    return typeof initialSelection === "string" ? initialSelection : null;
  });

  useEffect(() => {
    if (selectionMode === "multiple") {
      setCurrentSelection(initialSelection instanceof Set ? initialSelection : new Set<string>());
    } else {
      setCurrentSelection(typeof initialSelection === "string" ? initialSelection : null);
    }
  }, [initialSelection, selectionMode]);

  const handlePress = useCallback(
    (key: string) => {
      let newSelection: string | Set<string>;

      if (selectionMode === "single") {
        newSelection = key;
      } else {
        const currentSet = new Set(currentSelection as Set<string>);
        if (currentSet.has(key)) {
          currentSet.delete(key);
        } else {
          currentSet.add(key);
        }
        newSelection = currentSet;
      }

      setCurrentSelection(newSelection);
      onSelectionChange(newSelection);
    },
    [currentSelection, selectionMode, onSelectionChange]
  );

  const memoizedButtonBaseStyle = useMemo(
    () => [
      styles.button,
      { backgroundColor: theme.surface_container_high },
      { width: buttonSize.width, height: buttonSize.height },
    ],
    [theme.surface_container_high, buttonSize.width, buttonSize.height]
  );

  const memoizedContainerStyle = useMemo(
    () => [styles.container, selectionMode === "multiple" && { gap: 3 }],
    [selectionMode]
  );

  return (
    <View style={memoizedContainerStyle}>
      {options.map((option) => {
        const isActive =
          selectionMode === "single"
            ? currentSelection === option.key
            : (currentSelection as Set<string>).has(option.key);

        const activeItemStyle = {} as ViewStyle;
        const resolvedActiveColor = activeColor || theme.primary;

        if (isActive) {
          if (activeStyleProperty === "backgroundColor") {
            activeItemStyle.backgroundColor = resolvedActiveColor;
          } else {
            // borderColor
            activeItemStyle.borderColor = resolvedActiveColor;
          }
        }

        return (
          <TooltipWrapper
            key={option.key}
            tooltipText={option.key}
            onPress={() => handlePress(option.key)}
            innerContainerStyle={[
              memoizedButtonBaseStyle,
              isActive && styles.activeButtonCommon,
              activeItemStyle,
              // Optional: pressed state
            ]}
          >
            <Image source={option.imageUrl} style={styles.image} resizeMode="contain" />
            {showTextLabel &&
              option.label && ( // Conditionally show text label
                <Text style={[styles.buttonText, { color: isActive ? theme.on_primary : theme.on_surface }]}>
                  {translate(option.label)}
                </Text>
              )}
          </TooltipWrapper>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "transparent", // Default transparent border
  },
  activeButtonCommon: {
    // Add common active styles here if any, e.g., elevation, shadow
  },
  image: {
    width: "100%",
    height: "100%",
    // If you want image to not take full button size, adjust here:
    // flex: 1, // Let image take available space if button has text
    // marginBottom: 5, // Space between image and text
  },
  buttonText: {
    // Styling for optional text label below image
    fontSize: 10, // Smaller font to fit
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 2, // Small space between image and text
  },
  pressedState: {
    // Example pressed state
    opacity: 0.7,
  },
});

export default memo(ImageButtonSelector);
