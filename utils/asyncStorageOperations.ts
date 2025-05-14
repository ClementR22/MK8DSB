import AsyncStorage from "@react-native-async-storage/async-storage";

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
