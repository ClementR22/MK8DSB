const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Résoudre les modules natifs en mode web
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Si on est sur web et qu'on essaie d'importer un module natif
  if (platform === "web" && moduleName === "react-native-pager-view") {
    // Retourner un mock vide
    return {
      type: "empty",
    };
  }

  // Utiliser le resolver par défaut pour les autres cas
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
