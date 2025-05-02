import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { translate } from "../i18n/translations";

const TooltipWrapper = ({
  tooltipText,
  style,
  onPress,
  placement = "top",
  children,
}) => {
  const [toolTipVisible, setToolTipVisible] = useState(false);

  return (
    <View style={style ? style : {}}>
      <Tooltip
        isVisible={toolTipVisible}
        content={
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text numberOfLines={1}>{translate(tooltipText)}</Text>
            </View>
          </View>
        }
        placement={placement}
        onClose={() => setToolTipVisible(false)}
        backgroundColor="rgba(0,0,0,0)"
        disableShadow={true}
        showChildInTooltip={false}
      >
        <Pressable
          onPress={onPress}
          onLongPress={() => {
            setToolTipVisible(true);
          }}
        >
          {children}
        </Pressable>
      </Tooltip>
    </View>
  );
};

export default TooltipWrapper;
