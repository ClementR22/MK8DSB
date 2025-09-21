// components/BodytypesSelector.tsx
import React, { memo, useCallback, useMemo } from "react";
import { Bodytype } from "@/data/bodytypes/bodytypesTypes";
import IconSelector from "./IconSelector";
import { bodytypeImageSources } from "@/assets/images/bodytypeImageSources";
import { useThemeStore } from "@/stores/useThemeStore";
import { StyleSheet } from "react-native";

interface BodytypesSelectorProps {
  selectedBodytypes: Set<Bodytype>;
  setSelectedBodytypes: React.Dispatch<React.SetStateAction<Set<Bodytype>>>;
}

const bodytypeOptions = Object.entries(bodytypeImageSources).map(([name, imageUrl]) => ({
  name: name as Bodytype,
  imageUrl,
}));

const BodytypesSelector: React.FC<BodytypesSelectorProps> = memo(({ selectedBodytypes, setSelectedBodytypes }) => {
  const theme = useThemeStore((state) => state.theme);

  const handleSelect = useCallback(
    (bodytype: Bodytype) => {
      const newSelected = new Set(selectedBodytypes);
      if (newSelected.has(bodytype)) {
        newSelected.delete(bodytype);
      } else {
        newSelected.add(bodytype);
      }
      setSelectedBodytypes(newSelected);
    },
    [selectedBodytypes, setSelectedBodytypes]
  );

  const activeStyle = useMemo(() => ({ borderColor: theme.primary }), [theme.primary]);

  return (
    <IconSelector<Bodytype>
      options={bodytypeOptions}
      selectedValues={selectedBodytypes}
      onSelect={handleSelect}
      activeStyle={activeStyle}
      containerStyle={styles.container}
    />
  );
});

const styles = StyleSheet.create({
  container: { justifyContent: "space-between" },
});

export default React.memo(BodytypesSelector);
