import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Components import
import StatSlider from "../../components/StatSlider";
import { button_icon } from "../../components/styles/button";
import { shadow_3dp, vw } from "../../components/styles/theme";
import { useTheme } from "../../utils/ThemeContext";
import { translate } from "../../i18n/translations";
import SetCardContainer from "../../components/setCard/SetCardContainer";
import SavedSetModal from "../../components/modal/SavedSetModal";
import { useSavedSetModal } from "../../utils/SavedSetModalContext";
import { useSetsList } from "../../utils/SetsListContext";
import SearchSetScreenPressablesContainer from "../../components/SearchSetScreenPressablesContainer";
import { SearchSetScreenProvider } from "../../utils/SearchSetScreenContext";
import { PressableImagesProvider } from "../../utils/PressableImagesContext";
import ButtonLoad from "../../components/ButtonLoad";

const screenWidth = Dimensions.get("window").width;

const SearchSetScreen = () => {
  const th = useTheme();

  const { chosenStats, setChosenStats } = useSetsList();

  const [setsToShow, setSetsToShow] = useState([]);

  const { savedSetModalVisible, toggleSavedSetModal } = useSavedSetModal();

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
        <ScrollView scrollEnabled={!savedSetModalVisible}>
          <View style={[styles.container, { backgroundColor: th.surface }]}>
            <View
              style={[
                styles.statSlidersContainer,
                { backgroundColor: th.surface_container_high },
              ]}
            >
              <Text
                style={[
                  styles.text,
                  {
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    marginBottom: 16,
                    color: th.on_surface,
                  },
                ]}
              >
                {translate("SearchedStats")}
              </Text>

              <ButtonLoad text={translate("LoadStatsOfASet")} />

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

          <SavedSetModal />

          <SetCardContainer
            setsToShow={setsToShow}
            chosenStats={chosenStats}
            situation="search"
          />
        </ScrollView>
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
    //backgroundColor: th.surface_container_high,
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
