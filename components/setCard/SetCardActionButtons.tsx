import React from "react";
import BoxContainer from "../../primitiveComponents/BoxContainer";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { useActionIconPropsList } from "@/hooks/useActionIconPropsList";
import { ActionNamesList } from "@/hooks/useSetCardConfig";
import { ScreenName } from "@/contexts/ScreenContext";

interface SetCardActionButtonsProps {
  actionNamesList: ActionNamesList;
  id: string;
  screenName: ScreenName;
  isInLoadModal: boolean;
  isSaved: boolean;
}

const SetCardActionButtons: React.FC<SetCardActionButtonsProps> = ({
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

export default React.memo(SetCardActionButtons);
