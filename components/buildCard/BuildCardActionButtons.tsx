import React from "react";
import BoxContainer from "../../primitiveComponents/BoxContainer";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { useActionIconPropsList } from "@/hooks/useActionIconPropsList";
import { ActionNamesList } from "@/hooks/useBuildCardConfig";
import { ScreenName } from "@/contexts/ScreenContext";

interface BuildCardActionButtonsProps {
  actionNamesList: ActionNamesList;
  dataId: string;
  screenName: ScreenName;
  isInLoadBuildModal: boolean;
  isSaved: boolean;
}

const BuildCardActionButtons: React.FC<BuildCardActionButtonsProps> = ({
  actionNamesList,
  dataId,
  screenName,
  isInLoadBuildModal,
  isSaved,
}) => {
  const actionIconPropsList = useActionIconPropsList(actionNamesList, screenName, isInLoadBuildModal, dataId, isSaved);

  return (
    <BoxContainer
      flexDirection="row"
      key="displaySetActionButtonContainer"
      marginHorizontal={0}
      justifyContent={"space-around"}
    >
      {actionIconPropsList.map((actionProps) => {
        const { title, name, type, onPress } = actionProps;
        return <ButtonIcon key={name} tooltipText={title} iconName={name} iconType={type} onPress={onPress} />;
      })}
    </BoxContainer>
  );
};

export default React.memo(BuildCardActionButtons);
