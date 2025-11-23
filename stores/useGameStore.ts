import { Game } from "@/types";
import { create } from "zustand";
import useBuildsListStore from "./useBuildsListStore";

interface GameState {
  game: Game;
  setGame: (game: Game) => void;
}

const useGameStore = create<GameState>((set) => ({
  game: "MK8D" as Game,
  setGame: (game: Game) => {
    // on nettoie retire les BuildCard
    useBuildsListStore.getState().setBuildsListFound([]);
    useBuildsListStore.getState().setBuildsListDisplayed([]);
    useBuildsListStore.getState().setBuildsListSaved([]);
    // puis on change le game
    set({ game });
  },
}));

export default useGameStore;
