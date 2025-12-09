import { Game } from "@/types";

export const sortsNamespaceByGame: Record<Game, string> = {
  MK8D: "sortsMK8D",
  MKW: "sortsMKW",
} as const;

export const statsNamespaceByGame: Record<Game, string> = {
  MK8D: "statsMK8D",
  MKW: "statsMKW",
} as const;

export const elementsNamespaceByGame: Record<Game, string> = {
  MK8D: "elementsMK8D",
  MKW: "elementsMKW",
} as const;
