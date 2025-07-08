import React, { useCallback, useMemo, useState } from "react";
import ButtonAndModalStatSelectorResultStats from "../statSelector/ButtonAndModalStatSelectorResultStats";
import ButtonImportSet from "../managingSetsButton/ButtonImportSet";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import SortModeSelector from "../elementsSelector/SortModeSelector";
import { View } from "react-native";

const SavedSetScreenPressablesContainer: React.FC = () => {
  const [sortNumber, setSortNumber] = useState(0);
  const [isOpenSortView, setIsOpenSortView] = useState(false);
  const toggleOpenSortView = useCallback(() => setIsOpenSortView((prev) => !prev), []);

  return (
    <BoxContainer alignItems={null}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <ButtonImportSet screenName="save" />
        <ButtonIcon
          onPress={toggleOpenSortView}
          iconName="sort"
          iconType={IconType.MaterialCommunityIcons}
          tooltipText="SortElements"
        />
        <ButtonAndModalStatSelectorResultStats />
      </View>
      {isOpenSortView && (
        <View>
          <SortModeSelector defaultSortNumber={sortNumber} setSortNumber={setSortNumber} />
        </View>
      )}
    </BoxContainer>
  );
};

SavedSetScreenPressablesContainer.displayName = "SavedSetScreenPressablesContainer";

export default React.memo(SavedSetScreenPressablesContainer);
