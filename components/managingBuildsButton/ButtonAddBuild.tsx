import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { ScrollView } from "react-native";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import showToast from "@/utils/showToast";
import useBuildsListStore, { MAX_NUMBER_BUILDS_DISPLAY } from "@/stores/useBuildsListStore";

interface ButtonAddBuildProps {
  scrollRef: React.RefObject<ScrollView>;
}

const ButtonAddBuild: React.FC<ButtonAddBuildProps> = ({ scrollRef }) => {
  const addNewBuildInDisplay = useBuildsListStore((state) => state.addNewBuildInDisplay);
  const buildsListDisplayed = useBuildsListStore((state) => state.buildsListDisplayed);

  const timeoutRef = useRef(null);

  const disabled = useMemo(() => buildsListDisplayed.length >= MAX_NUMBER_BUILDS_DISPLAY, [buildsListDisplayed.length]);

  const handleAdd = useCallback(() => {
    try {
      addNewBuildInDisplay();
    } catch (e) {
      showToast(`error:${e.message}`, "error");
      return; // Ne pas scroller en cas d'erreur
    }

    timeoutRef.current = setTimeout(() => {
      scrollRef?.current?.scrollToEnd({ animated: true });
    }, 50);
  }, [addNewBuildInDisplay, scrollRef]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <ButtonIcon
      onPress={handleAdd}
      tooltipText="addASet"
      iconName="plus"
      iconType={IconType.MaterialCommunityIcons}
      disabled={disabled}
    />
  );
};

export default React.memo(ButtonAddBuild);
