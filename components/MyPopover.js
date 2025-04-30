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

  const windowDimensions = Dimensions.get("window");

  return (
    <Portal.Host>
      <Pressable
        ref={touchableRef}
        onPress={() => {
          console.log("onPResse");
          openPopover();
        }}
        style={{
          paddingBottom: 80,
          backgroundColor: "green",
        }}
      >
        {children}
      </Pressable>

      <Popover
        isVisible={showPopover}
        from={touchableRef}
        mode="tooltip"
        useReactNativeModal={true}
        placement="right" // 👈 TRÈS important : pour apparaître à droite de l'image
        //placement="top"
        // popoverShift={{ x: -1, y: -1 }}
        popoverStyle={{
          position: "absolute",
          top: 0, // Positionnement relatif à l'image
          left: 0, // Ajuster si nécessaire
          zIndex: 1000, // Toujours au-dessus
        }}
        displayArea={{
          x: 0,
          y: 0,
          width: windowDimensions.width * 2, // DOUBLE largeur écran
          height: windowDimensions.height,
        }}
        //
      >
        <Text
          style={{ backgroundColor: "red", height: 30 }}
          popoverStyle={{ zIndex: 9999 }}
        >
          {popoverText}
        </Text>
      </Popover>
    </Portal.Host>
  );
};

export default MyPopover;
