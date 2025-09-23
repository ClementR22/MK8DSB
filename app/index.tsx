import React, { useCallback, useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

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
import { useThemeStore } from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import { statNamesCompact } from "@/data/stats/statsData";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import TabBarHeightUpdater from "@/components/TabBarHeightUpdater";
import StatGaugeContainer from "@/components/statGauge/StatGaugeContainer";
import StatGaugeBar from "@/components/statGauge/StatGaugeBar";
import { BORDER_RADIUS_BIG, PADDING_SEARCH_CONTAINER } from "@/utils/designTokens";
import ScrollViewScreen from "@/components/ScrollViewScreen";

const SearchSetScreen: React.FC = () => {
  const theme = useThemeStore((state) => state.theme);
  const scrollRef = useRef<SetCardsContainerHandles>(null);
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
  }, [chosenStats, isReduceStatSliders]);

  const headerTextStyle = useMemo(() => [styles.text, { color: theme.on_surface }], [theme.on_surface]);

  return (
    <ScreenProvider screenName="search">
      <ResultStatsProvider>
        <ScrollViewScreen scrollEnabled={isScrollEnable}>
          <BoxContainer borderRadius={BORDER_RADIUS_BIG} padding={PADDING_SEARCH_CONTAINER}>
            <View style={styles.searchContainer}>
              <ButtonIcon
                onPress={toggleReduceStatSliders}
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

          <SetCardsContainer ref={scrollRef} setsToShow={setsListFound} />
        </ScrollViewScreen>
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
