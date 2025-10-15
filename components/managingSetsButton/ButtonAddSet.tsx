import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { ScrollView } from "react-native";
import useSetsStore, { MAX_NUMBER_SETS_DISPLAY } from "@/stores/useSetsStore";
import ButtonIcon from "../../primitiveComponents/ButtonIcon";
import { IconType } from "react-native-dynamic-vector-icons";
import { useLanguageStore } from "@/stores/useLanguageStore";
import showToast from "@/utils/showToast";
import { translateToLanguage } from "@/translations/translations";
import { formatErrorMessage } from "@/utils/formatErrorMessage";

interface ButtonAddSetProps {
  scrollRef: React.RefObject<ScrollView>;
}

const ButtonAddSet: React.FC<ButtonAddSetProps> = ({ scrollRef }) => {
  const language = useLanguageStore((state) => state.language);

  const addNewSetInDisplay = useSetsStore((state) => state.addNewSetInDisplay);
  const setsListDisplayed = useSetsStore((state) => state.setsListDisplayed);

  const timeoutRef = useRef(null);

  const disabled = useMemo(() => setsListDisplayed.length >= MAX_NUMBER_SETS_DISPLAY, [setsListDisplayed.length]);

  const handleAdd = useCallback(() => {
    try {
      addNewSetInDisplay();
    } catch (e) {
      showToast(formatErrorMessage(e, language));
      return; // Ne pas scroller en cas d'erreur
    }

    timeoutRef.current = setTimeout(() => {
      scrollRef?.current?.scrollToEnd({ animated: true });
    }, 50);
  }, [addNewSetInDisplay, language, scrollRef]);

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
