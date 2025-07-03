import { translateToLanguage } from "@/translations/translations";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonMultiStateToggle from "../ButtonMultiStateToggle";
import { Slider } from "@miblanchard/react-native-slider";
import useGeneralStore from "@/stores/useGeneralStore";
import useSetsStore from "@/stores/useSetsStore";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";
import TooltipWrapper from "../TooltipWrapper";
import { useThemeStore } from "@/stores/useThemeStore";
import { useLanguageStore } from "@/stores/useLanguageStore";

interface StatSliderContentProps {
  name: string;
  value: number;
  statFilterNumber: number;
  setStatFilterNumber: (num: number) => void;
}

const MAX_VALUE = 6;

const StatSliderContent = ({ name, value, statFilterNumber, setStatFilterNumber }: StatSliderContentProps) => {
  value = 5;
  const theme = useThemeStore((state) => state.theme);
  const language = useLanguageStore((state) => state.language);

  const setIsScrollEnable = useGeneralStore((state) => state.setIsScrollEnable);
  const updateStatValue = useSetsStore((state) => state.updateStatValue);

  const [tempValue, setTempValue] = useState(value);

  const onValueChange = useCallback(([v]: [number]) => setTempValue(v), []);
  const onSlidingStart = useCallback(() => setIsScrollEnable(false), [setIsScrollEnable]);
  const onSlidingComplete = useCallback(
    ([v]: [number]) => {
      if (v !== value) {
        updateStatValue(name, v);
      }
      setIsScrollEnable(true);
    },
    [updateStatValue, name, setIsScrollEnable]
  );

  useEffect(() => {
    if (value !== tempValue) {
      setTempValue(value);
    }
  }, [value]);

  const borderColorDynamicStyle = useMemo(
    () => getStatSliderBorderColor(statFilterNumber, theme),
    [statFilterNumber, theme]
  );

  const innerContainerDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.surface,
      borderColor: borderColorDynamicStyle,
    }),
    [theme.surface, borderColorDynamicStyle]
  );

  const textColorStyle = useMemo(
    () => ({
      color: theme.on_surface,
    }),
    [theme.on_surface]
  );

  const minimumTrackDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.primary,
    }),
    [theme.primary]
  );

  const maximumTrackDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.secondary_container,
    }),
    [theme.secondary_container]
  );

  // --- NOUVEAU: Style pour le conteneur du thumb (la partie blanche) ---
  const thumbWrapperDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.surface, // Ou 'white' si tu veux un blanc fixe
    }),
    [theme.surface]
  );

  // --- NOUVEAU: Style pour le thumb intérieur (la partie violette) ---
  const thumbDynamicStyle = useMemo(
    () => ({
      backgroundColor: theme.primary, // La couleur du thumb
    }),
    [theme.primary]
  );

  const translatedName = useMemo(() => translateToLanguage(name, language), [name, language]);
  const translatedSeparator = useMemo(() => translateToLanguage(":", language), [language]);

  // --- NOUVEAU: Fonction pour rendre un thumb personnalisé ---
  const renderCustomThumb = useCallback(
    () => (
      <View style={[styles.thumbWrapper, thumbWrapperDynamicStyle]}>
        <View style={[styles.thumb, thumbDynamicStyle]} />
      </View>
    ),
    [thumbWrapperDynamicStyle, thumbDynamicStyle]
  );

  return (
    <TooltipWrapper
      tooltipText="DefineAValue"
      style={StyleSheet.flatten([styles.container, innerContainerDynamicStyle])}
      innerContainerStyle={styles.innerContainer}
    >
      <View style={styles.containerLeft}>
        <View style={styles.textWrapper}>
          <Text style={StyleSheet.flatten([styles.text, textColorStyle])} numberOfLines={1} ellipsizeMode="tail">
            {translatedName}
          </Text>
          <Text style={StyleSheet.flatten([styles.text, styles.separatorText, textColorStyle])}>
            {translatedSeparator}
          </Text>
        </View>

        <Slider
          containerStyle={styles.sliderContainer}
          value={tempValue}
          onValueChange={onValueChange}
          onSlidingStart={onSlidingStart}
          onSlidingComplete={onSlidingComplete}
          minimumValue={0}
          maximumValue={MAX_VALUE}
          step={0.25}
          trackStyle={styles.track}
          renderThumbComponent={renderCustomThumb}
          minimumTrackStyle={StyleSheet.flatten(minimumTrackDynamicStyle)}
          maximumTrackStyle={StyleSheet.flatten(maximumTrackDynamicStyle)}
        />
      </View>

      <View style={styles.containerRight}>
        <View style={styles.valueWrapper}>
          <Text style={[styles.text, textColorStyle]}>{tempValue}</Text>
        </View>

        <View style={styles.buttonWrapper}>
          <ButtonMultiStateToggle
            number={statFilterNumber}
            setNumber={setStatFilterNumber}
            filterCase={true}
            tooltipText="ChangeCondition"
          />
        </View>
      </View>
    </TooltipWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 2,
    borderRadius: 17,
  },
  innerContainer: {
    flexDirection: "row",
    paddingTop: 3,
    paddingHorizontal: 13,
    gap: 13,
  },
  containerLeft: { flex: 1, justifyContent: "flex-start" },
  containerRight: { alignItems: "center", justifyContent: "flex-start", width: 46 },
  textWrapper: {
    flexDirection: "row",
    marginLeft: 3,
  },
  sliderContainer: {
    marginBottom: 4,
  },
  valueWrapper: {
    width: 40,
    alignItems: "flex-start",
  },
  buttonWrapper: { position: "absolute", bottom: 8 },
  track: {
    height: 16,
    borderRadius: 100,
  },
  thumbWrapper: {
    width: 16, // Doit être plus large que le thumb intérieur
    height: 36, // <--- C'EST LA LIGNE MANQUANTE QUI CAUSAIT L'ERREUR
    justifyContent: "center", // Centrer le thumb intérieur verticalement
    alignItems: "center", // Centrer le thumb intérieur horizontalement
    borderRadius: 4, // Coins légèrement arrondis pour le conteneur blanc
  },
  thumb: {
    width: 4, // La largeur du thumb violet (comme ton design)
    height: 36, // La hauteur du thumb violet (comme ton design)
    borderRadius: 100, // Pour les coins très arrondis
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
  },
  separatorText: {
    marginRight: 2,
  },
});

export default React.memo(StatSliderContent);
