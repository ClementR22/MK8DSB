import SearchSetScreenContent from "../SearchSetScreenContent";
import { PressableImagesProvider } from "../../utils/usePressableImages";

const SearchSetScreen = () => {
  return (
    <PressableImagesProvider>
      <SearchSetScreenContent />;
    </PressableImagesProvider>
  );
};

export default SearchSetScreen;
