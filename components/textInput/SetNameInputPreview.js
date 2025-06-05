import React, { useState } from "react";
import SetNameInputContent from "./SetNameInputContent";

const SetNameInputPreview = ({ name }) => {
  const [localName, setLocalName] = useState(name);

  return <SetNameInputContent value={localName} onChangeText={setLocalName} onEndEditing={() => {}} />;
};

export default SetNameInputPreview;
