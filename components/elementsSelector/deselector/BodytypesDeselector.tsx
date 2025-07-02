// components/elementsSelector/BodytypesDeselector.tsx
import React, { memo, useCallback, useMemo } from "react";
import { Bodytype, BodytypeItem } from "@/data/bodytypes/bodytypeTypes";
import { bodytypesData } from "@/data/bodytypes/bodytypesData";
import BaseDeselector from "./BaseDeselector";

interface BodytypesDeselectorProps {
  selectedBodytypes: Set<Bodytype>;
  setSelectedBodytypes: React.Dispatch<React.SetStateAction<Set<Bodytype>>>;
}

const BodytypesDeselector: React.FC<BodytypesDeselectorProps> = ({ selectedBodytypes, setSelectedBodytypes }) => {
  const bodytypesToDisplay = useMemo(
    () => bodytypesData.filter((bodytype) => selectedBodytypes.has(bodytype.name)),
    [selectedBodytypes, bodytypesData]
  );

  const handleDeselectBodytype = useCallback(
    (bodytypeItem: BodytypeItem) => {
      setSelectedBodytypes((prev) => {
        const newSet = new Set(prev);
        newSet.delete(bodytypeItem.name);
        return newSet;
      });
    },
    [setSelectedBodytypes]
  );

  return (
    <BaseDeselector
      titleKey="SelectedBodytypes"
      isEmpty={bodytypesToDisplay.length === 0}
      itemsToDisplay={bodytypesToDisplay}
      handleDeselect={handleDeselectBodytype}
    />
  );
};

export default memo(BodytypesDeselector);
