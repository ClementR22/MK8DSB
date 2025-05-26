import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { translate } from "@/translations/translations";
import useModalsStore from "@/stores/useModalsStore";

const TooltipWrapper = ({ tooltipText, style, onPress, placement = "top", disabled = false, children, ...props }) => {
  const [isTooltipVisible_, setIsTooltipVisible_] = useState(false);

  const setIsTooltipVisible = useModalsStore((state) => state.setIsTooltipVisible);

  const timeoutRef = useRef(null);

  function openTooltip() {
    setIsTooltipVisible_(true);
    setIsTooltipVisible(true);
    timeoutRef.current = setTimeout(() => {
      closeTooltip();
    }, 2000);
  }

  function closeTooltip() {
    setIsTooltipVisible_(false);
    setIsTooltipVisible(false);
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <Pressable
      style={[style, disabled && { backgroundColor: "grey" }]}
      onPress={onPress}
      onLongPress={openTooltip}
      onHoverIn={() => console.log("caca")}
      {...props}
      disabled={disabled}
    >
      <Tooltip
        isVisible={isTooltipVisible_}
        content={<Text numberOfLines={1}>{translate(tooltipText)}</Text>}
        placement={placement}
        onClose={closeTooltip}
        backgroundColor="rgba(0,0,0,0)"
        disableShadow={true}
        showChildInTooltip={false}
      >
        {/*<Pressable onPress={onPress} onLongPress={() => openTooltip()}>*/}
        {children}
        {/*</Pressable>*/}
      </Tooltip>
    </Pressable>
  );
};

export default TooltipWrapper;
