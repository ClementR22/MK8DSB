import Button from "@/primitiveComponents/Button";
import React, { useEffect, useRef, useState } from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";
import Popover, { PopoverMode, PopoverPlacement } from "react-native-popover-view";
import { Placement } from "react-native-popover-view/dist/Types";

export type TooltipPlacementType = Placement | "top" | "right" | "bottom" | "left" | "auto" | "floating" | "center";

interface TooltipProps {
  tooltipText: string;
  onPress?: () => void;
  style: ViewStyle;
  placement?: TooltipPlacementType;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({
  tooltipText,
  onPress = null,
  style,
  placement = PopoverPlacement.AUTO,
  children,
}) => {
  const [showPopover, setShowPopover] = useState(false);

  const touchableRef = useRef(null);
  const timeoutRef = useRef(null);

  const openPopover = () => {
    setShowPopover(true);
    timeoutRef.current = setTimeout(() => {
      closePopover();
    }, 2000);
  };

  const closePopover = () => {
    setShowPopover(false);
    return clearTimeout(timeoutRef.current);
  };

  return (
    <>
      <TouchableOpacity ref={touchableRef} onLongPress={openPopover} onPress={onPress} style={style}>
        {children}
      </TouchableOpacity>

      <Popover
        mode={PopoverMode.RN_MODAL}
        backgroundStyle={{ backgroundColor: "transparent" }}
        placement={placement as Placement}
        isVisible={showPopover}
        from={touchableRef}
      >
        {tooltipText && <Text>{tooltipText}</Text>}
      </Popover>
    </>
  );
};

export default Tooltip;
