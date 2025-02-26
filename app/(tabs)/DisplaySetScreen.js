import DisplaySetScreenContent from "../DisplaySetScreenContent";
import { PressableImagesProvider } from "../../utils/PressableImagesContext";
import { SetsListProvider } from "../../utils/SetsListContext";

const DisplaySetScreen = () => {
  return (
    <PressableImagesProvider isDefaultSelectedImages={true}>
      <SetsListProvider>
        <DisplaySetScreenContent />
      </SetsListProvider>
    </PressableImagesProvider>
  );
};

export default DisplaySetScreen;
