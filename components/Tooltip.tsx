import useGeneralStore from "@/stores/useGeneralStore";
import { translate } from "@/translations/translations";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Platform, Pressable, Text, ViewStyle } from "react-native";
import Popover, { PopoverMode, PopoverPlacement } from "react-native-popover-view";
import { Placement } from "react-native-popover-view/dist/Types";

export type TooltipPlacementType = Placement | "top" | "right" | "bottom" | "left" | "auto" | "floating" | "center";

interface TooltipProps {
  tooltipText: string;
  onPress?: () => void;
  style?: ViewStyle;
  placement?: TooltipPlacementType;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  tooltipText,
  onPress = null,
  style,
  placement = PopoverPlacement.TOP,
  children,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const [tooltipOffset, setTooltipOffset] = useState(0);

  const touchableRef = useRef(null);
  const timeoutRef = useRef(null);

  const setIsScrollEnable = useGeneralStore((state) => state.setIsScrollEnable);

  const getTooltipVerticalOffset = useGeneralStore((state) => state.getTooltipVerticalOffset);

  const openPopover = useCallback(() => {
    setTooltipOffset(getTooltipVerticalOffset());
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

  return (
    <>
      <Pressable ref={touchableRef} onLongPress={openPopover} onPress={onPress} style={style}>
        {children}
      </Pressable>

      <Popover
        mode={PopoverMode.RN_MODAL}
        backgroundStyle={{ backgroundColor: "transparent" }}
        placement={placement as Placement}
        isVisible={showPopover}
        from={touchableRef}
        popoverStyle={{ marginTop: tooltipOffset }}
        arrowSize={{ width: 0, height: 0 }}
        offset={5}
      >
        {tooltipText && <Text>{translate(tooltipText)}</Text>}
      </Popover>
    </>
  );
};

export default Tooltip;
