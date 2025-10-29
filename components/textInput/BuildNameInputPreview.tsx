import React, { useCallback, useState } from "react";
import BuildNameInputContent from "./BuildNameInputContent";

interface BuildNameInputPreviewProps {
  name: string;
}

const BuildNameInputPreview: React.FC<BuildNameInputPreviewProps> = ({ name }) => {
  const [localName, setLocalName] = useState(name);

  const handleEndEditing = useCallback(() => {}, []);

  return <BuildNameInputContent value={localName} onChangeText={setLocalName} onEndEditing={handleEndEditing} />;
};

BuildNameInputPreview.displayName = "BuildNameInputPreview";

export default React.memo(BuildNameInputPreview);
