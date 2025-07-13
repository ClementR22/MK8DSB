import React from "react"
import { useThemeStore } from "@/stores/useThemeStore";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import Text from "@/primitiveComponents/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { translate } from "@/translations/translations";

interface PlaceholderProps {
  type: "SearchEmpty" | "SearchNotFound" | "SavedEmpty";
}

const iconName = {
  SearchEmpty: "chat-question",
  SearchNotFound: "home-flood",
  SavedEmpty: "heart-multiple",
}

export function Placeholder({ type }: PlaceholderProps) {
  const theme = useThemeStore((state) => state.theme);

  return (
    <BoxContainer>
      <Text style={{ fontSize: 25, fontWeight: 500, textAlign: "center" }}>{translate(type)}</Text>
      <MaterialCommunityIcons
        // @ts-ignore
        name={iconName[type]}
        size={72}
        color={theme.on_surface}
      />
    </BoxContainer>
  )
}