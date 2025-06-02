import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

// Components import
import StatSlider from "@/components/StatSlider";
import { translate } from "@/translations/translations";
import SetCardContainer from "@/components/setCard/SetCardContainer";
import SearchSetScreenPressablesContainer from "@/components/screenPressablesContainer/SearchSetScreenPressablesContainer";
import ButtonLoadSet from "@/components/managingSetsPressable/ButtonLoadSet";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { StatsVisibleListProvider } from "@/contexts/StatsVisibleListContext";
import BoxContainer from "@/components/BoxContainer";
import FlexContainer from "@/components/FlexContainer";
import RenameSetModal from "@/components/modal/RenameSetModal";
import useSetsStore from "@/stores/useSetsStore";
import useModalsStore from "@/stores/useModalsStore";
import { useThemeStore } from "@/stores/useThemeStore";

const SearchSetScreen = () => {
  const theme = useThemeStore((state) => state.theme);
  const chosenStats = useSetsStore((state) => state.chosenStats);
  const [setsToShow, setSetsToShow] = useState([]);
  const isTooltipVisible = useModalsStore((state) => state.isTooltipVisible);

  return (
    <ScreenProvider screenName="search">
      <StatsVisibleListProvider>
        <ScrollView scrollEnabled={!isTooltipVisible}>
          <FlexContainer>
            <BoxContainer contentBackgroundColor={theme.surface_container_high}>
              <Text
                style={[
                  styles.text,
                  {
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    marginBottom: 16,
                    color: theme.on_surface,
                  },
                ]}
              >
                {translate("DesiredStats")}
              </Text>

              <ButtonLoadSet tooltipText="LoadStatsOfASet" />

              {/* Afficher le slider uniquement si la case est cochée */}
              {chosenStats.map((stat) => {
                const { name, value, checked, statFilterNumber } = stat;
                return (
                  checked && <StatSlider key={name} name={name} value={value} statFilterNumber={statFilterNumber} />
                );
              })}
            </BoxContainer>

            <SearchSetScreenPressablesContainer setSetsToShow={setSetsToShow} />
          </FlexContainer>
          <SetCardContainer setsToShow={setsToShow} />
          <RenameSetModal />
        </ScrollView>
      </StatsVisibleListProvider>
    </ScreenProvider>
  );
};

export default SearchSetScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
