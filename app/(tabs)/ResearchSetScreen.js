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
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import {
  initializePressableImages,
  handlePressImage,
} from "../../utils/pressableImagesFunctions";

// Utils
import {
  setAllInfos,
  statNames,
  bodyTypeNames,
  bodyTypeNamesDisplay,
} from "../../data/data";

// Components import
import StatSlider from "../../components/StatSlider";
import ElementsImagesSelector from "../../components/ElementsImagesSelector";
import { imageSize } from "../../components/PressableImage";
import SetCard from "../../components/SetCard";
import ResultsNumber from "../../components/ResultsNumberSelector";
import ElementsImagesDeselector from "../../components/ElementsImagesDeselector";
import { StatSliderResultSelectorModal } from "../../components/StatSliderResultSelectorModal";
import { StatSliderResultSelectorPressable } from "../../components/StatSliderResultSelectorPressable";

import {
  button_icon,
  button,
  button_outline,
} from "../../components/styles/button";
import th, { shadow_3dp } from "../../components/styles/light_theme";
import { modal } from "../../components/styles/modal";
import checkbox from "../../components/styles/checkbox";

const screenWidth = Dimensions.get("window").width;

const ResearchSetScreen = () => {
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

  const showToast = () => {
    console.log("ok");
    Toast.show({
      type: "success",
      text1: "Hello",
      text2: "Ceci est une alerte temporaire 👋",
      position: "bottom", // Ou 'bottom'
      visibilityTime: 3000, // 3 secondes
    });
  };

  const [isFoundedStatsVisible, setIsFoundedStatsVisible] = useState(
    statNames.map((statName) => ({
      name: statName,
      checked: false,
    }))
  );

  const [chosenBodyType, setChosenBodyType] = useState(
    bodyTypeNames.map((bodyTypeName, index) => ({
      name: bodyTypeName,
      nameDisplay: bodyTypeNamesDisplay[index],
      checked: true,
    }))
  );

  const [resultsNumber, setResultsNumber] = useState(5);

  const [setsToShow, setSetsToShow] = useState([]);

  const [chosenStatsModalVisible, setChosenStatsModalVisible] = useState(false);
  const [foundedStatsModalVisible, setFoundedStatsModalVisible] =
    useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [filterModalButtonHover, setFilterModalButtonHover] = useState(false);
  const [resultsNumberModalVisible, setResultsNumberModalVisible] =
    useState(false);
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  const [pressableImages, setPressableImages] = useState(
    initializePressableImages(false)
  );
  const handlePressImageCompleted = (categoryKey, classKey, imageKey) => {
    handlePressImage(setPressableImages, categoryKey, classKey, imageKey);
  };

  const elementsFilterObjectToList = (pressableImages) => {
    const selectedElementsIds7categories = [];

    // Parcourir chaque catégorie
    Object.entries(pressableImages).forEach(([, classes]) => {
      const pressedClasses = [];

      // Parcourir chaque classe dans la catégorie
      Object.entries(classes).forEach(([classKey, images]) => {
        // Si au moins une image est pressée (true), ajouter la classe à pressedClasses
        const isAnyImagePressed = Object.values(images).some(
          ({ pressed }) => pressed
        );
        if (isAnyImagePressed) {
          pressedClasses.push(+classKey); // +str pour convertir en entier
        }
      });
      // Ajouter la liste des classes pressées (ou une liste vide) à result
      selectedElementsIds7categories.push(pressedClasses);
    });

    const selectedBodies = [
      ...new Set([
        ...selectedElementsIds7categories[1],
        ...selectedElementsIds7categories[2],
        ...selectedElementsIds7categories[3],
        ...selectedElementsIds7categories[4],
      ]),
    ];

    const selectedElementsIds4categories = [
      ...selectedElementsIds7categories.slice(0, 1),
      selectedBodies,
      ...selectedElementsIds7categories.slice(5),
    ];

    return selectedElementsIds4categories;
  };

  // Inverser l'état checked des stats
  const toggleCheck = (setList, name) => {
    setList((prev) => {
      const newList = prev.map((item) =>
        item.name === name ? { ...item, checked: !item.checked } : item
      );

      // Vérifiez s'il reste au moins un checked
      const hasChecked = newList.some((item) => item.checked);

      // Si tous les éléments sont décochés, rétablissez l'état de l'élément
      if (!hasChecked) {
        showToast();
        return newList.map((item) =>
          item.name === name ? { ...item, checked: true } : item
        );
      }

      return newList;
    });
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

    const chosenElementsIds = elementsFilterObjectToList(pressableImages);

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
    <ScrollView>
      <View style={styles.container}>
        <View
          id="Title_bar"
          style={[
            styles.text,
            {
              width: "100vw",
              height: 64,
              backgroundColor: "white",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            },
          ]}
        >
          <Text style={{ margin: 16 }}>
            <MaterialIcons name="home" size={24}></MaterialIcons>
          </Text>

          <Text
            style={{
              fontSize: "22px",
            }}
          >
            Coucou
          </Text>

          <Pressable
            style={styles.button_icon}
            onPress={() => setMenuModalVisible(true)}
          >
            <MaterialIcons name="more-vert" size={24}></MaterialIcons>
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

        <View style={styles.statSlidersContainer}>
          <Text
            style={[
              styles.text,
              {
                paddingHorizontal: 10,
                borderRadius: 5,
                marginBottom: 16,
                color: "#1D1B20",
              },
            ]}
          >
            Statistiques recherchées
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
            style={[button_icon.container, shadow_3dp]}
            onPress={() => setChosenStatsModalVisible(true)}
          >
            <Text style={button_icon.icon}>➕</Text>
          </Pressable>

          <Pressable
            style={[styles.pressable, { marginHorizontal: 10 }]}
            onPress={() => setFilterModalVisible(true)}
          >
            <Text>📌</Text>
          </Pressable>

          <Pressable
            style={[button.container, { flexGrow: 1 }, shadow_3dp]}
            onPress={() => search()}
          >
            <Text style={button.text}>Rechercher</Text>
          </Pressable>

          <Pressable
            style={[button_icon.container, shadow_3dp]}
            onPress={() => setResultsNumberModalVisible(true)}
          >
            <Text>5️⃣</Text>
          </Pressable>

          <StatSliderResultSelectorPressable
            setFoundedStatsModalVisible={setFoundedStatsModalVisible}
          />
        </View>

        <Modal
          animationType="none" // Utilise slide, fade, none pour les animations
          transparent={true} // Définit si le fond est transparent
          visible={chosenStatsModalVisible}
          onRequestClose={() => setChosenStatsModalVisible(false)} // Fonction pour fermer le modal
        >
          <ScrollView>
            <Pressable
              style={modal.background}
              onPress={() => setChosenStatsModalVisible(false)}
            >
              <Pressable style={modal.container}>
                <Text style={modal.title}>Affichage</Text>
                <View style={modal.content}>
                  {chosenStats.map((stat) => (
                    <Pressable
                      onPress={() => toggleCheck(setChosenStats, stat.name)}
                      key={stat.name}
                      style={styles.checkBoxContainer}
                    >
                      <Checkbox
                        value={stat.checked}
                        // onValueChange={() =>
                        //   toggleCheck(setChosenStats, stat.name)
                        // }
                        style={checkbox.square}
                        color={{ true: th.primary, false: th.on_primary }}
                      />
                      <Text style={checkbox.text}>{stat.name}</Text>
                    </Pressable>
                  ))}
                </View>
                <Pressable
                  style={[
                    button_outline.container,
                    modal.close_button_right,
                    filterModalButtonHover ? button_outline.hover : null,
                  ]}
                  onHoverIn={() => setFilterModalButtonHover(true)}
                  onHoverOut={() => setFilterModalButtonHover(false)}
                  onPress={() => setChosenStatsModalVisible(false)}
                >
                  <Text style={button_outline.text}>Valider</Text>
                </Pressable>
              </Pressable>
            </Pressable>
          </ScrollView>
        </Modal>

        <Modal
          animationType="none" // Utilise slide, fade, none pour les animations
          transparent={true} // Définit si le fond est transparent
          visible={filterModalVisible}
          onRequestClose={() => setFilterModalVisible(false)} // Fonction pour fermer le modal
        >
          <ScrollView>
            <Pressable
              style={styles.modalBackground}
              onPress={() => setFilterModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <Text style={styles.modalText}>Filtre</Text>
                <View style={styles.checkBoxesContainer}>
                  {chosenBodyType.map((bodyType) => (
                    <Pressable
                      onPress={() =>
                        toggleCheck(setChosenBodyType, bodyType.name)
                      }
                      key={bodyType.name}
                      style={[
                        styles.checkBoxContainer,
                        {
                          width: "85vw",
                          height: 64,
                          padding: 24,
                          display: "flex",
                          justifyContent: "space-between",
                        },
                      ]}
                    >
                      <Text style={styles.checkBoxItemLabel}>
                        {bodyType.nameDisplay}
                      </Text>
                      <Checkbox
                        value={bodyType.checked}
                        // Moving checkbox toggle to pressable
                        /* onValueChange={() =>
                          toggleCheck(setChosenBodyType, bodyType.name)
                        } */
                        style={styles.checkbox}
                      />
                    </Pressable>
                  ))}
                </View>

                <View style={styles.elementsImagesDeselector}>
                  <ElementsImagesDeselector
                    pressableImages={pressableImages}
                    handlePressImage={handlePressImageCompleted}
                    displayCase={false}
                  />
                </View>

                <ElementsImagesSelector
                  pressableImages={pressableImages}
                  handlePressImage={handlePressImageCompleted}
                  displayCase={false}
                />
                <Pressable
                  style={styles.pressable}
                  onPress={() => setFilterModalVisible(false)}
                >
                  <Text style={styles.pressableText}>Fermer</Text>
                </Pressable>
              </View>
            </Pressable>
          </ScrollView>
        </Modal>

        <Modal
          animationType="none" // Utilise slide, fade, none pour les animations
          transparent={true} // Définit si le fond est transparent
          visible={resultsNumberModalVisible}
          onRequestClose={() => setResultsNumberModalVisible(false)} // Fonction pour fermer le modal
        >
          <Pressable
            style={styles.modalBackground}
            onPress={() => setResultsNumberModalVisible(false)}
          >
            <Pressable style={modal.container}>
              <Text style={modal.title_center}>Nombre de résultats</Text>
              <View style={styles.checkBoxContainer}>
                <ResultsNumber
                  resultsNumber={resultsNumber}
                  setResultsNumber={setResultsNumber}
                />
              </View>
              <Pressable
                onHoverIn={() => setFilterModalButtonHover(true)}
                onHoverOut={() => setFilterModalButtonHover(false)}
                style={[
                  button_outline.container,
                  modal.close_button_center,
                  filterModalButtonHover ? button_outline.hover : null,
                ]}
                onPress={() => setResultsNumberModalVisible(false)}
              >
                <Text style={button_outline.text}>Fermer</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>

        <StatSliderResultSelectorModal
          foundedStatsModalVisible={foundedStatsModalVisible}
          setFoundedStatsModalVisible={setFoundedStatsModalVisible}
          isFoundedStatsVisible={isFoundedStatsVisible}
          setIsFoundedStatsVisible={setIsFoundedStatsVisible}
          toggleCheck={toggleCheck}
        />

        <View style={styles.setCardContainer}>
          {setsToShow.map((setToShow, index) => {
            return (
              <SetCard
                key={index}
                setToShow={setToShow}
                isFoundedStatsVisible={isFoundedStatsVisible}
                chosenStats={chosenStats}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default ResearchSetScreen;

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

  checkBoxContainer: {
    marginBottom: 2,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#ECE6F0",
    borderRadius: 24,
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
    backgroundColor: "#ECE6F0",
    marginBottom: 8,
    maxWidth: "95vw",
    minWidth: "80vw",
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

  modalContainer: {
    margin: 24,
    backgroundColor: th.surface_container,
    borderRadius: 10,
    alignItems: "center",
    // width: 6 * imageSize,
    minWidth: 260,
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
    width: screenWidth * 0.87 + 20,
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  researchPressable: {
    fontSize: 20,
  },

  setCardContainer: {
    display: "flex",
    margin: 16,
    marginBottom: 0,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#ECE6F0",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  elementsImagesDeselector: {
    width: "100%",
    alignItems: "flex-start",
    backgroundColor: "red",
  },

  button_icon: {
    margin: 16,
  },
});
