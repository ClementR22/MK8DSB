import React from "react";
import FlexContainer from "@/primitiveComponents/FlexContainer";
import { useThemeStore } from "@/stores/useThemeStore";
import { StyleSheet, Text, TextStyle } from "react-native";

interface SetCardStaticHeaderProps {
  setToShowName: string;
  setToShowPercentage?: number;
}

const SetCardStaticHeader: React.FC<SetCardStaticHeaderProps> = ({
  setToShowName,
  setToShowPercentage = undefined,
}) => {
  const theme = useThemeStore((state) => state.theme);

  const dynamicTextColorStyle = React.useMemo(() => {
    return {
      color: theme.on_surface,
    };
  }, [theme.on_surface]);

  return (
    <FlexContainer flexDirection="row" minHeight={40} paddingHorizontal={10} justifyContent="space-between">
      <Text style={[styles.text, dynamicTextColorStyle]}>{setToShowName}</Text>
      {setToShowPercentage ? (
        <Text style={[styles.text, dynamicTextColorStyle]}>{`${setToShowPercentage}%`}</Text>
      ) : null}
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default React.memo(SetCardStaticHeader);
