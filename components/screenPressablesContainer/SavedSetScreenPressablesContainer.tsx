import React, { useMemo } from "react";
import ButtonAndModalStatSelectorResultStats from "../statSelector/ButtonAndModalStatSelectorResultStats";
import ButtonImportSet from "../managingSetsButton/ButtonImportSet";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import useSetsStore from "@/stores/useSetsStore";

const SavedSetScreenPressablesContainer: React.FC = () => {
  const sortSetsSavedKeys = useSetsStore((state) => state.sortSetsSavedKeys);

  const handleSort = useMemo(() => sortSetsSavedKeys, [sortSetsSavedKeys]);

  return (
    <BoxContainer flexDirection="row" justifyContent="space-evenly">
      <ButtonIcon
        tooltipText="SortSets"
        iconName="sort"
        iconType={IconType.MaterialCommunityIcons}
        onPress={handleSort}
      />
      <ButtonImportSet screenName="save" />
      <ButtonAndModalStatSelectorResultStats />
    </BoxContainer>
  );
};

SavedSetScreenPressablesContainer.displayName = "SavedSetScreenPressablesContainer";

export default React.memo(SavedSetScreenPressablesContainer);
