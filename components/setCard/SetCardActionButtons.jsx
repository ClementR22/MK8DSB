import React from "react";
import BoxContainer from "../../primitiveComponents/BoxContainer";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { getActionIconPropsList } from "@/utils/getActionIconPropsList";

const SetCardActionButtons = React.memo(({ actionNamesList, setCardIndex, situation, handleEditPress }) => {
  const actionIconPropsList = getActionIconPropsList(setCardIndex, situation, handleEditPress);

  return (
    <BoxContainer flexDirection="row" key="displaySetActionButtonContainer" margin={0} justifyContent={"space-around"}>
      {actionNamesList.map((actionName) => {
        const { title, name, type, onPress } = actionIconPropsList[actionName];
        return <ButtonIcon key={actionName} tooltipText={title} iconName={name} iconType={type} onPress={onPress} />;
      })}
    </BoxContainer>
  );
});

export default SetCardActionButtons;
