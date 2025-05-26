import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import ButtonMultiStateToggle from "./ButtonMultiStateToggle";
import { translate } from "@/translations/translations";
import useSetsStore from "@/stores/useSetsStore";
import { useThemeStore } from "@/stores/useThemeStore";

const StatSlider = ({ name, value, statFilterNumber }) => {
  const theme = useThemeStore((state) => state.theme);
  const updateStatValue = useSetsStore((state) => state.updateStatValue);
  const setStatFilterNumber = useSetsStore((state) => state.setStatFilterNumber);
  const setStatFilterNumberWithName = (newNumber) => setStatFilterNumber(name, newNumber);

  const onSlidingComplete = ([value]) => {
    updateStatValue(name, value);
  };

  const styles = useMemo(() =>
    StyleSheet.create({
      container: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: theme.surface,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: theme.outline_variant,
        marginBottom: 6,
        width: "100%", // Largeur maximale de 90% de la largeur de l'écran
      },
      containerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 3,
      },
      textContainer: {
        flexDirection: "row", // Aligne les deux textes sur une ligne
        flex: 1, // Prend toute la largeur disponible
      },
      textLeft: {
        color: theme.on_surface,
        fontSize: 22,
        marginLeft: 6,
        flexShrink: 1, // Permet de réduire la largeur du texte si nécessaire
        maxWidth: "70%", // Largeur maximale pour le texte de gauche
        overflow: "hidden", // Cache l'excédent du texte
      },
      textRight: {
        color: theme.on_surface,
        fontSize: 22,
        flexShrink: 0, // Le texte de droite ne rétrécit pas
      },
      containerBottom: {
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 5,
      },
      sliderContainer: {
        height: 20,
        alignItems: "stretch",
        justifyContent: "center",
      },
      thumb: {
        width: 4,
        height: 30,
        borderRadius: 10,
        //backgroundColor: theme.primary,
      },
      track: {
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.secondary_container,
      },
    })
  );

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} ellipsizeMode="middle" style={styles.textLeft}>
            {translate(name)}
          </Text>

          <Text style={styles.textRight}>
            {translate(":")}
            {value}
          </Text>
        </View>
        <ButtonMultiStateToggle
          number={statFilterNumber}
          setNumber={setStatFilterNumberWithName}
          filterCase={true}
          tooltipText="ChangeCondition"
        />
      </View>

      <View style={styles.containerBottom}>
        <View style={styles.sliderContainer}>
          <Slider
            value={value}
            onSlidingComplete={onSlidingComplete}
            minimumValue={0}
            maximumValue={6}
            step={0.25}
            //thumbStyle={[styles.thumb, { backgroundColor: theme.primary }]}
            trackStyle={styles.track}
            thumbTouchSize={{ width: 10, height: 10 }}
          />
        </View>
      </View>
    </View>
  );
};

export default StatSlider;
