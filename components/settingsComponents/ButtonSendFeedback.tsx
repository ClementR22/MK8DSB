import React, { useCallback } from "react";
import { Linking } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonSettings from "@/primitiveComponents/ButtonSettings";

const url = "https://forms.gle/YZvjYiu2pT9Futvd9";

const ButtonSendFeedback = React.memo(() => {
  const handlePress = useCallback(() => {
    Linking.openURL(url);
  }, []);
  return (
    <ButtonSettings
      title="sendFeedback"
      onPress={handlePress}
      iconProps={{ name: "chatbox-ellipses-outline", type: IconType.Ionicons }}
      tooltipText="sendFeedback"
    />
  );
});

export default ButtonSendFeedback;
