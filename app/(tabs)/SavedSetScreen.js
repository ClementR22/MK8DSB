import SavedSetScreenContent from "../SavedSetScreenContent";
import { PressableImagesProvider } from "../../utils/PressableImagesContext";
import { Text } from "react-native";

const SavedSetScreen = () => {
  return (
    <PressableImagesProvider>
      <SavedSetScreenContent />
    </PressableImagesProvider>
  );
};

export default SavedSetScreen;
