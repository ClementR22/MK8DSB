import React, { useCallback } from "react";
import { Linking } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonSettings from "@/primitiveComponents/ButtonSettings";

const url = "https://www.paypal.com/donate/?hosted_button_id=7YMYSGASUL7A8";

const ButtonMakeADonation = React.memo(() => {
  const handleContactPress = useCallback(() => {
    Linking.openURL(url);
  }, []);
  return (
    <ButtonSettings
      title="makeADonation"
      onPress={handleContactPress}
      iconProps={{ name: "hand-heart", type: IconType.MaterialCommunityIcons }}
      tooltipText="makeADonation"
    />
  );
});

export default ButtonMakeADonation;
