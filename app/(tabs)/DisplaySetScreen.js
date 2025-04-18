import DisplaySetScreenContent from "../DisplaySetScreenContent";
import { PressableImagesProvider } from "../../utils/PressableImagesContext";
import { DisplaySetScreenProvider } from "../../utils/DisplaySetScreenContext";

const DisplaySetScreen = () => {
  return (
    <DisplaySetScreenProvider>
      <PressableImagesProvider isDefaultSelectedImages={true}>
        <DisplaySetScreenContent />
      </PressableImagesProvider>
    </DisplaySetScreenProvider>
  );
};

export default DisplaySetScreen;
