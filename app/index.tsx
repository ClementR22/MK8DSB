import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";

// Components import
import StatSlider from "@/components/statSlider/StatSlider";
import SetCardsContainer, { SetCardsContainerHandles } from "@/components/setCard/SetCardsContainer";
import SearchSetScreenPressablesContainer from "@/components/screenPressablesContainer/SearchSetScreenPressablesContainer";
import ButtonLoadSet from "@/components/managingSetsButton/ButtonLoadSet";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { ResultStatsProvider } from "@/contexts/ResultStatsContext";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import useGeneralStore from "@/stores/useGeneralStore";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import StatGaugeContainer from "@/components/statGauge/StatGaugeContainer";
import StatGaugeBar from "@/components/statGauge/StatGaugeBar";
import { BORDER_RADIUS_CONTAINER_LOWEST, PADDING_SEARCH_CONTAINER } from "@/utils/designTokens";
import ScrollViewScreen, { ScrollViewScreenHandles } from "@/components/ScrollViewScreen";
import { box_shadow_z1 } from "@/components/styles/shadow";
import Text from "@/primitiveComponents/Text";
import { SetCardsScrollProvider } from "@/contexts/SetCardsScrollContext";
import useStatsStore from "@/stores/useStatsStore";
import useSetsListStore from "@/stores/useSetsListStore";
import { useTranslation } from "react-i18next";

const SearchSetScreen: React.FC = () => {
  const { t } = useTranslation(["common", "text"]);

  const scrollviewSetsCardsRef = useRef<SetCardsContainerHandles>(null);
  const scrollviewMainRef = useRef<ScrollViewScreenHandles>(null);

  const shouldScrollToTop = useGeneralStore((state) => state.shouldScrollToTop);
  const resetScrollToTop = useGeneralStore((state) => state.resetScrollToTop);

  useEffect(() => {
    if (shouldScrollToTop && scrollviewMainRef.current) {
      setTimeout(() => {
        scrollviewMainRef.current.scrollToStart();
      }, 100);
      resetScrollToTop(); // Réinitialiser le flag
    }
  }, [shouldScrollToTop, resetScrollToTop]);

  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);
  const chosenStats = useStatsStore((state) => state.chosenStats);
  const setsListFound = useSetsListStore((state) => state.setsListFound);

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
            name={stat.name}
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
          <Text role="headline" size="large">
            {t("welcome")}
          </Text>
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
                  {t("desiredStats")}
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

          <SetCardsScrollProvider scrollRef={scrollviewSetsCardsRef}>
            <SetCardsContainer ref={scrollviewSetsCardsRef} setsToShow={setsListFound} />
          </SetCardsScrollProvider>
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
