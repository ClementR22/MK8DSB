import BoxContainer from "@/primitiveComponents/BoxContainer";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import React, { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import SortModeSelector from "../sortModeSelector/SortModeSelector";
import { IconType } from "react-native-dynamic-vector-icons";
import useSetsStore from "@/stores/useSetsStore";
import { useScreen } from "@/contexts/ScreenContext";
import { BORDER_RADIUS_CONTAINER_LOWEST } from "@/utils/designTokens";
import Separator from "../Separator";
import { box_shadow_z1 } from "../styles/theme";

interface ScreenPressablesContainerProps {
  sortNumber: number;
  setSortNumber: React.Dispatch<React.SetStateAction<number>>;
  children?: ReactNode;
}

const ScreenPressablesContainer: React.FC<ScreenPressablesContainerProps> = ({
  sortNumber,
  setSortNumber,
  children,
}) => {
  const screenName = useScreen();
  const isInGalleryScreen = screenName === "gallery";

  const [isOpenSortView, setIsOpenSortView] = useState(false);
  const toggleOpenSortView = useCallback(() => setIsOpenSortView((prev) => !prev), []);

  const sortSetsList = useSetsStore((state) => state.sortSetsList);
  useEffect(() => {
    if (!isInGalleryScreen) {
      sortSetsList(screenName, sortNumber);
    }
  }, [sortNumber]);

  return (
    <BoxContainer
      alignItems={null}
      borderRadius={BORDER_RADIUS_CONTAINER_LOWEST}
      paddingHorizontal={0}
      boxShadow={box_shadow_z1}
    >
      {children && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingHorizontal: isInGalleryScreen ? 10 : 0,
          }}
        >
          {children}

          {!isInGalleryScreen && (
            <ButtonIcon
              onPress={toggleOpenSortView}
              iconName="sort"
              iconType={IconType.MaterialCommunityIcons}
              tooltipText="SortSets"
            />
          )}
        </View>
      )}
      {(isOpenSortView || isInGalleryScreen) && (
        <>
          {children && <Separator direction="horizontal" />}
          <SortModeSelector
            sortNumber={sortNumber}
            setSortNumber={setSortNumber}
            sortCase={isInGalleryScreen ? "element" : "set"}
          />
        </>
      )}
    </BoxContainer>
  );
};

export default ScreenPressablesContainer;
