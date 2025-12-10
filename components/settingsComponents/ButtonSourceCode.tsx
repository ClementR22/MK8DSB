import React, { useCallback } from "react";
import { Linking } from "react-native";
import { IconType } from "react-native-dynamic-vector-icons";
import ButtonSettings from "@/primitiveComponents/ButtonSettings";

const url = "https://github.com/ClementR22/MK8DSB";

const ButtonSourceCode = React.memo(() => {
  const handlePress = useCallback(() => {
    Linking.openURL(url);
  }, []);
  return (
    <ButtonSettings
      title="sourceCode"
      onPress={handlePress}
      iconProps={{ name: "github", type: IconType.AntDesign }}
      tooltipText="sourceCode"
    />
  );
});

export default ButtonSourceCode;
