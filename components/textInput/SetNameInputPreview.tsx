import React, { useCallback, useState } from "react";
import SetNameInputContent from "./SetNameInputContent";

interface SetNameInputPreviewProps {
  name: string;
}

const SetNameInputPreview: React.FC<SetNameInputPreviewProps> = ({ name }) => {
  const [localName, setLocalName] = useState(name);

  const handleEndEditing = useCallback(() => {}, []);

  return <SetNameInputContent value={localName} onChangeText={setLocalName} onEndEditing={handleEndEditing} />;
};

SetNameInputPreview.displayName = "SetNameInputPreview";

export default React.memo(SetNameInputPreview);
