import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

// Components import
import StatSlider from "@/components/StatSlider";
import { translate } from "@/translations/translations";
import SetCardContainer from "@/components/setCard/SetCardContainer";
import SearchSetScreenPressablesContainer from "@/components/screenPressablesContainer/SearchSetScreenPressablesContainer";
import ButtonLoadSet from "@/components/managingSetsPressable/ButtonLoadSet";
import { ScreenProvider } from "@/contexts/ScreenContext";
import { StatsVisibleListProvider, useStatsVisibleList } from "@/contexts/StatsVisibleListContext";
import BoxContainer from "@/components/BoxContainer";
import FlexContainer from "@/components/FlexContainer";
import RenameSetModal from "@/components/modal/RenameSetModal";
import useSetsStore from "@/stores/useSetsStore";
import useModalsStore from "@/stores/useModalsStore";
import { useThemeStore } from "@/stores/useThemeStore";
import Modal from "@/components/Modal";
import StatSelectorChosenStats from "@/components/statSelector/StatSelectorChosenStats";

const SearchSetScreen = () => {
  const theme = useThemeStore((state) => state.theme);
  const [setsToShow, setSetsToShow] = useState([]);
  const isTooltipVisible = useModalsStore((state) => state.isTooltipVisible);
  const isChosenStatsModalVisible = useModalsStore((state) => state.isChosenStatsModalVisible);
  const setIsChosenStatsModalVisible = useModalsStore((state) => state.setIsChosenStatsModalVisible);
  const [asyncChosenStats, setAsyncChosenStats] = useState([]);

  // Mettre à jour l'état asyncChosenStats à la fermeture du modal
  const onCloseChosenStatsModal = () => {
    const chosenStats = useSetsStore.getState().chosenStats;
    setAsyncChosenStats(chosenStats);

    setIsChosenStatsModalVisible(false);
  };

  // Initialise asyncChosenStats
  useEffect(() => {
    onCloseChosenStatsModal();
  }, []);

  return (
    <ScreenProvider screenName="search">
      <StatsVisibleListProvider>
        <ScrollView scrollEnabled={!isTooltipVisible}>
          <FlexContainer>
            <BoxContainer contentBackgroundColor={theme.surface_container_high}>
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
                {translate("DesiredStats")}
              </Text>

              <ButtonLoadSet tooltipText="LoadStatsOfASet" />

              {/* Afficher le slider uniquement si la case est cochée */}
              {asyncChosenStats.map((stat) => {
                const { name, value, checked, statFilterNumber } = stat;
                return (
                  checked && <StatSlider key={name} name={name} value={value} statFilterNumber={statFilterNumber} />
                );
              })}
            </BoxContainer>

            <SearchSetScreenPressablesContainer setSetsToShow={setSetsToShow} />
          </FlexContainer>

          <SetCardContainer setsToShow={setsToShow} />

          <RenameSetModal />

          <Modal
            modalTitle="DesiredStats"
            isModalVisible={isChosenStatsModalVisible}
            setIsModalVisible={setIsChosenStatsModalVisible}
            onClose={onCloseChosenStatsModal}
          >
            <StatSelectorChosenStats />
          </Modal>
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
