import React, { useEffect, useMemo, useRef, useState } from "react";
import { Platform, Pressable, Text } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { translate } from "@/translations/translations";
import useGeneralStore from "@/stores/useGeneralStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TooltipWrapper = ({
  tooltipText,
  style = undefined,
  innerContainerStyle = undefined,
  onPress = () => {},
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

  const insets = useSafeAreaInsets(); // Get safe area insets

  const tooltipVerticalOffset = useMemo(() => {
    let offset = 0;
    if (Platform.OS !== "web") {
      offset = -2 * insets.top;
    }
    return offset;
  }, [insets]);

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
        tooltipStyle={{ marginTop: tooltipVerticalOffset }}
      >
        {children}
      </Tooltip>
    </Pressable>
  );
};

export default TooltipWrapper;
