import { translate } from "@/translations/translations";
import React from "react";
import { Linking, Pressable, Text, View } from "react-native";

const ContactUsButton = () => {
  const handleContactPress = () => {
    const url = "https://forms.gle/YZvjYiu2pT9Futvd9";
    Linking.openURL(url);
  };

  return (
    <View>
      <Pressable onPress={() => handleContactPress()}>
        <Text>{translate("ContactUs")}</Text>
      </Pressable>
    </View>
  );
};

export default ContactUsButton;
