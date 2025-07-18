import { baseStatsByClassId } from "../classStats";
import {
  ElementDataCharacter,
  ElementDataBody,
  ElementDataWheel,
  ElementDataGlider,
  ElementStats,
  ElementData,
  Category,
} from "./elementsTypes";

export const categories: Category[] = ["character", "body", "wheel", "glider"];

function getElementStats(classId: number, overrides?: Partial<ElementStats>): ElementStats {
  const baseStats = baseStatsByClassId[classId];

  if (!baseStats) {
    // Fallback for classIds not yet defined, or if you prefer a strict check
    console.warn(`Warning: No base stats found for classId: ${classId}. Using default zero stats.`);
    return {
      speedGround: 0,
      speedAntiGravity: 0,
      speedWater: 0,
      speedAir: 0,
      acceleration: 0,
      weight: 0,
      handlingGround: 0,
      handlingAntiGravity: 0,
      handlingWater: 0,
      handlingAir: 0,
      traction: 0,
      miniTurbo: 0,
    };
  }
  return { ...baseStats, ...overrides };
}

export const elementsData = [
  // --- Characters ---
  {
    id: 0,
    name: "Mario",
    category: "character",
    classId: 9,
    imageUrl: require("@/assets/images/elementsImages/characters/Mario.png"),
    ...getElementStats(9),
  } as ElementDataCharacter,
  {
    id: 1,
    name: "Luigi",
    category: "character",
    classId: 10,
    imageUrl: require("@/assets/images/elementsImages/characters/Luigi.png"),
    ...getElementStats(10),
  } as ElementDataCharacter,
  {
    id: 2,
    name: "Peach",
    category: "character",
    classId: 7,
    imageUrl: require("@/assets/images/elementsImages/characters/Peach.png"),
    ...getElementStats(7),
  } as ElementDataCharacter,
  {
    id: 3,
    name: "Daisy",
    category: "character",
    classId: 7,
    imageUrl: require("@/assets/images/elementsImages/characters/Daisy.png"),
    ...getElementStats(7),
  } as ElementDataCharacter,
  {
    id: 4,
    name: "Rosalina",
    category: "character",
    classId: 11,
    imageUrl: require("@/assets/images/elementsImages/characters/Rosalina.png"),
    ...getElementStats(11),
  } as ElementDataCharacter,
  {
    id: 5,
    name: "TanookiMario",
    category: "character",
    classId: 8,
    imageUrl: require("@/assets/images/elementsImages/characters/Tanooki Mario.png"),
    ...getElementStats(8),
  } as ElementDataCharacter,
  {
    id: 6,
    name: "CatPeach",
    category: "character",
    classId: 6,
    imageUrl: require("@/assets/images/elementsImages/characters/Cat Peach.png"),
    ...getElementStats(6),
  } as ElementDataCharacter,
  {
    id: 7,
    name: "Birdo",
    category: "character",
    classId: 7,
    imageUrl: require("@/assets/images/elementsImages/characters/Birdo.png"),
    ...getElementStats(7),
  } as ElementDataCharacter,
  {
    id: 8,
    name: "Yoshi",
    category: "character",
    classId: 7,
    imageUrl: require("@/assets/images/elementsImages/characters/Yoshi.png"),
    ...getElementStats(7),
  } as ElementDataCharacter,
  {
    id: 9,
    name: "Toad",
    category: "character",
    classId: 5,
    imageUrl: require("@/assets/images/elementsImages/characters/Toad.png"),
    ...getElementStats(5),
  } as ElementDataCharacter,
  {
    id: 10,
    name: "Koopa",
    category: "character",
    classId: 4,
    imageUrl: require("@/assets/images/elementsImages/characters/Koopa.png"),
    ...getElementStats(4),
  } as ElementDataCharacter,
  {
    id: 11,
    name: "ShyGuy",
    category: "character",
    classId: 5,
    imageUrl: require("@/assets/images/elementsImages/characters/Shy Guy.png"),
    ...getElementStats(5),
  } as ElementDataCharacter,
  {
    id: 12,
    name: "Lakitu",
    category: "character",
    classId: 4,
    imageUrl: require("@/assets/images/elementsImages/characters/Lakitu.png"),
    ...getElementStats(4),
  } as ElementDataCharacter,
  {
    id: 13,
    name: "Toadette",
    category: "character",
    classId: 3,
    imageUrl: require("@/assets/images/elementsImages/characters/Toadette.png"),
    ...getElementStats(3),
  } as ElementDataCharacter,
  {
    id: 14,
    name: "KingBoo",
    category: "character",
    classId: 11,
    imageUrl: require("@/assets/images/elementsImages/characters/King Boo.png"),
    ...getElementStats(11),
  } as ElementDataCharacter,
  {
    id: 15,
    name: "PeteyPiranha",
    category: "character",
    classId: 12,
    imageUrl: require("@/assets/images/elementsImages/characters/Petey Piranha.png"),
    ...getElementStats(12),
  } as ElementDataCharacter,
  {
    id: 16,
    name: "BabyMario",
    category: "character",
    classId: 2,
    imageUrl: require("@/assets/images/elementsImages/characters/Baby Mario.png"),
    ...getElementStats(2),
  } as ElementDataCharacter,
  {
    id: 17,
    name: "BabyLuigi",
    category: "character",
    classId: 2,
    imageUrl: require("@/assets/images/elementsImages/characters/Baby Luigi.png"),
    ...getElementStats(2),
  } as ElementDataCharacter,
  {
    id: 18,
    name: "BabyPeach",
    category: "character",
    classId: 0,
    imageUrl: require("@/assets/images/elementsImages/characters/Baby Peach.png"),
    ...getElementStats(0),
  } as ElementDataCharacter,
  {
    id: 19,
    name: "BabyDaisy",
    category: "character",
    classId: 0,
    imageUrl: require("@/assets/images/elementsImages/characters/Baby Daisy.png"),
    ...getElementStats(0),
  } as ElementDataCharacter,
  {
    id: 20,
    name: "BabyRosalina",
    category: "character",
    classId: 1,
    imageUrl: require("@/assets/images/elementsImages/characters/Baby Rosalina.png"),
    ...getElementStats(1),
  } as ElementDataCharacter,
  {
    id: 21,
    name: "MetalMario",
    category: "character",
    classId: 12,
    imageUrl: require("@/assets/images/elementsImages/characters/Metal Mario.png"),
    // Example of an override if Metal Mario had unique stats compared to other class 12 characters
    ...getElementStats(12, { speedGround: 5.3, weight: 5.1 }),
  } as ElementDataCharacter,
  {
    id: 22,
    name: "PinkGoldPeach",
    category: "character",
    classId: 12,
    imageUrl: require("@/assets/images/elementsImages/characters/Pink Gold Peach.png"),
    ...getElementStats(12),
  } as ElementDataCharacter,
  {
    id: 23,
    name: "Wiggler",
    category: "character",
    classId: 13,
    imageUrl: require("@/assets/images/elementsImages/characters/Wiggler.png"),
    ...getElementStats(13),
  } as ElementDataCharacter,
  {
    id: 24,
    name: "Wario",
    category: "character",
    classId: 14,
    imageUrl: require("@/assets/images/elementsImages/characters/Wario.png"),
    ...getElementStats(14),
  } as ElementDataCharacter,
  {
    id: 25,
    name: "Waluigi",
    category: "character",
    classId: 13,
    imageUrl: require("@/assets/images/elementsImages/characters/Waluigi.png"),
    ...getElementStats(13),
  } as ElementDataCharacter,
  {
    id: 26,
    name: "DonkeyKong",
    category: "character",
    classId: 13,
    imageUrl: require("@/assets/images/elementsImages/characters/Donkey Kong.png"),
    ...getElementStats(13),
  } as ElementDataCharacter,
  {
    id: 27,
    name: "Bowser",
    category: "character",
    classId: 15,
    imageUrl: require("@/assets/images/elementsImages/characters/Bowser.png"),
    ...getElementStats(15),
  } as ElementDataCharacter,
  {
    id: 28,
    name: "DryBones",
    category: "character",
    classId: 2,
    imageUrl: require("@/assets/images/elementsImages/characters/Dry Bones.png"),
    ...getElementStats(2),
  } as ElementDataCharacter,
  {
    id: 29,
    name: "BowserJr.",
    category: "character",
    classId: 4,
    imageUrl: require("@/assets/images/elementsImages/characters/Bowser Jr..png"),
    ...getElementStats(4),
  } as ElementDataCharacter,
  {
    id: 30,
    name: "DryBowser",
    category: "character",
    classId: 14,
    imageUrl: require("@/assets/images/elementsImages/characters/Dry Bowser.png"),
    ...getElementStats(14),
  } as ElementDataCharacter,
  {
    id: 31,
    name: "Kamek",
    category: "character",
    classId: 10,
    imageUrl: require("@/assets/images/elementsImages/characters/Kamek.png"),
    ...getElementStats(10),
  } as ElementDataCharacter,
  {
    id: 32,
    name: "Lemmy",
    category: "character",
    classId: 1,
    imageUrl: require("@/assets/images/elementsImages/characters/Lemmy.png"),
    ...getElementStats(1),
  } as ElementDataCharacter,
  {
    id: 33,
    name: "Larry",
    category: "character",
    classId: 5,
    imageUrl: require("@/assets/images/elementsImages/characters/Larry.png"),
    ...getElementStats(5),
  } as ElementDataCharacter,
  {
    id: 34,
    name: "Wendy",
    category: "character",
    classId: 3,
    imageUrl: require("@/assets/images/elementsImages/characters/Wendy.png"),
    ...getElementStats(3),
  } as ElementDataCharacter,
  {
    id: 35,
    name: "Ludwig",
    category: "character",
    classId: 9,
    imageUrl: require("@/assets/images/elementsImages/characters/Ludwig.png"),
    ...getElementStats(9),
  } as ElementDataCharacter,
  {
    id: 36,
    name: "Iggy",
    category: "character",
    classId: 10,
    imageUrl: require("@/assets/images/elementsImages/characters/Iggy.png"),
    ...getElementStats(10),
  } as ElementDataCharacter,
  {
    id: 37,
    name: "Roy",
    category: "character",
    classId: 13,
    imageUrl: require("@/assets/images/elementsImages/characters/Roy.png"),
    ...getElementStats(13),
  } as ElementDataCharacter,
  {
    id: 38,
    name: "Morton",
    category: "character",
    classId: 15,
    imageUrl: require("@/assets/images/elementsImages/characters/Morton.png"),
    ...getElementStats(15),
  } as ElementDataCharacter,
  {
    id: 39,
    name: "Peachette",
    category: "character",
    classId: 7,
    imageUrl: require("@/assets/images/elementsImages/characters/Peachette.png"),
    ...getElementStats(7),
  } as ElementDataCharacter,
  {
    id: 40,
    name: "InklingGirl",
    category: "character",
    classId: 6,
    imageUrl: require("@/assets/images/elementsImages/characters/Inkling Girl.png"),
    ...getElementStats(6),
  } as ElementDataCharacter,
  {
    id: 41,
    name: "InklingBoy",
    category: "character",
    classId: 8,
    imageUrl: require("@/assets/images/elementsImages/characters/Inkling Boy.png"),
    ...getElementStats(8),
  } as ElementDataCharacter,
  {
    id: 42,
    name: "VillagerMale",
    category: "character",
    classId: 8,
    imageUrl: require("@/assets/images/elementsImages/characters/Villager Male.png"),
    ...getElementStats(8),
  } as ElementDataCharacter,
  {
    id: 43,
    name: "VillagerFemale",
    category: "character",
    classId: 6,
    imageUrl: require("@/assets/images/elementsImages/characters/Villager Female.png"),
    ...getElementStats(6),
  } as ElementDataCharacter,
  {
    id: 44,
    name: "Isabelle",
    category: "character",
    classId: 3,
    imageUrl: require("@/assets/images/elementsImages/characters/Isabelle.png"),
    ...getElementStats(3),
  } as ElementDataCharacter,
  {
    id: 45,
    name: "Link",
    category: "character",
    classId: 11,
    imageUrl: require("@/assets/images/elementsImages/characters/Link.png"),
    ...getElementStats(11),
  } as ElementDataCharacter,
  {
    id: 46,
    name: "DiddyKong",
    category: "character",
    classId: 6,
    imageUrl: require("@/assets/images/elementsImages/characters/Diddy Kong.png"),
    ...getElementStats(6),
  } as ElementDataCharacter,
  {
    id: 47,
    name: "FunkyKong",
    category: "character",
    classId: 14,
    imageUrl: require("@/assets/images/elementsImages/characters/Funky Kong.png"),
    ...getElementStats(14),
  } as ElementDataCharacter,
  {
    id: 48,
    name: "Pauline",
    category: "character",
    classId: 11,
    imageUrl: require("@/assets/images/elementsImages/characters/Pauline.png"),
    ...getElementStats(11),
  } as ElementDataCharacter,
  {
    id: 49,
    name: "LightMii",
    category: "character",
    classId: 2,
    imageUrl: require("@/assets/images/elementsImages/characters/Light Mii.png"),
    ...getElementStats(2),
  } as ElementDataCharacter,
  {
    id: 50,
    name: "MediumMii",
    category: "character",
    classId: 9,
    imageUrl: require("@/assets/images/elementsImages/characters/Medium Mii.png"),
    ...getElementStats(9),
  } as ElementDataCharacter,
  {
    id: 51,
    name: "HeavyMii",
    category: "character",
    classId: 14,
    imageUrl: require("@/assets/images/elementsImages/characters/Heavy Mii.png"),
    ...getElementStats(14),
  } as ElementDataCharacter,

  // --- Bodies (Karts, Bikes, ATVs) ---
  {
    id: 52,
    name: "StandardKart",
    category: "body",
    bodytype: "kart",
    classId: 16,
    imageUrl: require("@/assets/images/elementsImages/karts/Standard Kart.png"),
    ...getElementStats(16),
  } as ElementDataBody,
  {
    id: 53,
    name: "PipeFrame",
    category: "body",
    bodytype: "kart",
    classId: 17,
    imageUrl: require("@/assets/images/elementsImages/karts/Pipe Frame.png"),
    ...getElementStats(17),
  } as ElementDataBody,
  {
    id: 54,
    name: "Mach8",
    category: "body",
    bodytype: "kart",
    classId: 18,
    imageUrl: require("@/assets/images/elementsImages/karts/Mach 8.png"),
    ...getElementStats(18),
  } as ElementDataBody,
  {
    id: 55,
    name: "SteelDriver",
    category: "body",
    bodytype: "kart",
    classId: 19,
    imageUrl: require("@/assets/images/elementsImages/karts/Steel Driver.png"),
    ...getElementStats(19),
  } as ElementDataBody,
  {
    id: 56,
    name: "CatCruiser",
    category: "body",
    bodytype: "kart",
    classId: 20,
    imageUrl: require("@/assets/images/elementsImages/karts/Cat Cruiser.png"),
    ...getElementStats(20),
  } as ElementDataBody,
  {
    id: 57,
    name: "CircuitSpecial",
    category: "body",
    bodytype: "kart",
    classId: 21,
    imageUrl: require("@/assets/images/elementsImages/karts/Circuit Special.png"),
    ...getElementStats(21),
  } as ElementDataBody,
  {
    id: 58,
    name: "Tri-Speeder",
    category: "body",
    bodytype: "kart",
    classId: 19,
    imageUrl: require("@/assets/images/elementsImages/karts/Tri-Speeder.png"),
    ...getElementStats(19),
  } as ElementDataBody,
  {
    id: 59,
    name: "Badwagon",
    category: "body",
    bodytype: "kart",
    classId: 22,
    imageUrl: require("@/assets/images/elementsImages/karts/Badwagon.png"),
    ...getElementStats(22),
  } as ElementDataBody,
  {
    id: 60,
    name: "Prancer",
    category: "body",
    bodytype: "kart",
    classId: 23,
    imageUrl: require("@/assets/images/elementsImages/karts/Prancer.png"),
    ...getElementStats(23),
  } as ElementDataBody,
  {
    id: 61,
    name: "Biddybuggy",
    category: "body",
    bodytype: "kart",
    classId: 24,
    imageUrl: require("@/assets/images/elementsImages/karts/Biddybuggy.png"),
    ...getElementStats(24),
  } as ElementDataBody,
  {
    id: 62,
    name: "Landship",
    category: "body",
    bodytype: "kart",
    classId: 25,
    imageUrl: require("@/assets/images/elementsImages/karts/Landship.png"),
    ...getElementStats(25),
  } as ElementDataBody,
  {
    id: 63,
    name: "Sneaker",
    category: "body",
    bodytype: "kart",
    classId: 26,
    imageUrl: require("@/assets/images/elementsImages/karts/Sneaker.png"),
    ...getElementStats(26),
  } as ElementDataBody,
  {
    id: 64,
    name: "SportsCoupe",
    category: "body",
    bodytype: "kart",
    classId: 18,
    imageUrl: require("@/assets/images/elementsImages/karts/Sports Coupe.png"),
    ...getElementStats(18),
  } as ElementDataBody,
  {
    id: 65,
    name: "GoldKart",
    category: "body",
    bodytype: "kart",
    classId: 26,
    imageUrl: require("@/assets/images/elementsImages/karts/Gold Kart.png"),
    ...getElementStats(26),
  } as ElementDataBody,
  {
    id: 66,
    name: "GLA",
    category: "body",
    bodytype: "kart",
    classId: 22,
    imageUrl: require("@/assets/images/elementsImages/karts/GLA.png"),
    ...getElementStats(22),
  } as ElementDataBody,
  {
    id: 67,
    name: "W25SilverArrow",
    category: "body",
    bodytype: "kart",
    classId: 27,
    imageUrl: require("@/assets/images/elementsImages/karts/W 25 Silver Arrow.png"),
    ...getElementStats(27),
  } as ElementDataBody,
  {
    id: 68,
    name: "300SLRoadster",
    category: "body",
    bodytype: "kart",
    classId: 16,
    imageUrl: require("@/assets/images/elementsImages/karts/300 SL Roadster.png"),
    ...getElementStats(16),
  } as ElementDataBody,
  {
    id: 69,
    name: "BlueFalcon",
    category: "body",
    bodytype: "kart",
    classId: 28,
    imageUrl: require("@/assets/images/elementsImages/karts/Blue Falcon.png"),
    ...getElementStats(28),
  } as ElementDataBody,
  {
    id: 70,
    name: "TanookiBuggy",
    category: "body",
    bodytype: "kart",
    classId: 29,
    imageUrl: require("@/assets/images/elementsImages/karts/Tanooki Buggy.png"),
    ...getElementStats(29),
  } as ElementDataBody,
  {
    id: 71,
    name: "B-Dasher",
    category: "body",
    bodytype: "kart",
    classId: 21,
    imageUrl: require("@/assets/images/elementsImages/karts/B-Dasher.png"),
    ...getElementStats(21),
  } as ElementDataBody,
  {
    id: 72,
    name: "Streetle",
    category: "body",
    bodytype: "kart",
    classId: 25,
    imageUrl: require("@/assets/images/elementsImages/karts/Streetle.png"),
    ...getElementStats(25),
  } as ElementDataBody,
  {
    id: 73,
    name: "P-Wing",
    category: "body",
    bodytype: "kart",
    classId: 21,
    imageUrl: require("@/assets/images/elementsImages/karts/P-Wing.png"),
    ...getElementStats(21),
  } as ElementDataBody,
  {
    id: 74,
    name: "KoopaClown",
    category: "body",
    bodytype: "kart",
    classId: 29,
    imageUrl: require("@/assets/images/elementsImages/karts/Koopa Clown.png"),
    ...getElementStats(29),
  } as ElementDataBody,
  {
    id: 75,
    name: "StandardBike",
    category: "body",
    bodytype: "bike",
    classId: 27,
    imageUrl: require("@/assets/images/elementsImages/bikes/Standard Bike.png"),
    ...getElementStats(27),
  } as ElementDataBody,
  {
    id: 76,
    name: "TheDuke",
    category: "body",
    bodytype: "bike",
    classId: 16,
    imageUrl: require("@/assets/images/elementsImages/bikes/The Duke.png"),
    ...getElementStats(16),
  } as ElementDataBody,
  {
    id: 77,
    name: "FlameRider",
    category: "body",
    bodytype: "bike",
    classId: 27,
    imageUrl: require("@/assets/images/elementsImages/bikes/Flame Rider.png"),
    ...getElementStats(27),
  } as ElementDataBody,
  {
    id: 78,
    name: "Varmint",
    category: "body",
    bodytype: "bike",
    classId: 17,
    imageUrl: require("@/assets/images/elementsImages/bikes/Varmint.png"),
    ...getElementStats(17),
  } as ElementDataBody,
  {
    id: 79,
    name: "Mr.Scooty",
    category: "body",
    bodytype: "bike",
    classId: 24,
    imageUrl: require("@/assets/images/elementsImages/bikes/Mr. Scooty.png"),
    ...getElementStats(24),
  } as ElementDataBody,
  {
    id: 80,
    name: "MasterCycleZero",
    category: "body",
    bodytype: "bike",
    classId: 29,
    imageUrl: require("@/assets/images/elementsImages/bikes/Master Cycle Zero.png"),
    ...getElementStats(29),
  } as ElementDataBody,
  {
    id: 81,
    name: "CityTripper",
    category: "body",
    bodytype: "bike",
    classId: 17,
    imageUrl: require("@/assets/images/elementsImages/bikes/City Tripper.png"),
    ...getElementStats(17),
  } as ElementDataBody,
  {
    id: 82,
    name: "Comet",
    category: "body",
    bodytype: "sportBike",
    classId: 20,
    imageUrl: require("@/assets/images/elementsImages/sportBikes/Comet.png"),
    ...getElementStats(20),
  } as ElementDataBody,
  {
    id: 83,
    name: "SportBike",
    category: "body",
    bodytype: "sportBike",
    classId: 23,
    imageUrl: require("@/assets/images/elementsImages/sportBikes/Sport Bike.png"),
    ...getElementStats(23),
  } as ElementDataBody,
  {
    id: 84,
    name: "JetBike",
    category: "body",
    bodytype: "sportBike",
    classId: 23,
    imageUrl: require("@/assets/images/elementsImages/sportBikes/Jet Bike.png"),
    ...getElementStats(23),
  } as ElementDataBody,
  {
    id: 85,
    name: "YoshiBike",
    category: "body",
    bodytype: "sportBike",
    classId: 20,
    imageUrl: require("@/assets/images/elementsImages/sportBikes/Yoshi Bike.png"),
    ...getElementStats(20),
  } as ElementDataBody,
  {
    id: 86,
    name: "MasterCycle",
    category: "body",
    bodytype: "sportBike",
    classId: 26,
    imageUrl: require("@/assets/images/elementsImages/sportBikes/Master Cycle.png"),
    ...getElementStats(26),
  } as ElementDataBody,
  {
    id: 87,
    name: "StandardATV",
    category: "body",
    bodytype: "ATV",
    classId: 22,
    imageUrl: require("@/assets/images/elementsImages/ATVs/Standard ATV.png"),
    ...getElementStats(22),
  } as ElementDataBody,
  {
    id: 88,
    name: "WildWiggler",
    category: "body",
    bodytype: "ATV",
    classId: 27,
    imageUrl: require("@/assets/images/elementsImages/ATVs/Wild Wiggler.png"),
    ...getElementStats(27),
  } as ElementDataBody,
  {
    id: 89,
    name: "TeddyBuggy",
    category: "body",
    bodytype: "ATV",
    classId: 20,
    imageUrl: require("@/assets/images/elementsImages/ATVs/Teddy Buggy.png"),
    ...getElementStats(20),
  } as ElementDataBody,
  {
    id: 90,
    name: "BoneRattler",
    category: "body",
    bodytype: "ATV",
    classId: 19,
    imageUrl: require("@/assets/images/elementsImages/ATVs/Bone Rattler.png"),
    ...getElementStats(19),
  } as ElementDataBody,
  {
    id: 91,
    name: "SplatBuggy",
    category: "body",
    bodytype: "ATV",
    classId: 28,
    imageUrl: require("@/assets/images/elementsImages/ATVs/Splat Buggy.png"),
    ...getElementStats(28),
  } as ElementDataBody,
  {
    id: 92,
    name: "Inkstriker",
    category: "body",
    bodytype: "ATV",
    classId: 18,
    imageUrl: require("@/assets/images/elementsImages/ATVs/Inkstriker.png"),
    ...getElementStats(18),
  } as ElementDataBody,

  // --- Wheels ---
  {
    id: 93,
    name: "Standard",
    category: "wheel",
    classId: 30,
    imageUrl: require("@/assets/images/elementsImages/wheels/Standard.png"),
    ...getElementStats(30),
  } as ElementDataWheel,
  {
    id: 94,
    name: "Monster",
    category: "wheel",
    classId: 31,
    imageUrl: require("@/assets/images/elementsImages/wheels/Monster.png"),
    ...getElementStats(31),
  } as ElementDataWheel,
  {
    id: 95,
    name: "Roller",
    category: "wheel",
    classId: 32,
    imageUrl: require("@/assets/images/elementsImages/wheels/Roller.png"),
    ...getElementStats(32),
  } as ElementDataWheel,
  {
    id: 96,
    name: "Slim",
    category: "wheel",
    classId: 33,
    imageUrl: require("@/assets/images/elementsImages/wheels/Slim.png"),
    ...getElementStats(33),
  } as ElementDataWheel,
  {
    id: 97,
    name: "Slick",
    category: "wheel",
    classId: 34,
    imageUrl: require("@/assets/images/elementsImages/wheels/Slick.png"),
    ...getElementStats(34),
  } as ElementDataWheel,
  {
    id: 98,
    name: "Metal",
    category: "wheel",
    classId: 35,
    imageUrl: require("@/assets/images/elementsImages/wheels/Metal.png"),
    ...getElementStats(35),
  } as ElementDataWheel,
  {
    id: 99,
    name: "Button",
    category: "wheel",
    classId: 36,
    imageUrl: require("@/assets/images/elementsImages/wheels/Button.png"),
    ...getElementStats(36),
  } as ElementDataWheel,
  {
    id: 100,
    name: "Off-Road",
    category: "wheel",
    classId: 37,
    imageUrl: require("@/assets/images/elementsImages/wheels/Off-Road.png"),
    ...getElementStats(37),
  } as ElementDataWheel,
  {
    id: 101,
    name: "Sponge",
    category: "wheel",
    classId: 38,
    imageUrl: require("@/assets/images/elementsImages/wheels/Sponge.png"),
    ...getElementStats(38),
  } as ElementDataWheel,
  {
    id: 102,
    name: "Wood",
    category: "wheel",
    classId: 33,
    imageUrl: require("@/assets/images/elementsImages/wheels/Wood.png"),
    ...getElementStats(33),
  } as ElementDataWheel,
  {
    id: 103,
    name: "Cushion",
    category: "wheel",
    classId: 38,
    imageUrl: require("@/assets/images/elementsImages/wheels/Cushion.png"),
    ...getElementStats(38),
  } as ElementDataWheel,
  {
    id: 104,
    name: "BlueStandard",
    category: "wheel",
    classId: 30,
    imageUrl: require("@/assets/images/elementsImages/wheels/Blue Standard.png"),
    ...getElementStats(30),
  } as ElementDataWheel,
  {
    id: 105,
    name: "HotMonster",
    category: "wheel",
    classId: 31,
    imageUrl: require("@/assets/images/elementsImages/wheels/Hot Monster.png"),
    ...getElementStats(31),
  } as ElementDataWheel,
  {
    id: 106,
    name: "AzureRoller",
    category: "wheel",
    classId: 32,
    imageUrl: require("@/assets/images/elementsImages/wheels/Azure Roller.png"),
    ...getElementStats(32),
  } as ElementDataWheel,
  {
    id: 107,
    name: "CrimsonSlim",
    category: "wheel",
    classId: 33,
    imageUrl: require("@/assets/images/elementsImages/wheels/Crimson Slim.png"),
    ...getElementStats(33),
  } as ElementDataWheel,
  {
    id: 108,
    name: "CyberSlick",
    category: "wheel",
    classId: 34,
    imageUrl: require("@/assets/images/elementsImages/wheels/Cyber Slick.png"),
    ...getElementStats(34),
  } as ElementDataWheel,
  {
    id: 109,
    name: "RetroOff-Road",
    category: "wheel",
    classId: 37,
    imageUrl: require("@/assets/images/elementsImages/wheels/Retro Off-Road.png"),
    ...getElementStats(37),
  } as ElementDataWheel,
  {
    id: 110,
    name: "GoldTires",
    category: "wheel",
    classId: 35,
    imageUrl: require("@/assets/images/elementsImages/wheels/Gold Tires.png"),
    ...getElementStats(35),
  } as ElementDataWheel,
  {
    id: 111,
    name: "GLATires",
    category: "wheel",
    classId: 30,
    imageUrl: require("@/assets/images/elementsImages/wheels/GLA Tires.png"),
    ...getElementStats(30),
  } as ElementDataWheel,
  {
    id: 112,
    name: "TriforceTires",
    category: "wheel",
    classId: 37,
    imageUrl: require("@/assets/images/elementsImages/wheels/Triforce Tires.png"),
    ...getElementStats(37),
  } as ElementDataWheel,
  {
    id: 113,
    name: "AncientTires",
    category: "wheel",
    classId: 31,
    imageUrl: require("@/assets/images/elementsImages/wheels/Ancient Tires.png"),
    ...getElementStats(31),
  } as ElementDataWheel,
  {
    id: 114,
    name: "LeafTires",
    category: "wheel",
    classId: 36,
    imageUrl: require("@/assets/images/elementsImages/wheels/Leaf Tires.png"),
    ...getElementStats(36),
  } as ElementDataWheel,

  // --- Gliders ---
  {
    id: 115,
    name: "SuperGlider",
    category: "glider",
    classId: 39,
    imageUrl: require("@/assets/images/elementsImages/gliders/Super Glider.png"),
    ...getElementStats(39),
  } as ElementDataGlider,
  {
    id: 116,
    name: "CloudGlider",
    category: "glider",
    classId: 40,
    imageUrl: require("@/assets/images/elementsImages/gliders/Cloud Glider.png"),
    ...getElementStats(40),
  } as ElementDataGlider,
  {
    id: 117,
    name: "WarioWing",
    category: "glider",
    classId: 41,
    imageUrl: require("@/assets/images/elementsImages/gliders/Wario Wing.png"),
    ...getElementStats(41),
  } as ElementDataGlider,
  {
    id: 118,
    name: "WaddleWing",
    category: "glider",
    classId: 39,
    imageUrl: require("@/assets/images/elementsImages/gliders/Waddle Wing.png"),
    ...getElementStats(39),
  } as ElementDataGlider,
  {
    id: 119,
    name: "PeachParasol",
    category: "glider",
    classId: 42,
    imageUrl: require("@/assets/images/elementsImages/gliders/Peach Parasol.png"),
    ...getElementStats(42),
  } as ElementDataGlider,
  {
    id: 120,
    name: "ParachuteGlider",
    category: "glider",
    classId: 40,
    imageUrl: require("@/assets/images/elementsImages/gliders/Parachute Glider.png"),
    ...getElementStats(40),
  } as ElementDataGlider,
  {
    id: 121,
    name: "ParafoilGlider",
    category: "glider",
    classId: 42,
    imageUrl: require("@/assets/images/elementsImages/gliders/Parafoil Glider.png"),
    ...getElementStats(42),
  } as ElementDataGlider,
  {
    id: 122,
    name: "FlowerGlider",
    category: "glider",
    classId: 40,
    imageUrl: require("@/assets/images/elementsImages/gliders/Flower Glider.png"),
    ...getElementStats(40),
  } as ElementDataGlider,
  {
    id: 123,
    name: "BowserKite",
    category: "glider",
    classId: 42,
    imageUrl: require("@/assets/images/elementsImages/gliders/Bowser Kite.png"),
    ...getElementStats(42),
  } as ElementDataGlider,
  {
    id: 124,
    name: "PlaneGlider",
    category: "glider",
    classId: 41,
    imageUrl: require("@/assets/images/elementsImages/gliders/Plane Glider.png"),
    ...getElementStats(41),
  } as ElementDataGlider,
  {
    id: 125,
    name: "MKTVParafoilGlider",
    category: "glider",
    classId: 42,
    imageUrl: require("@/assets/images/elementsImages/gliders/MKTV Parafoil Glider.png"),
    ...getElementStats(42),
  } as ElementDataGlider,
  {
    id: 126,
    name: "GoldGlider",
    category: "glider",
    classId: 41,
    imageUrl: require("@/assets/images/elementsImages/gliders/Gold Glider.png"),
    ...getElementStats(41),
  } as ElementDataGlider,
  {
    id: 127,
    name: "HylianKite",
    category: "glider",
    classId: 39,
    imageUrl: require("@/assets/images/elementsImages/gliders/Hylian Kite.png"),
    ...getElementStats(39),
  } as ElementDataGlider,
  {
    id: 128,
    name: "Paraglider",
    category: "glider",
    classId: 41,
    imageUrl: require("@/assets/images/elementsImages/gliders/Paraglider.png"),
    ...getElementStats(41),
  } as ElementDataGlider,
  {
    id: 129,
    name: "PaperGlider",
    category: "glider",
    classId: 40,
    imageUrl: require("@/assets/images/elementsImages/gliders/Paper Glider.png"),
    ...getElementStats(40),
  } as ElementDataGlider,
] as ElementData[];

const elementsDataCharacter: ElementDataCharacter[] = elementsData.filter(
  (element): element is ElementDataCharacter => element.category === "character"
);

const elementsDataBody: ElementDataBody[] = elementsData.filter(
  (element): element is ElementDataBody => element.category === "body"
);

const elementsDataWheel: ElementDataWheel[] = elementsData.filter(
  (element): element is ElementDataWheel => element.category === "wheel"
);

const elementsDataGlider: ElementDataGlider[] = elementsData.filter(
  (element): element is ElementDataGlider => element.category === "glider"
);

export const elementsDataByCategory: {
  [key in Category]: ElementData[];
} = {
  character: elementsDataCharacter,
  body: elementsDataBody,
  wheel: elementsDataWheel,
  glider: elementsDataGlider,
};

export const elementsDataByClassId = new Map<number, ElementData[]>();

// Parcourir toutes les listes de catégories pour collecter tous les éléments
Object.values(elementsDataByCategory).forEach((categoryList) => {
  categoryList.forEach((element) => {
    const groupId = element.classId; // Utilisation de 'classId' comme identifiant de groupe

    // Si cette 'groupId' (classId) n'a pas encore de tableau dans la Map, on en crée un
    if (!elementsDataByClassId.has(groupId)) {
      elementsDataByClassId.set(groupId, []);
    }
    // Ajouter l'élément actuel au tableau correspondant à ce 'groupId'
    elementsDataByClassId.get(groupId)?.push(element);
  });
});
