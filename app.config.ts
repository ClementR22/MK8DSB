// app.config.ts
import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  owner: "lentrepriz",
  name: "MK8DSB",
  slug: "MK8DSB",
  version: "0.0.1",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.clement_rayer.MK8DSB",
    edgeToEdgeEnabled: true,
  },
  androidNavigationBar: {
    backgroundColor: "#FF0000", // Changé de "red" à "#FF0000"
  },
  androidStatusBar: {
    translucent: true,
    backgroundColor: "#00000000", // Changé de "transparent" à "#00000000"
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: ["expo-router", "expo-localization"],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "00f67cbf-872e-41b5-8b6c-4b4ae1f6c6bb",
    },
  },
});
