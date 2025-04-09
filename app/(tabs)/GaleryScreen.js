import GaleryScreenContent from "../GaleryScreenContent";
import { PressableImagesProvider } from "../../utils/PressableImagesContext";

const GaleryScreen = () => {
  return (
    <PressableImagesProvider>
      <GaleryScreenContent />
    </PressableImagesProvider>
  );
};

export default GaleryScreen;
