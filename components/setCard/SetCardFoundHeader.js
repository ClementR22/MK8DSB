import React from "react";
import FlexContainer from "@/primitiveComponents/FlexContainer";
import { useThemeStore } from "@/stores/useThemeStore";
import { StyleSheet, Text } from "react-native";

const SetCardFoundHeader = ({ setToShowName, setToShowPercentage }) => {
  const theme = useThemeStore((state) => state.theme);

  const styles = StyleSheet.create({
    text: {
      color: theme.on_surface,
      fontSize: 18,
      fontWeight: "bold",
    },
  });

  return (
    <FlexContainer flexDirection="row" minHeight={40} paddingHorizontal={10} justifyContent="space-between">
      <Text style={styles.text}>{setToShowName}</Text>
      {setToShowPercentage && <Text style={styles.text}>{`${setToShowPercentage}`}</Text>}
    </FlexContainer>
  );
};

export default SetCardFoundHeader;
