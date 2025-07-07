import React, { useCallback, useMemo, useState } from "react";
import ButtonAndModalStatSelectorResultStats from "../statSelector/ButtonAndModalStatSelectorResultStats";
import ButtonImportSet from "../managingSetsButton/ButtonImportSet";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import useSetsStore from "@/stores/useSetsStore";
import SortModeSelector from "../elementsSelector/SortModeSelector";
import { View } from "react-native";

const SavedSetScreenPressablesContainer: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState(0);
  const [isOpenSortView, setIsOpenSortView] = useState(false);
  const toggleOpenFilterView = useCallback(() => setIsOpenSortView((prev) => !prev), []);

  return (
    <BoxContainer alignItems={null}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <ButtonImportSet screenName="save" />
        <ButtonAndModalStatSelectorResultStats />
      </View>
      <View>
        <SortModeSelector setOrderNumber={setOrderNumber} />
      </View>
    </BoxContainer>
  );
};

SavedSetScreenPressablesContainer.displayName = "SavedSetScreenPressablesContainer";

export default React.memo(SavedSetScreenPressablesContainer);
