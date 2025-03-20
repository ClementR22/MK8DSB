import DisplaySetScreenContent from "../DisplaySetScreenContent";
import { PressableImagesProvider } from "../../utils/PressableImagesContext";
import { SetsListProvider } from "../../utils/SetsListContext";
import { SavedSetModalProvider } from "../../utils/SavedSetModalContext";

const DisplaySetScreen = () => {
  return (
    <PressableImagesProvider isDefaultSelectedImages={true}>
      <SetsListProvider>
        <SavedSetModalProvider>
          <DisplaySetScreenContent />
        </SavedSetModalProvider>
      </SetsListProvider>
    </PressableImagesProvider>
  );
};

export default DisplaySetScreen;
