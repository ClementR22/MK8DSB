import React, { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

// Components import
import StatSlider from "../../components/StatSlider";
import { vw } from "@/components/styles/theme";
import { useTheme } from "@/contexts/ThemeContext";
import { translate } from "@/translations/translations";
import SetCardContainer from "@/components/setCard/SetCardContainer";
import { LoadSetModalProvider } from "@/contexts/LoadSetModalContext";
import { useSetsList } from "@/contexts/SetsListContext";
import SearchSetScreenPressablesContainer from "@/components/screenPressablesContainer/SearchSetScreenPressablesContainer";
import ButtonLoadSet from "@/components/managingSetsPressable/ButtonLoadSet";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { IsStatsVisibleListProvider } from "@/contexts/IsStatsVisibleListContext";
import { PressableImagesProvider } from "@/contexts/PressableImagesContext";
import BoxContainer from "@/components/BoxContainer";
import FlexContainer from "@/components/FlexContainer";

const SearchSetScreen = () => {
  const { theme } = useTheme();

  const { chosenStats, setChosenStats } = useSetsList();

  const [setsToShow, setSetsToShow] = useState([]);

  // Mettre à jour la valeur du slider
  const updateSliderValue = (name, newValue) => {
    setChosenStats(chosenStats.map((stat) => (stat.name === name ? { ...stat, value: newValue } : stat)));
  };

  return (
    <ScreenProvider screenName="search">
      <LoadSetModalProvider>
        <IsStatsVisibleListProvider>
          <PressableImagesProvider>
            <ScrollView>
              <FlexContainer theme={theme}>
                <BoxContainer
                  theme={theme}
                  contentBackgroundColor={theme.surface_container_high}
                >
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
                    {translate("SearchedStats")}
                  </Text>

                  <ButtonLoadSet tooltip_text="LoadStatsOfASet" />

                  {/* Afficher le slider uniquement si la case est cochée */}
                  {chosenStats.map(
                    (stat) =>
                      stat.checked && (
                        <StatSlider
                          key={stat.name}
                          name={stat.name}
                          sliderValue={stat.value}
                          setSliderValue={(newValue) => updateSliderValue(stat.name, newValue)}
                          statFilterNumber={stat.statFilterNumber}
                          setStatFilterNumber={stat.setStatFilterNumber}
                        />
                      )
                  )}
                </BoxContainer>

                <SearchSetScreenPressablesContainer setSetsToShow={setSetsToShow} />
              </FlexContainer>

              <SetCardContainer setsToShow={setsToShow} />
            </ScrollView>
          </PressableImagesProvider>
        </IsStatsVisibleListProvider>
      </LoadSetModalProvider>
    </ScreenProvider>
  );
};

export default SearchSetScreen;

const styles = StyleSheet.create({
  container: {
    // paddingTop: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  img: {
    height: 30,
    width: 30,
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
  },

  checkbox: {
    width: 30,
    height: 30,
  },

  checkBoxItemLabel: {
    fontSize: 18,
    marginVertical: 10,
  },

  checkBoxesContainer: {
    marginBottom: 20,
    maxHeight: 300,
    overflow: "scroll",
    alignItems: "flex-start",
    // backgroundColor: "none",
    borderTopColor: "#000",
    borderTopWidth: 1,
    borderBottomColor: "#000",
    borderBottomWidth: 1,
  },

  statSlidersContainer: {
    padding: 24,
    borderRadius: 24,
    alignItems: "center",
    //backgroundColor: theme.surface_container_high,
    marginBottom: 8,
    maxWidth: 0.95 * vw,
    minWidth: 0.8 * vw,
    minHeight: 100,
    display: "flex",
    flexDirection: "column",
  },

  modalBackground: {
    cursor: "auto",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },

  pressable: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  pressableText: {
    color: "white",
    fontSize: 16,
  },

  SearchPressable: {
    fontSize: 20,
  },
  ElementsDeselector: {
    width: "100%",
    alignItems: "flex-start",
    backgroundColor: "red",
  },

  button_icon: {
    margin: 16,
  },
});
