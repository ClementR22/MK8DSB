/*
const characterAllClassName = {
  0: "Bébé Peach, Bébé Daisy",
  1: "Bébé Harmonie, Lemmy",
  2: "Bébé Mario, Bébé Luigi, Skelerex, Mii léger",
  3: "Toadette, Wendy, Marie",
  4: "Koopa, Lakitu, Bowser Jr.",
  5: "Toad, Maskass, Larry",
  6: "Peach Chat, Fille Inkling, Villageoise, Diddy Kong",
  7: "Peach, Daisy, Yoshi, Birdo, Peachette",
  8: "Mario Tanuki, Garçon Inkling, Villageois",
  9: "Mario, Ludwig, Mii moyen",
  10: "Luigi, Iggy, Kamek",
  11: "Harmonie, Roi Boo, Link, Pauline",
  12: "Flora piranha*, Mario de métal, Peach d'or rose",
  13: "Waluigi, Donkey Kong, Roy, Wiggler",
  14: "Wario, Bowser Skelet, Mii lourd, Funky Kong",
  15: "Bowser, Morton",
};

const bodyAllClassName = {
  16: "300 SL Roadster(k)*, Kart Standard(k), Cybertrombe(m)",
  17: "Kart rétro(k)*, Mécabécane(m), Scooter AC(m)",
  18: "Proto 8(k)*, Propulsar(k)*, Missile tornade(q)",
  19: "Nautomobile(k)*, Tubul R3(k)*, Malécycle(q)",
  20: "Chabriolet(k)**, Météore(ms)**, Yoshimoto(ms)*, Quad nounours(q)",
  21: "Mach-célère(k), Intrépide(k), Magikart(k)",
  22: "Beat-bolide(k)*, GLA(k)*, Quad Standard(q)",
  23: "Cavalkart(k)*, Sport GP(ms), Epervier(ms)",
  24: "Paracoccinelly(k), Scootinette(m)",
  25: "Autorhino(k)*, Caravéloce(k)",
  26: "Sneakart(k)**, Or(k)*, Destrier de légende(ms)",
  27: "W25 Flèche d'argent(k), Moto Standard(m), Flamboyante(m), Quad Wiggler(q)",
  28: "Blue Falcon(k)*, Kartoon(q)",
  29: "Buggy tanuki(k)*, Koopa-mobile(k), Destrier de légende 0.1(m)",
};

const wheelsAllClassName = {
  30: "GLA*, Standard, Standard bleu",
  31: "Mastodonte*, Masto-flammes*, Archéonique",
  32: "Roller, Roller azur",
  33: "Classique, Classique rouge, Bois",
  34: "Lisse, Cyber-lisse",
  35: "Métal*, Roue Or",
  36: "Bouton, Feuille",
  37: "Hors-piste, Hors-piste rétro, Triforce",
  38: "Coussin*, Eponge",
};

const gliderAllClassName = {
  39: "Standard, Dendinaile, Aile hylienne",
  40: "Aile nuages, Parachute, Aile fleurie, Aile en papier",
  41: "Aile Wario, Planeur, Or, Paravoile",
  42: "Ombrelle Peach, Bowser-volant, Parapente, Parapente MKTV",
};

const elementsAllClassName = {
  ...characterAllClassName,
  ...bodyAllClassName,
  ...wheelsAllClassName,
  ...gliderAllClassName,
};
*/

export const statNames = [
  "speedGround",
  "speedAntiGravity",
  "speedWater",
  "speedAir",
  "acceleration",
  "weight",
  "handlingGround",
  "handlingAntiGravity",
  "handlingWater",
  "handlingAir",
  "traction",
  "miniTurbo",
];

export const compactStatNames = {
  speedGround: "spdG",
  speedAntiGravity: "spdAG",
  speedWater: "spdW",
  speedAir: "spdA",
  acceleration: "acc",
  weight: "wgt",
  handlingGround: "hanG",
  handlingAntiGravity: "hanAG",
  handlingWater: "hanW",
  handlingAir: "hanA",
  traction: "tra",
  miniTurbo: "mtu",
};

export const category4Names = ["character", "body", "wheel", "glider"];

export const bodyTypeNames = ["kart", "bike", "sportBike", "ATV"];
