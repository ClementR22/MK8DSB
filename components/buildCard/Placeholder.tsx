import React from "react";
import useThemeStore from "@/stores/useThemeStore";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import Text from "@/primitiveComponents/Text";
import Icon, { IconType } from "react-native-dynamic-vector-icons";

type PlaceholderText = "searchEmpty" | "searchNotFound" | "chooseStatsToCompare" | "noBuildToCompare" | "savedEmpty";

interface PlaceholderProps {
  text: PlaceholderText;
}

const iconName: Record<PlaceholderText, string> = {
  searchEmpty: "chat-question",
  searchNotFound: "home-flood",
  chooseStatsToCompare: "compare",
  noBuildToCompare: "compare",
  savedEmpty: "heart-multiple",
};

const Placeholder: React.FC<PlaceholderProps> = ({ text }) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <BoxContainer height={200}>
      <Text role="title" size="large" textAlign="center" namespace="placeholder">
        {text}
      </Text>
      <Icon name={iconName[text]} type={IconType.MaterialCommunityIcons} size={72} color={theme.on_surface} />
    </BoxContainer>
  );
};

export default React.memo(Placeholder);
