import { useState, useEffect, useContext, createContext } from "react";
import {
  View, Text, StyleSheet, ScrollView, Pressable, TextInput, Dimensions, Modal, Alert, StatusBar,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Utils
import { setAllInfos, statNames, bodyTypeNames } from "../data/data";

// Components import
import StatSlider from "../components/StatSlider";
import ResultsNumber from "../components/ResultsNumberSelector";
import MyModal from "../components/modal/MyModal";
import StatSliderResultSelectorPressable from "../components/statSliderResult/StatSliderResultSelectorPressable";

import {
  button_icon, button, button_outline,
} from "../components/styles/button";
import th, {
  shadow_12dp, shadow_3dp, vh, vw,
} from "../components/styles/theme";
import { useTheme } from "../utils/ThemeContext";
import { modal } from "../components/styles/modal";
import checkbox from "../components/styles/checkbox";
import PressableStat from "../components/PressableStat";
import StatSelector from "../components/StatSelector";
import { translate } from "../i18n/translations";
import { elementsAllInfos } from "../data/data";
import { usePressableImages } from "../utils/PressableImagesContext";
import SetCardContainer from "../components/setCard/SetCardContainer";
import BodyTypeSelector from "../components/elementsSelector/BodyTypeSelector";
import ElementsDeselector from "../components/elementsSelector/ElementsDeselector";
import ElementsSelector from "../components/elementsSelector/ElementsSelector";
import SavedSetModal from "../components/modal/SavedSetModal";
import { useSavedSetModal } from "../utils/SavedSetModalContext";
import { useSetsList } from "../utils/SetsListContext";
import { useOrderNumber } from "../utils/OrderNumberContext";

const screenWidth = Dimensions.get("window").width;

const SearchSetScreenContent = () => {
  const th = useTheme();

  const {
    pressableImagesByCategory, handlePressImage, handlePressImageUnique,
  } = usePressableImages();

  const {chosenStats, setChosenStats} = useOrderNumber();

  const [isFoundStatsVisible, setIsFoundStatsVisible] = useState(statNames.map((statName, index) => ({
    name: statName, checked: index === 0,
  })));

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const [chosenBodyType, setChosenBodyType] = useState(bodyTypeNames.map((bodyTypeName, index) => ({
    name: bodyTypeName, checked: true,
  })));

  const [resultsNumber, setResultsNumber] = useState(5);

  const {setsListSaved, updateAllSetsListFound} = useSetsList();

  const [setsToShow, setSetsToShow] = useState([]);
  const updateSetsToShow = (setsFoundClassIds) => {
    setSetsToShow(setsFoundClassIds);
    updateAllSetsListFound(setsFoundClassIds);
  };

  const [chosenStatsModalVisible, setChosenStatsModalVisible] = useState(false);
  const [foundStatsModalVisible, setFoundStatsModalVisible] = useState(false);

  const [resultsNumberModalVisible, setResultsNumberModalVisible] = useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  const {savedSetModalVisible, toggleSavedSetModal} = useSavedSetModal();

  const elementsFilterObjectToList = (pressableImagesByCategory) => {
    const selectedClassIds4categories = [];
    // Parcourir chaque catégorie
    Object.entries(pressableImagesByCategory).forEach(([, category]) => {
      const pressedClassesInCategory = [];

      // Parcourir chaque classe dans la catégorie
      Object.entries(category).forEach(([classKey, classElements]) => {
        // Si au moins une image est pressée (true), ajouter la classe à pressedClasses
        const isAnyImagePressed = Object.values(classElements).some(({pressed}) => pressed);
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
    setChosenStats(chosenStats.map((stat) => stat.name === name ? {...stat, value: newValue} : stat));
  };

  const search = () => {
    const chosenStatsChecked = chosenStats.map((stat) => stat.checked);
    const chosenStatsValue = chosenStats.map((stat) => stat.value);
    const chosenStatsFilterNumber = chosenStats.map((stat) => stat.statFilterNumber);

    const chosenBodyTypeList = chosenBodyType
      .filter((bodyType) => bodyType.checked)
      .map((bodyType) => bodyType.name);

    const chosenElementsIds = elementsFilterObjectToList(pressableImagesByCategory);

    if (!chosenStatsChecked.includes(true) || chosenBodyTypeList.length === 0) {
      updateSetsToShow([]); // Ou gérer l'état de "rien trouvé"
      return; // Sortir si aucun filtre n'est sélectionné
    }

    const gaps = setAllInfos.reduce((acc, setInfo, setIndex) => {
      const {classIds, stats, bodyTypes} = setInfo;

      // Vérifier si au moins un type de corps est présent
      const listIsSetElementAccepted = classIds.map((elementId, categoryIndex) => {
        const category_x_ElementIds = chosenElementsIds[categoryIndex];
        return (category_x_ElementIds.includes(elementId) || category_x_ElementIds.length === 0);
      });
      if (!bodyTypes.some((item) => chosenBodyTypeList.includes(item)) || listIsSetElementAccepted.includes(false) // si (le set ne contient aucun type de vehicule choisi OU le set contient au moins un element non choisi)
      ) {
        return acc; // Ignorer si le type de corps ne correspond pas
      }

      let gap = 0;
      let validSet = true; // Pour suivre la validité des statistiques

      chosenStatsChecked.forEach((checked, statIndex) => {
        if (checked) {
          const setValue = stats[statIndex];
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
        acc.push({setIndex, gap});
      }

      return acc;
    }, []);

    gaps.sort((a, b) => a.gap - b.gap);

    if (gaps.length === 0) {
      updateSetsToShow([]); // Ou gérer l'état de "rien trouvé"
    } else {
      const setsFound = gaps
        .slice(0, Math.min(resultsNumber, gaps.length))
        .map(({setIndex}) => ({...setAllInfos[setIndex]}));

      updateSetsToShow(setsFound);
    }
  };

  return (<GestureHandlerRootView>
    <ScrollView scrollEnabled={ !savedSetModalVisible }>
      <View style={ [styles.container, {backgroundColor: th.surface}] }>
        <View
          style={ [styles.statSlidersContainer, {backgroundColor: th.surface_container_high},] }
        >
          <Text
            style={ [styles.text, {
              paddingHorizontal: 10, borderRadius: 5, marginBottom: 16, color: th.on_surface,
            },] }
          >
            { translate("SearchedStats") }
          </Text>

          <Pressable
            style={ [button_icon(th).container, shadow_3dp] }
            onPress={ () => {
              toggleSavedSetModal(true);
            } }
          >
            <MaterialCommunityIcons
              name="download"
              size={ 24 }
              color={ th.on_primary }
            />
          </Pressable>

          {/* Afficher le slider uniquement si la case est cochée */ }
          { chosenStats.map((stat) => stat.checked && (<StatSlider
            key={ stat.name }
            name={ stat.name }
            sliderValue={ stat.value }
            setSliderValue={ (newValue) => updateSliderValue(stat.name, newValue) }
            statFilterNumber={ stat.statFilterNumber }
            setStatFilterNumber={ stat.setStatFilterNumber }
          />)) }
        </View>

        <View style={ styles.pressablesContainer }>
          <Pressable
            style={ [button_icon(th).container, shadow_3dp] }
            onPress={ () => setChosenStatsModalVisible(true) }
          >
            <MaterialCommunityIcons
              name="plus"
              size={ 24 }
              color={ th.on_primary }
            />
          </Pressable>

          <Pressable
            style={ [button_icon(th).container, shadow_3dp] }
            onPress={ () => setIsFilterModalVisible(true) }
          >
            <MaterialCommunityIcons
              name="pin"
              size={ 24 }
              color={ th.on_primary }
            />
          </Pressable>

          <Pressable
            style={ [button(th).container, {flexDirection: "row", paddingRight: 24, paddingLeft: 16}, shadow_3dp,] }
            onPress={ () => search() }
          >
            <MaterialCommunityIcons
              name="magnify"
              size={ 24 }
              color={ th.on_primary }
            />
            <Text style={ [button(th).text, {marginLeft: 8}] }>
              { translate("Search") }
            </Text>
          </Pressable>

          <Pressable
            style={ [button_icon(th).container, shadow_3dp] }
            onPress={ () => setResultsNumberModalVisible(true) }
          >
            <MaterialIcons name="numbers" size={ 24 } color={ th.on_primary }/>
          </Pressable>

          <StatSliderResultSelectorPressable
            setFoundStatsModalVisible={ setFoundStatsModalVisible }
          />
        </View>

        <MyModal
          modalTitle={ translate("StatsToParameter") }
          isModalVisible={ chosenStatsModalVisible }
          setIsModalVisible={ setChosenStatsModalVisible }
          ModalContentsList={ [StatSelector] }
          contentPropsList={ [{
            statList: chosenStats, // Utilisation correcte des paires clé-valeur
            setStatList: setChosenStats, keepOneCondition: true,
          },] }
        />

        <MyModal
          modalTitle={ translate("Filter") }
          isModalVisible={ isFilterModalVisible }
          setIsModalVisible={ setIsFilterModalVisible }
          ModalContentsList={ [BodyTypeSelector, ElementsDeselector, ElementsSelector,] }
          contentPropsList={ [{
            chosenBodyType: chosenBodyType, setChosenBodyType: setChosenBodyType,
          }, {}, {situation: "search"},] }
        />

        <MyModal
          modalTitle={ translate("NumberOfResults") }
          isModalVisible={ resultsNumberModalVisible }
          setIsModalVisible={ setResultsNumberModalVisible }
          ModalContentsList={ [ResultsNumber] }
          contentPropsList={ [{
            resultsNumber: resultsNumber, // Utilisation correcte des paires clé-valeur
            setResultsNumber: setResultsNumber,
          },] }
        />

        <MyModal
          modalTitle={ translate("StatsToDisplay") }
          isModalVisible={ foundStatsModalVisible }
          setIsModalVisible={ setFoundStatsModalVisible }
          ModalContentsList={ [StatSelector] }
          contentPropsList={ [{
            statList: isFoundStatsVisible, // Utilisation correcte des paires clé-valeur
            setStatList: setIsFoundStatsVisible, keepOneCondition: false,
          },] }
        />
      </View>

      <SavedSetModal/>

      <SetCardContainer
        setsToShow={ setsToShow }
        chosenStats={ chosenStats }
        isFoundStatsVisible={ isFoundStatsVisible }
        situation="search"
      />
    </ScrollView>
  </GestureHandlerRootView>);
};

export default SearchSetScreenContent;

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: "center", justifyContent: "center",
  },

  img: {
    height: 30, width: 30,
  },

  text: {
    fontSize: 24, fontWeight: "bold",
  },

  checkbox: {
    width: 30, height: 30,
  },

  checkBoxItemLabel: {
    fontSize: 18, marginVertical: 10,
  },

  checkBoxesContainer: {
    marginBottom: 20, maxHeight: 300, overflow: "scroll", alignItems: "flex-start", // backgroundColor: "none",
    borderTopColor: "#000", borderTopWidth: 1, borderBottomColor: "#000", borderBottomWidth: 1,
  },

  statSlidersContainer: {
    padding: 24, borderRadius: 24, alignItems: "center", //backgroundColor: th.surface_container_high,
    marginBottom: 8, maxWidth: 0.95 * vw, minWidth: 0.8 * vw, minHeight: 100, display: "flex", flexDirection: "column",
  },

  modalBackground: {
    cursor: "auto", flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalText: {
    fontSize: 18, marginBottom: 20,
  },

  pressable: {
    padding: 10, backgroundColor: "#007BFF", borderRadius: 5, alignItems: "center", justifyContent: "center",
  },

  pressableText: {
    color: "white", fontSize: 16,
  },

  pressablesContainer: {
    // width: screenWidth * 0.87 + 20,
    flexDirection: "row", gap: 10, marginBottom: 10,
  },

  SearchPressable: {
    fontSize: 20,
  }, ElementsDeselector: {
    width: "100%", alignItems: "flex-start", backgroundColor: "red",
  },

  button_icon: {
    margin: 16,
  },
});
