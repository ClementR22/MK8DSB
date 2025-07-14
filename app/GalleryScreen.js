import React from "react";
import { ScreenProvider } from "@/contexts/ScreenContext";
import GalleryScreenok from "@/components/Test";

const GalleryScreen = () => {
  return (
    <ScreenProvider screenName="gallery">
      <GalleryScreenok></GalleryScreenok>
    </ScreenProvider>
  );
};

export default GalleryScreen;
