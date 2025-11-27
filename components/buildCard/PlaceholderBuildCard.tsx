import React from "react";
import { IconType } from "react-native-dynamic-vector-icons";
import { useBuildController } from "@/hooks/useBuildController";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import Button from "@/primitiveComponents/Button";
import useThemeStore from "@/stores/useThemeStore";

interface PlaceholderBuildCardProps {}

const PlaceholderBuildCard: React.FC<PlaceholderBuildCardProps> = () => {
  const buildController = useBuildController();
  
  const theme = useThemeStore((state) => state.theme);

  return (
    <BoxContainer height={336} boxShadow={"0 0 0 3px " + theme.outline_variant } marginTop={4} marginHorizontal={80} backgroundColor={theme.surface}>
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
