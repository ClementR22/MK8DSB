import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// Components import
import StatSlider from "@/components/statSlider/StatSlider";
import { translate } from "@/translations/translations";
import SetCardContainer from "@/components/setCard/SetCardContainer";
import SearchSetScreenPressablesContainer from "@/components/screenPressablesContainer/SearchSetScreenPressablesContainer";
import ButtonLoadSet from "@/components/managingSetsPressable/ButtonLoadSet";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { StatsVisibleListProvider } from "@/contexts/StatsVisibleListContext";
import BoxContainer from "@/primitiveComponents/BoxContainer";
import FlexContainer from "@/primitiveComponents/FlexContainer";
import RenameSetModal from "@/components/modal/RenameSetModal";
import useSetsStore from "@/stores/useSetsStore";
import { useThemeStore } from "@/stores/useThemeStore";
import useGeneralStore from "@/stores/useGeneralStore";
import CompactSlider from "@/components/statSlider/CompactSlider";
import { compactStatNames } from "@/data/data";
import ButtonIcon from "@/primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

const SearchSetScreen = () => {
  const theme = useThemeStore((state) => state.theme);
  const [setsToShow, setSetsToShow] = useState([]);
  const isScrollEnable = useGeneralStore((state) => state.isScrollEnable);
  const chosenStats = useSetsStore((state) => state.chosenStats);

  const [isReduceStatSliders, setIsReduceStatSliders] = useState(false);
  const toggleReduceStatSlider = () => setIsReduceStatSliders(!isReduceStatSliders);

  return (
    <ScreenProvider screenName="search">
      <StatsVisibleListProvider>
        <ScrollView scrollEnabled={isScrollEnable}>
          <FlexContainer>
            <BoxContainer contentBackgroundColor={theme.surface_container_high} borderRadius={27}>
              <View style={{ flexDirection: "row", width: "100%", alignItems: "center", padding: 3 }}>
                <ButtonIcon
                  onPress={toggleReduceStatSlider}
                  iconName={isReduceStatSliders ? "chevron-down" : "chevron-up"}
                  iconType={IconType.MaterialCommunityIcons}
                  tooltipText={isReduceStatSliders ? "DevelopSliders" : "ReduceSliders"}
                />

                <View style={{ flex: 1 }}>
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

              {/* Afficher le slider uniquement si la case est cochée */}
              {isReduceStatSliders
                ? chosenStats.map(
                    (stat, index) =>
                      stat.checked && (
                        <CompactSlider
                          key={`compactSlider-${compactStatNames[index]}-${index}`}
                          name={compactStatNames[index]}
                          value={stat.value} // tu peux remplacer 4 par stat.value si besoin
                          statFilterNumber={stat.statFilterNumber}
                        />
                      )
                  )
                : chosenStats.map(
                    (stat) =>
                      stat.checked && (
                        <StatSlider
                          key={`statSlider-${stat.name}`}
                          name={stat.name}
                          value={stat.value}
                          statFilterNumber={stat.statFilterNumber}
                        />
                      )
                  )}
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
