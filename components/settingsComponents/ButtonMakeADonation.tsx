import React, { useCallback } from "react";
import { Linking } from "react-native";
import Button from "@/primitiveComponents/Button";
import { IconType } from "react-native-dynamic-vector-icons";

const url = "https://www.paypal.com/donate/?hosted_button_id=7YMYSGASUL7A8";

const ButtonMakeADonation = React.memo(() => {
  const handleContactPress = useCallback(() => {
    Linking.openURL(url);
  }, []);
  return (
    <Button
      onPress={handleContactPress}
      tooltipText="makeADonation"
      iconProps={{ name: "hand-heart", type: IconType.MaterialCommunityIcons }}
    >
      makeADonation
    </Button>
  );
});

export default ButtonMakeADonation;
