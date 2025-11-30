import { Game } from "@/types";
import { create } from "zustand";
import useBuildsListStore from "./useBuildsListStore";
import { saveThingInMemory } from "@/utils/asyncStorageOperations";
import { GAME_DEFAULT } from "@/config/config";

interface GameState {
  game: Game;
  setGame: (game: Game) => void;
}

const useGameStore = create<GameState>((set) => ({
  game: GAME_DEFAULT as Game,
  setGame: async (game: Game) => {
    // on nettoie retire les BuildCard
    useBuildsListStore.getState().setBuildsListFound([]);
    useBuildsListStore.getState().setBuildsListDisplayed([]);
    useBuildsListStore.getState().setBuildsListSaved([]);
    // puis on change le game
    await saveThingInMemory("game", game);
    set({ game });
  },
}));

export default useGameStore;
