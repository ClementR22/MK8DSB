import React from "react";
import BoxContainer from "../../primitiveComponents/BoxContainer";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { useActionIconPropsList } from "@/hooks/useActionIconPropsList";
import { actionNamesList } from "./SetCard";

interface SetCardActionButtonsProps {
  actionNamesList: actionNamesList;
  setCardIndex: number;
  situation: string;
  isSaved: boolean;
  handleEditPress: () => void;
}

const SetCardActionButtons: React.FC<SetCardActionButtonsProps> = ({
  actionNamesList,
  setCardIndex,
  situation,
  isSaved,
  handleEditPress,
}) => {
  const actionIconPropsList = useActionIconPropsList(setCardIndex, situation, handleEditPress, isSaved);

  return (
    <BoxContainer flexDirection="row" key="displaySetActionButtonContainer" margin={0} justifyContent={"space-around"}>
      {actionNamesList.map((actionName) => {
        const actionProps = actionIconPropsList[actionName];

        if (!actionProps) {
          console.warn(`Action "${actionName}" not found in actionIconPropsList`);
          return null;
        }

        const { title, name, type, onPress } = actionProps;
        return <ButtonIcon key={actionName} tooltipText={title} iconName={name} iconType={type} onPress={onPress} />;
      })}
    </BoxContainer>
  );
};

export default React.memo(SetCardActionButtons);
