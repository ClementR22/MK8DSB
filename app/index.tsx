import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

// Components import
import StatSlider from "@/components/statSlider/StatSlider";
import BuildCardsContainer, { BuildCardsContainerHandles } from "@/components/buildCard/BuildCardsContainer";
import SearchBuildScreenPressablesContainer from "@/components/screenPressablesContainer/SearchBuildScreenPressablesContainer";
import ButtonLoadBuild from "@/components/managingBuildsButton/ButtonLoadBuild";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import useGeneralStore from "@/stores/useGeneralStore";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import { BORDER_RADIUS_CONTAINER_LOWEST, PADDING_SEARCH_CONTAINER, GAP_STAT_GAUGE_GROUP } from "@/utils/designTokens";
import ScrollViewScreen, { ScrollViewScreenHandles } from "@/components/ScrollViewScreen";
import { box_shadow_z1 } from "@/components/styles/shadow";
import Text from "@/primitiveComponents/Text";
import { BuildCardsScrollProvider } from "@/contexts/BuildCardsScrollContext";
import useStatsStore from "@/stores/useStatsStore";
import useBuildsListStore from "@/stores/useBuildsListStore";
import StatGaugeContainer from "@/components/statGauge/StatGaugeContainer";
import StatGaugeBar from "@/components/statGauge/StatGaugeBar";

const SearchBuildScreen: React.FC = () => {
  const scrollviewBuildsCardsRef = useRef<BuildCardsContainerHandles>(null);
  const scrollviewMainRef = useRef<ScrollViewScreenHandles>(null);

  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);
  const chosenStats = useStatsStore((state) => state.chosenStats);
  const buildsListFound = useBuildsListStore((state) => state.buildsListFound);

  const [isSliderCompact, setIsSliderCompact] = useState(false);
  const toggleSliderCompact = useCallback(() => {
    setIsSliderCompact((prev) => !prev);
  }, []);

  const renderedSliders = useMemo(() => {
    return chosenStats.map((stat) => {
      if (!stat.checked) return null;

      if (isSliderCompact) {
        return (
          <StatGaugeContainer key={`statSlider-${stat.name}-compact`} name={stat.name} value={stat.value}>
            <StatGaugeBar value={stat.value} />
          </StatGaugeContainer>
        );
      } else
        return (
          <StatSlider
            key={`statSlider-${stat.name}-full`}
            name={stat.name}
            value={stat.value}
            statFilterNumber={stat.statFilterNumber}
          />
        );
    });
  }, [chosenStats, isSliderCompact]);

  return (
    <ScreenProvider screenName="search">
      <ResultStatsProvider>
        <ScrollViewScreen scrollEnabled={isScrollEnable} ref={scrollviewMainRef}>
          <BoxContainer
            borderRadius={BORDER_RADIUS_CONTAINER_LOWEST}
            padding={PADDING_SEARCH_CONTAINER}
            boxShadow={box_shadow_z1}
            gap={isSliderCompact ? GAP_STAT_GAUGE_GROUP : undefined}
          >
            <View style={styles.searchContainerPressablesContainer}>
              <ButtonIcon
                onPress={toggleSliderCompact}
                iconName={isSliderCompact ? "chevron-down" : "chevron-up"}
                iconType={IconType.MaterialCommunityIcons}
                tooltipText={isSliderCompact ? "DevelopSliders" : "ReduceSliders"}
              />

              <View style={styles.headerTextContainer}>
                <Text role="headline" size="medium" namespace="text">
                  desiredStats
                </Text>
              </View>

              <ButtonLoadBuild tooltipText="loadStatsOfASet" />
            </View>

            {/* Afficher les sliders memoisés */}
            {renderedSliders}
          </BoxContainer>
          <SearchBuildScreenPressablesContainer
            scrollviewBuildsCardsRef={scrollviewBuildsCardsRef}
            scrollviewMainRef={scrollviewMainRef}
          />

          <BuildCardsScrollProvider scrollRef={scrollviewBuildsCardsRef}>
            <BuildCardsContainer ref={scrollviewBuildsCardsRef} builds={buildsListFound} />
          </BuildCardsScrollProvider>
        </ScrollViewScreen>
      </ResultStatsProvider>
    </ScreenProvider>
  );
};

SearchBuildScreen.displayName = "SearchBuildScreen";

export default React.memo(SearchBuildScreen);

const styles = StyleSheet.create({
  searchContainerPressablesContainer: { flexDirection: "row", width: "100%", alignItems: "center", padding: 3 },
  headerTextContainer: { flex: 1, alignItems: "center" },
});
