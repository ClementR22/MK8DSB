import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { translate } from "@/translations/translations";
import useGeneralStore from "@/stores/useGeneralStore";

const TooltipWrapper = ({
  tooltipText,
  style = undefined,
  innerContainerStyle = undefined,
  onPress,
  placement = "top",
  children,
  ...props
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const setIsScrollEnable = useGeneralStore((state) => state.setIsScrollEnable);

  const timeoutRef = useRef(null);

  function openTooltip() {
    setIsTooltipVisible(true);
    setIsScrollEnable(false);
    timeoutRef.current = setTimeout(() => {
      closeTooltip();
    }, 2000);
  }

  function closeTooltip() {
    setIsTooltipVisible(false);
    setIsScrollEnable(true);
  }

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <Pressable style={style} onPress={onPress} onLongPress={openTooltip} {...props}>
      <Tooltip
        isVisible={isTooltipVisible}
        content={<Text numberOfLines={1}>{tooltipText && translate(tooltipText)}</Text>}
        placement={placement}
        onClose={closeTooltip}
        backgroundColor="rgba(0,0,0,0)"
        disableShadow={true}
        showChildInTooltip={false}
        parentWrapperStyle={innerContainerStyle}
      >
        {children}
      </Tooltip>
    </Pressable>
  );
};

export default TooltipWrapper;
