import React from "react";
import useThemeStore from "@/stores/useThemeStore";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import Text from "@/primitiveComponents/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface PlaceholderProps {
  type: "searchEmpty" | "searchNotFound" | "savedEmpty";
}

const iconName = {
  searchEmpty: "chat-question",
  searchNotFound: "home-flood",
  savedEmpty: "heart-multiple",
};

function Placeholder({ type }: PlaceholderProps) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <BoxContainer height={200}>
      <Text role="title" size="large" textAlign="center" namespace="placeholder">
        {type}
      </Text>
      <MaterialCommunityIcons
        // @ts-ignore
        name={iconName[type]}
        size={72}
        color={theme.on_surface}
      />
    </BoxContainer>
  );
}

export default React.memo(Placeholder);
