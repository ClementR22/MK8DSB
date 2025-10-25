import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { ScrollView } from "react-native";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import showToast from "@/utils/showToast";
import useSetsListStore, { MAX_NUMBER_SETS_DISPLAY } from "@/stores/useSetsListStore";

interface ButtonAddSetProps {
  scrollRef: React.RefObject<ScrollView>;
}

const ButtonAddSet: React.FC<ButtonAddSetProps> = ({ scrollRef }) => {
  const addNewSetInDisplay = useSetsListStore((state) => state.addNewSetInDisplay);
  const setsListDisplayed = useSetsListStore((state) => state.setsListDisplayed);

  const timeoutRef = useRef(null);

  const disabled = useMemo(() => setsListDisplayed.length >= MAX_NUMBER_SETS_DISPLAY, [setsListDisplayed.length]);

  const handleAdd = useCallback(() => {
    try {
      addNewSetInDisplay();
    } catch (e) {
      showToast(e.message, "error");
      return; // Ne pas scroller en cas d'erreur
    }

    timeoutRef.current = setTimeout(() => {
      scrollRef?.current?.scrollToEnd({ animated: true });
    }, 50);
  }, [addNewSetInDisplay, scrollRef]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <ButtonIcon
      onPress={handleAdd}
      tooltipText="AddASet"
      iconName="plus"
      iconType={IconType.MaterialCommunityIcons}
      disabled={disabled}
    />
  );
};

export default React.memo(ButtonAddSet);
