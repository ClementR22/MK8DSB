import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "./toast";

export const saveThingInMemory = async (thingKey: string, newThing: any) => {
  try {
    await AsyncStorage.setItem(thingKey, JSON.stringify(newThing));
  } catch (e) {
    console.error("Erreur lors de la sauvegarde de ", thingKey, e);
  }
};

export const loadThingFromMemory = async (thingKey: string, setThing: any) => {
  const savedThing = await AsyncStorage.getItem(thingKey);

  if (savedThing != null && savedThing != "undefined") {
    let savedThingParsed: any;
    if (savedThing === "true" || savedThing === "false") {
      // si savedSetting est un booleen
      savedThingParsed = savedThing === "true";
    } else {
      savedThingParsed = JSON.parse(savedThing);
    }
    setThing(savedThingParsed);
  }
};

export const getOnlySetsSavedKeysFromMemory = async () => {
  const excludedKeys = ["language", "theme", "statsVisibleConfig", "statsVisibleListDefault"];
  const keys = await AsyncStorage.getAllKeys();
  const onlySetKeys = keys.filter((k) => !excludedKeys.includes(k));
  return onlySetKeys;
};

export const deleteThingInMemory = async (thingKey) => {
  try {
    await AsyncStorage.removeItem(thingKey);
  } catch (e) {
    console.error("Erreur lors de la suppression de ", thingKey, e);
  }
};

export const deleteAllTheMemory = async () => {
  try {
    const allKeys = await AsyncStorage.getAllKeys();
    allKeys.forEach(async (thingKey) => await AsyncStorage.removeItem(thingKey));
    showToast("Lamemoireaetesupprimee", "ehoui");
  } catch (e) {
    console.error("Erreur lors de la suppression : ", e);
  }
};

export const deleteAllSetsInMemory = async () => {
  try {
    const setsKeys = await getOnlySetsSavedKeysFromMemory();
    setsKeys.forEach(async (thingKey) => await AsyncStorage.removeItem(thingKey));
    showToast("lessetssontsupprimes", "ehoui");
  } catch (e) {
    console.error("Erreur lors de la suppression : ", e);
  }
};
