import Text from "@/primitiveComponents/Text";
import useThemeStore from "@/stores/useThemeStore";
import { CORNER_SMALL } from "@/utils/designTokens";
import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { Menu, MenuOptions, MenuTrigger, renderers } from "react-native-popup-menu";

interface TooltipProps {
  tooltipText: string;
  namespace?: string;
  onPress?: () => void;
  childStyleInner?: ViewStyle | ViewStyle[];
  childStyleOuter?: ViewStyle | ViewStyle[];
  placement?: "top" | "right" | "bottom" | "left" | "auto";
  isButton?: boolean;
  disabled?: boolean;
  top?: number;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  tooltipText,
  namespace,
  onPress = null,
  childStyleInner,
  childStyleOuter,
  placement = "top",
  isButton = false,
  disabled = false,
  top = 0,
  children,
}) => {
  const theme = useThemeStore((state) => state.theme);

  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(close, 2000);
  }, [close]);

  useEffect(() => {
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  const menuTriggerProps = useMemo(() => {
    if (!isButton) return undefined;
    return {
      style: styles.menuTrigger,
      customStyles: { triggerOuterWrapper: styles.triggerOuterWrapper },
    };
  }, [isButton]);

  return (
    <Menu
      opened={isOpen}
      renderer={renderers.Popover}
      rendererProps={{ placement, anchorStyle: styles.anchor }}
      style={childStyleOuter}
    >
      <MenuTrigger {...menuTriggerProps}>
        <Pressable onLongPress={open} onPress={disabled ? undefined : onPress} style={childStyleInner}>
          {children}
        </Pressable>
      </MenuTrigger>

      <MenuOptions
        customStyles={{
          optionsContainer: [styles.optionsContainer, { top }],
          optionsWrapper: { backgroundColor: theme.inverse_surface },
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
  optionsContainer: { borderRadius: CORNER_SMALL, overflow: "hidden" },
  content: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  anchor: { backgroundColor: "transparent" },
  menuTrigger: { flex: 1 },
  triggerOuterWrapper: { flex: 1 },
});

export default React.memo(Tooltip);
