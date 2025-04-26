import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import Popover, {
  PopoverMode,
  PopoverPlacement,
} from "react-native-popover-view";

import { Portal } from "react-native-paper";

const MyPopover = ({ children, popoverText }) => {
  const [showPopover, setShowPopover] = useState(false);

  const touchableRef = useRef();

  const openPopover = () => {
    if (!showPopover) {
      setShowPopover(true);
      setTimeout(() => setShowPopover(false), 2000);
    }
  };

  return (
    <Portal.Host>
      <Pressable ref={touchableRef} onLongPress={() => openPopover()}>
        {children}
      </Pressable>
      <Portal>
        <Popover
          isVisible={showPopover}
          from={touchableRef}
          mode="tooltip"
          //placement="top"
          popoverShift={{ x: -1, y: -1 }}
          popoverStyle={{ zIndex: 20 }}
        >
          <Text style={{ backgroundColor: "red", zIndex: 10 }}>
            {popoverText}
          </Text>
        </Popover>
      </Portal>
    </Portal.Host>
  );
};

export default MyPopover;
