import React, { useCallback } from "react";
import { Linking } from "react-native";
import Button from "@/primitiveComponents/Button";
import { IconType } from "react-native-dynamic-vector-icons";

const url = "https://github.com/ClementR22/MK8DSB";

const ButtonSourceCode = React.memo(() => {
  const handlePress = useCallback(() => {
    Linking.openURL(url);
  }, []);
  return (
    <Button onPress={handlePress} tooltipText="sourceCode" iconProps={{ name: "github", type: IconType.AntDesign }}>
      sourceCode
    </Button>
  );
});

export default ButtonSourceCode;
