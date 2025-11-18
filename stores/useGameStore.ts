import { Game } from "@/types";
import { create } from "zustand";

interface GameState {
  game: Game;
}

const useGameStore = create<GameState>((set) => ({
  game: "MK8D" as Game,
  setGame: (game: Game) => set({ game }),
}));

export default useGameStore;
