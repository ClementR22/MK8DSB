import React from "react";
import FlexContainer from "@/primitiveComponents/FlexContainer";
import SetNameInput from "../textInput/SetNameInput";
import SetCardMoreActionsButton from "./SetCardMoreActionsButton";
import { actionNamesList } from "./SetCard";

interface SetCardEditableHeaderProps {
  setToShowName: string;
  setCardIndex: number;
  moreActionNamesList: actionNamesList;
  isInLoadSetModal: boolean;
  situation: string;
}

const SetCardEditableHeader: React.FC<SetCardEditableHeaderProps> = ({
  setToShowName,
  setCardIndex,
  moreActionNamesList,
  isInLoadSetModal,
  situation,
}) => {
  return (
    <FlexContainer flexDirection={"row"}>
      <SetNameInput setToShowName={setToShowName} setCardIndex={setCardIndex} editable={!isInLoadSetModal} />

      <SetCardMoreActionsButton
        moreActionNamesList={moreActionNamesList}
        setCardIndex={setCardIndex}
        situation={situation}
      />
    </FlexContainer>
  );
};

export default React.memo(SetCardEditableHeader);
