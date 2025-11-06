import { useEffect, useRef } from "react";
import { Keyboard, TextInput } from "react-native";

/**
 * Hook pour exécuter une fonction lorsque le clavier se ferme, uniquement si l'input est focus
 * @param callback Fonction à exécuter quand le clavier se ferme
 * @param isActive Booléen qui doit être true quand l'input est focus
 */
export const useKeyboardDidHideWhileFocused = (
  callback: () => void,
  isActive: boolean,
  inputRef: React.RefObject<TextInput>
) => {
  const isFocused = useRef(isActive);

  useEffect(() => {
    isFocused.current = isActive;
  }, [isActive]);

  useEffect(() => {
    // parmi tous input sur le screen, seul l'input active appelle le callback (ie updateName)
    if (!isActive) {
      inputRef.current?.blur();
      return;
    }

    const listener = Keyboard.addListener("keyboardDidHide", () => {
      if (isFocused.current) {
        callback();
      }
    });

    return () => {
      listener.remove();
    };
  }, [callback, isActive]);
};
