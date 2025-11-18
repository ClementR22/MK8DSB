import { DataRegistry } from "@/data/registry";
import useGameStore from "@/stores/useGameStore";

export function useGameData() {
  const game = useGameStore((s) => s.game);
  return DataRegistry[game];
}
