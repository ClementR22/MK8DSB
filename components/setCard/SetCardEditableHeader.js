import FlexContainer from "@/primitiveComponents/FlexContainer";
import React from "react";
import SetNameInput from "../textInput/SetNameInput";
import SetCardMoreActionsButton from "./SetCardMoreActionsButton";

const SetCardEditableHeader = ({ setToShowName, setCardIndex, moreActionNamesList, isInLoadSetModal, situation }) => {
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

export default SetCardEditableHeader;
