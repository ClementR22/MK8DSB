import DisplaySetScreenContent from "../DisplaySetScreenContent";
import { PressableImagesProvider } from "../../utils/usePressableImages";

const DisplaySetScreen = () => {
  return (
    <PressableImagesProvider isDefaultSelectedImages={true}>
      <DisplaySetScreenContent />
    </PressableImagesProvider>
  );
};

export default DisplaySetScreen;
