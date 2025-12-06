import { useEffect } from "react";
import * as Updates from "expo-updates";
import { Alert } from "react-native";

export function useExpoUpdates() {
  useEffect(() => {
    async function check() {
      try {
        const update = await Updates.checkForUpdateAsync();
        console.log({ update });
        if (update.isAvailable) {
          Alert.alert("Mise à jour disponible", "Une nouvelle version a été publiée.", [
            { text: "Plus tard" },
            {
              text: "Mettre à jour",
              onPress: async () => {
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
              },
            },
          ]);
        }
      } catch (e) {
        console.log("Erreur update OTA :", e);
      }
    }

    check();
  }, []);
}
