import { Category } from "@/types";
import { useGameData } from "./useGameData";
import { useMemo } from "react";
import { ImageSourcePropType } from "react-native";

type BuildImageCategory = {
  name: Category;
  imageUrl: ImageSourcePropType;
};

type BuildImage = {
  name: string;
  imageUrl: ImageSourcePropType;
};

// Overloads
export function useBuildImages(classIds: number[], onlySingle: true): BuildImageCategory[];

export function useBuildImages(classIds: number[], onlySingle?: false): BuildImage[][];

// Implementation
export function useBuildImages(classIds: number[], onlySingle = false) {
  const { elementsData, categories } = useGameData();

  const elementsByClassId = useMemo(() => {
    const map = new Map<number, (typeof elementsData)[number][]>();
    for (const el of elementsData) {
      if (!map.has(el.classId)) map.set(el.classId, []);
      map.get(el.classId)!.push(el);
    }
    return map;
  }, [elementsData]);

  return useMemo(() => {
    return categories
      .map((_, index: number) => {
        const matchedElements = elementsByClassId.get(classIds[index]) ?? [];

        if (onlySingle) {
          const element = matchedElements[0];
          if (!element) return null;

          return {
            name: element.category,
            imageUrl: element.imageUrl,
          };
        }

        return matchedElements.map((element) => ({
          name: element.name,
          imageUrl: element.imageUrl,
        }));
      })
      .filter(Boolean);
  }, [categories, elementsData, classIds, onlySingle]);
}
