import React from "react";
import { IconType } from "react-native-dynamic-vector-icons";
import { useBuildController } from "@/hooks/useBuildController";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import Button from "@/primitiveComponents/Button";

interface PlaceholderBuildCardProps {}

const PlaceholderBuildCard: React.FC<PlaceholderBuildCardProps> = () => {
  const buildController = useBuildController();

  return (
    <BoxContainer height={200}>
      <Button
        tooltipText="addABuild"
        onPress={buildController.addRandomBuildInDisplay}
        iconProps={{ name: "plus", type: IconType.MaterialCommunityIcons }}
      >
        addABuild
      </Button>
    </BoxContainer>
  );
};

export default React.memo(PlaceholderBuildCard);
