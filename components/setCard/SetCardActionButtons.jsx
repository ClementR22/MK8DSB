import React from "react";
import useSetsStore from "@/stores/useSetsStore";
import { useTheme } from "@/contexts/ThemeContext";
import BoxContainer from "../BoxContainer";
import TooltipWrapper from "../TooltipWrapper";
import { FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { button_icon } from "../styles/button";
import { shadow_3dp } from "@/components/styles/theme";
import useModalsStore from "@/stores/useModalsStore";

const SetCardActionButtons = React.memo(({ setCardIndex, config, situation }) => {
  const { theme } = useTheme();
  const saveSetFromDisplay = useSetsStore((state) => state.saveSetFromDisplay);
  const loadSetSaveToSearch = useSetsStore((state) => state.loadSetSaveToSearch);
  const loadSetSaveToDisplay = useSetsStore((state) => state.loadSetSaveToDisplay);
  const loadSetSearchToDisplay = useSetsStore((state) => state.loadSetSearchToDisplay);
  const loadSetDisplayToSearch = useSetsStore((state) => state.loadSetDisplayToSearch);
  const removeSet = useSetsStore((state) => state.removeSet);
  const exportSet = useSetsStore((state) => state.exportSet);
  const setSetCardEdittedIndex = useSetsStore((state) => state.setSetCardEdittedIndex);
  const setIsRenameSetModalVisible = useModalsStore((state) => state.setIsRenameSetModalVisible);
  const setIsEditModalVisible = useModalsStore((state) => state.setIsEditModalVisible);

  const onEditPress = () => {
    setSetCardEdittedIndex(setCardIndex);
    setIsEditModalVisible(true);
  };

  const onSavePress = () => {
    setSetCardEdittedIndex(setCardIndex);
    situation === "search" ? setIsRenameSetModalVisible(true) : saveSetFromDisplay(setCardIndex);
  };

  return (
    <BoxContainer flexDirection="row" key="displaySetActionButtonContainer" margin={0}>
      {config.showEdit && (
        <TooltipWrapper tooltipText="Edit" style={[button_icon(theme).container, shadow_3dp]} onPress={onEditPress}>
          <MaterialIcons name="edit" size={24} color={theme.on_primary} />
        </TooltipWrapper>
      )}

      {config.showRemove && (
        <TooltipWrapper
          tooltipText="Remove"
          style={[button_icon(theme).container, shadow_3dp]}
          onPress={() => {
            removeSet(setCardIndex, situation);
          }}
        >
          <Ionicons name="close" size={24} color={theme.on_primary} />
        </TooltipWrapper>
      )}

      {config.showSave && (
        <TooltipWrapper tooltipText="Save" style={[button_icon(theme).container, shadow_3dp]} onPress={onSavePress}>
          <MaterialIcons name="save" size={24} color={theme.on_primary} />
        </TooltipWrapper>
      )}

      {config.showLoadSaveToSearch && (
        <TooltipWrapper
          tooltipText={situation === "load" ? "LoadTheStats" : "LoadTheStatsToSearchScreen"}
          style={[button_icon(theme).container, shadow_3dp]}
          onPress={() => loadSetSaveToSearch(setCardIndex)}
        >
          <MaterialCommunityIcons
            name={situation === "save" ? "magnify" : "download"}
            size={24}
            color={theme.on_primary}
          />
        </TooltipWrapper>
      )}

      {config.showLoadSaveToDisplay && (
        <TooltipWrapper
          tooltipText={situation === "load" ? "LoadTheSet" : "LoadTheSetToDisplayScreen"}
          style={[button_icon(theme).container, shadow_3dp]}
          onPress={() => loadSetSaveToDisplay(setCardIndex)}
        >
          <MaterialIcons
            name={situation === "save" ? "display-settings" : "download"}
            size={24}
            color={theme.on_primary}
          />
        </TooltipWrapper>
      )}

      {config.showLoadSearchToDisplay && (
        <TooltipWrapper
          tooltipText="LoadTheSetToDisplayScreen"
          style={[button_icon(theme).container, shadow_3dp]}
          onPress={() => loadSetSearchToDisplay(setCardIndex)}
        >
          <MaterialIcons name="display-settings" size={24} color={theme.on_primary} />
        </TooltipWrapper>
      )}

      {config.showLoadDisplayToSearch && (
        <TooltipWrapper
          tooltipText="LoadTheStatsToSearchScreen"
          style={[button_icon(theme).container, shadow_3dp]}
          onPress={() => loadSetDisplayToSearch(setCardIndex)}
        >
          <MaterialCommunityIcons name="magnify" size={24} color={theme.on_primary} />
        </TooltipWrapper>
      )}

      {config.showRemoveInMemory && (
        <TooltipWrapper
          tooltipText="Remove"
          style={[button_icon(theme).container, shadow_3dp]}
          onPress={() => removeSetInMemory(setCardIndex)}
        >
          <MaterialCommunityIcons name="trash-can" size={24} color={theme.on_primary} />
        </TooltipWrapper>
      )}

      {config.showExport && (
        <TooltipWrapper
          tooltipText="Export"
          style={[button_icon(theme).container, shadow_3dp]}
          onPress={() => exportSet(setCardIndex, situation)}
        >
          <FontAwesome6 name="share" size={24} color={theme.on_primary} />
        </TooltipWrapper>
      )}
    </BoxContainer>
  );
});

export default SetCardActionButtons;
