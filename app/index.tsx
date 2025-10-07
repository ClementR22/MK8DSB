import React, { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

// Components import
import StatSlider from "@/components/statSlider/StatSlider";
import { translate } from "@/translations/translations";
import SetCardsContainer, { SetCardsContainerHandles } from "@/components/setCard/SetCardsContainer";
import SearchSetScreenPressablesContainer from "@/components/screenPressablesContainer/SearchSetScreenPressablesContainer";
import ButtonLoadSet from "@/components/managingSetsButton/ButtonLoadSet";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import useSetsStore from "@/stores/useSetsStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { statNamesCompact } from "@/data/stats/statsData";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import StatGaugeContainer from "@/components/statGauge/StatGaugeContainer";
import StatGaugeBar from "@/components/statGauge/StatGaugeBar";
import { BORDER_RADIUS_CONTAINER_LOWEST, PADDING_SEARCH_CONTAINER } from "@/utils/designTokens";
import ScrollViewScreen, { ScrollViewScreenHandles } from "@/components/ScrollViewScreen";
import { box_shadow_z1 } from "@/components/styles/shadow";
import Text from "@/primitiveComponents/Text";

const SearchSetScreen: React.FC = () => {
  const scrollviewSetsCardsRef = useRef<SetCardsContainerHandles>(null);
  const scrollviewMainRef = useRef<ScrollViewScreenHandles>(null);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);
  const chosenStats = useSetsStore((state) => state.chosenStats);
  const setsListFound = useSetsStore((state) => state.setsListFound);

  const [isReduceStatSliders, setIsReduceStatSliders] = useState(false);
  const toggleReduceStatSliders = useCallback(() => {
    setIsReduceStatSliders((prev) => !prev);
  }, []);

  const renderedSliders = useMemo(() => {
    return chosenStats.map((stat) => {
      if (!stat.checked) return null;

      if (isReduceStatSliders) {
        return (
          <StatGaugeContainer
            key={`statSlider-${stat.name}-compact`}
            name={statNamesCompact[stat.name]}
            value={stat.value}
            statFilterNumber={stat.statFilterNumber}
          >
            <StatGaugeBar value={stat.value} contextId="stat-gauge-compact" />
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
  }, [chosenStats, isReduceStatSliders]);

  return (
    <ScreenProvider screenName="search">
      <ResultStatsProvider>
        <ScrollViewScreen scrollEnabled={isScrollEnable} ref={scrollviewMainRef}>
          <BoxContainer
            borderRadius={BORDER_RADIUS_CONTAINER_LOWEST}
            padding={PADDING_SEARCH_CONTAINER}
            boxShadow={box_shadow_z1}
          >
            <View style={styles.searchContainerPressablesContainer}>
              <ButtonIcon
                onPress={toggleReduceStatSliders}
                iconName={isReduceStatSliders ? "chevron-down" : "chevron-up"}
                iconType={IconType.MaterialCommunityIcons}
                tooltipText={isReduceStatSliders ? "DevelopSliders" : "ReduceSliders"}
              />

              <View style={styles.headerTextContainer}>
                <Text role="headline" size="medium">
                  {translate("DesiredStats")}
                </Text>
              </View>

              <ButtonLoadSet tooltipText="LoadStatsOfASet" />
            </View>

            {/* Afficher les sliders memoisés */}
            {renderedSliders}
          </BoxContainer>
          <SearchSetScreenPressablesContainer
            scrollviewSetsCardsRef={scrollviewSetsCardsRef}
            scrollviewMainRef={scrollviewMainRef}
          />

          <SetCardsContainer ref={scrollviewSetsCardsRef} setsToShow={setsListFound} />
        </ScrollViewScreen>
      </ResultStatsProvider>
    </ScreenProvider>
  );
};

SearchSetScreen.displayName = "SearchSetScreen";

export default React.memo(SearchSetScreen);

const styles = StyleSheet.create({
  searchContainerPressablesContainer: { flexDirection: "row", width: "100%", alignItems: "center", padding: 3 },
  headerTextContainer: { flex: 1, alignItems: "center" },
});
