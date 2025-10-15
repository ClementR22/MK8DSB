import BoxContainer from "@/primitiveComponents/BoxContainer";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import React, { memo, ReactNode, useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import SortModeSelector from "../sortModeSelector/SortModeSelector";
import { IconType } from "react-native-dynamic-vector-icons";
import { useScreen } from "@/contexts/ScreenContext";
import { BORDER_RADIUS_CONTAINER_LOWEST, BUTTON_SIZE, PADDING_BOX_CONTAINER } from "@/utils/designTokens";
import Separator from "../Separator";
import { box_shadow_z1 } from "../styles/shadow";
import useSetsListStore from "@/stores/useSetsListStore";

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

  const sortSetsList = useSetsListStore((state) => state.sortSetsList);
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
      gap={0}
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
          {children && <Separator direction="horizontal" wrapperStyle={styles.separatorWrapper} />}
          <View
            style={{
              height: BUTTON_SIZE + PADDING_BOX_CONTAINER,
              justifyContent: "flex-end",
            }}
          >
            <SortModeSelector
              sortNumber={sortNumber}
              setSortNumber={setSortNumber}
              sortCase={isInGalleryScreen ? "element" : "set"}
              containerStyle={styles.sortModeSelectorWrapper}
            />
          </View>
        </>
      )}
    </BoxContainer>
  );
};

const styles = StyleSheet.create({
  separatorWrapper: { marginTop: PADDING_BOX_CONTAINER },
  sortModeSelectorWrapper: { alignItems: "flex-end", flexDirection: "row" },
});

export default memo(ScreenPressablesContainer);
