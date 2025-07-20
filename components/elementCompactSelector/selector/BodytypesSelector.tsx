// components/BodytypesSelector.tsx
import React, { memo } from "react";
import { Bodytype } from "@/data/bodytypes/bodytypesTypes";
import IconSelector from "./IconSelector";
import { bodytypeImageSources } from "@/assets/images/bodytypeImageSources";
import { useThemeStore } from "@/stores/useThemeStore";

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

  const handleSelect = (bodytype: Bodytype) => {
    const newSelected = new Set(selectedBodytypes);
    if (newSelected.has(bodytype)) {
      newSelected.delete(bodytype);
    } else {
      newSelected.add(bodytype);
    }
    setSelectedBodytypes(newSelected);
  };

  return (
    <IconSelector<Bodytype>
      options={bodytypeOptions}
      selectedValues={selectedBodytypes}
      onSelect={handleSelect}
      buttonBaseStyle={{
        backgroundColor: theme.surface_container_high,
        borderColor: "transparent",
        borderWidth: 50 / 20,
      }}
      activeStyle={{ borderColor: theme.primary }}
    />
  );
});

export default BodytypesSelector;
