// utils/sortElements.ts
import { translateToLanguage } from "@/translations/translations";

// Define a common interface for elements that can be sorted.
// Assuming all your elements (CharacterElement, BodyElement, etc.)
// have at least these properties.
interface SortableElement {
  id: number;
  name: string;
  classId: number; // Essential for "par classId" sorting
  // Add other properties if they are used in sorting (e.g., stats)
}

// OPTIMIZATION: Make this a pure function.
// It takes inputs and returns an output without side effects, and doesn't rely on React hooks internally.
export const sortElements = <T extends SortableElement>(
  elements: T[],
  orderNumber: number,
  language: string
): T[] => {
  // Always create a shallow copy to avoid mutating the original array passed to the function.
  const sortableElements = [...elements];

  const sortingStrategies: { [key: number]: (a: T, b: T) => number } = {
    0: (a, b) => a.id - b.id, // Sort by ID (e.g., "numero")
    1: (a, b) => translateToLanguage(a.name, language).localeCompare(translateToLanguage(b.name, language)), // A-Z by translated name (e.g., "ordre alphabetique")
    2: (a, b) => translateToLanguage(b.name, language).localeCompare(translateToLanguage(a.name, language)), // Z-A by translated name
    3: (a, b) => {
      // "Par classId" sorting:
      // First, sort by classId.
      const classComparison = a.classId - b.classId;
      if (classComparison !== 0) {
        return classComparison;
      }
      // If classIds are the same, use a secondary sort (e.g., by translated name)
      // to ensure a consistent order within each class.
      return translateToLanguage(a.name, language).localeCompare(translateToLanguage(b.name, language));
    },
    // Add other sorting strategies as needed
  };

  const strategy = sortingStrategies[orderNumber];

  if (!strategy) {
    // Fallback if orderNumber is out of the expected range.
    // Return the (copied) original list, or throw an error, depending on desired behavior.
    console.warn(`Unknown orderNumber: ${orderNumber}. Returning unsorted elements.`);
    return sortableElements;
  }

  // Perform the sort using the selected strategy.
  return sortableElements.sort(strategy);
};