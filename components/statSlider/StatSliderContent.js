import { translate } from "@/translations/translations";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ButtonMultiStateToggle from "../ButtonMultiStateToggle";
import { Slider } from "@miblanchard/react-native-slider";
import useGeneralStore from "@/stores/useGeneralStore";
import useSetsStore from "@/stores/useSetsStore";
import { getStatSliderBorderColor } from "@/utils/getStatSliderBorderColor";

const StatSliderContent = ({ name, value, statFilterNumber, setStatFilterNumber, theme, disable = false }) => {
  const setIsScrollEnable = useGeneralStore((state) => state.setIsScrollEnable);
  const updateStatValue = useSetsStore((state) => state.updateStatValue);

  const [tempValue, setTempValue] = useState(value);

  const onValueChange = ([v]) => setTempValue(v);

  const onSlidingStart = () => setIsScrollEnable(false);

  const onSlidingComplete = !disable
    ? ([v]) => {
        updateStatValue(name, v);
        setIsScrollEnable(true);
      }
    : null;

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const borderColor = useMemo(() => getStatSliderBorderColor(statFilterNumber, theme), [statFilterNumber, theme]);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: "row",
          paddingHorizontal: 7,
          paddingVertical: 3,
          backgroundColor: theme.surface,
          borderWidth: 2,
          borderRadius: 17,
          borderColor,
          marginBottom: 0,
          width: "100%",
        },
        containerLeft: {
          flex: 1,
        },
        containerTop: {
          flexDirection: "row",
          alignItems: "center", // Centre verticalement les enfants
          marginLeft: 3,
          marginRight: 10,
        },
        // Style de base pour les textes
        baseText: {
          color: theme.on_surface,
          fontSize: 22,
          fontWeight: "600",
        },
        // Style spécifique pour le nom de la statistique
        nameText: {
          // flexShrink: 1, // Permet au nom de se réduire si nécessaire
          flexGrow: 1, // Permet au nom de prendre l'espace disponible
          marginRight: 2, // Petite marge entre le nom et le séparateur
          overflow: "hidden",
        },
        // Style pour le séparateur ":"
        separatorText: {
          // flexShrink: 0, // Ne doit pas se réduire
          width: 8, // Largeur fixe pour le ':'
          // textAlign: "center", // Centre le ':'
        },
        // Style pour la valeur numérique
        valueText: {
          // flexShrink: 0, // Empêche la valeur de se réduire
          minWidth: 45, // Ajuster cette valeur pour qu'elle corresponde à la largeur maximale attendue de tes chiffres (par ex. "6.00")
        },
        containerBottom: {
          width: "100%",
          paddingHorizontal: 10,
          paddingVertical: 3,
        },
        sliderContainer: {
          height: 50,
          alignItems: "stretch",
          justifyContent: "center",
        },
        track: {
          height: 16,
          borderRadius: 100,
          backgroundColor: "blue",
        },
        thumb: {
          backgroundColor: theme.primary,
          borderRadius: 100,
          width: 4,
          height: 44,
        },
        minimumTrack: {
          backgroundColor: theme.primary,
          borderColor: theme.surface,
          borderRightWidth: 8,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
        maximumTrack: {
          backgroundColor: theme.secondary_container,
          borderColor: theme.surface,
          borderLeftWidth: 8,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
        containerRight: {
          paddingTop: 4,
        },
      }),
    [theme, borderColor]
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerLeft}>
        <View style={styles.containerTop}>
          {/* Texte du nom de la statistique (aligné à gauche, tronqué si trop long) */}
          <Text style={[styles.baseText, styles.nameText]} numberOfLines={1} ellipsizeMode="tail">
            {translate(name)}
          </Text>
          {/* Séparateur ":" à position fixe */}
          <Text style={[styles.baseText, styles.separatorText]}>{translate(":")}</Text>
          {/* Valeur numérique (alignée à droite dans sa boîte fixe) */}
          <Text style={[styles.baseText, styles.valueText]}>{tempValue}</Text>
        </View>

        <View style={styles.containerBottom}>
          <View style={styles.sliderContainer}>
            <Slider
              value={tempValue}
              onValueChange={onValueChange}
              onSlidingStart={onSlidingStart}
              onSlidingComplete={onSlidingComplete}
              minimumValue={0}
              maximumValue={6}
              step={0.25}
              trackStyle={styles.track}
              thumbTouchSize={{ width: 10, height: 10 }}
              thumbStyle={styles.thumb}
              minimumTrackStyle={styles.minimumTrack}
              maximumTrackStyle={[
                styles.maximumTrack,
                {
                  borderLeftWidth: (tempValue / 6) * 230 + 10,
                },
              ]}
            />
          </View>
        </View>
      </View>
      <View style={styles.containerRight}>
        <ButtonMultiStateToggle
          number={statFilterNumber}
          setNumber={setStatFilterNumber}
          filterCase={true}
          tooltipText="ChangeCondition"
        />
      </View>
    </View>
  );
};

export default StatSliderContent;
