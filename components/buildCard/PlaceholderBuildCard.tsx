import React from "react";
import useThemeStore from "@/stores/useThemeStore";
import Text from "@/primitiveComponents/Text";
import Icon, { IconType } from "react-native-dynamic-vector-icons";
import { Pressable } from "react-native";
import { useScreen } from "@/contexts/ScreenContext";
import { useBuildController } from "@/hooks/useBuildController";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import Button from "@/primitiveComponents/Button";

interface PlaceholderBuildCardProps {}

const PlaceholderBuildCard: React.FC<PlaceholderBuildCardProps> = () => {
  const buildController = useBuildController();
  console.log("ok");
  return (
    <BoxContainer height={200}>
      <Button
        tooltipText="addASet"
        onPress={buildController.addRandomBuildInDisplay}
        iconProps={{ name: "plus", type: IconType.MaterialCommunityIcons }}
      >
        addASet
      </Button>
    </BoxContainer>
  );
};

export default React.memo(PlaceholderBuildCard);
