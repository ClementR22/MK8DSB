import React from "react";
import BoxContainer from "../../primitiveComponents/BoxContainer";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { useActionIconPropsList } from "@/hooks/useActionIconPropsList";
import { actionNamesList } from "./SetCard";
import { ScreenName } from "@/contexts/ScreenContext";

interface SetCardActionButtonsProps {
  actionNamesList: actionNamesList;
  setCardIndex: number;
  situation: ScreenName | "load";
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
  const actionIconPropsList = useActionIconPropsList(
    actionNamesList,
    setCardIndex,
    situation,
    handleEditPress,
    isSaved
  );

  return (
    <BoxContainer flexDirection="row" key="displaySetActionButtonContainer" margin={0} justifyContent={"space-around"}>
      {actionIconPropsList.map((actionProps) => {
        const { title, name, type, onPress } = actionProps;
        return <ButtonIcon key={name} tooltipText={title} iconName={name} iconType={type} onPress={onPress} />;
      })}
    </BoxContainer>
  );
};

export default React.memo(SetCardActionButtons);
