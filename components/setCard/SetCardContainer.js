import { View, ScrollView, StyleSheet } from "react-native";
import { vh } from "../styles/theme";
import { useTheme } from "../../utils/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SetCard from "./SetCard";
import { useState } from "react";
import { useCallback } from "react";
import { useSetsList } from "../../utils/SetsListContext";
import { useRef } from "react";
import { usePressableImages } from "../../utils/PressableImagesContext";
import { useEffect } from "react";

const SetCardContainer = ({
  setsToShow,
  chosenStats = null,
  isFoundStatsVisible = null,
  situation,
}) => {
  console.log("je render SetCardContainer");

  const {
    setsList,
    setCardActiveIndex,
    setSetCardActiveIndex,
    updateSetsList,
  } = useSetsList();
  const { pressableImagesList, handlePressSetUpdatePressableImagesList } =
    usePressableImages();

  const handlePresentModalPress = useCallback(
    (setCardSelectedIndex) => {
      bottomSheetModalRef.current?.present(); // on fait apparaitre le bottomSheetModal
      setSetCardActiveIndex(setCardSelectedIndex); // on met à jour le state setCardActive
    },
    [setsList]
  );

  useEffect(() => {
    handlePressSetUpdatePressableImagesList(
      setsList[setCardActiveIndex].classIds
    ); // on met à jour le pressableImagesList
  }, [setCardActiveIndex]);

  const th = useTheme();

  const [orderNumber, setOrderNumber] = useState(0);

  const bottomSheetModalRef = useRef(null);

  return (
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

        {setsToShow.map(({ name, classIds, stats }, index) => {
          return (
            <SetCard
              key={"card" + index}
              setToShowName={name}
              setToShowClassIds={classIds}
              setToShowStats={stats}
              isFoundStatsVisible={isFoundStatsVisible}
              chosenStats={chosenStats}
              setCardIndex={index}
              situation={situation}
            />
          );
        })}
      </ScrollView>

      {/* <MyBottomSheetModal
        modalTitle={translate("Selectionner")}
        ModalContentsList={[ElementsSelector]}
        contentPropsList={[
          {
            displayCase: true,
            orderNumber: orderNumber,
          },
        ]}
        bottomSheetModalRef={bottomSheetModalRef}
      /> */}
    </View>
  );
};

export default SetCardContainer;

const styles = StyleSheet.create({
  setCardContainer: {
    margin: 16,
    padding: 20,
    alignItems: "stretch",
    //backgroundColor: th.surface_container_high,
    borderRadius: 24,
    columnGap: 16,
  },
});
