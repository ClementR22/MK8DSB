import DisplaySetScreenContent from "../DisplaySetScreenContent";
import { PressableImagesProvider } from "../../utils/PressableImagesContext";

const DisplaySetScreen = () => {
  return (
    <PressableImagesProvider isDefaultSelectedImages={true}>
      <DisplaySetScreenContent />
    </PressableImagesProvider>
  );
};

export default DisplaySetScreen;
