import BoxContainer from "@/primitiveComponents/BoxContainer";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import SortModeSelector from "../sortModeSelector/SortModeSelector";
import { IconType } from "react-native-dynamic-vector-icons";
import useSetsStore from "@/stores/useSetsStore";
import { useScreen } from "@/contexts/ScreenContext";
import { useThemeStore } from "@/stores/useThemeStore";

interface ScreenPressablesContainerProps {
  sortNumber: number;
  setSortNumber: React.Dispatch<React.SetStateAction<number>>;
  children: ReactNode;
}

const ScreenPressablesContainer: React.FC<ScreenPressablesContainerProps> = ({
  sortNumber,
  setSortNumber,
  children,
}) => {
  const theme = useThemeStore((state) => state.theme);
  const screenName = useScreen();

  const [isOpenSortView, setIsOpenSortView] = useState(false);
  const toggleOpenSortView = useCallback(() => setIsOpenSortView((prev) => !prev), []);

  const sortSetsList = useSetsStore((state) => state.sortSetsList);
  useEffect(() => sortSetsList(screenName, sortNumber), [sortNumber]);

  const separatorDynamicStyle = useMemo(() => ({ backgroundColor: theme.outline_variant }), [theme.outline_variant]);

  return (
    <BoxContainer alignItems={null} gap={0}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        {children}
        <ButtonIcon
          onPress={toggleOpenSortView}
          iconName="sort"
          iconType={IconType.MaterialCommunityIcons}
          tooltipText="SortElements"
        />
      </View>
      {isOpenSortView && (
        <>
          <View style={[styles.separator, separatorDynamicStyle]} />

          <SortModeSelector sortNumber={sortNumber} setSortNumber={setSortNumber} sortCase="set" />
        </>
      )}
    </BoxContainer>
  );
};

const styles = StyleSheet.create({
  separator: { height: 2, width: "90%", backgroundColor: "black", alignSelf: "center", marginVertical: 10 },
});

export default ScreenPressablesContainer;
