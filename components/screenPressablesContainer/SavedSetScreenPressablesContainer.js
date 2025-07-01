import React from "react";
import ButtonAndModalStatSelectorResultStats from "../statSelector/ButtonAndModalStatSelectorResultStats";
import ButtonImportSet from "../managingSetsButton/ButtonImportSet";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import useSetsStore from "@/stores/useSetsStore";

const SavedSetScreenPressablesContainer = () => {
  const sortSetsSavedKeys = useSetsStore((state) => state.sortSetsSavedKeys);

  return (
    <BoxContainer flexDirection="row" justifyContent="space-evenly">
      {/* Sort set button */}
      <ButtonIcon
        tooltipText="Sort"
        iconName="sort"
        iconType={IconType.MaterialCommunityIcons}
        onPress={sortSetsSavedKeys}
      />
      <ButtonImportSet screenName="save" />
      <ButtonAndModalStatSelectorResultStats />
    </BoxContainer>
  );
};

export default SavedSetScreenPressablesContainer;
