import Text from "@/primitiveComponents/Text";
import useGeneralStore from "@/stores/useGeneralStore";
import { useThemeStore } from "@/stores/useThemeStore";
import { translate } from "@/translations/translations";
import { CORNER_EXTRA_SMALL } from "@/utils/designTokens";
import React, { useCallback, useRef, useState } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import Popover, { PopoverMode, PopoverPlacement } from "react-native-popover-view";
import { Placement } from "react-native-popover-view/dist/Types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type TooltipPlacementType = Placement | "top" | "right" | "bottom" | "left" | "auto" | "floating" | "center";

interface TooltipProps {
  tooltipText: string;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  placement?: TooltipPlacementType;
  disabled?: boolean;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  tooltipText,
  onPress = null,
  style,
  placement = PopoverPlacement.TOP,
  disabled = false,
  children,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const [tooltipOffset, setTooltipOffset] = useState(0);

  const touchableRef = useRef(null);
  const timeoutRef = useRef(null);

  const setIsScrollEnable = useGeneralStore((state) => state.setIsScrollEnable);

  const menuVerticalOffset = useSafeAreaInsets().top;

  const openPopover = useCallback(() => {
    setTooltipOffset(menuVerticalOffset);
    setShowPopover(true);
    setIsScrollEnable(false);

    timeoutRef.current = setTimeout(() => {
      closePopover();
    }, 2000);
  }, []);

  const closePopover = useCallback(() => {
    setShowPopover(false);
    setIsScrollEnable(true);
    return clearTimeout(timeoutRef.current);
  }, []);

  const theme = useThemeStore((state) => state.theme);

  return (
    <>
      <Pressable ref={touchableRef} onLongPress={openPopover} onPress={onPress} disabled={disabled} style={style}>
        {children}
      </Pressable>

      <Popover
        backgroundStyle={{ backgroundColor: "transparent" }}
        placement={placement as Placement}
        isVisible={showPopover}
        from={touchableRef}
        popoverStyle={{ marginTop: tooltipOffset, backgroundColor: theme.inverse_surface }}
        arrowSize={{ width: 0, height: 0 }}
        offset={5}
      >
        {tooltipText && (
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
          >
            {translate(tooltipText)}
          </Text>
        )}
      </Popover>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: CORNER_EXTRA_SMALL,
  },
});

export default Tooltip;
