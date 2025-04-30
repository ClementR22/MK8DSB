import React, { useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";

const TooltipWrapper = ({ tooltipText, onPress, children }) => {
  const [visible, setVisible] = useState(false);

  return (
    <Tooltip
      isVisible={visible}
      content={<Text>{tooltipText}</Text>}
      placement="top"
      onClose={() => setVisible(false)}
      backgroundColor="rgba(0, 0, 0, 0)"
      disableShadow={true}
      showChildInTooltip={false}
    >
      <Pressable
        onPress={onPress}
        onLongPress={() => setVisible(true)}
        style={styles.touchable}
      >
        <Text>{children}</Text>
      </Pressable>
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  tooltip: {
    position: "absolute",
    bottom: "100%",
    marginBottom: 8,
    backgroundColor: "#333",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    maxWidth: 200,
    zIndex: 9999, // met un gros zIndex
    elevation: 10, // pour Android
  },
  tooltipText: {
    color: "white",
    fontSize: 12,
  },
});

export default TooltipWrapper;
