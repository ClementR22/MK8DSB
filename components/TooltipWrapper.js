import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { translate } from "@/translations/translations";

const TooltipWrapper = ({ tooltipText, style, onPress, placement = "top", children }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const openTooltip = () => {
    setTooltipVisible(true);
    setTimeout(() => {
      setTooltipVisible(false);
    }, 2000);
  };

  return (
    <View style={style ? style : {}}>
      <Tooltip
        isVisible={tooltipVisible}
        content={
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text numberOfLines={1}>{translate(tooltipText)}</Text>
            </View>
          </View>
        }
        placement={placement}
        onClose={() => setTooltipVisible(false)}
        backgroundColor="rgba(0,0,0,0)"
        disableShadow={true}
        showChildInTooltip={false}
      >
        <Pressable onPress={onPress} onLongPress={() => openTooltip()}>
          {children}
        </Pressable>
      </Tooltip>
    </View>
  );
};

export default TooltipWrapper;
