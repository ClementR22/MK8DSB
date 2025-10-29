import React from "react";
import BoxContainer from "../../primitiveComponents/BoxContainer";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { useActionIconPropsList } from "@/hooks/useActionIconPropsList";
import { ActionNamesList } from "@/hooks/useBuildCardConfig";
import { ScreenName } from "@/contexts/ScreenContext";

interface BuildCardActionButtonsProps {
  actionNamesList: ActionNamesList;
  id: string;
  screenName: ScreenName;
  isInLoadModal: boolean;
  isSaved: boolean;
}

const BuildCardActionButtons: React.FC<BuildCardActionButtonsProps> = ({
  actionNamesList,
  id,
  screenName,
  isInLoadModal,
  isSaved,
}) => {
  const actionIconPropsList = useActionIconPropsList(actionNamesList, screenName, isInLoadModal, id, isSaved);

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
