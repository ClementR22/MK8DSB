import { translate } from "@/translations/translations";
import React from "react";
import { Linking } from "react-native";
import Button from "@/primitiveComponents/Button";

const ButtonSendFeedback = () => {
  const handleContactPress = () => {
    const url = "https://forms.gle/YZvjYiu2pT9Futvd9";
    Linking.openURL(url);
  };

  return <Button onPress={handleContactPress}>{translate("SendFeedback")}</Button>;
};

export default ButtonSendFeedback;
