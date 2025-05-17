import React from "react";
import StatSliderResultSelectorPressable from "../statSliderResult/StatSliderResultSelectorPressable";
import ButtonImportSet from "../managingSetsPressable/ButtonImportSet";
import BoxContainer from "@/components/BoxContainer";
import ButtonIcon from "@/components/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import useSetsStore from "@/stores/useSetsStore";

const SavedSetScreenPressablesContainer = () => {
  const sortSetsSavedKeys = useSetsStore((state) => state.sortSetsSavedKeys);

  return (
    <BoxContainer flexDirection="row" justifyContent="space-evenly">
      {/* Sort set button */}
      <ButtonIcon iconType={IconType.MaterialCommunityIcons} iconName={"sort"} onPress={sortSetsSavedKeys} />
      <ButtonImportSet />
      <StatSliderResultSelectorPressable />
    </BoxContainer>
  );
};

export default SavedSetScreenPressablesContainer;
