import React, { useCallback, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// Components import
import StatSlider from "@/components/statSlider/StatSlider";
import { translate } from "@/translations/translations";
import SetCardContainer from "@/components/setCard/SetCardContainer";
import SearchSetScreenPressablesContainer from "@/components/screenPressablesContainer/SearchSetScreenPressablesContainer";
import ButtonLoadSet from "@/components/managingSetsButton/ButtonLoadSet";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import FlexContainer from "@/primitiveComponents/FlexContainer";
import useSetsStore from "@/stores/useSetsStore";
import { useThemeStore } from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import StatSliderCompact from "@/components/statSlider/StatSliderCompact";
import { compactStatNames } from "@/data/stats/statsData";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import TabBarHeightUpdater from "@/components/TabBarHeightUpdater";

const SearchSetScreen: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);
  const scrollRef = useRef<any>(null);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);
  const chosenStats = useSetsStore((state) => state.chosenStats);
  const setsListFound = useSetsStore((state) => state.setsListFound);

  const [isReduceStatSliders, setIsReduceStatSliders] = useState(false);
  const toggleReduceStatSlider = useCallback(() => {
    setIsReduceStatSliders((prev) => !prev);
  }, []);

  const renderedSliders = useMemo(() => {
    const SliderComponent = isReduceStatSliders ? StatSliderCompact : StatSlider;
    return chosenStats.map((stat) => {
      if (!stat.checked) return null;
      const nameProp = isReduceStatSliders ? compactStatNames[stat.name] : stat.name;
      return (
        <SliderComponent
          key={`statSlider-${stat.name}-${isReduceStatSliders ? "compact" : "full"}`}
          name={nameProp}
          value={stat.value}
          statFilterNumber={stat.statFilterNumber}
        />
      );
    });
  }, [chosenStats, isReduceStatSliders]);

  const headerTextStyle = useMemo(() => [styles.text, { color: theme.on_surface }], [theme.on_surface]);

  return (
    <ScreenProvider screenName="search">
      <ResultStatsProvider>
        <ScrollView scrollEnabled={isScrollEnable}>
          <FlexContainer>
            <BoxContainer contentBackgroundColor={theme.surface_container_high} borderRadius={27}>
              <View style={styles.searchContainer}>
                <ButtonIcon
                  onPress={toggleReduceStatSlider}
                  iconName={isReduceStatSliders ? "chevron-down" : "chevron-up"}
                  iconType={IconType.MaterialCommunityIcons}
                  tooltipText={isReduceStatSliders ? "DevelopSliders" : "ReduceSliders"}
                />

                <View style={styles.headerTextContainer}>
                  <Text style={headerTextStyle}>{translate("DesiredStats")}</Text>
                </View>

                <ButtonLoadSet tooltipText="LoadStatsOfASet" />
              </View>

              {/* Afficher les sliders memoisés */}
              {renderedSliders}
            </BoxContainer>

            <SearchSetScreenPressablesContainer scrollRef={scrollRef} />
          </FlexContainer>

          <SetCardContainer ref={scrollRef} setsToShow={setsListFound} />
        </ScrollView>
        <TabBarHeightUpdater />
      </ResultStatsProvider>
    </ScreenProvider>
  );
};

SearchSetScreen.displayName = "SearchSetScreen";

export default React.memo(SearchSetScreen);

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchContainer: { flexDirection: "row", width: "100%", alignItems: "center", padding: 3 },
  headerTextContainer: { flex: 1, alignItems: "center" },
});
