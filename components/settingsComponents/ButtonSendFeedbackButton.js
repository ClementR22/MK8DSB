import { translate } from "@/translations/translations";
import React, { useCallback } from "react";
import { Linking } from "react-native";
import Button from "@/primitiveComponents/Button";

const url = "https://forms.gle/YZvjYiu2pT9Futvd9";

const ButtonSendFeedback = React.memo(() => {
  const handleContactPress = useCallback(() => {
    Linking.openURL(url);
  }, []);
  return <Button onPress={handleContactPress}>{translate("SendFeedback")}</Button>;
});

export default ButtonSendFeedback;
