import { useState, useEffect, useContext, createContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Dimensions,
  Modal,
  Alert,
  StatusBar,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRef } from "react";
import { useCallback } from "react";
import Checkbox from "expo-checkbox";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { toggleCheck } from "../utils/toggleCheck";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModalProvider,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

// Utils
import {
  setAllInfos,
  statNames,
  bodyTypeNames,
  bodyTypeNamesDisplay,
} from "../data/data";

// Components import
import StatSlider from "../components/StatSlider";
import SetCardFound from "../components/setCard/SetCardFound";
import ResultsNumber from "../components/ResultsNumberSelector";
import MyModal from "../components/MyModal";
import FilterSelectorModal from "../components/filterSelector/FilterSelectorModal";
import StatSliderResultSelectorPressable from "../components/statSliderResult/StatSliderResultSelectorPressable";

import {
  button_icon,
  button,
  button_outline,
} from "../components/styles/button";
import th, {
  shadow_12dp,
  shadow_3dp,
  useTheme,
  vh,
  vw,
} from "../components/styles/theme";
import { modal } from "../components/styles/modal";
import checkbox from "../components/styles/checkbox";
import PressableStat from "../components/PressableStat";
import StatSelector from "../components/StatSelector";
import { translate } from "../i18n/translations";
import { elementsAllInfos } from "../data/data";
import { usePressableImages } from "../utils/usePressableImages";

const screenWidth = Dimensions.get("window").width;

const SearchSetScreenContent = () => {
  const th = useTheme();

  const {
    pressableImagesByCategory,
    handlePressImage,
    handlePressImageUnique,
  } = usePressableImages();

  const [chosenStats, setChosenStats] = useState(
    statNames.map((statName, index) => {
      return {
        name: statName,
        checked: index === 0,
        value: 0,
        statFilterNumber: 0,
        setStatFilterNumber: (newState) => {
          setChosenStats((prevStats) =>
            prevStats.map((stat) =>
              stat.name === statName
                ? { ...stat, statFilterNumber: newState }
                : stat
            )
          );
        },
      };
    })
  );

  const [isFoundStatsVisible, setIsFoundStatsVisible] = useState(
    statNames.map((statName, index) => ({
      name: statName,
      checked: index === 0,
    }))
  );

  const [chosenBodyType, setChosenBodyType] = useState(
    bodyTypeNames.map((bodyTypeName, index) => ({
      name: bodyTypeName,
      checked: true,
    }))
  );

  const [resultsNumber, setResultsNumber] = useState(5);

  const [setsToShow, setSetsToShow] = useState([]);

  const [chosenStatsModalVisible, setChosenStatsModalVisible] = useState(false);
  const [foundStatsModalVisible, setFoundStatsModalVisible] = useState(false);

  const bottomSheetModalRef = useRef(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const [resultsNumberModalVisible, setResultsNumberModalVisible] =
    useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  const elementsFilterObjectToList = (pressableImagesByCategory) => {
    const selectedClassIds4categories = [];
    // Parcourir chaque catégorie
    Object.entries(pressableImagesByCategory).forEach(([, category]) => {
      const pressedClassesInCategory = [];

      // Parcourir chaque classe dans la catégorie
      Object.entries(category).forEach(([classKey, classElements]) => {
        // Si au moins une image est pressée (true), ajouter la classe à pressedClasses
        const isAnyImagePressed = Object.values(classElements).some(
          ({ pressed }) => pressed
        );
        if (isAnyImagePressed) {
          pressedClassesInCategory.push(+classKey); // +str pour convertir en entier
        }
      });
      // Ajouter la liste des classes pressées (ou une liste vide) à result
      selectedClassIds4categories.push(pressedClassesInCategory);
    });

    return selectedClassIds4categories;
  };

  // Mettre à jour la valeur du slider
  const updateSliderValue = (name, newValue) => {
    setChosenStats(
      chosenStats.map((stat) =>
        stat.name === name ? { ...stat, value: newValue } : stat
      )
    );
  };

  const search = () => {
    const chosenStatsChecked = chosenStats.map((stat) => stat.checked);
    const chosenStatsValue = chosenStats.map((stat) => stat.value);
    const chosenStatsFilterNumber = chosenStats.map(
      (stat) => stat.statFilterNumber
    );

    const chosenBodyTypeList = chosenBodyType
      .filter((bodyType) => bodyType.checked)
      .map((bodyType) => bodyType.name);

    const chosenElementsIds = elementsFilterObjectToList(
      pressableImagesByCategory
    );

    if (!chosenStatsChecked.includes(true) || chosenBodyTypeList.length === 0) {
      setSetsToShow([]); // Ou gérer l'état de "rien trouvé"
      return; // Sortir si aucun filtre n'est sélectionné
    }

    const gaps = setAllInfos.reduce((acc, setInfo, setIndex) => {
      const [, set_i_ElementsIds, set_i_Stats, set_i_BodyCategories] = setInfo;

      // Vérifier si au moins un type de corps est présent
      const listIsSetElementAccepted = set_i_ElementsIds.map(
        (elementId, categoryIndex) => {
          const category_x_ElementIds = chosenElementsIds[categoryIndex];
          return (
            category_x_ElementIds.includes(elementId) ||
            category_x_ElementIds.length === 0
          );
        }
      );
      if (
        !set_i_BodyCategories.some((item) =>
          chosenBodyTypeList.includes(item)
        ) ||
        listIsSetElementAccepted.includes(false) // si (le set ne contient aucun type de vehicule choisi OU le set contient au moins un element non choisi)
      ) {
        return acc; // Ignorer si le type de corps ne correspond pas
      }

      let gap = 0;
      let validSet = true; // Pour suivre la validité des statistiques

      chosenStatsChecked.forEach((checked, statIndex) => {
        if (checked) {
          const setValue = set_i_Stats[statIndex];
          const chosenValue = Number(chosenStatsValue[statIndex]);
          const statFilterNumber = chosenStatsFilterNumber[statIndex];

          if (statFilterNumber === 2 && setValue !== chosenValue) {
            validSet = false; // Écart trouvé
          } else if (statFilterNumber === 1 && setValue < chosenValue) {
            validSet = false; // Écart trouvé
          } else {
            gap += (chosenValue - setValue) ** 2; // Calculer le gap
          }
        }
      });

      if (validSet) {
        acc.push({ index: setIndex, gap });
      }

      return acc;
    }, []);

    gaps.sort((a, b) => a.gap - b.gap);

    if (gaps.length === 0) {
      setSetsToShow([]); // Ou gérer l'état de "rien trouvé"
    } else {
      const setsFound = gaps
        .slice(0, Math.min(resultsNumber, gaps.length))
        .map(({ index }) => {
          const [, setSeekedElementsIds, setSeekedStats] = setAllInfos[index];
          return [setSeekedElementsIds, setSeekedStats];
        });
      setSetsToShow(setsFound);
    }
  };

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <ScrollView>
          <View style={[styles.container, { backgroundColor: th.surface }]}>
            <View
              id="Title_bar"
              style={[
                styles.text,
                {
                  width: vw,
                  height: 64,
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  backgroundColor: th.surface_container_highest,
                  // marginTop: 24,
                },
              ]}
            >
              <Text style={{ margin: 16 }}>
                <MaterialIcons
                  name="home"
                  size={24}
                  color={th.on_surface}
                ></MaterialIcons>
              </Text>

              <Text
                style={{
                  fontSize: 22,
                  color: th.on_surface,
                }}
              >
                Coucou
              </Text>

              <Pressable
                style={styles.button_icon}
                onPress={() => setMenuModalVisible(true)}
              >
                <MaterialIcons
                  name="more-vert"
                  size={24}
                  color={th.on_surface}
                ></MaterialIcons>
              </Pressable>
              <Modal
                animationType="none" // Utilise slide, fade, none pour les animations
                transparent={true} // Définit si le fond est transparent
                visible={menuModalVisible}
                onRequestClose={() => setMenuModalVisible(false)} // Fonction pour fermer le modal
              >
                <Text
                  style={{
                    position: "absolute",
                    right: 50,
                    top: 50,
                    backgroundColor: "red",
                  }}
                >
                  Coucou
                </Text>
              </Modal>
            </View>

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

            <View style={styles.pressablesContainer}>
              <Pressable
                style={[button_icon(th).container, shadow_3dp]}
                onPress={() => setChosenStatsModalVisible(true)}
              >
                <MaterialCommunityIcons
                  name="plus"
                  size={24}
                  color={th.on_primary}
                />
              </Pressable>

              <Pressable
                style={[button_icon(th).container, shadow_3dp]}
                onPress={handlePresentModalPress}
              >
                <MaterialCommunityIcons
                  name="pin"
                  size={24}
                  color={th.on_primary}
                />
              </Pressable>

              <Pressable
                style={[
                  button(th).container,
                  { flexDirection: "row", paddingRight: 24, paddingLeft: 16 },
                  shadow_3dp,
                ]}
                onPress={() => search()}
              >
                <MaterialCommunityIcons
                  name="magnify"
                  size={24}
                  color={th.on_primary}
                />
                <Text style={[button(th).text, { marginLeft: 8 }]}>
                  {translate("Search")}
                </Text>
              </Pressable>

              <Pressable
                style={[button_icon(th).container, shadow_3dp]}
                onPress={() => setResultsNumberModalVisible(true)}
              >
                <MaterialIcons name="numbers" size={24} color={th.on_primary} />
              </Pressable>

              <StatSliderResultSelectorPressable
                setFoundStatsModalVisible={setFoundStatsModalVisible}
              />
            </View>

            <MyModal
              modalTitle={translate("StatsToParameter")}
              isModalVisible={chosenStatsModalVisible}
              setIsModalVisible={setChosenStatsModalVisible}
              ModalContent={StatSelector}
              contentProps={{
                statList: chosenStats, // Utilisation correcte des paires clé-valeur
                setStatList: setChosenStats,
                toggleCheck: toggleCheck,
                keepOneCondition: true,
              }}
            />

            <FilterSelectorModal
              modalTitle={translate("Filter")}
              chosenBodyType={chosenBodyType}
              setChosenBodyType={setChosenBodyType}
              toggleCheck={toggleCheck}
              bottomSheetModalRef={bottomSheetModalRef}
            />

            <MyModal
              modalTitle={translate("NumberOfResults")}
              isModalVisible={resultsNumberModalVisible}
              setIsModalVisible={setResultsNumberModalVisible}
              ModalContent={ResultsNumber}
              contentProps={{
                resultsNumber: resultsNumber, // Utilisation correcte des paires clé-valeur
                setResultsNumber: setResultsNumber,
              }}
            />

            <MyModal
              modalTitle={translate("StatsToDisplay")}
              isModalVisible={foundStatsModalVisible}
              setIsModalVisible={setFoundStatsModalVisible}
              ModalContent={StatSelector}
              contentProps={{
                statList: isFoundStatsVisible, // Utilisation correcte des paires clé-valeur
                setStatList: setIsFoundStatsVisible,
                toggleCheck: toggleCheck,
                keepOneCondition: false,
              }}
            />
          </View>

          <View key="cardsContainer">
            <ScrollView
              contentContainerStyle={[
                styles.setCardContainer,
                { backgroundColor: th.surface_container_high },
                setsToShow.length == 0
                  ? {
                      flex: 1,
                      paddingBottom: 0.282 * vh,
                      justifyContent: "center",
                    }
                  : {},
              ]}
              horizontal={true}
            >
              {setsToShow.length == 0 ? (
                <MaterialCommunityIcons
                  name="chat-question"
                  size={72}
                  color={th.on_surface}
                />
              ) : null}
              {setsToShow.map(([setToShowClassIds, setToShowStats], index) => {
                return (
                  <SetCardFound
                    key={"card" + index}
                    setToShowClassIds={setToShowClassIds}
                    setToShowStats={setToShowStats}
                    isFoundStatsVisible={isFoundStatsVisible}
                    chosenStats={chosenStats}
                  />
                );
              })}
            </ScrollView>
          </View>
        </ScrollView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default SearchSetScreenContent;

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

  pressablesContainer: {
    // width: screenWidth * 0.87 + 20,
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  SearchPressable: {
    fontSize: 20,
  },

  setCardContainer: {
    margin: 16,
    padding: 20,
    alignItems: "stretch",
    //backgroundColor: th.surface_container_high,
    borderRadius: 24,
    columnGap: 16,
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
