import React from "react";
import useBuildsListStore from "@/stores/useBuildsListStore";
import useGameStore from "@/stores/useGameStore";
import showToast from "@/utils/showToast";
import ButtonAndModalConfirm from "../modal/ButtonAndModalConfirm";
import { IconType } from "react-native-dynamic-vector-icons";

const ButtonDeleteAllBuildsInMemory = () => {
  const game = useGameStore((state) => state.game);

  const deleteAllSavedBuilds = useBuildsListStore((state) => state.deleteAllSavedBuilds);

  const handleDeleteAllSavedBuilds = () => {
    deleteAllSavedBuilds(game);
    showToast("toast:allSavedBuildsHaveBeenDeleted", "success");
  };

  return (
    <ButtonAndModalConfirm
      title="deleteAllBuildsInMemory"
      iconProps={{ name: "trash-can", type: IconType.MaterialCommunityIcons }}
      tooltipText="deleteAllBuildsInMemory"
      text="deleteAllBuildsInMemoryText"
      isWarning={true}
      onPress={handleDeleteAllSavedBuilds}
    />
  );
};

export default React.memo(ButtonDeleteAllBuildsInMemory);
