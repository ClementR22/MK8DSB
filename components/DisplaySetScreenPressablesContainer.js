import { useEffect, useState } from "react";
import { usePressableImages } from "../utils/PressableImagesContext";
import { useSetsList } from "../utils/SetsListContext";
import { Pressable, Text, View } from "react-native";
import StatSliderResultSelectorPressable from "./statSliderResult/StatSliderResultSelectorPressable";
import { button_icon } from "./styles/button";
import { useTheme } from "../utils/ThemeContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSavedSetModal } from "../utils/SavedSetModalContext";
import MyModal from "./modal/MyModal";
import { translate } from "../i18n/translations";
import StatSelector from "./StatSelector";
import { useDisplaySetScreen } from "../utils/DisplaySetScreenContext";
import SavedSetModal from "./modal/SavedSetModal";
import { shadow_3dp } from "./styles/theme";
import { toggleCheckList } from "../utils/toggleCheck";

const DisplaySetScreenPressablesContainer = () => {
  const th = useTheme();
  const { addSet } = useSetsList();

  const { pressedClassIds } = usePressableImages();

  const [foundStatsModalVisible, setFoundStatsModalVisible] = useState(false);

  const { toggleSavedSetModal } = useSavedSetModal();

  const { isStatsVisible, setIsStatsVisible } = useDisplaySetScreen();

  return (
    <View>
      <StatSliderResultSelectorPressable
        setFoundStatsModalVisible={setFoundStatsModalVisible}
      />
      <Pressable
        style={[button_icon(th).container, shadow_3dp]}
        onPress={() => addSet()}
      >
        <MaterialCommunityIcons name="plus" size={24} color={th.on_primary} />
      </Pressable>
      <Pressable
        onPress={() => {
          console.log("remove");
          AsyncStorage.clear();
          console.log("fin remove");
        }}
      >
        <Text>remove</Text>
      </Pressable>
      <Pressable
        style={[button_icon(th).container, shadow_3dp]}
        onPress={() => {
          toggleSavedSetModal(true);
        }}
      >
        <MaterialCommunityIcons
          name="download"
          size={24}
          color={th.on_primary}
        />
      </Pressable>
      <MyModal
        modalTitle={translate("StatsToDisplay")}
        isModalVisible={foundStatsModalVisible}
        setIsModalVisible={setFoundStatsModalVisible}
        ModalContentsList={[StatSelector]}
        contentPropsList={[
          {
            statList: isStatsVisible,
            toggleCheck: (name) => {
              toggleCheckList(setIsStatsVisible, name);
            },
          },
        ]}
      />

      <SavedSetModal />
    </View>
  );
};

export default DisplaySetScreenPressablesContainer;
