import Text from "@/primitiveComponents/Text";
import useGeneralStore from "@/stores/useGeneralStore";
import useThemeStore from "@/stores/useThemeStore";
import { CORNER_EXTRA_SMALL } from "@/utils/designTokens";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { Menu, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu";
import { BORDER_RADIUS_STANDARD } from "@/utils/designTokens";

interface TooltipProps {
  tooltipText: string;
  namespace?: string;
  onPress?: () => void;
  childStyleInner?: ViewStyle | ViewStyle[];
  childStyleOuter?: ViewStyle | ViewStyle[];
  placement?: "top" | "right" | "bottom" | "left" | "auto";
  disabled?: boolean;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  tooltipText,
  namespace,
  onPress = null,
  childStyleInner,
  childStyleOuter,
  placement = "top",
  disabled = false,
  children,
}) => {
  const theme = useThemeStore((state) => state.theme);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const timeoutRef = useRef(null);

  const close = useCallback(() => {
    setIsOpen(false);
    return clearTimeout(timeoutRef.current);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);

    timeoutRef.current = setTimeout(() => {
      close();
    }, 2000);
  }, [close]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <Menu
      opened={isOpen}
      renderer={renderers.Popover}
      rendererProps={{ placement: placement, anchorStyle: styles.anchor }}
      style={childStyleOuter}
    >
      <MenuTrigger
        style={styles.menuTrigger}
        customStyles={{
          triggerOuterWrapper: styles.triggerOuterWrapper,
        }}
      >
        <Pressable onLongPress={open} onPress={disabled ? undefined : onPress} style={childStyleInner}>
          {children}
        </Pressable>
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: { borderRadius: BORDER_RADIUS_STANDARD },
          optionsWrapper: {
            backgroundColor: theme.inverse_surface,
          },
        }}
      >
        <Text
          role="title"
          size="small"
          style={[
            styles.content,
            {
              backgroundColor: theme.inverse_surface,
              color: theme.inverse_on_surface,
            },
          ]}
          namespace={namespace || "tooltip"}
        >
          {tooltipText}
        </Text>
      </MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: CORNER_EXTRA_SMALL,
  },
  anchor: { backgroundColor: "transparent" },
  menuTrigger: { flex: 1 },
  triggerOuterWrapper: { flex: 1 },
});

export default Tooltip;
