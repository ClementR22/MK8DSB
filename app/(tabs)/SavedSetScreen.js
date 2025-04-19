import SavedSetScreenContent from "../SavedSetScreenContent";
import { PressableImagesProvider } from "../../utils/PressableImagesContext";
import { Text } from "react-native";
import { SavedSetScreenProvider } from "../../utils/SavedSetScreenContext";

const SavedSetScreen = () => {
  return (
    <SavedSetScreenProvider>
      <PressableImagesProvider>
        <SavedSetScreenContent />
      </PressableImagesProvider>
    </SavedSetScreenProvider>
  );
};

export default SavedSetScreen;
