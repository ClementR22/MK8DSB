import React from "react";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

// Components import
import StatSlider from "../../components/StatSlider";
import { vw } from "../../components/styles/theme";
import { useTheme } from "../../utils/ThemeContext";
import { translate } from "../../i18n/translations";
import SetCardContainer from "../../components/setCard/SetCardContainer";
import { SavedSetModalProvider } from "../../utils/SavedSetModalContext";
import { useSetsList } from "../../utils/SetsListContext";
import SearchSetScreenPressablesContainer from "../../components/SearchSetScreenPressablesContainer";
import { SearchSetScreenProvider } from "../../utils/SearchSetScreenContext";
import { PressableImagesProvider } from "../../utils/PressableImagesContext";
import ButtonLoad from "../../components/ButtonLoad";

const SearchSetScreen = () => {
  const { theme } = useTheme();

  const { chosenStats, setChosenStats } = useSetsList();

  const [setsToShow, setSetsToShow] = useState([]);

  // Mettre à jour la valeur du slider
  const updateSliderValue = (name, newValue) => {
    setChosenStats(
      chosenStats.map((stat) =>
        stat.name === name ? { ...stat, value: newValue } : stat
      )
    );
  };

  return (
    <SearchSetScreenProvider>
      <PressableImagesProvider situation="search">
        <SavedSetModalProvider>
          <ScrollView>
            <View
              style={[styles.container, { backgroundColor: theme.surface }]}
            >
              <View
                style={[
                  styles.statSlidersContainer,
                  { backgroundColor: theme.surface_container_high },
                ]}
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

                <ButtonLoad
                  tooltip_text="LoadStatsOfASet"
                  screenSituation="search"
                />

                {/* Afficher le slider uniquement si la case est cochée */}
                {chosenStats.map(
                  (stat) =>
                    stat.checked && (
                      <StatSlider
                        key={stat.name}
                        name={stat.name}
                        sliderValue={stat.value}
                        setSliderValue={(newValue) =>
                          updateSliderValue(stat.name, newValue)
                        }
                        statFilterNumber={stat.statFilterNumber}
                        setStatFilterNumber={stat.setStatFilterNumber}
                      />
                    )
                )}
              </View>

              <SearchSetScreenPressablesContainer
                chosenStats={chosenStats}
                setChosenStats={setChosenStats}
                setSetsToShow={setSetsToShow}
              />
            </View>

            <SetCardContainer
              setsToShow={setsToShow}
              chosenStats={chosenStats}
              situation="search"
            />
          </ScrollView>
        </SavedSetModalProvider>
      </PressableImagesProvider>
    </SearchSetScreenProvider>
  );
};

export default SearchSetScreen;

const styles = StyleSheet.create({
  container: {
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
