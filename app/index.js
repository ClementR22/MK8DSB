import React, { useCallback, useMemo, useState } from "react";
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
import ModalRenameSet from "@/components/modal/ModalRenameSet";
import useSetsStore from "@/stores/useSetsStore";
import { useThemeStore } from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import StatSliderCompact from "@/components/statSlider/StatSliderCompact";
import { compactStatNames } from "@/data/data";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

const SearchSetScreen = () => {
  const theme = useThemeStore((state) => state.theme);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);
  const chosenStats = useSetsStore((state) => state.chosenStats);

  const [setsToShow, setSetsToShow] = useState([]);
  const [isReduceStatSliders, setIsReduceStatSliders] = useState(false);
  const toggleReduceStatSlider = useCallback(() => {
    setIsReduceStatSliders((prev) => !prev);
  }, []);

  const renderedSliders = useMemo(() => {
    const SliderComponent = isReduceStatSliders ? StatSliderCompact : StatSlider;

    return chosenStats.map((stat) => {
      if (!stat.checked) {
        return null; // Ne rend rien si la stat n'est pas cochée
      }

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
                  <Text
                    style={[
                      styles.text,
                      {
                        alignSelf: "center",
                        color: theme.on_surface,
                      },
                    ]}
                  >
                    {translate("DesiredStats")}
                  </Text>
                </View>

                <ButtonLoadSet tooltipText="LoadStatsOfASet" />
              </View>

              {/* Afficher les sliders memoisés */}
              {renderedSliders}
            </BoxContainer>

            <SearchSetScreenPressablesContainer setSetsToShow={setSetsToShow} />
          </FlexContainer>

          <SetCardContainer setsToShow={setsToShow} />

          <ModalRenameSet />
        </ScrollView>
      </ResultStatsProvider>
    </ScreenProvider>
  );
};

export default React.memo(SearchSetScreen);

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchContainer: { flexDirection: "row", width: "100%", alignItems: "center", padding: 3 },
  headerTextContainer: { flex: 1 },
});
