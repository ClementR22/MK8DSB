import Text from "@/primitiveComponents/Text";
import useGeneralStore from "@/stores/useGeneralStore";
import useThemeStore from "@/stores/useThemeStore";
import { CORNER_EXTRA_SMALL } from "@/utils/designTokens";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import Popover, { PopoverMode, PopoverPlacement } from "react-native-popover-view";
import { Placement } from "react-native-popover-view/dist/Types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TooltipProps {
  tooltipText: string;
  namespace?: string;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  placement?: Placement;
  disabled?: boolean;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  tooltipText,
  namespace,
  onPress = null,
  style,
  placement = PopoverPlacement.TOP,
  disabled = false,
  children,
}) => {
  const [showPopover, setShowPopover] = useState(false);

  const touchableRef = useRef(null);
  const timeoutRef = useRef(null);

  const setIsScrollEnable = useGeneralStore((state) => state.setIsScrollEnable);
  const isAnyModalVisible = useGeneralStore((state) => state.isAnyModalVisible);

  const statusBarHeight = useSafeAreaInsets().top;

  const closePopover = useCallback(() => {
    setShowPopover(false);
    setIsScrollEnable(true);
    return clearTimeout(timeoutRef.current);
  }, [setIsScrollEnable]);

  const openPopover = useCallback(() => {
    setShowPopover(true);
    setIsScrollEnable(false);

    timeoutRef.current = setTimeout(() => {
      closePopover();
    }, 2000);
  }, [closePopover, setIsScrollEnable]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const theme = useThemeStore((state) => state.theme);

  return (
    <>
      <Pressable ref={touchableRef} onLongPress={openPopover} onPress={onPress} disabled={disabled} style={style}>
        {children}
      </Pressable>

      <Popover
        mode={PopoverMode.RN_MODAL}
        backgroundStyle={{ backgroundColor: "transparent" }}
        placement={placement}
        isVisible={showPopover}
        from={touchableRef}
        onRequestClose={() => setShowPopover(false)}
        popoverStyle={{
          marginTop: isAnyModalVisible ? -statusBarHeight : 0,
          backgroundColor: theme.inverse_surface,
        }}
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
            namespace={namespace || "tooltip"}
          >
            {tooltipText}
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
