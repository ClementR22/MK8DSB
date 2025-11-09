import useDeckStore from "@/stores/useDeckStore";

export const useGenerateUniqueName = (name: string) => {
  let index = 0;
  let newName = name;
  do {
    index += 1;
    newName = name + `(${index})`;
  } while (!useDeckStore.getState().checkNameFree(newName));
  return newName;
};
