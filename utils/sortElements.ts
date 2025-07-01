// utils/sortElements.ts
import { translateToLanguage } from "@/translations/translations";

// Define a common interface for elements that can be sorted.
// This interface should reflect the properties available on your actual CharacterElement, BodyElement, etc.
// Add all properties you might need for sorting (like various speed/handling stats).
export interface SortableElement {
  id: number;
  name: string;
  classId: number; // Used for 'par classId' sorting
  speedGround?: number;
  speedAntiGravity?: number;
  speedWater?: number;
  speedAir?: number;
  acceleration?: number;
  weight?: number;
  handlingGround?: number;
  handlingAntiGravity?: number;
  handlingWater?: number;
  handlingAir?: number;
  traction?: number;
  miniTurbo?: number;
  // Add other relevant stat properties if they exist on your elements
}

/**
 * Sorts an array of elements based on a given order number and language.
 *
 * @param elements The array of elements to sort.
 * @param orderNumber A number representing the sorting strategy (even for ascending, odd for descending).
 * @param language The language to use for alphabetical sorting.
 * @returns A new array with the elements sorted according to the specified strategy.
 */
export const sortElements = <T extends SortableElement>(elements: T[], orderNumber: number, language: string): T[] => {
  // Always create a shallow copy to ensure the original array is not mutated.
  const sortableElements = [...elements];

  // Define sorting strategies mapped to their respective order numbers.
  // We will now have pairs of numbers for each sortable property:
  // Even number for ascending, Odd number for descending.
  const sortingStrategies: { [key: number]: (a: T, b: T) => number } = {
    // ID
    0: (a, b) => a.id - b.id, // ID Ascending (0)
    1: (a, b) => b.id - a.id, // ID Descending (1)

    // Name
    2: (a, b) => translateToLanguage(a.name, language).localeCompare(translateToLanguage(b.name, language)), // Name A-Z (2)
    3: (a, b) => translateToLanguage(b.name, language).localeCompare(translateToLanguage(a.name, language)), // Name Z-A (3)

    // Class ID
    4: (a, b) => {
      // Sort by Class ID Ascending (4)
      const classComparison = a.classId - b.classId;
      if (classComparison !== 0) {
        return classComparison;
      }
      // Secondary sort by translated name for stability within the same classId
      return translateToLanguage(a.name, language).localeCompare(translateToLanguage(b.name, language));
    },
    5: (a, b) => {
      // Sort by Class ID Descending (5)
      const classComparison = b.classId - a.classId; // Reverse comparison for classId
      if (classComparison !== 0) {
        return classComparison;
      }
      // Secondary sort by translated name for stability within the same classId
      // Keep secondary sort ascending by name unless you want to reverse that too
      return translateToLanguage(a.name, language).localeCompare(translateToLanguage(b.name, language));
    },

    // Speed Ground
    6: (a, b) => (a.speedGround || 0) - (b.speedGround || 0), // Speed Ground Ascending (6)
    7: (a, b) => (b.speedGround || 0) - (a.speedGround || 0), // Speed Ground Descending (7)

    // Speed Anti-Gravity
    8: (a, b) => (a.speedAntiGravity || 0) - (b.speedAntiGravity || 0), // Speed Anti-Gravity Ascending (8)
    9: (a, b) => (b.speedAntiGravity || 0) - (a.speedAntiGravity || 0), // Speed Anti-Gravity Descending (9)

    // Speed Water
    10: (a, b) => (a.speedWater || 0) - (b.speedWater || 0), // Speed Water Ascending (10)
    11: (a, b) => (b.speedWater || 0) - (a.speedWater || 0), // Speed Water Descending (11)

    // Speed Air
    12: (a, b) => (a.speedAir || 0) - (b.speedAir || 0), // Speed Air Ascending (12)
    13: (a, b) => (b.speedAir || 0) - (a.speedAir || 0), // Speed Air Descending (13)

    // Handling Ground
    14: (a, b) => (a.handlingGround || 0) - (b.handlingGround || 0), // Handling Ground Ascending (14)
    15: (a, b) => (b.handlingGround || 0) - (a.handlingGround || 0), // Handling Ground Descending (15)

    // Handling Anti-Gravity
    16: (a, b) => (a.handlingAntiGravity || 0) - (b.handlingAntiGravity || 0), // Handling Anti-Gravity Ascending (16)
    17: (a, b) => (b.handlingAntiGravity || 0) - (a.handlingAntiGravity || 0), // Handling Anti-Gravity Descending (17)

    // Handling Water
    18: (a, b) => (a.handlingWater || 0) - (b.handlingWater || 0), // Handling Water Ascending (18)
    19: (a, b) => (b.handlingWater || 0) - (a.handlingWater || 0), // Handling Water Descending (19)

    // Handling Air
    20: (a, b) => (a.handlingAir || 0) - (b.handlingAir || 0), // Handling Air Ascending (20)
    21: (a, b) => (b.handlingAir || 0) - (a.handlingAir || 0), // Handling Air Descending (21)

    // Acceleration
    22: (a, b) => (a.acceleration || 0) - (b.acceleration || 0), // Acceleration Ascending (22)
    23: (a, b) => (b.acceleration || 0) - (a.acceleration || 0), // Acceleration Descending (23)

    // Weight
    24: (a, b) => (a.weight || 0) - (b.weight || 0), // Weight Ascending (24)
    25: (a, b) => (b.weight || 0) - (a.weight || 0), // Weight Descending (25)

    // Traction
    26: (a, b) => (a.traction || 0) - (b.traction || 0), // Traction Ascending (26)
    27: (a, b) => (b.traction || 0) - (a.traction || 0), // Traction Descending (27)

    // Mini Turbo
    28: (a, b) => (a.miniTurbo || 0) - (b.miniTurbo || 0), // Mini Turbo Ascending (28)
    29: (a, b) => (b.miniTurbo || 0) - (a.miniTurbo || 0), // Mini Turbo Descending (29)
  };

  const strategy = sortingStrategies[orderNumber];

  if (!strategy) {
    // If the orderNumber does not correspond to a defined strategy,
    // log a warning and return the copied, unsorted elements.
    console.warn(`Unknown orderNumber for sorting: ${orderNumber}. Returning unsorted elements.`);
    return sortableElements;
  }

  return sortableElements.sort(strategy);
};
