// components/BodytypesSelector.tsx
import React, { useCallback, useMemo } from "react";
import { Bodytype } from "@/types";
import IconSelector from "./IconSelector";
import useThemeStore from "@/stores/useThemeStore";
import { StyleSheet } from "react-native";
import { GAP_ELEMENTS_GRID } from "@/utils/designTokens";
import { useGameData } from "@/hooks/useGameData";

interface BodytypesSelectorProps {
  selectedBodytypes: Set<Bodytype>;
  setSelectedBodytypes: React.Dispatch<React.SetStateAction<Set<Bodytype>>>;
}

const BodytypesSelector: React.FC<BodytypesSelectorProps> = ({ selectedBodytypes, setSelectedBodytypes }) => {
  const { bodytypesItems } = useGameData();

  const theme = useThemeStore((state) => state.theme);

  const handleSelect = useCallback(
    (bodytype: Bodytype) => {
      setSelectedBodytypes((prevSelected) => {
        const newSelected = new Set(prevSelected);
        if (newSelected.has(bodytype)) {
          newSelected.delete(bodytype);
        } else {
          newSelected.add(bodytype);
        }
        return newSelected;
      });
    },
    [setSelectedBodytypes]
  );

  const activeStyle = useMemo(() => ({ borderColor: theme.primary }), [theme.primary]);

  return (
    <IconSelector<Bodytype>
      options={bodytypesItems}
      selectedValues={selectedBodytypes}
      onSelect={handleSelect}
      activeStyle={activeStyle}
      buttonStyle={styles.button}
      containerStyle={styles.container}
      namespace="categories"
    />
  );
};

const styles = StyleSheet.create({
  container: { gap: GAP_ELEMENTS_GRID },
  button: { width: 63 },
});

export default React.memo(BodytypesSelector);
