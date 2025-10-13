// plugins/withAndroidTransparentNavigation.js
const { withAndroidStyles } = require("@expo/config-plugins");

module.exports = function withAndroidTransparentNavigation(config) {
  return withAndroidStyles(config, (config) => {
    const styles = config.modResults;

    const appThemeStyle = styles?.resources?.style?.find((style) => style.$.name === "AppTheme");

    if (appThemeStyle && appThemeStyle.item) {
      const existingItem = appThemeStyle.item.find((item) => item.$.name === "android:windowTranslucentNavigation");

      if (!existingItem) {
        appThemeStyle.item.push({
          $: { name: "android:windowTranslucentNavigation" },
          _: "true",
        });
      }
    }

    return config;
  });
};
