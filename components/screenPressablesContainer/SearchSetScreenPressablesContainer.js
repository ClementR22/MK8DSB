import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { button, button_icon } from "../styles/button";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { bodyTypeNames, setAllInfos } from "@/data/data";
import StatSliderResultSelectorPressable from "../statSliderResult/StatSliderResultSelectorPressable";
import MyModal from "../modal/MyModal";
import { translate } from "@/translations/translations";
import { useState } from "react";
import { useSetsList } from "@/contexts/SetsListContext";
import { useStatsVisibleList } from "@/contexts/StatsVisibleListContext";
import { usePressableImages } from "@/contexts/PressableImagesContext";
import { shadow_3dp } from "../styles/theme";
import StatSelector from "../statSelector/StatSelector";
import BodyTypeSelector from "../elementsSelector/BodyTypeSelector";
import ElementsDeselector from "../elementsSelector/ElementsDeselector";
import ElementsSelector from "../elementsSelector/ElementsSelector";
import ResultsNumber from "../ResultsNumberSelector";
import TooltipWrapper from "../TooltipWrapper";
import { toggleAndGetChecks } from "@/utils/toggleCheck";
import showToast from "@/utils/toast";
import { useStatsVisibleListConfig } from "@/contexts/StatsVisibleListConfigContext";
import Modal from "@/components/Modal";
import ButtonIcon from "@/components/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";

const SearchSetScreenPressablesContainer = ({ setSetsToShow }) => {
  const { theme } = useTheme();

  const { chosenStats, setChosenStats, setSetsListFound, syncWithChosenStats } = useSetsList();

  const [chosenStatsModalVisible, setChosenStatsModalVisible] = useState(false);

  const [resultsNumberModalVisible, setResultsNumberModalVisible] = useState(false);

  const [resultsNumber, setResultsNumber] = useState(5);

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const { setStatsVisibleList } = useStatsVisibleList();

  const { isSync } = useStatsVisibleListConfig();

  useEffect(() => {
    if (isSync) {
      syncWithChosenStats(setStatsVisibleList);
    }
  }, [isSync, chosenStats]);

  const { pressableImagesByCategory } = usePressableImages();

  const [chosenBodyType, setChosenBodyType] = useState(
    bodyTypeNames.map((bodyTypeName) => ({
      name: bodyTypeName,
      checked: true,
    }))
  );

  const toggleCheckChosenStats = (name) => {
    setChosenStats(() => {
      const newList = toggleAndGetChecks(chosenStats, name);
      // Vérifiez s'il reste au moins un checked
      const hasChecked = newList.some((item) => item.checked);

      // Si tous les éléments sont décochés, rétablissez l'état de l'élément
      if (!hasChecked) {
        showToast("Erreur", "Il faut garder au moins une stat");
        return newList.map((item) => (item.name === name ? { ...item, checked: true } : item));
      }

      return newList;
    });
  };

  const updateSetsToShow = (setsFound) => {
    const setsFoundWithName = setsFound.map((set, index) => ({
      name: "SetFound " + String(index),
      classIds: set.classIds,
      stats: set.stats,
    }));
    setSetsToShow(setsFoundWithName);
    setSetsListFound(setsFoundWithName);
  };

  const elementsFilterObjectToList = (pressableImagesByCategory) => {
    const selectedClassIds4categories = [];
    // Parcourir chaque catégorie
    Object.entries(pressableImagesByCategory).forEach(([, category]) => {
      const pressedClassesInCategory = [];

      // Parcourir chaque classe dans la catégorie
      Object.entries(category).forEach(([classKey, classElements]) => {
        // Si au moins une image est pressée (true), ajouter la classe à pressedClasses
        const isAnyImagePressed = Object.values(classElements).some(({ pressed }) => pressed);
        if (isAnyImagePressed) {
          pressedClassesInCategory.push(+classKey); // +str pour convertir en entier
        }
      });
      // Ajouter la liste des classes pressées (ou une liste vide) à result
      selectedClassIds4categories.push(pressedClassesInCategory);
    });

    return selectedClassIds4categories;
  };

  const search = () => {
    const chosenStatsChecked = chosenStats.map((stat) => stat.checked);
    const chosenStatsValue = chosenStats.map((stat) => stat.value);
    const chosenStatsFilterNumber = chosenStats.map((stat) => stat.statFilterNumber);

    const chosenBodyTypeList = chosenBodyType.filter((bodyType) => bodyType.checked).map((bodyType) => bodyType.name);

    const chosenElementsIds = elementsFilterObjectToList(pressableImagesByCategory);

    if (!chosenStatsChecked.includes(true) || chosenBodyTypeList.length === 0) {
      updateSetsToShow([]); // Ou gérer l'état de "rien trouvé"
      return; // Sortir si aucun filtre n'est sélectionné
    }

    const gaps = setAllInfos.reduce((acc, setInfo, setIndex) => {
      const { classIds, stats, bodyTypes } = setInfo;

      // Vérifier si au moins un type de corps est présent
      const listIsSetElementAccepted = classIds.map((elementId, categoryIndex) => {
        const category_x_ElementIds = chosenElementsIds[categoryIndex];
        return category_x_ElementIds.includes(elementId) || category_x_ElementIds.length === 0;
      });
      if (
        !bodyTypes.some((item) => chosenBodyTypeList.includes(item)) ||
        listIsSetElementAccepted.includes(false) // si (le set ne contient aucun type de vehicule choisi OU le set contient au moins un element non choisi)
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
        acc.push({ setIndex, gap });
      }

      return acc;
    }, []);

    gaps.sort((a, b) => a.gap - b.gap);

    if (gaps.length === 0) {
      updateSetsToShow([]); // Ou gérer l'état de "rien trouvé"
    } else {
      const setsFound = gaps
        .slice(0, Math.min(resultsNumber, gaps.length))
        .map(({ setIndex }) => ({ ...setAllInfos[setIndex] }));
      updateSetsToShow(setsFound);
    }
  };

  return (
    <View style={styles.pressablesContainer}>
      {/*<TooltipWrapper*/}
      {/*  tooltipText="ChooseStats"*/}
      {/*  style={[button_icon(theme).container, shadow_3dp]}*/}
      {/*  onPress={() => setChosenStatsModalVisible(true)}*/}
      {/*>*/}
      {/*  <MaterialCommunityIcons name="plus" size={24} color={theme.on_primary} />*/}
      {/*</TooltipWrapper>*/}

      <ButtonIcon
        tooltipText={"ChooseStats"}
        iconName={"plus"}
        iconType={IconType.MaterialCommunityIcons}
        onPress={() => setChosenStatsModalVisible(true)}
      />

      <TooltipWrapper
        tooltipText="ChooseFilters"
        style={[button_icon(theme).container, shadow_3dp]}
        onPress={() => setIsFilterModalVisible(true)}
      >
        <MaterialCommunityIcons name="pin" size={24} color={theme.on_primary} />
      </TooltipWrapper>

      <Pressable
        style={[button(theme).container, { flexDirection: "row", paddingRight: 24, paddingLeft: 16 }, shadow_3dp]}
        onPress={() => search()}
      >
        <MaterialCommunityIcons name="magnify" size={24} color={theme.on_primary} />
        <Text style={[button(theme).text, { marginLeft: 8 }]}>{translate("Search")}</Text>
      </Pressable>

      <TooltipWrapper
        tooltipText="NumberOfResults"
        style={[button_icon(theme).container, shadow_3dp]}
        onPress={() => setResultsNumberModalVisible(true)}
      >
        <MaterialIcons name="numbers" size={24} color={theme.on_primary} />
      </TooltipWrapper>

      <StatSliderResultSelectorPressable />

      <Modal
        modalTitle="StatsToParameter"
        isModalVisible={chosenStatsModalVisible}
        setIsModalVisible={setChosenStatsModalVisible}
      >
        <StatSelector
          statList={chosenStats}
          setStatList={setChosenStats}
          toggleCheck={(name) => {
            toggleCheckChosenStats(name);
          }}
          isVisibleStatsNotInSettingsScreen={false}
        />
      </Modal>

      <MyModal modalTitle="Filters" isModalVisible={isFilterModalVisible} setIsModalVisible={setIsFilterModalVisible}>
        <BodyTypeSelector chosenBodyType={chosenBodyType} setChosenBodyType={setChosenBodyType} />
        <ElementsDeselector />
        <ElementsSelector />
      </MyModal>

      <MyModal
        modalTitle="NumberOfResults"
        isModalVisible={resultsNumberModalVisible}
        setIsModalVisible={setResultsNumberModalVisible}
      >
        <ResultsNumber resultsNumber={resultsNumber} setResultsNumber={setResultsNumber} />
      </MyModal>
    </View>
  );
};

const styles = StyleSheet.create({
  pressablesContainer: {
    // width: screenWidth * 0.87 + 20,
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
});

export default SearchSetScreenPressablesContainer;
